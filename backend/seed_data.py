import json
import httpx
import os
import uuid

SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://rqdcgewbgwswlwnmfkgg.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZGNnZXdiZ3dzd2x3bm1ma2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0MzM1MDcsImV4cCI6MjEwOTAwOTUwN30.hs-UvOZneckw9KGaGxKKabOYu9H62kbwxVWUM0sAl3k")

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "resolution=merge-duplicates"
}

CLIENT = httpx.Client(timeout=30.0)

def post_records(table: str, records: list):
    if not records:
        return
    url = f"{SUPABASE_URL}/rest/v1/{table}"
    # batch in chunks of 50
    for i in range(0, len(records), 50):
        chunk = records[i:i+50]
        resp = CLIENT.post(url, headers=HEADERS, json=chunk)
        if resp.status_code not in (200, 201):
            print(f"Error seeding {table} ({i} to {i+len(chunk)}): {resp.status_code} {resp.text}")
        else:
            print(f"Seeded {table}: {len(chunk)} records (chunk {i//50 + 1})")

def seed():
    print("Loading cit_public.json...")
    with open("CrunchWeek_Starter/CrunchWeek_StarterPack/data/cit_public.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    # 1. System Settings
    print("Seeding System Settings...")
    settings = [
        {
            "key": "launch_intro",
            "value": {
                "enabled": True,
                "duration_seconds": 5,
                "allow_skip": True,
                "brand_tagline": "ONE CAMPUS. ONE CONNECTED EXPERIENCE.",
                "theme": "nexus_orbit",
                "special_event_active": True,
                "special_event_title": "IIT Bhubaneswar Spectra Week 2026"
            }
        },
        {
            "key": "campus_info",
            "value": {
                "institute_name": "Indian Institute of Technology Bhubaneswar",
                "short_name": "IIT Bhubaneswar",
                "tagline": "ONE CAMPUS. ONE CONNECTED EXPERIENCE.",
                "location": "Argul, Jatni, Khordha, Odisha - 752050",
                "established": 2008,
                "area_acres": 936,
                "director": "Prof. Shreepad Karmalkar",
                "emergency_helpline": "+91 674 713 5000",
                "health_center": "+91 674 713 5114"
            }
        },
        {
            "key": "dataset_meta",
            "value": {
                "dataset_id": data["dataset_id"],
                "institute": data["institute"],
                "calendar": data["calendar"],
                "priority_order": data["priority_order"],
                "role_category_cap": data["role_category_cap"]
            }
        }
    ]
    post_records("system_settings", settings)

    # 2. Buildings (Dataset buildings + IIT Bhubaneswar verified master layout)
    print("Seeding Buildings...")
    buildings = [
        {
            "id": "Admin Block",
            "name": "Administrative Building & Director Secretariat",
            "code": "ADMIN",
            "category": "administrative",
            "latitude": 20.1492,
            "longitude": 85.6772,
            "floors": 4,
            "image_url": "/main-building IIT.jpg",
            "description": "Central Administrative headquarters, Registrar, Deans, Director's Secretariat and Main Auditorium (AUD)."
        },
        {
            "id": "Lecture Hall Complex",
            "name": "Lalitgiri & Ratnagiri Lecture Hall Complex",
            "code": "LHC",
            "category": "academic",
            "latitude": 20.1505,
            "longitude": 85.6780,
            "floors": 3,
            "image_url": "/Lalitgiri-Hall-of-Learning-scaled.jpg",
            "description": "Primary academic lecture hall complex housing LH-1 through LH-6 with acoustic treatment and high-capacity amphitheaters."
        },
        {
            "id": "Academic Block A (ground floor)",
            "name": "Lalitgiri Hall of Learning (Wing A - Ground Floor)",
            "code": "LHL-A",
            "category": "academic",
            "latitude": 20.1505,
            "longitude": 85.6780,
            "floors": 1,
            "image_url": "/Lalitgiri-Hall-of-Learning-scaled.jpg",
            "description": "Ground floor smart classrooms CR-101 to CR-105 with zero-barrier accessibility ramps and elevators."
        },
        {
            "id": "Academic Block B (2nd floor, no lift)",
            "name": "Udaygiri Hall of Learning (Wing B - Floor 2)",
            "code": "UHL-B",
            "category": "academic",
            "latitude": 20.1518,
            "longitude": 85.6778,
            "floors": 3,
            "image_url": "/Udaygiri-hall-of-Learning-scaled.jpg",
            "description": "Upper floor tutorial and seminar rooms CR-201 to CR-205."
        },
        {
            "id": "Library Building",
            "name": "Central Library & Information Centre (Ground Floor)",
            "code": "LIB",
            "category": "facility",
            "latitude": 20.1500,
            "longitude": 85.6770,
            "floors": 2,
            "image_url": "/Udaygiri-hall-of-Learning-scaled.jpg",
            "description": "State-of-the-art campus library and Seminar Hall 1 (SH-1) with full wheelchair accessibility."
        },
        {
            "id": "Library Building (1st floor, no lift)",
            "name": "Central Library (First Floor Gallery & Seminar Hall 2)",
            "code": "LIB-1F",
            "category": "facility",
            "latitude": 20.1500,
            "longitude": 85.6770,
            "floors": 2,
            "image_url": "/Udaygiri-hall-of-Learning-scaled.jpg",
            "description": "Upper stack room and Seminar Hall 2 (SH-2)."
        },
        {
            "id": "Campus Green",
            "name": "Campus Green & Open Air Amphitheatre",
            "code": "OAT-ZONE",
            "category": "cultural",
            "latitude": 20.1470,
            "longitude": 85.6760,
            "floors": 1,
            "image_url": "/Campus-Gallery-12 IIT.png",
            "description": "Open Air Theatre (OAT) seating 800 people for cultural festivals, concerts, and major gatherings."
        },
        {
            "id": "CSE Building",
            "name": "School of Electrical & Computer Sciences / Lab Complex",
            "code": "SECS-LAB",
            "category": "academic",
            "latitude": 20.1510,
            "longitude": 85.6795,
            "floors": 3,
            "image_url": "/Lab-Complex-scaled IIT.jpg",
            "description": "Advanced computing clusters, CS-LAB-1, and CS-LAB-2."
        },
        {
            "id": "EE-ECE Building",
            "name": "School of Electrical Sciences (EE & ECE Labs)",
            "code": "SES-ELEC",
            "category": "academic",
            "latitude": 20.1520,
            "longitude": 85.6790,
            "floors": 3,
            "image_url": "/CRIF-Building-scaled.jpg",
            "description": "Electronics Laboratories ELEC-LAB-1 & ELEC-LAB-2 and signal processing centers."
        },
        {
            "id": "Science Block",
            "name": "School of Basic Sciences (SBS)",
            "code": "SBS",
            "category": "academic",
            "latitude": 20.1525,
            "longitude": 85.6760,
            "floors": 3,
            "image_url": "/School-of-Basic-Science-scaled.jpg",
            "description": "Physics Lab (PHY-LAB), Chemistry Lab, and Mathematics research units."
        },
        {
            "id": "Workshop Shed",
            "name": "Central Engineering Workshop & Innovation Centre",
            "code": "WS-SHED",
            "category": "academic",
            "latitude": 20.1535,
            "longitude": 85.6785,
            "floors": 1,
            "image_url": "/Lab-Complex-scaled IIT.jpg",
            "description": "Machining, foundry, welding, and carpentry workshop (MECH-WS)."
        },
        {
            "id": "Civil Building",
            "name": "School of Infrastructure (Civil Engineering)",
            "code": "SIF",
            "category": "academic",
            "latitude": 20.1530,
            "longitude": 85.6770,
            "floors": 3,
            "image_url": "/School-of-Infrastructure-scaled.jpg",
            "description": "Civil Engineering Laboratories (CIVIL-LAB), concrete structures, and GIS studios."
        },
        {
            "id": "SAC-Building",
            "name": "Student Activity Centre (SAC)",
            "code": "SAC",
            "category": "sports",
            "latitude": 20.1465,
            "longitude": 85.6750,
            "floors": 2,
            "image_url": "/SAC-Building-1-scaled.jpg",
            "description": "Hub of student life, clubs, indoor gymnasium, music room, and society offices."
        },
        {
            "id": "Health-Center",
            "name": "Sanjeevan Health Centre",
            "code": "SHC",
            "category": "medical",
            "latitude": 20.1472,
            "longitude": 85.6740,
            "floors": 2,
            "image_url": "/Sanjeevan-Health-Center-scaled.jpg",
            "description": "24/7 Campus Hospital, round-the-clock doctors, pharmacy, emergency trauma care, and ambulances."
        },
        {
            "id": "BHR-Hostel",
            "name": "Brahmaputra Hall of Residence (BHR)",
            "code": "BHR",
            "category": "hostel",
            "latitude": 20.1440,
            "longitude": 85.6710,
            "floors": 5,
            "image_url": "/BHR-Boys-Hostel-scaled.jpg",
            "description": "Undergraduate boys residence with dining hall and recreation common room."
        },
        {
            "id": "GHR-Hostel",
            "name": "Ganga Hall of Residence (GHR)",
            "code": "GHR",
            "category": "hostel",
            "latitude": 20.1435,
            "longitude": 85.6730,
            "floors": 5,
            "image_url": "/GHR-Girls-Hostel-scaled.jpg",
            "description": "Girls residence hall with courtyard, sports amenities, and high security."
        },
        {
            "id": "RHR-Hostel",
            "name": "Rushikulya Hall of Residence (RHR)",
            "code": "RHR",
            "category": "hostel",
            "latitude": 20.1445,
            "longitude": 85.6720,
            "floors": 5,
            "image_url": "/RHR-Boys-Hostel-scaled.jpg",
            "description": "Senior undergraduate & postgraduate student residence."
        },
        {
            "id": "Sports-Ground",
            "name": "Main Athletics Stadium & Play Courts",
            "code": "SPORTS",
            "category": "sports",
            "latitude": 20.1455,
            "longitude": 85.6760,
            "floors": 1,
            "image_url": "/Football-Ground-scaled.jpg",
            "description": "FIFA-standard football pitch, 400m running track, basketball and tennis courts."
        },
        {
            "id": "Aquatic-Center",
            "name": "Olympic Aquatic Complex",
            "code": "POOL",
            "category": "sports",
            "latitude": 20.1460,
            "longitude": 85.6765,
            "floors": 1,
            "image_url": "/swimming-pool-scaled.jpg",
            "description": "50-meter Olympic regulation swimming pool with diving boards."
        },
        {
            "id": "Commercial-Complex",
            "name": "Campus Commercial Complex & Radhika Supermarket",
            "code": "RADHIKA",
            "category": "facility",
            "latitude": 20.1460,
            "longitude": 85.6725,
            "floors": 2,
            "image_url": "/Radika-Supermarket-scaled.jpg",
            "description": "Daily essentials supermarket, student food court, bank branch, ATM, and courier hub."
        }
    ]
    post_records("buildings", buildings)

    # 3. Rooms
    print("Seeding Rooms...")
    rooms = []
    for r in data["rooms"]:
        rooms.append({
            "id": r["id"],
            "name": r["name"],
            "building_id": r["building"],
            "type": r["type"],
            "capacity": r["capacity"],
            "features": r.get("features", []),
            "accessible": r.get("accessible", True),
            "allowed_uses": r.get("allowed_uses", ["lecture", "tutorial", "lab", "exam", "event"]),
            "floor_level": 1 if "ground" in r["building"].lower() else (2 if "2nd" in r["building"].lower() else (1 if "1st" in r["building"].lower() else 1))
        })
    post_records("rooms", rooms)

    # 4. Room Unavailability
    print("Seeding Room Unavailability...")
    unav = []
    for u in data.get("room_unavailability", []):
        unav.append({
            "room_id": u["room_id"],
            "day": u["day"],
            "periods": u["periods"],
            "reason": u.get("reason", "Maintenance")
        })
    post_records("room_unavailability", unav)

    # 5. Faculty
    print("Seeding Faculty...")
    faculty = []
    for f in data["faculty"]:
        faculty.append({
            "id": f["id"],
            "name": f["name"],
            "email": f"{f['id'].lower()}@campusx.edu",
            "department_id": f.get("department", "CSE"),
            "max_hours_per_day": f.get("max_hours_per_day", 4),
            "needs_accessible": f.get("needs_accessible", False),
            "unavailable": f.get("unavailable", []),
            "preferences": f.get("preferences", [])
        })
    post_records("faculty", faculty)

    # 6. Student Groups
    print("Seeding Student Groups...")
    groups = []
    for g in data["student_groups"]:
        groups.append({
            "id": g["id"],
            "name": g["name"],
            "year": g["year"],
            "department_id": g.get("department", "General"),
            "size": g["size"],
            "needs_accessible": g.get("needs_accessible", False)
        })
    post_records("student_groups", groups)

    # 7. Courses
    print("Seeding Courses...")
    courses = []
    for c in data["courses"]:
        courses.append({
            "id": c["id"],
            "name": c.get("title", c.get("name", c["id"])),
            "department_id": c.get("department", "CSE"),
            "lecture_hours": c.get("lecture_hours", 3),
            "tutorial_hours": c.get("tutorial_hours", 0),
            "lab_blocks": c.get("lab_blocks", 0)
        })
    post_records("courses", courses)

    # 8. Sessions
    print("Seeding Sessions...")
    sessions = []
    for s in data["sessions"]:
        sessions.append({
            "id": s["id"],
            "course_id": s["course_id"],
            "kind": s["kind"],
            "groups": s["groups"],
            "faculty_id": s["faculty_id"],
            "size": s["size"],
            "duration": s["duration"],
            "room_types": s["room_types"],
            "needs_accessible": s.get("needs_accessible", False),
            "basket_slot": s.get("basket_slot"),
            "fixed_slot": s.get("fixed_slot")
        })
    post_records("sessions", sessions)

    # 9. Booking Requests
    print("Seeding Booking Requests...")
    cancels = {c["request_id"] for c in data.get("cancellations", [])}
    order = data["priority_order"]
    cap_map = data["role_category_cap"]
    reqs = []
    for b in data["booking_requests"]:
        req_id = b["id"]
        # compute effective category
        req_cat = b["requested_category"]
        cap = cap_map.get(b["role"], "club_event")
        a = order.index(req_cat) if req_cat in order else len(order) - 1
        eff_cat = order[max(a, order.index(cap))]
        status = "cancelled" if req_id in cancels else "pending"
        reqs.append({
            "id": req_id,
            "submitted_at": b["submitted_at"],
            "requester": b["requester"],
            "role": b["role"],
            "requested_category": req_cat,
            "effective_category": eff_cat,
            "title": b["title"],
            "attendance": b["attendance"],
            "duration_periods": b["duration_periods"],
            "windows": b["windows"],
            "room_types": b["room_types"],
            "needs": b.get("needs", []),
            "requested_room": b.get("requested_room"),
            "mandatory_for_groups": b.get("mandatory_for_groups", []),
            "series_id": b.get("series_id"),
            "raw_text": b.get("raw_text"),
            "status": status
        })
    post_records("booking_requests", reqs)

    # 10. Exams
    print("Seeding Exams...")
    exams = []
    for e in data.get("exams", []):
        exams.append({
            "id": e["id"],
            "course_ids": e["course_ids"],
            "groups": e["groups"],
            "size": e["size"],
            "duration_hours": e.get("duration_hours", 2),
            "rooms": []
        })
    post_records("exams", exams)

    # 11. Four Judge Demo Accounts + Student and Participant
    print("Seeding Demo Accounts Profiles...")
    profiles = [
        {
            "id": str(uuid.uuid5(uuid.NAMESPACE_DNS, "admin@campusx.edu")),
            "email": "admin@campusx.edu",
            "full_name": "Chief Campus Administrator",
            "role": "admin",
            "department_id": "ADMIN",
            "designation": "Directorate System Controller",
            "phone": "+91 674 713 5001",
            "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
            "is_demo_account": True
        },
        {
            "id": str(uuid.uuid5(uuid.NAMESPACE_DNS, "coordinator@campusx.edu")),
            "email": "coordinator@campusx.edu",
            "full_name": "Dr. Rajesh Sharma",
            "role": "department_coordinator",
            "department_id": "CSE",
            "designation": "Department Timetable & Lab Coordinator",
            "phone": "+91 674 713 5210",
            "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
            "is_demo_account": True
        },
        {
            "id": str(uuid.uuid5(uuid.NAMESPACE_DNS, "faculty@campusx.edu")),
            "email": "faculty@campusx.edu",
            "full_name": "Prof. Anita Roy (F01)",
            "role": "faculty",
            "department_id": "SES",
            "designation": "Associate Professor, Electrical Sciences",
            "phone": "+91 674 713 5342",
            "avatar_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
            "is_demo_account": True
        },
        {
            "id": str(uuid.uuid5(uuid.NAMESPACE_DNS, "club@campusx.edu")),
            "email": "club@campusx.edu",
            "full_name": "Arjun Verma",
            "role": "club",
            "department_id": "CULTURAL",
            "designation": "Dramatics Society Lead & Spectra Fest Convenor",
            "phone": "+91 98765 43210",
            "avatar_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
            "is_demo_account": True
        },
        {
            "id": str(uuid.uuid5(uuid.NAMESPACE_DNS, "student@campusx.edu")),
            "email": "student@campusx.edu",
            "full_name": "Priya Nayak",
            "role": "student",
            "department_id": "CSE",
            "designation": "B.Tech Computer Science (3rd Year, CSE-3)",
            "phone": "+91 99887 76655",
            "avatar_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
            "is_demo_account": True
        },
        {
            "id": str(uuid.uuid5(uuid.NAMESPACE_DNS, "participant@campusx.edu")),
            "email": "participant@campusx.edu",
            "full_name": "Rohan Sen",
            "role": "participant",
            "department_id": "EXTERNAL",
            "designation": "Spectra 2026 Hackathon Delegate",
            "phone": "+91 91234 56789",
            "avatar_url": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
            "is_demo_account": True
        }
    ]
    post_records("profiles", profiles)

    # 12. Campus Facilities
    print("Seeding Campus Facilities...")
    facilities = [
        {
            "id": "FAC-MED",
            "name": "Sanjeevan Health Centre (24x7 Campus Hospital)",
            "category": "medical",
            "building_id": "Health-Center",
            "location_desc": "Near Main Entrance Gate & Residential Zone",
            "opening_hours": "24 Hours / 7 Days",
            "contact_phone": "+91 674 713 5114",
            "contact_email": "healthcenter@iitbbs.ac.in",
            "image_url": "/Sanjeevan-Health-Center-scaled.jpg",
            "amenities": ["24x7 Emergency", "Ambulance", "Pharmacy", "Minor OT", "ECG", "Pathology"]
        },
        {
            "id": "FAC-LIB",
            "name": "Central Library & Digital Commons",
            "category": "library",
            "building_id": "Library Building",
            "location_desc": "Central Academic Green Spine",
            "opening_hours": "08:00 - 00:00 (Exam times: 24 Hours)",
            "contact_phone": "+91 674 713 5150",
            "contact_email": "library@iitbbs.ac.in",
            "image_url": "/Udaygiri-hall-of-Learning-scaled.jpg",
            "amenities": ["100,000+ Volumes", "IEEE / ACM / Springer Access", "Quiet Study Pods", "RFID Self-Checkout"]
        },
        {
            "id": "FAC-SAC",
            "name": "Student Activity Centre (Gym, Music & Clubs)",
            "category": "sports",
            "building_id": "SAC-Building",
            "location_desc": "Opposite Sports Complex",
            "opening_hours": "06:00 - 22:00",
            "contact_phone": "+91 674 713 5200",
            "contact_email": "sac@iitbbs.ac.in",
            "image_url": "/SAC-Building-1-scaled.jpg",
            "amenities": ["Olympic Weightlifting Gym", "Badminton Courts", "Acoustic Jam Room", "Dance Studio"]
        },
        {
            "id": "FAC-STORE",
            "name": "Radhika Departmental Store & Food Court",
            "category": "shopping",
            "building_id": "Commercial-Complex",
            "location_desc": "Hostel Avenue Roundabout",
            "opening_hours": "08:30 - 23:00",
            "contact_phone": "+91 94370 12345",
            "contact_email": "convenience@iitbbs.ac.in",
            "image_url": "/Radika-Supermarket-scaled.jpg",
            "amenities": ["Groceries & Dairy", "Stationery & Printing", "SBI ATM & Branch", "Juice & Bakery Bar"]
        },
        {
            "id": "FAC-SPORTS",
            "name": "Campus Athletic Stadium & Floodlit Courts",
            "category": "sports",
            "building_id": "Sports-Ground",
            "location_desc": "East Campus Sports Sector",
            "opening_hours": "05:30 - 21:30",
            "contact_phone": "+91 674 713 5250",
            "contact_email": "sports@iitbbs.ac.in",
            "image_url": "/Football-Ground-scaled.jpg",
            "amenities": ["Football Pitch", "400m Track", "4 Tennis Courts", "3 Basketball Courts", "Floodlit Volleyball"]
        },
        {
            "id": "FAC-POOL",
            "name": "Aquatic Stadium & Diving Wells",
            "category": "sports",
            "building_id": "Aquatic-Center",
            "location_desc": "Adjacent to Sports Pavilion",
            "opening_hours": "06:00 - 10:00 & 16:30 - 20:30",
            "contact_phone": "+91 674 713 5255",
            "contact_email": "aquatics@iitbbs.ac.in",
            "image_url": "/swimming-pool-scaled.jpg",
            "amenities": ["50m Olympic Pool", "Certified Lifeguards", "Lockers & Showers", "Heated Competition Lanes"]
        }
    ]
    post_records("campus_facilities", facilities)

    # 13. Indoor Nodes (for Multi-Floor Step-by-Step Wayfinding)
    print("Seeding Indoor Navigation Nodes...")
    indoor_nodes = [
        # Lalitgiri Hall of Learning - Floor 1
        {"id": "LHL-F1-ENT", "building_id": "Lecture Hall Complex", "floor": 1, "node_type": "entrance", "label": "Main Portico & Security Check", "x": 100.0, "y": 200.0, "accessible": True, "connected_nodes": ["LHL-F1-COR1"], "room_id": None},
        {"id": "LHL-F1-COR1", "building_id": "Lecture Hall Complex", "floor": 1, "node_type": "corridor", "label": "Central Foyer & Information Kiosk", "x": 150.0, "y": 200.0, "accessible": True, "connected_nodes": ["LHL-F1-ENT", "LHL-F1-LH1", "LHL-F1-LH2", "LHL-F1-STAIR1", "LHL-F1-ELEV1"], "room_id": None},
        {"id": "LHL-F1-LH1", "building_id": "Lecture Hall Complex", "floor": 1, "node_type": "room", "label": "LH-1: Amphitheater Lecture Hall 1", "x": 150.0, "y": 120.0, "accessible": True, "connected_nodes": ["LHL-F1-COR1"], "room_id": "LH-1"},
        {"id": "LHL-F1-LH2", "building_id": "Lecture Hall Complex", "floor": 1, "node_type": "room", "label": "LH-2: Amphitheater Lecture Hall 2", "x": 150.0, "y": 280.0, "accessible": True, "connected_nodes": ["LHL-F1-COR1"], "room_id": "LH-2"},
        {"id": "LHL-F1-STAIR1", "building_id": "Lecture Hall Complex", "floor": 1, "node_type": "stair", "label": "West Wing Staircase to Floor 2", "x": 220.0, "y": 180.0, "accessible": False, "connected_nodes": ["LHL-F1-COR1", "LHL-F2-STAIR1"], "room_id": None},
        {"id": "LHL-F1-ELEV1", "building_id": "Lecture Hall Complex", "floor": 1, "node_type": "elevator", "label": "Accessible Glass Elevator 1", "x": 220.0, "y": 220.0, "accessible": True, "connected_nodes": ["LHL-F1-COR1", "LHL-F2-ELEV1"], "room_id": None},
        # Lalitgiri Hall of Learning - Floor 2
        {"id": "LHL-F2-COR1", "building_id": "Lecture Hall Complex", "floor": 2, "node_type": "corridor", "label": "Second Floor Upper Concourse", "x": 150.0, "y": 200.0, "accessible": True, "connected_nodes": ["LHL-F2-LH3", "LHL-F2-LH4", "LHL-F2-STAIR1", "LHL-F2-ELEV1"], "room_id": None},
        {"id": "LHL-F2-LH3", "building_id": "Lecture Hall Complex", "floor": 2, "node_type": "room", "label": "LH-3: Lecture Hall 3", "x": 150.0, "y": 120.0, "accessible": True, "connected_nodes": ["LHL-F2-COR1"], "room_id": "LH-3"},
        {"id": "LHL-F2-LH4", "building_id": "Lecture Hall Complex", "floor": 2, "node_type": "room", "label": "LH-4: Lecture Hall 4", "x": 150.0, "y": 280.0, "accessible": True, "connected_nodes": ["LHL-F2-COR1"], "room_id": "LH-4"},
        {"id": "LHL-F2-STAIR1", "building_id": "Lecture Hall Complex", "floor": 2, "node_type": "stair", "label": "West Wing Staircase (Floor 2)", "x": 220.0, "y": 180.0, "accessible": False, "connected_nodes": ["LHL-F1-STAIR1", "LHL-F2-COR1"], "room_id": None},
        {"id": "LHL-F2-ELEV1", "building_id": "Lecture Hall Complex", "floor": 2, "node_type": "elevator", "label": "Accessible Glass Elevator 1 (Floor 2)", "x": 220.0, "y": 220.0, "accessible": True, "connected_nodes": ["LHL-F1-ELEV1", "LHL-F2-COR1"], "room_id": None},
        # Academic Block A - Ground Floor Classrooms
        {"id": "CR-F1-COR", "building_id": "Academic Block A (ground floor)", "floor": 1, "node_type": "corridor", "label": "Academic Corridor A", "x": 100.0, "y": 100.0, "accessible": True, "connected_nodes": ["CR-101-NODE", "CR-102-NODE", "CR-103-NODE"], "room_id": None},
        {"id": "CR-101-NODE", "building_id": "Academic Block A (ground floor)", "floor": 1, "node_type": "room", "label": "CR-101 (Classroom A-101)", "x": 80.0, "y": 100.0, "accessible": True, "connected_nodes": ["CR-F1-COR"], "room_id": "CR-101"},
        {"id": "CR-102-NODE", "building_id": "Academic Block A (ground floor)", "floor": 1, "node_type": "room", "label": "CR-102 (Classroom A-102)", "x": 120.0, "y": 100.0, "accessible": True, "connected_nodes": ["CR-F1-COR"], "room_id": "CR-102"},
        {"id": "CR-103-NODE", "building_id": "Academic Block A (ground floor)", "floor": 1, "node_type": "room", "label": "CR-103 (Classroom A-103)", "x": 160.0, "y": 100.0, "accessible": True, "connected_nodes": ["CR-F1-COR"], "room_id": "CR-103"}
    ]
    post_records("indoor_nodes", indoor_nodes)

    # 14. Events & Announcements
    print("Seeding Events and Announcements...")
    events = [
        {
            "id": "EVT-HACK-01",
            "title": "TechZephyr 2026: 48-Hour Web Hackathon",
            "category": "hackathon",
            "organizer": "Team itayush756 (Team Leader: Ayush Raj)",
            "venue_id": "AUD",
            "building_id": "Admin Block",
            "day": "MON",
            "start_time": "09:00",
            "end_time": "18:00",
            "capacity": 500,
            "registered_count": 340,
            "description": "The flagship hackathon solving next-generation campus coordination, constraint satisfaction and AI navigation.",
            "banner_url": "/Campus-Gallery-12 IIT.png",
            "status": "ongoing"
        },
        {
            "id": "EVT-DRAMA-02",
            "title": "Stage Play: Andha Yug (Dramatics Society)",
            "category": "cultural",
            "organizer": "Dramatics Society",
            "venue_id": "SH-1",
            "building_id": "Library Building",
            "day": "THU",
            "start_time": "18:00",
            "end_time": "21:00",
            "capacity": 150,
            "registered_count": 130,
            "description": "An intense theatrical drama exploring timeless philosophical themes with full acoustic and stage lighting setup.",
            "banner_url": "/Auditorium-1.png",
            "status": "upcoming"
        },
        {
            "id": "EVT-ROBOTICS-03",
            "title": "RoboWars: National Autonomous Robotics League",
            "category": "technical",
            "organizer": "Robotics Club",
            "venue_id": "OAT",
            "building_id": "Campus Green",
            "day": "FRI",
            "start_time": "17:00",
            "end_time": "21:00",
            "capacity": 800,
            "registered_count": 650,
            "description": "High-octane combat robotics and autonomous drone obstacle navigation finals under floodlights.",
            "banner_url": "/Campus-Gallery-12 IIT.png",
            "status": "upcoming"
        }
    ]
    post_records("events", events)

    announcements = [
        {
            "title": "Spectra Week 2026 Academic Overrides & Room Guidelines",
            "content": "All students and faculty are advised that approved Institute Events in Week 7 will take priority in the Auditorium and Lalitgiri Hall. Please check the CAMPUSX app for relocated session classrooms.",
            "category": "academic",
            "priority": "urgent",
            "target_roles": ["all"],
            "author_name": "Dean of Academic Affairs"
        },
        {
            "title": "Midsemester Examination Schedule Released",
            "content": "Midsem examinations will commence in Week 8 from Monday to Saturday. Rooms will operate at 50% spacing capacity. Detailed seat matrices are live on the Exam Dashboard.",
            "category": "academic",
            "priority": "normal",
            "target_roles": ["student", "faculty"],
            "author_name": "Controller of Examinations"
        },
        {
            "title": "Zero-Emission Electric Shuttle Bus Routes Updated",
            "content": "Campus EV shuttle frequency has been increased during Spectra Week. Track live shuttle locations and ETAs via the Campus Navigation map.",
            "category": "general",
            "priority": "normal",
            "target_roles": ["all"],
            "author_name": "Campus Transport Desk"
        }
    ]
    post_records("announcements", announcements)

    print("ALL SEED DATA SUCCESSFULLY PERSISTED TO SUPABASE!")

if __name__ == "__main__":
    seed()
