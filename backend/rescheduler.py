import json
import copy
import time
from collections import defaultdict
from ortools.sat.python import cp_model

def apply_disruption_to_data(data, disruption):
    d = copy.deepcopy(data)
    fac = {f["id"]: f for f in d["faculty"]}
    for ch in disruption.get("changes", []):
        t = ch["type"]
        if t == "faculty_unavailable":
            for day in ch["days"]:
                fac[ch["faculty_id"]]["unavailable"].append({
                    "day": day,
                    "periods": ch["periods"],
                    "reason": ch.get("reason", "")
                })
        elif t == "room_unavailable":
            for day in ch["days"]:
                d["room_unavailability"].append({
                    "room_id": ch["room_id"],
                    "day": day,
                    "periods": ch["periods"],
                    "reason": ch.get("reason", "")
                })
        elif t == "add_faculty":
            d["faculty"].append(ch["faculty"])
            fac[ch["faculty"]["id"]] = ch["faculty"]
        elif t == "add_session":
            d["sessions"].append(ch["session"])
        elif t == "remove_session":
            d["sessions"] = [s for s in d["sessions"] if s["id"] != ch["session_id"]]
        else:
            raise ValueError(f"Unknown change type: {t}")
    return d

def solve_disruption(data_path="CrunchWeek_Starter/CrunchWeek_StarterPack/data/cit_public.json",
                     disruption_path="CrunchWeek_Starter/CrunchWeek_StarterPack/examples/sample_disruption.json",
                     baseline_path="exports/schedule.json",
                     output_path="exports/schedule_after.json"):
    with open(data_path, "r", encoding="utf-8") as f:
        orig_data = json.load(f)

    with open(disruption_path, "r", encoding="utf-8") as f:
        disruption = json.load(f)

    with open(baseline_path, "r", encoding="utf-8") as f:
        baseline = json.load(f)

    base_map = {s["session_id"]: (s["day"], s["start_period"], s["room_id"]) for s in baseline["sessions"]}

    # Apply changes to data
    data = apply_disruption_to_data(orig_data, disruption)

    days = data["calendar"]["days"]
    rooms = {r["id"]: r for r in data["rooms"]}
    faculty = {f["id"]: f for f in data["faculty"]}
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

    # Candidate slots for all sessions in modified dataset
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

    model = cp_model.CpModel()
    # Decision variables: x[s, idx]
    x = {}
    for sid, cands in candidate_slots.items():
        base_slot = base_map.get(sid)
        for idx in range(len(cands)):
            var = model.NewBoolVar(f"x_{sid}_{idx}")
            x[(sid, idx)] = var
            # Add hint if this cand matches baseline
            if base_slot:
                d, st, rid = cands[idx]
                if (d, st, rid) == base_slot:
                    model.AddHint(var, 1)
        model.Add(sum(x[(sid, idx)] for idx in range(len(cands))) == 1)

    room_period = defaultdict(list)
    fac_period = defaultdict(list)
    fac_day_hours = defaultdict(list)
    grp_period = defaultdict(list)

    basket_sessions = defaultdict(list)
    for sid, s in sessions.items():
        b = s.get("basket_slot")
        if b:
            basket_sessions[b].append(sid)

    basket_time = {}
    for b, sids in basket_sessions.items():
        first_sid = sids[0]
        unique_times = sorted(list({(d, st) for d, st, _ in candidate_slots[first_sid]}))
        for d, st in unique_times:
            bv = model.NewBoolVar(f"btime_{b}_{d}_{st}")
            basket_time[(b, d, st)] = bv
        model.Add(sum(basket_time[(b, d, st)] for d, st in unique_times) == 1)

        for sid in sids:
            for d, st in unique_times:
                matching_vars = [x[(sid, idx)] for idx, (d0, st0, _) in enumerate(candidate_slots[sid]) if d0 == d and st0 == st]
                model.Add(sum(matching_vars) == basket_time[(b, d, st)])

    for sid, cands in candidate_slots.items():
        s = sessions[sid]
        dur = s["duration"]
        f_id = s["faculty_id"]
        b = s.get("basket_slot")

        for idx, (d, st, r_id) in enumerate(cands):
            var = x[(sid, idx)]
            for p in range(st, st + dur):
                room_period[(r_id, d, p)].append(var)
                fac_period[(f_id, d, p)].append(var)
                if not b:
                    for g in s["groups"]:
                        grp_period[(g, d, p)].append(var)
            fac_day_hours[(f_id, d)].append((dur, var))

    for b, sids in basket_sessions.items():
        sample_groups = sessions[sids[0]]["groups"]
        unique_times = [(d, st) for (b0, d, st) in basket_time if b0 == b]
        for d, st in unique_times:
            bv = basket_time[(b, d, st)]
            dur = sessions[sids[0]]["duration"]
            for p in range(st, st + dur):
                for g in sample_groups:
                    grp_period[(g, d, p)].append(bv)

    for k, v in room_period.items():
        if len(v) > 1:
            model.Add(sum(v) <= 1)

    for k, v in fac_period.items():
        if len(v) > 1:
            model.Add(sum(v) <= 1)

    for k, v in grp_period.items():
        if len(v) > 1:
            model.Add(sum(v) <= 1)

    for (f_id, d), items in fac_day_hours.items():
        mx = faculty[f_id].get("max_hours_per_day", 4)
        model.Add(sum(dur * v for dur, v in items) <= mx)

    # OBJECTIVE: MINIMIZE MOVED SESSIONS FROM BASELINE!
    # For every session present in baseline:
    # If placed in same (d, st, rid) -> 0 cost
    # If placed in same (d, st) but different room -> cost 10
    # If placed in different time -> cost 100
    stability_terms = []
    for sid, cands in candidate_slots.items():
        if sid in base_map:
            base_d, base_st, base_rid = base_map[sid]
            for idx, (d, st, rid) in enumerate(cands):
                if d == base_d and st == base_st and rid == base_rid:
                    continue # 0 penalty for keeping exact baseline slot!
                elif d == base_d and st == base_st:
                    stability_terms.append(10 * x[(sid, idx)]) # Room only change
                else:
                    stability_terms.append(100 * x[(sid, idx)]) # Time changed

    model.Minimize(sum(stability_terms))

    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = 30
    solver.parameters.symmetry_level = 0
    solver.parameters.num_workers = 8

    print("Solving minimal-disruption timetable repair...")
    t0 = time.time()
    res = solver.Solve(model)
    print(f"Rescheduler status: {solver.StatusName(res)} in {time.time() - t0:.2f}s")

    if res not in (cp_model.OPTIMAL, cp_model.FEASIBLE):
        raise RuntimeError("Could not find disruption repair schedule!")

    new_sessions = []
    moved_count = 0
    time_changed = 0
    room_only_changed = 0
    moved_details = []

    for sid, cands in candidate_slots.items():
        for idx, (d, st, rid) in enumerate(cands):
            if solver.Value(x[(sid, idx)]) == 1:
                new_sessions.append({
                    "session_id": sid,
                    "day": d,
                    "start_period": st,
                    "room_id": rid
                })
                if sid in base_map:
                    base_d, base_st, base_rid = base_map[sid]
                    if (d, st, rid) != (base_d, base_st, base_rid):
                        moved_count += 1
                        if (d, st) != (base_d, base_st):
                            time_changed += 1
                            change_type = "Time & Room"
                        else:
                            room_only_changed += 1
                            change_type = "Room Only"
                        moved_details.append({
                            "session_id": sid,
                            "before": {"day": base_d, "start_period": base_st, "room_id": base_rid},
                            "after": {"day": d, "start_period": st, "room_id": rid},
                            "change_type": change_type
                        })
                else:
                    moved_details.append({
                        "session_id": sid,
                        "before": None,
                        "after": {"day": d, "start_period": st, "room_id": rid},
                        "change_type": "New Added Session"
                    })
                break

    print(f"Disruption Repair Summary:")
    print(f"- Total sessions in repaired schedule: {len(new_sessions)}")
    print(f"- Sessions moved: {moved_count} (Time changed: {time_changed}, Room only changed: {room_only_changed})")

    schedule_after = {
        "team": baseline.get("team", "CAMPUSX Dev Team"),
        "dataset_id": baseline.get("dataset_id", "cit-public-v1"),
        "sessions": new_sessions
    }

    # Solve fest_week bookings on the repaired timetable
    from bookings import solve_bookings
    fest_week_repaired = solve_bookings(data_path=data_path, baseline_sessions=new_sessions)

    schedule_after = {
        "team": baseline.get("team", "CAMPUSX Dev Team"),
        "dataset_id": baseline.get("dataset_id", "cit-public-v1"),
        "sessions": new_sessions,
        "fest_week": fest_week_repaired,
        "exams": baseline.get("exams", [])
    }

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(schedule_after, f, indent=2)
    print(f"Wrote {output_path} successfully!")

    return {
        "schedule_after": schedule_after,
        "moved_count": moved_count,
        "time_changed": time_changed,
        "room_only_changed": room_only_changed,
        "details": moved_details
    }

if __name__ == "__main__":
    solve_disruption()
