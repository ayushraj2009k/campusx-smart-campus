import json

with open('CrunchWeek_Starter/CrunchWeek_StarterPack/data/cit_public.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

buildings = sorted(list({r['building'] for r in d['rooms']}))
print('Dataset buildings:', buildings)
for r in d['rooms']:
    print(f"{r['id']}: {r['name']} ({r['building']}) type={r['type']} cap={r['capacity']} acc={r['accessible']}")
