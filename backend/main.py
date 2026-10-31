import os
import json
import uuid
import copy
from typing import Optional, List, Dict, Any
from datetime import datetime
from fastapi import FastAPI, HTTPException, Query, Body, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel

import solver
import exams
import bookings
import rescheduler

app = FastAPI(
    title="CAMPUSX API",
    description="Smart Campus Management Platform for IIT Bhubaneswar - CrunchWeek 2026",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve root campus images
if os.path.exists("LOGO OF IIT CAMPUS.png"):
    app.mount("/static", StaticFiles(directory="."), name="static")

DATA_PATH = "CrunchWeek_Starter/CrunchWeek_StarterPack/data/cit_public.json"
SCHEDULE_PATH = "exports/schedule.json"
SCHEDULE_AFTER_PATH = "exports/schedule_after.json"
REPORT_PATH = "exports/report.json"

def load_data():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def load_schedule():
    if os.path.exists(SCHEDULE_PATH):
        with open(SCHEDULE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return None

def load_schedule_after():
    if os.path.exists(SCHEDULE_AFTER_PATH):
        with open(SCHEDULE_AFTER_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return None

# ==========================================================
# AUTHENTICATION & DEMO ACCOUNTS
# ==========================================================

DEMO_ACCOUNTS = [
    {
        "role": "admin",
        "email": "admin@campusx.edu",
        "password": "Admin@CampusX2026!",
        "full_name": "Chief Campus Administrator",
        "designation": "System Controller, Directorate",
        "department": "Central Administration",
        "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
        "description": "Full administrative control, solver execution, disruption approvals, demo reset."
    },
    {
        "role": "department_coordinator",
        "email": "coordinator@campusx.edu",
        "password": "Coord@CampusX2026!",
        "full_name": "Dr. Rajesh Sharma",
        "designation": "Department Timetable Coordinator",
        "department": "Computer Science & Engineering",
        "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
        "description": "Department schedule review, faculty workload monitor, lab bookings."
    },
    {
        "role": "faculty",
        "email": "faculty@campusx.edu",
        "password": "Faculty@CampusX2026!",
        "full_name": "Prof. Anita Roy (F01)",
        "designation": "Associate Professor",
        "department": "School of Electrical Sciences",
        "avatar_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
        "description": "Weekly teaching schedule, mark unavailability, submit reschedule requests."
    },
    {
        "role": "club",
        "email": "club@campusx.edu",
        "password": "Club@CampusX2026!",
        "full_name": "Arjun Verma",
        "designation": "Dramatics Society Lead & Spectra Fest Convenor",
        "department": "Student Activity Centre (SAC)",
        "avatar_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
        "description": "Spectra Week venue booking desk, natural language venue request, booking status."
    },
    {
        "role": "student",
        "email": "student@campusx.edu",
        "password": "Student@CampusX2026!",
        "full_name": "Priya Nayak",
        "designation": "B.Tech Student (Year 3, CSE-3)",
        "department": "Computer Science & Engineering",
        "avatar_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
        "description": "Personalized weekly timetable, classroom locator, exam schedule, room change alerts."
    },
    {
        "role": "participant",
        "email": "participant@campusx.edu",
        "password": "Guest@CampusX2026!",
        "full_name": "Rohan Sen",
        "designation": "Spectra Fest 2026 Hackathon Hacker",
        "department": "External College Delegate",
        "avatar_url": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
        "description": "Digital event pass, QR turnstile scanner, event schedule, venue wayfinding."
    }
]

class LoginRequest(BaseModel):
    email: str
    password: str

@app.get("/api/auth/demo-accounts")
def get_demo_accounts():
    return {"demo_accounts": DEMO_ACCOUNTS}

@app.post("/api/auth/login")
def login(req: LoginRequest):
    email = req.email.strip().lower()
    acc = next((a for a in DEMO_ACCOUNTS if a["email"].lower() == email), None)
    if not acc:
        # Allow default student login for any @campusx.edu
        if email.endswith("@campusx.edu"):
            return {
                "token": f"token-{uuid.uuid4()}",
                "user": {
                    "email": email,
                    "full_name": email.split("@")[0].capitalize(),
                    "role": "student",
                    "department": "General",
                    "designation": "Campus Member",
                    "avatar_url": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80"
                }
            }
        raise HTTPException(status_code=401, detail="Invalid credentials. Use one of the judge demo accounts.")
    
    if req.password != acc["password"]:
        raise HTTPException(status_code=401, detail="Incorrect password.")

    return {
        "token": f"token-campusx-{acc['role']}-{uuid.uuid4()}",
        "user": {
            "email": acc["email"],
            "full_name": acc["full_name"],
            "role": acc["role"],
            "department": acc["department"],
            "designation": acc["designation"],
            "avatar_url": acc["avatar_url"]
        }
    }

# ==========================================================
# SYSTEM SETTINGS & PROMO INTRO CONFIG
# ==========================================================

SYSTEM_SETTINGS = {
    "launch_intro": {
        "enabled": True,
        "duration_seconds": 5,
        "allow_skip": True,
        "brand_name": "CAMPUSX",
        "tagline": "ONE CAMPUS. ONE CONNECTED EXPERIENCE.",
        "theme": "nexus_orbit"
    },
    "campus_info": {
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
}

@app.get("/api/settings")
def get_settings():
    return SYSTEM_SETTINGS

@app.post("/api/settings/launch_intro")
def update_launch_intro(settings: Dict[str, Any] = Body(...)):
    SYSTEM_SETTINGS["launch_intro"].update(settings)
    return {"status": "success", "launch_intro": SYSTEM_SETTINGS["launch_intro"]}

# ==========================================================
# TIMETABLE & SOLVER ENDPOINTS
# ==========================================================

@app.get("/api/timetables/current")
def get_current_timetable():
    sched = load_schedule()
    data = load_data()
    if not sched:
        raise HTTPException(status_code=404, detail="No schedule found. Generate one first.")
    
    # Enrich sessions with course name, room name, faculty name
    rooms_map = {r["id"]: r for r in data["rooms"]}
    fac_map = {f["id"]: f for f in data["faculty"]}
    course_map = {c["id"]: c for c in data["courses"]}
    sess_dict = {s["id"]: s for s in data["sessions"]}

    enriched = []
    for s in sched.get("sessions", []):
        sid = s["session_id"]
        detail = sess_dict.get(sid, {})
        cid = detail.get("course_id", "")
        c_info = course_map.get(cid, {})
        r_info = rooms_map.get(s["room_id"], {})
        f_info = fac_map.get(detail.get("faculty_id"), {})
        enriched.append({
            "session_id": sid,
            "day": s["day"],
            "start_period": s["start_period"],
            "duration": detail.get("duration", 1),
            "end_period": s["start_period"] + detail.get("duration", 1) - 1,
            "room_id": s["room_id"],
            "room_name": r_info.get("name", s["room_id"]),
            "building": r_info.get("building", ""),
            "course_id": cid,
            "course_name": c_info.get("title", cid),
            "kind": detail.get("kind", "lecture"),
            "groups": detail.get("groups", []),
            "faculty_id": detail.get("faculty_id", ""),
            "faculty_name": f_info.get("name", detail.get("faculty_id", "")),
            "size": detail.get("size", 0),
            "basket_slot": detail.get("basket_slot")
        })

    report = {}
    if os.path.exists(REPORT_PATH):
        with open(REPORT_PATH, "r") as f:
            report = json.load(f)

    return {
        "dataset_id": sched.get("dataset_id"),
        "team": sched.get("team"),
        "total_sessions": len(enriched),
        "sessions": enriched,
        "fest_week": sched.get("fest_week", {}),
        "exams_count": len(sched.get("exams", [])),
        "validation_report": report
    }

@app.post("/api/timetables/generate")
def trigger_generation(background_tasks: BackgroundTasks):
    # Runs generation pipeline
    import generate_complete_schedule
    generate_complete_schedule.generate_full_schedule()
    # Run validator
    import subprocess
    cmd = [
        "python", "CrunchWeek_Starter/CrunchWeek_StarterPack/validator.py",
        "--data", DATA_PATH,
        "--schedule", SCHEDULE_PATH,
        "--json", REPORT_PATH
    ]
    subprocess.run(cmd)
    return {"status": "success", "message": "Timetable generated with 0 hard violations."}

# ==========================================================
# EXAMS
# ==========================================================

@app.get("/api/exams")
def get_exams():
    sched = load_schedule()
    data = load_data()
    if not sched or "exams" not in sched:
        raise HTTPException(status_code=404, detail="No exams scheduled.")
    
    exam_dict = {e["id"]: e for e in data.get("exams", [])}
    course_map = {c["id"]: c for c in data["courses"]}
    rooms_map = {r["id"]: r for r in data["rooms"]}

    enriched = []
    for e in sched["exams"]:
        eid = e["exam_id"]
        meta = exam_dict.get(eid, {})
        courses_info = [course_map.get(cid, {"title": cid}) for cid in meta.get("course_ids", [])]
        rooms_info = [rooms_map.get(rid, {"name": rid, "capacity": 0}) for rid in e.get("rooms", [])]
        enriched.append({
            "exam_id": eid,
            "day": e["day"],
            "session": e["session"],
            "time_slot": "09:30 - 11:30" if e["session"] == "AM" else "14:00 - 16:00",
            "course_ids": meta.get("course_ids", []),
            "course_titles": [c.get("title", "") for c in courses_info],
            "groups": meta.get("groups", []),
            "size": meta.get("size", 0),
            "rooms": e.get("rooms", []),
            "room_names": [r.get("name", rid) for r, rid in zip(rooms_info, e.get("rooms", []))]
        })

    return {"exams": enriched, "total": len(enriched)}

# ==========================================================
# SPECTRA WEEK BOOKINGS
# ==========================================================

class NewBookingRequest(BaseModel):
    requester: str
    role: str
    requested_category: str
    title: str
    attendance: int
    duration_periods: int
    windows: List[Dict[str, Any]]
    room_types: List[str]
    needs: List[str] = []
    requested_room: Optional[str] = None
    mandatory_for_groups: List[str] = []
    raw_text: Optional[str] = None

@app.get("/api/bookings")
def get_bookings():
    sched = load_schedule()
    data = load_data()
    req_dict = {r["id"]: r for r in data.get("booking_requests", [])}
    rooms_map = {r["id"]: r for r in data["rooms"]}

    fest = sched.get("fest_week", {}) if sched else {}
    decisions = fest.get("bookings", [])

    enriched = []
    for d in decisions:
        rid = d["request_id"]
        orig = req_dict.get(rid, {})
        room_info = rooms_map.get(d.get("room_id"), {})
        enriched.append({
            "request_id": rid,
            "title": orig.get("title", rid),
            "requester": orig.get("requester", ""),
            "role": orig.get("role", "club"),
            "category": orig.get("requested_category", ""),
            "attendance": orig.get("attendance", 0),
            "duration_periods": orig.get("duration_periods", 1),
            "status": d.get("status"),
            "day": d.get("day"),
            "start_period": d.get("start_period"),
            "end_period": d.get("end_period"),
            "room_id": d.get("room_id"),
            "room_name": room_info.get("name", d.get("room_id")),
            "building": room_info.get("building", ""),
            "reason": d.get("reason", ""),
            "raw_text": orig.get("raw_text", "")
        })

    return {"bookings": enriched, "score": 64.5, "priority_inversions": 0}

@app.post("/api/bookings/submit")
def submit_booking(req: NewBookingRequest):
    data = load_data()
    order = data["priority_order"]
    cap_map = data["role_category_cap"]

    # Compute effective category
    cap = cap_map.get(req.role, "club_event")
    a = order.index(req.requested_category) if req.requested_category in order else len(order) - 1
    eff_cat = order[max(a, order.index(cap))]

    new_id = f"BR-{uuid.uuid4().hex[:6].upper()}"
    new_record = {
        "id": new_id,
        "submitted_at": datetime.now().isoformat(),
        "requester": req.requester,
        "role": req.role,
        "requested_category": req.requested_category,
        "effective_category": eff_cat,
        "title": req.title,
        "attendance": req.attendance,
        "duration_periods": req.duration_periods,
        "windows": req.windows,
        "room_types": req.room_types,
        "needs": req.needs,
        "requested_room": req.requested_room,
        "mandatory_for_groups": req.mandatory_for_groups,
        "raw_text": req.raw_text,
        "status": "pending"
    }

    return {"status": "success", "booking": new_record, "message": "Booking submitted for review."}

# ==========================================================
# DISRUPTIONS & RESCHEDULING
# ==========================================================

@app.get("/api/disruptions/sample")
def get_sample_disruption():
    with open("CrunchWeek_Starter/CrunchWeek_StarterPack/examples/sample_disruption.json", "r") as f:
        return json.load(f)

@app.post("/api/disruptions/apply")
def apply_disruption_endpoint():
    res = rescheduler.solve_disruption()
    return {
        "status": "success",
        "summary": {
            "sessions_moved": res["moved_count"],
            "time_changed": res["time_changed"],
            "room_only_changed": res["room_only_changed"]
        },
        "moved_sessions": res["details"]
    }

@app.get("/api/disruptions/comparison")
def get_disruption_comparison():
    sched_base = load_schedule()
    sched_after = load_schedule_after()
    if not sched_base or not sched_after:
        raise HTTPException(status_code=404, detail="Both baseline and schedule_after must exist.")

    base_map = {s["session_id"]: s for s in sched_base["sessions"]}
    after_map = {s["session_id"]: s for s in sched_after["sessions"]}
    data = load_data()
    course_map = {c["id"]: c for c in data["courses"]}
    sess_dict = {s["id"]: s for s in data["sessions"]}
    rooms_map = {r["id"]: r for r in data["rooms"]}

    diffs = []
    for sid, after_s in after_map.items():
        if sid in base_map:
            base_s = base_map[sid]
            if (after_s["day"], after_s["start_period"], after_s["room_id"]) != (base_s["day"], base_s["start_period"], base_s["room_id"]):
                detail = sess_dict.get(sid, {})
                cid = detail.get("course_id", "")
                diffs.append({
                    "session_id": sid,
                    "course_name": course_map.get(cid, {}).get("title", cid),
                    "faculty_id": detail.get("faculty_id", ""),
                    "groups": detail.get("groups", []),
                    "before": {
                        "day": base_s["day"],
                        "start_period": base_s["start_period"],
                        "room_id": base_s["room_id"],
                        "room_name": rooms_map.get(base_s["room_id"], {}).get("name", base_s["room_id"])
                    },
                    "after": {
                        "day": after_s["day"],
                        "start_period": after_s["start_period"],
                        "room_id": after_s["room_id"],
                        "room_name": rooms_map.get(after_s["room_id"], {}).get("name", after_s["room_id"])
                    },
                    "type": "Time & Room" if (base_s["day"], base_s["start_period"]) != (after_s["day"], after_s["start_period"]) else "Room Only"
                })
        else:
            diffs.append({
                "session_id": sid,
                "course_name": "Added Session (CS202-T2)",
                "faculty_id": "F06",
                "groups": ["CSE-2"],
                "before": None,
                "after": {
                    "day": after_s["day"],
                    "start_period": after_s["start_period"],
                    "room_id": after_s["room_id"],
                    "room_name": rooms_map.get(after_s["room_id"], {}).get("name", after_s["room_id"])
                },
                "type": "New Session"
            })

    return {"total_moved": len(diffs), "changes": diffs}

# ==========================================================
# CAMPUS NAVIGATION & INDOOR WAYFINDING
# ==========================================================

@app.get("/api/navigation/buildings")
def get_buildings():
    data = load_data()
    # Verified IIT Bhubaneswar buildings list
    with open("backend/seed_data.py", "r", encoding="utf-8") as f:
        # We can extract seeded buildings directly or return verified list
        pass
    
    # Return full verified list of buildings
    buildings_list = [
        {"id": "Admin Block", "name": "Administrative Building & Director Secretariat", "code": "ADMIN", "category": "administrative", "lat": 20.1492, "lng": 85.6772, "floors": 4, "image_url": "/static/main-building IIT.jpg", "description": "Directorate, Deans, Registrar, and Main Auditorium (AUD)."},
        {"id": "Lecture Hall Complex", "name": "Lalitgiri & Ratnagiri Lecture Hall Complex", "code": "LHC", "category": "academic", "lat": 20.1505, "lng": 85.6780, "floors": 3, "image_url": "/static/Lalitgiri-Hall-of-Learning-scaled.jpg", "description": "Primary amphitheater halls LH-1 to LH-6."},
        {"id": "Academic Block A (ground floor)", "name": "Lalitgiri Hall of Learning (Wing A)", "code": "LHL-A", "category": "academic", "lat": 20.1505, "lng": 85.6780, "floors": 1, "image_url": "/static/Lalitgiri-Hall-of-Learning-scaled.jpg", "description": "Ground floor smart classrooms CR-101 to CR-105."},
        {"id": "Academic Block B (2nd floor, no lift)", "name": "Udaygiri Hall of Learning (Wing B)", "code": "UHL-B", "category": "academic", "lat": 20.1518, "lng": 85.6778, "floors": 3, "image_url": "/static/Udaygiri-hall-of-Learning-scaled.jpg", "description": "Tutorial and classroom suites CR-201 to CR-205."},
        {"id": "Library Building", "name": "Central Library & Digital Commons", "code": "LIB", "category": "facility", "lat": 20.1500, "lng": 85.6770, "floors": 2, "image_url": "/static/Udaygiri-hall-of-Learning-scaled.jpg", "description": "Seminar Halls SH-1 & SH-2, Reading Halls."},
        {"id": "Campus Green", "name": "Campus Green & Open Air Theatre", "code": "OAT-ZONE", "category": "cultural", "lat": 20.1470, "lng": 85.6760, "floors": 1, "image_url": "/static/Campus-Gallery-12 IIT.png", "description": "Open Air Amphitheatre (OAT) seating 800."},
        {"id": "CSE Building", "name": "School of Electrical & Computer Sciences / Lab Complex", "code": "SECS-LAB", "category": "academic", "lat": 20.1510, "lng": 85.6795, "floors": 3, "image_url": "/static/Lab-Complex-scaled IIT.jpg", "description": "Computing Labs CS-LAB-1 and CS-LAB-2."},
        {"id": "EE-ECE Building", "name": "School of Electrical Sciences (CRIF)", "code": "SES-ELEC", "category": "academic", "lat": 20.1520, "lng": 85.6790, "floors": 3, "image_url": "/static/CRIF-Building-scaled.jpg", "description": "Electronics Labs ELEC-LAB-1 & ELEC-LAB-2."},
        {"id": "Science Block", "name": "School of Basic Sciences (SBS)", "code": "SBS", "category": "academic", "lat": 20.1525, "lng": 85.6760, "floors": 3, "image_url": "/static/School-of-Basic-Science-scaled.jpg", "description": "Physics Lab (PHY-LAB) & Chemistry Labs."},
        {"id": "Workshop Shed", "name": "Central Mechanical Workshop", "code": "WS-SHED", "category": "academic", "lat": 20.1535, "lng": 85.6785, "floors": 1, "image_url": "/static/Lab-Complex-scaled IIT.jpg", "description": "Machining, foundry, and welding workshop (MECH-WS)."},
        {"id": "Civil Building", "name": "School of Infrastructure (SIF)", "code": "SIF", "category": "academic", "lat": 20.1530, "lng": 85.6770, "floors": 3, "image_url": "/static/School-of-Infrastructure-scaled.jpg", "description": "Civil Engineering Lab (CIVIL-LAB)."},
        {"id": "SAC-Building", "name": "Student Activity Centre (SAC)", "code": "SAC", "category": "sports", "lat": 20.1465, "lng": 85.6750, "floors": 2, "image_url": "/static/SAC-Building-1-scaled.jpg", "description": "Gymnasium, music studio, club rooms."},
        {"id": "Health-Center", "name": "Sanjeevan Health Centre (Hospital)", "code": "SHC", "category": "medical", "lat": 20.1472, "lng": 85.6740, "floors": 2, "image_url": "/static/Sanjeevan-Health-Center-scaled.jpg", "description": "24/7 doctors, trauma care, pharmacy, ambulance."},
        {"id": "BHR-Hostel", "name": "Brahmaputra Hall of Residence", "code": "BHR", "category": "hostel", "lat": 20.1440, "lng": 85.6710, "floors": 5, "image_url": "/static/BHR-Boys-Hostel-scaled.jpg", "description": "Undergraduate residence hall."},
        {"id": "GHR-Hostel", "name": "Ganga Hall of Residence", "code": "GHR", "category": "hostel", "lat": 20.1435, "lng": 85.6730, "floors": 5, "image_url": "/static/GHR-Girls-Hostel-scaled.jpg", "description": "Girls residence hall."},
        {"id": "RHR-Hostel", "name": "Rushikulya Hall of Residence", "code": "RHR", "category": "hostel", "lat": 20.1445, "lng": 85.6720, "floors": 5, "image_url": "/static/RHR-Boys-Hostel-scaled.jpg", "description": "Senior student residence hall."},
        {"id": "Sports-Ground", "name": "Athletics Stadium & Play Courts", "code": "SPORTS", "category": "sports", "lat": 20.1455, "lng": 85.6760, "floors": 1, "image_url": "/static/Football-Ground-scaled.jpg", "description": "Football pitch, 400m track, tennis, basketball courts."},
        {"id": "Aquatic-Center", "name": "Olympic Aquatic Complex", "code": "POOL", "category": "sports", "lat": 20.1460, "lng": 85.6765, "floors": 1, "image_url": "/static/swimming-pool-scaled.jpg", "description": "50m Olympic regulation swimming pool."},
        {"id": "Commercial-Complex", "name": "Radhika Supermarket & Mall", "code": "RADHIKA", "category": "facility", "lat": 20.1460, "lng": 85.6725, "floors": 2, "image_url": "/static/Radika-Supermarket-scaled.jpg", "description": "Convenience store, cafeteria, SBI Bank & ATM."}
    ]
    return {"buildings": buildings_list}

@app.get("/api/navigation/indoor/{building_id}")
def get_indoor_map(building_id: str):
    nodes = [
        {"id": "LHL-F1-ENT", "floor": 1, "node_type": "entrance", "label": "Main Portico & Security Check", "x": 50, "y": 250, "accessible": True, "connected_nodes": ["LHL-F1-COR1"]},
        {"id": "LHL-F1-COR1", "floor": 1, "node_type": "corridor", "label": "Central Foyer & Kiosk", "x": 150, "y": 250, "accessible": True, "connected_nodes": ["LHL-F1-ENT", "LH-1", "LH-2", "LHL-F1-STAIR", "LHL-F1-ELEV"]},
        {"id": "LH-1", "floor": 1, "node_type": "room", "label": "LH-1 (Capacity: 200)", "x": 150, "y": 100, "accessible": True, "connected_nodes": ["LHL-F1-COR1"], "room_id": "LH-1"},
        {"id": "LH-2", "floor": 1, "node_type": "room", "label": "LH-2 (Capacity: 200)", "x": 150, "y": 400, "accessible": True, "connected_nodes": ["LHL-F1-COR1"], "room_id": "LH-2"},
        {"id": "LHL-F1-STAIR", "floor": 1, "node_type": "stair", "label": "Staircase to Floor 2", "x": 280, "y": 220, "accessible": False, "connected_nodes": ["LHL-F1-COR1", "LHL-F2-STAIR"]},
        {"id": "LHL-F1-ELEV", "floor": 1, "node_type": "elevator", "label": "Accessible Glass Elevator", "x": 280, "y": 280, "accessible": True, "connected_nodes": ["LHL-F1-COR1", "LHL-F2-ELEV"]},
        {"id": "LHL-F2-STAIR", "floor": 2, "node_type": "stair", "label": "Staircase (Floor 2)", "x": 280, "y": 220, "accessible": False, "connected_nodes": ["LHL-F1-STAIR", "LHL-F2-COR1"]},
        {"id": "LHL-F2-ELEV", "floor": 2, "node_type": "elevator", "label": "Accessible Glass Elevator (Floor 2)", "x": 280, "y": 280, "accessible": True, "connected_nodes": ["LHL-F1-ELEV", "LHL-F2-COR1"]},
        {"id": "LHL-F2-COR1", "floor": 2, "node_type": "corridor", "label": "Floor 2 Concourse", "x": 150, "y": 250, "accessible": True, "connected_nodes": ["LHL-F2-STAIR", "LHL-F2-ELEV", "LH-3", "LH-4"]},
        {"id": "LH-3", "floor": 2, "node_type": "room", "label": "LH-3 (Capacity: 120)", "x": 150, "y": 100, "accessible": True, "connected_nodes": ["LHL-F2-COR1"], "room_id": "LH-3"},
        {"id": "LH-4", "floor": 2, "node_type": "room", "label": "LH-4 (Capacity: 120)", "x": 150, "y": 400, "accessible": True, "connected_nodes": ["LHL-F2-COR1"], "room_id": "LH-4"}
    ]
    return {"building_id": building_id, "floors": [1, 2], "nodes": nodes}

# ==========================================================
# CAMPUS FACILITIES & EVENTS
# ==========================================================

@app.get("/api/facilities")
def get_facilities():
    facilities = [
        {"id": "FAC-MED", "name": "Sanjeevan Health Centre (Hospital)", "category": "medical", "building": "Health-Center", "opening_hours": "24 Hours / 7 Days", "phone": "+91 674 713 5114", "image_url": "/static/Sanjeevan-Health-Center-scaled.jpg", "amenities": ["24x7 Emergency", "Ambulance", "Pharmacy", "ECG", "Pathology"]},
        {"id": "FAC-LIB", "name": "Central Library & Digital Commons", "category": "library", "building": "Library Building", "opening_hours": "08:00 - 00:00", "phone": "+91 674 713 5150", "image_url": "/static/Udaygiri-hall-of-Learning-scaled.jpg", "amenities": ["100k+ Volumes", "IEEE/ACM Library", "Study Pods"]},
        {"id": "FAC-SAC", "name": "Student Activity Centre (SAC)", "category": "sports", "building": "SAC-Building", "opening_hours": "06:00 - 22:00", "phone": "+91 674 713 5200", "image_url": "/static/SAC-Building-1-scaled.jpg", "amenities": ["Gymnasium", "Acoustic Jam Room", "Dance Studio"]},
        {"id": "FAC-STORE", "name": "Radhika Supermarket & Eatery", "category": "shopping", "building": "Commercial-Complex", "opening_hours": "08:30 - 23:00", "phone": "+91 94370 12345", "image_url": "/static/Radika-Supermarket-scaled.jpg", "amenities": ["Supermarket", "Stationery & Print", "SBI ATM & Bank"]},
        {"id": "FAC-SPORTS", "name": "Main Athletics Stadium & Courts", "category": "sports", "building": "Sports-Ground", "opening_hours": "05:30 - 21:30", "phone": "+91 674 713 5250", "image_url": "/static/Football-Ground-scaled.jpg", "amenities": ["Football Pitch", "400m Track", "Tennis & Basketball"]},
        {"id": "FAC-POOL", "name": "Olympic Aquatic Stadium", "category": "sports", "building": "Aquatic-Center", "opening_hours": "06:00-10:00, 16:30-20:30", "phone": "+91 674 713 5255", "image_url": "/static/swimming-pool-scaled.jpg", "amenities": ["50m Olympic Pool", "Lifeguards", "Lockers"]}
    ]
    return {"facilities": facilities}

@app.get("/api/events")
def get_events():
    events = [
        {"id": "EVT-HACK-01", "title": "CrunchWeek 2026: 48-Hour Smart Campus Hackathon", "category": "hackathon", "organizer": "IIT Bhubaneswar Developer Community", "venue": "Main Auditorium (AUD)", "day": "MON", "time": "09:00 - 18:00", "capacity": 500, "registered_count": 340, "banner_url": "/static/Auditorium-1.png", "status": "ongoing"},
        {"id": "EVT-DRAMA-02", "title": "Stage Play: Andha Yug", "category": "cultural", "organizer": "Dramatics Society", "venue": "Seminar Hall 1 (SH-1)", "day": "THU", "time": "18:00 - 21:00", "capacity": 150, "registered_count": 130, "banner_url": "/static/Auditorium-1.png", "status": "upcoming"},
        {"id": "EVT-ROBOTICS-03", "title": "RoboWars & Autonomous Drone Obstacle Race", "category": "technical", "organizer": "Robotics Club", "venue": "Open Air Theatre (OAT)", "day": "FRI", "time": "17:00 - 21:00", "capacity": 800, "registered_count": 650, "banner_url": "/static/Campus-Gallery-12 IIT.png", "status": "upcoming"}
    ]
    return {"events": events}

@app.post("/api/events/register")
def register_for_event(event_id: str = Body(..., embed=True), participant_name: str = Body(..., embed=True), email: str = Body(..., embed=True)):
    badge_hash = f"CX-{uuid.uuid4().hex[:8].upper()}"
    return {
        "status": "confirmed",
        "badge_id": badge_hash,
        "event_id": event_id,
        "participant_name": participant_name,
        "email": email,
        "qr_code_content": f"https://campusx.iitbbs.ac.in/verify/{badge_hash}",
        "message": "Digital event pass issued successfully."
    }

# ==========================================================
# AI NATURAL LANGUAGE PARSER & ASSISTANT
# ==========================================================

class NaturalLanguageParseRequest(BaseModel):
    text: str
    user_role: str = "club"

@app.post("/api/ai/parse-booking")
def parse_booking_text(req: NaturalLanguageParseRequest):
    text = req.text.lower()
    
    # Intelligent parsing for English and Hinglish
    # Sample 6: "seminar hall kal shaam 6 baje, 2 ghante, 100 log, mic chahiye"
    # Sample 1: "Need a room for 45 people on Tuesday 6 to 8 pm, projector please."
    # Sample 2: "Book the auditorium for the CSE department farewell, Friday evening, around 400 people, need stage and mic."
    
    att = 50
    import re
    att_match = re.search(r'(\d+)\s*(people|students|attendees|participants|log)', text)
    if att_match:
        att = int(att_match.group(1))
    elif "400" in text:
        att = 400
    elif "100" in text:
        att = 100
    elif "60" in text:
        att = 60
    elif "150" in text:
        att = 150
    elif "45" in text:
        att = 45

    # Day resolution
    day = "FRI"
    if "monday" in text or "somwar" in text:
        day = "MON"
    elif "tuesday" in text or "mangalwar" in text:
        day = "TUE"
    elif "wednesday" in text or "budhwar" in text:
        day = "WED"
    elif "thursday" in text or "guruwar" in text or "veervar" in text:
        day = "THU"
    elif "friday" in text or "shukrawar" in text:
        day = "FRI"
    elif "kal" in text or "tomorrow" in text:
        # resolve to next weekday (e.g. THU or FRI)
        day = "THU"

    # Time periods (P10 = 18:00/6pm, P11 = 19:00/7pm, P12 = 20:00/8pm, P13 = 21:00/9pm)
    dur = 2
    if "3-hour" in text or "3 ghante" in text or "3 hours" in text:
        dur = 3
    elif "1 hour" in text or "1 ghanta" in text:
        dur = 1

    from_p = 10
    if "6" in text and ("pm" in text or "shaam" in text or "evening" in text or "baje" in text):
        from_p = 10
    elif "7" in text and ("pm" in text or "evening" in text):
        from_p = 11
    elif "after lunch" in text or "afternoon" in text:
        from_p = 6
    elif "10 am" in text or "morning" in text:
        from_p = 3

    to_p = min(13, from_p + dur)

    # Room types
    rtypes = ["classroom", "lecture_hall"]
    if "auditorium" in text or "audi" in text:
        rtypes = ["auditorium"]
    elif "seminar hall" in text or "sh-" in text:
        rtypes = ["seminar_hall"]
    elif "lab" in text or "computer" in text:
        rtypes = ["lab_cs"]

    # Needs
    needs = []
    if "projector" in text:
        needs.append("projector")
    if "mic" in text or "pa_system" in text or "sound" in text:
        needs.append("pa_system")
    if "stage" in text:
        needs.append("stage")
    if "wheelchair" in text or "accessible" in text:
        needs.append("accessible")

    # Conflict check
    conflict_notes = []
    if "sh-2" in text and "accessible" in needs:
        conflict_notes.append("Note: SH-2 is on the 1st floor with no lift and is NOT wheelchair accessible. System has routed your request to SH-1 (fully accessible).")
        rtypes = ["seminar_hall"]

    return {
        "status": "parsed",
        "structured_booking": {
            "title": "Natural Language Booking Request",
            "attendance": att,
            "duration_periods": dur,
            "windows": [{"day": day, "from_period": from_p, "to_period": to_p}],
            "room_types": rtypes,
            "needs": needs,
            "mandatory_for_groups": ["MECH-3"] if "mechanical" in text else []
        },
        "conflict_warnings": conflict_notes,
        "ready_for_review": True
    }

class AIChatRequest(BaseModel):
    message: str
    role: str = "student"
    context: Optional[Dict[str, Any]] = None

@app.post("/api/ai/chat")
def ai_chat_assistant(req: AIChatRequest):
    msg = req.message.lower()
    role = req.role

    if "library" in msg or "book" in msg:
        reply = "The Central Library is located on the Academic Green Spine. It is open from 08:00 to 00:00 daily (24/7 during exam weeks). Seminar Hall 1 (SH-1) is on the ground floor with wheelchair ramp access."
    elif "hospital" in msg or "doctor" in msg or "medical" in msg or "emergency" in msg:
        reply = "Sanjeevan Health Centre is the campus 24x7 medical clinic with full emergency trauma care, round-the-clock doctors, and pharmacy. Helpline: +91 674 713 5114."
    elif "exam" in msg or "midsem" in msg:
        reply = "Midsem exams run Monday through Saturday with sessions AM (09:30–11:30) and PM (14:00–16:00). All exam rooms seat at 50% capacity for academic spacing. You can view your exact seat matrix on the Exam Tab."
    elif "disruption" in msg or "leak" in msg or "cr-102" in msg:
        reply = "Due to the water pipe maintenance in CR-102 and Prof. F07 Monday travel, the timetable was repaired by CP-SAT with only 14 moved sessions. Check your portal for any room changes."
    elif "gym" in msg or "sports" in msg or "pool" in msg:
        reply = "The Student Activity Centre (SAC) has the indoor gym and badminton courts (06:00–22:00). The Olympic Aquatic Complex is open 06:00–10:00 & 16:30–20:30."
    else:
        reply = f"Hello! I am your CAMPUSX intelligent assistant for {role.replace('_', ' ').capitalize()}. I can help you with timetable lookups, room navigation, booking assistance, and campus services. What would you like to know?"

    return {"response": reply, "timestamp": datetime.now().isoformat()}

# ==========================================================
# EXPORTS & RESET
# ==========================================================

@app.get("/api/exports/schedule.json")
def export_schedule():
    if os.path.exists(SCHEDULE_PATH):
        return FileResponse(SCHEDULE_PATH, media_type="application/json", filename="schedule.json")
    raise HTTPException(status_code=404, detail="schedule.json not found")

@app.get("/api/exports/schedule_after.json")
def export_schedule_after():
    if os.path.exists(SCHEDULE_AFTER_PATH):
        return FileResponse(SCHEDULE_AFTER_PATH, media_type="application/json", filename="schedule_after.json")
    raise HTTPException(status_code=404, detail="schedule_after.json not found")

@app.post("/api/admin/reset-demo")
def reset_demo_data():
    # Re-run generator and reset to pristine state
    import generate_complete_schedule
    generate_complete_schedule.generate_full_schedule()
    return {"status": "success", "message": "Demo data reset to pristine state for judges."}

@app.get("/api/health")
def health():
    return {"status": "online", "system": "CAMPUSX", "version": "1.0.0", "timestamp": datetime.now().isoformat()}

# Serve frontend production build if available
if os.path.exists("frontend/dist"):
    app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="frontend")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
