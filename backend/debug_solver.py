import json
import time
from collections import defaultdict
from ortools.sat.python import cp_model

def debug_solver():
    with open("CrunchWeek_Starter/CrunchWeek_StarterPack/data/cit_public.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    days = data["calendar"]["days"]
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
    x = {}
    for sid, cands in candidate_slots.items():
        for idx in range(len(cands)):
            x[(sid, idx)] = model.NewBoolVar(f"x_{sid}_{idx}")
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

    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = 60
    solver.parameters.log_search_progress = True
    solver.parameters.num_workers = 8
    res = solver.Solve(model)
    print(f"Result: {solver.StatusName(res)}")

if __name__ == "__main__":
    debug_solver()
