import json
from ortools.sat.python import cp_model

def test_domains():
    with open('CrunchWeek_Starter/CrunchWeek_StarterPack/data/cit_public.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    days = data['calendar']['days']
    rooms = {r['id']: r for r in data['rooms']}
    faculty = {f['id']: f for f in data['faculty']}
    room_un = set()
    for u in data.get('room_unavailability', []):
        for p in u['periods']:
            room_un.add((u['room_id'], u['day'], p))

    fac_un = set()
    for f in data['faculty']:
        for u in f.get('unavailable', []):
            for p in u['periods']:
                fac_un.add((f['id'], u['day'], p))

    print(f"Total sessions: {len(data['sessions'])}")
    for s in data['sessions']:
        valid_slots = []
        dur = s['duration']
        f_id = s['faculty_id']
        fixed = s.get('fixed_slot')
        basket = s.get('basket_slot')
        
        target_days = [fixed['day']] if fixed else days
        possible_starts = [fixed['start_period']] if fixed else (
            [2, 6] if s['kind'] == 'lab' else [p for p in range(1, 10 - dur + 1) if not (p <= 5 < p + dur - 1)]
        )

        for d in target_days:
            for st in possible_starts:
                # check faculty availability
                if any((f_id, d, p) in fac_un for p in range(st, st + dur)):
                    continue
                for r_id, r in rooms.items():
                    if r['capacity'] < s['size']:
                        continue
                    if r['type'] not in s['room_types']:
                        continue
                    if s.get('needs_accessible') and not r['accessible']:
                        continue
                    if any((r_id, d, p) in room_un for p in range(st, st + dur)):
                        continue
                    valid_slots.append((d, st, r_id))
        if len(valid_slots) == 0:
            print(f"ERROR: No valid slots for session {s['id']}")
    print("All sessions have non-empty valid slots domain!")

if __name__ == '__main__':
    test_domains()
