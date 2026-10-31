import json
from collections import defaultdict
from ortools.sat.python import cp_model

def solve_exams(data_path="CrunchWeek_Starter/CrunchWeek_StarterPack/data/cit_public.json"):
    with open(data_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    exams = data.get("exams", [])
    cal = data["calendar"]["exam_week"]
    days = cal["days"]  # MON..SAT
    sess_ids = [s["id"] for s in cal["sessions"]]  # AM, PM
    slots = [(d, s) for d in days for s in sess_ids]  # 12 slots

    # Exam-eligible rooms: allowed_uses contains "exam"
    exam_rooms = {
        r["id"]: r["capacity"] // 2
        for r in data["rooms"]
        if "exam" in r.get("allowed_uses", [])
    }
    room_ids = sorted(list(exam_rooms.keys()))

    print(f"Total exams: {len(exams)}")
    print(f"Total exam slots: {len(slots)}")
    print(f"Total exam rooms: {len(exam_rooms)} ({room_ids})")

    model = cp_model.CpModel()

    # Variables:
    # slot_var[e, (d, s)] = 1 if exam e is at slot (d, s)
    slot_var = {}
    for e in exams:
        eid = e["id"]
        for sl in slots:
            slot_var[(eid, sl)] = model.NewBoolVar(f"eslot_{eid}_{sl[0]}_{sl[1]}")
        # Exactly one slot per exam (E1)
        model.Add(sum(slot_var[(eid, sl)] for sl in slots) == 1)

    # room_use[e, r] = 1 if exam e uses room r
    room_use = {}
    for e in exams:
        eid = e["id"]
        for rid in room_ids:
            room_use[(eid, rid)] = model.NewBoolVar(f"eroom_{eid}_{rid}")

    # Capacity constraint (H5): sum(half_cap * room_use) >= exam size
    for e in exams:
        eid = e["id"]
        size = e["size"]
        model.Add(sum(exam_rooms[rid] * room_use[(eid, rid)] for rid in room_ids) >= size)

    # Room clash constraint (H4):
    # A room cannot be used by two exams in the same slot.
    # If exam e is in slot sl and uses room rid, active_er[e, sl, rid] = 1.
    # sum_{e} active_er[e, sl, rid] <= 1.
    for sl in slots:
        for rid in room_ids:
            active_vars = []
            for e in exams:
                eid = e["id"]
                # active_er = slot_var[(eid, sl)] AND room_use[(eid, rid)]
                act = model.NewBoolVar(f"act_{eid}_{sl[0]}_{sl[1]}_{rid}")
                model.AddBoolAnd([slot_var[(eid, sl)], room_use[(eid, rid)]]).OnlyEnforceIf(act)
                model.AddBoolOr([slot_var[(eid, sl)].Not(), room_use[(eid, rid)].Not()]).OnlyEnforceIf(act.Not())
                active_vars.append(act)
            model.Add(sum(active_vars) <= 1)

    # Student group clash constraint (H3):
    # No student group can have more than one exam in the same slot
    for sl in slots:
        for g in data["student_groups"]:
            gid = g["id"]
            competing = [slot_var[(e["id"], sl)] for e in exams if gid in e["groups"]]
            if len(competing) > 1:
                model.Add(sum(competing) <= 1)

    # Soft objective: Minimize exams on same day for any group (5 pts each)
    penalties = []
    for d in days:
        for g in data["student_groups"]:
            gid = g["id"]
            # exams for group g on day d
            group_day_exams = [slot_var[(e["id"], (d, s))] for e in exams if gid in e["groups"] for s in sess_ids]
            if len(group_day_exams) > 1:
                same_day_dup = model.NewIntVar(0, len(group_day_exams), f"dup_{gid}_{d}")
                model.Add(same_day_dup >= sum(group_day_exams) - 1)
                penalties.append(5 * same_day_dup)

    # Secondary objective: Minimize total excess rooms used
    for e in exams:
        eid = e["id"]
        for rid in room_ids:
            penalties.append(1 * room_use[(eid, rid)])

    model.Minimize(sum(penalties))

    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = 20
    solver.parameters.num_workers = 8
    res = solver.Solve(model)
    print(f"Exam solver status: {solver.StatusName(res)}")

    if res not in (cp_model.OPTIMAL, cp_model.FEASIBLE):
        raise RuntimeError("No valid exam schedule found!")

    scheduled_exams = []
    for e in exams:
        eid = e["id"]
        assigned_slot = None
        for sl in slots:
            if solver.Value(slot_var[(eid, sl)]) == 1:
                assigned_slot = sl
                break
        assigned_rooms = [rid for rid in room_ids if solver.Value(room_use[(eid, rid)]) == 1]
        scheduled_exams.append({
            "exam_id": eid,
            "day": assigned_slot[0],
            "session": assigned_slot[1],
            "rooms": assigned_rooms
        })

    print(f"Scheduled {len(scheduled_exams)} exams successfully!")
    return scheduled_exams

if __name__ == "__main__":
    exs = solve_exams()
    print("Sample scheduled exams:", exs[:3])
