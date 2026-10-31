import json
from collections import defaultdict
from datetime import datetime

CAT_WEIGHT = {"institute_event": 5, "guest_lecture": 4, "department_event": 3, "club_event": 2}
MAX_PERIOD = 13
LAST_TEACHING = 9

def get_effective_category(data, req):
    order = data["priority_order"]
    cap = data["role_category_cap"].get(req["role"], "club_event")
    a = order.index(req["requested_category"]) if req["requested_category"] in order else len(order) - 1
    return order[max(a, order.index(cap))]

def outranks(data, r1, r2):
    order = data["priority_order"]
    c1 = order.index(get_effective_category(data, r1))
    c2 = order.index(get_effective_category(data, r2))
    if c1 != c2:
        return c1 < c2
    return r1["submitted_at"] < r2["submitted_at"]

def solve_bookings(data_path="CrunchWeek_Starter/CrunchWeek_StarterPack/data/cit_public.json", baseline_sessions=None):
    with open(data_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    rooms = {r["id"]: r for r in data["rooms"]}
    days = data["calendar"]["days"]
    cancelled = {c["request_id"] for c in data.get("cancellations", [])}
    room_un = defaultdict(set)
    for u in data.get("room_unavailability", []):
        for p in u["periods"]:
            room_un[u["room_id"]].add((u["day"], p))

    # Base timetable occupancy
    # (room_id, day, p) -> list of session_ids
    room_busy = defaultdict(list)
    # (group_id, day, p) -> bool
    group_busy = defaultdict(bool)

    if baseline_sessions:
        for s in baseline_sessions:
            sid = s["session_id"]
            d = s["day"]
            st = s["start_period"]
            rid = s["room_id"]
            # find session details
            s_detail = next((item for item in data["sessions"] if item["id"] == sid), None)
            dur = s_detail["duration"] if s_detail else 1
            for p in range(st, st + dur):
                room_busy[(rid, d, p)].append(sid)
                if s_detail:
                    for g in s_detail["groups"]:
                        group_busy[(g, d, p)] = True

    # Sort booking requests strictly by priority outranking
    all_reqs = list(data["booking_requests"])
    from functools import cmp_to_key
    def cmp_reqs(a, b):
        if outranks(data, a, b):
            return -1
        elif outranks(data, b, a):
            return 1
        return 0

    sorted_reqs = sorted(all_reqs, key=cmp_to_key(cmp_reqs))

    decisions = []
    overrides = []
    placed_bookings = {}

    for req in sorted_reqs:
        req_id = req["id"]
        # If cancelled, reject immediately
        if req_id in cancelled:
            decisions.append({
                "request_id": req_id,
                "status": "rejected",
                "reason": "Request was cancelled/withdrawn by submitter"
            })
            continue

        eff_cat = get_effective_category(data, req)
        att = req["attendance"]
        dur = req["duration_periods"]
        req_types = req["room_types"]
        needs = set(req.get("needs", []))
        pref_room = req.get("requested_room")

        # Candidate rooms
        eligible_rooms = []
        for rid, r in rooms.items():
            if "event" not in r.get("allowed_uses", []):
                continue
            if r["type"] not in req_types:
                continue
            if r["capacity"] < att:
                continue
            r_feats = set(r.get("features", [])) | ({"accessible"} if r.get("accessible") else set())
            if needs - r_feats:
                continue
            eligible_rooms.append(rid)

        if not eligible_rooms:
            # Check why
            max_cap = max((r["capacity"] for r in rooms.values()), default=0)
            if att > max_cap:
                decisions.append({
                    "request_id": req_id,
                    "status": "rejected",
                    "reason": f"No venue on campus seats {att} (largest is OAT at {max_cap})"
                })
            else:
                decisions.append({
                    "request_id": req_id,
                    "status": "rejected",
                    "reason": f"No available room matches required types {req_types} and features {sorted(needs)}"
                })
            continue

        # Sort eligible rooms: put requested_room first if available
        if pref_room in eligible_rooms:
            eligible_rooms.remove(pref_room)
            eligible_rooms.insert(0, pref_room)

        # 1. First attempt: place inside requested windows (status = "approved")
        found_slot = None
        for w in req.get("windows", []):
            w_day = w["day"]
            w_from = w["from_period"]
            w_to = w["to_period"]
            for s0 in range(w_from, w_to - dur + 2):
                per = list(range(s0, s0 + dur))
                if per[-1] > MAX_PERIOD:
                    continue
                # check group availability for mandatory_for_groups
                if any(group_busy[(g, w_day, p)] for g in req.get("mandatory_for_groups", []) for p in per):
                    continue
                for rid in eligible_rooms:
                    # check room availability
                    if any((w_day, p) in room_un[rid] for p in per):
                        continue
                    if any(room_busy[(rid, w_day, p)] for p in per):
                        continue
                    # Found!
                    found_slot = (w_day, s0, s0 + dur - 1, rid)
                    break
                if found_slot:
                    break
            if found_slot:
                break

        if found_slot:
            d_day, a, b, rid = found_slot
            for p in range(a, b + 1):
                room_busy[(rid, d_day, p)].append(req_id)
            placed_bookings[req_id] = (d_day, a, b, rid)
            decisions.append({
                "request_id": req_id,
                "status": "approved",
                "day": d_day,
                "start_period": a,
                "end_period": b,
                "room_id": rid,
                "reason": f"{eff_cat.replace('_', ' ').capitalize()} approved in {rid}"
            })
            continue

        # 2. Second attempt: Offer alternative slot (status = "alternative_offered")
        # Try outside requested windows (e.g. evening periods 10-13 or other days)
        alt_slot = None
        # Try all days, starting with evenings (P10..P13) then afternoon
        for d_day in days:
            for s0 in [10, 11, 7, 8, 6, 1, 2, 3, 4]:
                if s0 + dur - 1 > MAX_PERIOD:
                    continue
                per = list(range(s0, s0 + dur))
                if any(group_busy[(g, d_day, p)] for g in req.get("mandatory_for_groups", []) for p in per):
                    continue
                for rid in eligible_rooms:
                    if any((d_day, p) in room_un[rid] for p in per):
                        continue
                    if any(room_busy[(rid, d_day, p)] for p in per):
                        continue
                    alt_slot = (d_day, s0, s0 + dur - 1, rid)
                    break
                if alt_slot:
                    break
            if alt_slot:
                break

        if alt_slot:
            d_day, a, b, rid = alt_slot
            for p in range(a, b + 1):
                room_busy[(rid, d_day, p)].append(req_id)
            placed_bookings[req_id] = (d_day, a, b, rid)
            decisions.append({
                "request_id": req_id,
                "status": "alternative_offered",
                "day": d_day,
                "start_period": a,
                "end_period": b,
                "room_id": rid,
                "reason": f"Requested window occupied; alternative slot offered in {rid}"
            })
            continue

        # 3. Reject if no slot available
        decisions.append({
            "request_id": req_id,
            "status": "rejected",
            "reason": "All matching venues occupied during requested and alternative time windows"
        })

    # Sort decisions back to original request ID order for clean output
    req_index_map = {req["id"]: i for i, req in enumerate(all_reqs)}
    decisions.sort(key=lambda d: req_index_map[d["request_id"]])

    return {
        "bookings": decisions,
        "session_overrides": overrides
    }

if __name__ == "__main__":
    with open("test_schedule.json", "r") as f:
        base = json.load(f)["sessions"]
    fest = solve_bookings(baseline_sessions=base)
    print("Total booking decisions:", len(fest["bookings"]))
    print("Approved:", sum(1 for b in fest["bookings"] if b["status"] == "approved"))
    print("Alternatives:", sum(1 for b in fest["bookings"] if b["status"] == "alternative_offered"))
    print("Rejected:", sum(1 for b in fest["bookings"] if b["status"] == "rejected"))
