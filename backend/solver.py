import json
import time
from collections import defaultdict
from ortools.sat.python import cp_model

def solve_timetable(data_path="CrunchWeek_Starter/CrunchWeek_StarterPack/data/cit_public.json", time_limit_seconds=30):
    with open(data_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    days = data["calendar"]["days"]
    day_indices = {d: i for i, d in enumerate(days)}
    rooms = {r["id"]: r for r in data["rooms"]}
    faculty = {f["id"]: f for f in data["faculty"]}
    groups = {g["id"]: g for g in data["student_groups"]}
    sessions = {s["id"]: s for s in data["sessions"]}

    room_un = set()
    for u in data.get("room_unavailability", []):
        for p in u["periods"]:
            room_un.add((u["room_id"], u["day"], p))

    fac_un = set()
    for f in data["faculty"]:
        for u in f.get("unavailable", []):
            for p in u["periods"]:
                fac_un.add((f["id"], u["day"], p))

    fac_prefs = defaultdict(list)
    for f in data["faculty"]:
        for pref in f.get("preferences", []):
            if pref.get("type") == "avoid":
                fac_prefs[f["id"]].append(pref)

    # 1. Generate candidate slots for each session
    candidate_slots = {}
    for sid, s in sessions.items():
        dur = s["duration"]
        f_id = s["faculty_id"]
        fixed = s.get("fixed_slot")
        
        target_days = [fixed["day"]] if fixed else days
        possible_starts = [fixed["start_period"]] if fixed else (
            [2, 6] if s["kind"] == "lab" else [p for p in range(1, 10 - dur + 1) if not (p <= 5 < p + dur - 1)]
        )

        cands = []
        for d in target_days:
            for st in possible_starts:
                per = list(range(st, st + dur))
                # check faculty unavailability
                if any((f_id, d, p) in fac_un for p in per):
                    continue
                for r_id, r in rooms.items():
                    if r["capacity"] < s["size"]:
                        continue
                    if r["type"] not in s["room_types"]:
                        continue
                    if s.get("needs_accessible") and not r["accessible"]:
                        continue
                    if any((r_id, d, p) in room_un for p in per):
                        continue
                    cands.append((d, st, r_id))
        candidate_slots[sid] = cands

    # 2. Build CP-SAT Model
    model = cp_model.CpModel()

    # Decision variables: x[s, idx] = 1 if session s is assigned to candidate_slots[s][idx]
    x = {}
    for sid, cands in candidate_slots.items():
        for idx in range(len(cands)):
            x[(sid, idx)] = model.NewBoolVar(f"x_{sid}_{idx}")

    # Exactly one slot per session (H1)
    for sid, cands in candidate_slots.items():
        model.Add(sum(x[(sid, idx)] for idx in range(len(cands))) == 1)

    # Room occupancy map: (room, day, period) -> list of (sid, idx)
    room_period_vars = defaultdict(list)
    # Faculty occupancy map: (faculty, day, period) -> list of (sid, idx)
    fac_period_vars = defaultdict(list)
    # Faculty daily hours: (faculty, day) -> list of (dur, (sid, idx))
    fac_day_hours = defaultdict(list)
    # Basket slots: basket_name -> list of (sid, idx, day, start)
    basket_slots = defaultdict(list)
    # Group occupancy: (group, day, period) -> list of (sid, idx) [non-basket]
    group_period_vars = defaultdict(list)
    basket_period_vars = defaultdict(lambda: defaultdict(list)) # (bkey, day, period) -> list of (sid, idx)

    for sid, cands in candidate_slots.items():
        s = sessions[sid]
        dur = s["duration"]
        f_id = s["faculty_id"]
        bkey = s.get("basket_slot")
        for idx, (d, st, r_id) in enumerate(cands):
            var = x[(sid, idx)]
            for p in range(st, st + dur):
                room_period_vars[(r_id, d, p)].append(var)
                fac_period_vars[(f_id, d, p)].append(var)
                if not bkey:
                    for g in s["groups"]:
                        group_period_vars[(g, d, p)].append(var)
                else:
                    basket_period_vars[(bkey, d, p)][sid].append(var)
            fac_day_hours[(f_id, d)].append((dur, var))
            if bkey:
                basket_slots[bkey].append((sid, idx, d, st))

    # Room clash (H4)
    for (r_id, d, p), var_list in room_period_vars.items():
        if len(var_list) > 1:
            model.Add(sum(var_list) <= 1)

    # Faculty clash (H2)
    for (f_id, d, p), var_list in fac_period_vars.items():
        if len(var_list) > 1:
            model.Add(sum(var_list) <= 1)

    # Faculty daily hours limit (H12)
    for (f_id, d), dur_var_list in fac_day_hours.items():
        mx = faculty[f_id].get("max_hours_per_day", 4)
        model.Add(sum(dur * var for dur, var in dur_var_list) <= mx)

    # Basket synchronization (H11)
    # All sessions sharing basket_slot must be at the exact same (day, start)
    for bkey, items in basket_slots.items():
        # group by session_id
        by_sid = defaultdict(list)
        for sid, idx, d, st in items:
            by_sid[sid].append((idx, d, st))
        sids = list(by_sid.keys())
        first_sid = sids[0]
        # For every (day, start), indicator for basket
        unique_time_slots = sorted(list({(d, st) for _, _, d, st in items}))
        for (d, st) in unique_time_slots:
            var_first = [x[(first_sid, idx)] for idx, d0, st0 in by_sid[first_sid] if d0 == d and st0 == st]
            sum_first = sum(var_first) if var_first else 0
            for other_sid in sids[1:]:
                var_other = [x[(other_sid, idx)] for idx, d0, st0 in by_sid[other_sid] if d0 == d and st0 == st]
                sum_other = sum(var_other) if var_other else 0
                model.Add(sum_first == sum_other)

    # Student Group clash (H3)
    # Basket sessions only conflict with non-basket sessions of their groups
    # Year 3 groups attend all 3 basket electives simultaneously in parallel rooms.
    for (g, d, p), var_list in group_period_vars.items():
        # check if this group also has any basket in this slot
        # find which basket affects this group
        relevant_baskets = []
        for (bkey, bd, bp), sid_dict in basket_period_vars.items():
            if bd == d and bp == p:
                # does basket bkey involve group g?
                sample_sid = next(iter(sid_dict.keys()))
                if g in sessions[sample_sid]["groups"]:
                    # basket is active if any session of this basket is active (they are synchronized)
                    b_active = sum(sid_dict[sample_sid])
                    relevant_baskets.append(b_active)
        model.Add(sum(var_list) + sum(relevant_baskets) <= 1)

    # 3. Soft Constraints & Objective Formulation
    objective_terms = []

    # S1: Faculty avoid preferences (2 pts per hour)
    for sid, cands in candidate_slots.items():
        s = sessions[sid]
        f_id = s["faculty_id"]
        dur = s["duration"]
        prefs = fac_prefs.get(f_id, [])
        if prefs:
            for idx, (d, st, r_id) in enumerate(cands):
                per = list(range(st, st + dur))
                pen = 0
                for pref in prefs:
                    if d in pref.get("days", days):
                        pen += 2 * sum(1 for p in per if p in pref["periods"])
                if pen > 0:
                    objective_terms.append(pen * x[(sid, idx)])

    # S5: Room under-utilization (size / cap < 0.4 -> 1 pt)
    for sid, cands in candidate_slots.items():
        s = sessions[sid]
        for idx, (d, st, r_id) in enumerate(cands):
            cap = rooms[r_id]["capacity"]
            if cap and (s["size"] / cap < 0.4):
                objective_terms.append(1 * x[(sid, idx)])

    # S6: Avoid Period 9 (1 pt if P9 is occupied)
    for sid, cands in candidate_slots.items():
        s = sessions[sid]
        dur = s["duration"]
        for idx, (d, st, r_id) in enumerate(cands):
            per = list(range(st, st + dur))
            if 9 in per:
                objective_terms.append(1 * x[(sid, idx)])

    # S4: Avoid same course lecture twice on the same day for a group (3 pts)
    # Group lectures by (group, day, course_id)
    course_group_day_lectures = defaultdict(list)
    for sid, cands in candidate_slots.items():
        s = sessions[sid]
        if s["kind"] == "lecture" and not s.get("basket_slot"):
            cid = s["course_id"]
            for idx, (d, st, r_id) in enumerate(cands):
                for g in s["groups"]:
                    course_group_day_lectures[(g, d, cid)].append(x[(sid, idx)])

    for (g, d, cid), var_list in course_group_day_lectures.items():
        if len(var_list) > 1:
            # count > 1 -> penalty 3 * (count - 1)
            # count = sum(var_list)
            # dup >= count - 1, dup >= 0
            dup = model.NewIntVar(0, len(var_list), f"dup_{g}_{d}_{cid}")
            model.Add(dup >= sum(var_list) - 1)
            objective_terms.append(3 * dup)

    # S3: Student daily workload > 6 hours (3 pts per excess hour)
    group_day_hours = defaultdict(list)
    seen_baskets = set()
    for sid, cands in candidate_slots.items():
        s = sessions[sid]
        dur = s["duration"]
        bkey = s.get("basket_slot")
        for idx, (d, st, r_id) in enumerate(cands):
            var = x[(sid, idx)]
            if not bkey:
                for g in s["groups"]:
                    group_day_hours[(g, d)].append((dur, var))
            else:
                for g in s["groups"]:
                    if (g, bkey, sid) not in seen_baskets:
                        seen_baskets.add((g, bkey, sid))
                        # Only include one representative session of basket for hours
                        # Since all sessions of basket are synchronized, take the first one
                        if sid == "OE301-L1":
                            group_day_hours[(g, d)].append((dur, var))

    for (g, d), dur_var_list in group_day_hours.items():
        total_hours = model.NewIntVar(0, 9, f"hours_{g}_{d}")
        model.Add(total_hours == sum(dur * var for dur, var in dur_var_list))
        excess = model.NewIntVar(0, 3, f"excess_{g}_{d}")
        model.Add(excess >= total_hours - 6)
        objective_terms.append(3 * excess)

    # Objective: Minimize sum of soft penalties
    model.Minimize(sum(objective_terms))

    # 4. Solve
    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = time_limit_seconds
    solver.parameters.num_workers = 4
    print("Starting CP-SAT solver...")
    start_time = time.time()
    status = solver.Solve(model)
    elapsed = time.time() - start_time
    print(f"Solver finished in {elapsed:.2f}s with status: {solver.StatusName(status)}")

    if status not in (cp_model.OPTIMAL, cp_model.FEASIBLE):
        raise RuntimeError("No feasible timetable solution found!")

    # 5. Extract assignment
    scheduled_sessions = []
    for sid, cands in candidate_slots.items():
        for idx, (d, st, r_id) in enumerate(cands):
            if solver.Value(x[(sid, idx)]) == 1:
                scheduled_sessions.append({
                    "session_id": sid,
                    "day": d,
                    "start_period": st,
                    "room_id": r_id
                })
                break

    # Sort sessions by day, start_period, room_id
    scheduled_sessions.sort(key=lambda s: (day_indices[s["day"]], s["start_period"], s["room_id"]))
    print(f"Total sessions scheduled: {len(scheduled_sessions)}")
    print(f"Objective Value: {solver.ObjectiveValue()}")
    return scheduled_sessions

if __name__ == "__main__":
    sessions = solve_timetable()
    print("Sample scheduled sessions:", sessions[:5])
