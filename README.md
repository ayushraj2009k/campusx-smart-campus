# CAMPUSX &mdash; Smart Campus Management Platform
### *ONE CAMPUS. ONE CONNECTED EXPERIENCE.*

[![IIT Bhubaneswar Hackathon](https://img.shields.io/badge/IIT%20Bhubaneswar-CrunchWeek%202026-blue.svg)](https://www.iitbbs.ac.in)
[![Validator](https://img.shields.io/badge/Official%20Validator-0%20Hard%20Violations-brightgreen.svg)](exports/schedule.json)
[![Priority Inversions](https://img.shields.io/badge/Priority%20Inversions-0-brightgreen.svg)](exports/schedule.json)
[![Constraint Solver](https://img.shields.io/badge/Engine-Google%20OR--Tools%20CP--SAT-orange.svg)](https://developers.google.com/optimization)
[![Stack](https://img.shields.io/badge/Stack-React%2019%20%7C%20FastAPI%20%7C%20Supabase%20PostgreSQL-indigo.svg)](https://fastapi.tiangolo.com)

---

## 🏛️ Executive Summary

**CAMPUSX** is an enterprise-grade, unified Smart Campus Management Platform engineered for the **IIT Bhubaneswar Hackathon (CrunchWeek 2026)**. Designed to solve complex, high-dimensional campus operational challenges, CAMPUSX harmonizes:
1. **Mathematical Scheduling Optimization:** Google OR-Tools CP-SAT integer programming solver for 189 weekly course sessions, 41 examinations, and 25 venue booking requests with **zero hard violations** and **zero priority inversions**.
2. **Disruption Repair & High-Stability Rescheduling:** Dynamic recovery engine with warm-start baseline hints that absorbed full-day room maintenance with **only 14 session movements** (92.6% schedule stability).
3. **Multi-Role Portals:** 6 dedicated role portals (Admin, Department Coordinator, Faculty, Club Representative, Student, and Participant).
4. **Cinematic 5-Second Launch Promo:** Powered by authentic IIT Bhubaneswar campus photography and official crest with a 1-click skip button and admin controls.
5. **Interactive Campus GIS & Multi-Floor Indoor Navigation:** 20 verified IIT Bhubaneswar Argul campus buildings with topological pathfinding, elevator routing, and ADA-compliant wheelchair access for the Lalitgiri Lecture Hall Complex (LHL).
6. **AI Assistant & Natural Language Booking:** Gemini-powered natural language processing supporting conversational schedule queries and English/Hinglish venue booking parsing.

---

## 🔑 Primary Judge Demo Accounts

For immediate evaluation, four pre-configured Judge Demo accounts are embedded directly in the application with 1-click quick-switching.

| Role | Email | Password | Pre-loaded Context & Persona |
| :--- | :--- | :--- | :--- |
| **1. ADMIN** *(Judge Account 1)* | `admin@campusx.edu` | `Admin@CampusX2026!` | Campus Director & Chief Academic Officer; full CP-SAT solver triggers, disruption approval matrix, audit logs, demo reset. |
| **2. DEPT COORDINATOR** *(Judge Account 2)* | `coordinator@campusx.edu` | `Coord@CampusX2026!` | Dr. Rajesh Sharma (Head of CSE); branch timetable views, faculty contact hours, lab allocations, extra session dispatch. |
| **3. FACULTY** *(Judge Account 3)* | `faculty@campusx.edu` | `Faculty@CampusX2026!` | Prof. Anita Roy (Faculty F01); personal calendar, Wednesday unavailability marking, natural language rescheduling requests. |
| **4. CLUB REPRESENTATIVE** *(Judge Account 4)* | `club@campusx.edu` | `Club@CampusX2026!` | Aarav Patel (Robotics & Tech Society); English/Hinglish venue booking, Spectra Week auditorium requests, conflict alternatives. |
| **5. STUDENT** *(Full Portal)* | `student@campusx.edu` | `Student@CampusX2026!` | Priya Verma (3rd Year B.Tech CSE); personalized timetable, room change alerts, exam seating allotments, classroom nav links. |
| **6. PARTICIPANT** *(Full Portal)* | `participant@campusx.edu` | `Guest@CampusX2026!` | Rohan Sen (CrunchWeek Hackathon Guest); digital gate pass, QR turnstile scanner, hackathon venue navigation, certificates. |

> **Note:** Credentials can be entered manually or selected with a single click using the **"Judge Demo Accounts"** quick-switcher in the login modal.

---

## 🏆 Official Hackathon Validator Verification

Both baseline (`exports/schedule.json`) and disruption (`exports/schedule_after.json`) schedules have been rigorously validated with the organizers' official `validator.py`:

### 1. Baseline Schedule Verification
```bash
python CrunchWeek_Starter/CrunchWeek_StarterPack/validator.py \
  --data CrunchWeek_Starter/CrunchWeek_StarterPack/data/cit_public.json \
  --schedule exports/schedule.json
```
**Official Validator Output:**
```text
Dataset: cit-public-v1   Schedule says: cit-public-v1   Team: CAMPUSX Dev Team
Hard violations: 0  {}
Soft penalty: 310  {'S1': 0, 'S2': 49, 'S3': 63, 'S4': 198, 'S5': 0, 'S6': 0}
Bookings: score 64.5 | approved 21, alternatives 2, rejected 2, session overrides 0, priority inversions 0
Exam soft penalty: 0
```
- **Hard Violations:** **0**
- **Priority Inversions:** **0**
- **Bookings Score:** **64.5** (21 approved, 2 alternatives offered, 2 rejected: BR-02 cancelled, BR-09 oversized)
- **Exam Soft Penalty:** **0** (Strict max 1 exam per day per student cohort across 41 exams)

### 2. Disruption Recovery Schedule Verification
```bash
python CrunchWeek_Starter/CrunchWeek_StarterPack/validator.py \
  --data CrunchWeek_Starter/CrunchWeek_StarterPack/data/cit_public.json \
  --schedule exports/schedule_after.json \
  --disruption CrunchWeek_Starter/CrunchWeek_StarterPack/examples/sample_disruption.json \
  --baseline exports/schedule.json
```
**Official Validator Output:**
```text
Dataset: cit-public-v1   Schedule says: cit-public-v1   Team: CAMPUSX Dev Team
Hard violations: 0  {}
Soft penalty: 328  {'S1': 0, 'S2': 53, 'S3': 60, 'S4': 204, 'S5': 11, 'S6': 0}
Bookings: score 62.0 | approved 20, alternatives 3, rejected 2, session overrides 0, priority inversions 0
Exam soft penalty: 0
Stability: 14 sessions moved (7 changed time, 7 room only)
```
- **Hard Violations:** **0**
- **Priority Inversions:** **0**
- **Stability:** **Only 14 sessions moved** out of 190 total academic sessions!

---

## 🛠️ System Architecture

```mermaid
flowchart TD
    subgraph Client ["Frontend (React 19 + TypeScript + Tailwind)"]
        UI["Landing & Portals (6 Roles)"]
        Promo["5-Second Launch Promo"]
        NavUI["Interactive Campus GIS & Indoor Navigation"]
        AIDrawer["Gemini AI Natural Language Assistant"]
    end

    subgraph Server ["FastAPI Application Backend (Port 8000)"]
        API["REST Endpoints (/api/...)"]
        AuthM["Role-Based Access Controller (RBAC)"]
        AIEngine["AI Natural Language Parser (Gemini API)"]
    end

    subgraph Solvers ["Mathematical Optimization Engine"]
        CPSAT["Google OR-Tools CP-SAT Solver"]
        BaselineSolv["Baseline Academic & Exam Solver"]
        DisruptSolv["Disruption Repair (Solution Hints)"]
        BookingSolv["Spectra Week Priority Knapsack"]
    end

    subgraph DataStore ["Database & Persistence (Supabase PostgreSQL)"]
        PG["PostgreSQL Relational Tables (23 tables)"]
        PostGIS["PostGIS Spatial Coordinates (Argul Campus)"]
        RLS["Row Level Security Policies"]
        Storage["Campus Photography & Official Crests"]
    end

    UI --> API
    AIDrawer --> AIEngine
    NavUI --> PostGIS
    API --> AuthM
    API --> CPSAT
    CPSAT --> BaselineSolv
    CPSAT --> DisruptSolv
    CPSAT --> BookingSolv
    API --> PG
    BaselineSolv --> exports/schedule.json
    DisruptSolv --> exports/schedule_after.json
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10+ (with `uv` or `pip`)
- Node.js 18+ (tested on Node v20/v24)
- Web browser (Chrome, Edge, Firefox, Safari)

### 1. Clone & Configure
```bash
git clone https://github.com/your-username/CAMPUSX.git
cd CAMPUSX
cp .env.example .env
```

### 2. Backend Setup & Startup
```powershell
# Create or activate virtual environment
python -m venv .venv
.venv\Scripts\Activate.ps1

# Install requirements
pip install -r requirements.txt

# Start FastAPI backend (runs on http://127.0.0.1:8000)
python backend/main.py
```

### 3. Frontend Setup & Startup
In a separate terminal:
```powershell
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

> **Production Unified Mode:** The built frontend in `frontend/dist` is also served automatically by FastAPI at **`http://127.0.0.1:8000`**!

---

## 📱 Core Features & User Journey

### 1. Launch Experience (5-Second Cinematic Promo)
- Auto-plays on startup featuring the authenticated IIT Bhubaneswar emblem and CAMPUSX branding.
- Displays 6 role badges with instant direct jump links.
- Interactive countdown timer with an instant "Skip Intro" option.
- Configurable via Admin portal settings.

### 2. Administrator Portal
- **One-Click CP-SAT Engine:** Trigger full timetable recalculation with live execution telemetry.
- **Disruption Diff Inspector:** Side-by-side visual matrix highlighting sessions affected by unexpected maintenance.
- **Spectra Week Priority Allocation:** Automated venue approval scoring ensuring zero priority inversions.
- **Official Export Center:** Direct download of `schedule.json`, `schedule_after.json`, and audit manifests.
- **Demo Reset:** Instant rollback to pristine state for judges.

### 3. Department Coordinator Portal
- **Branch-Specific Matrix:** Filtered schedule for CSE department faculty and student cohorts.
- **Workload Balancer:** Real-time metrics on faculty teaching hours and lab commitments.
- **Extra Session Allocator:** On-demand scheduling for remedial or tutorial classes without room clashes.

### 4. Faculty Portal
- **Personalized Schedule:** View assigned lecture halls, student cohorts, and timeslots.
- **Unavailability Marker:** Submit planned absences directly to the scheduling engine.
- **AI Schedule Assistant:** Submit natural language modification requests (e.g., *"Reschedule CS101 from Monday P2 to Wednesday P4"*).

### 5. Club Representative Portal
- **Natural Language Booking:** Type requests in natural English or Hinglish (e.g., *"We need an auditorium for 100 students next Friday 6 PM to 9 PM"*).
- **Instant Structured Review:** View AI-extracted fields (venue, timeslot, capacity, priority tier) before submission.
- **Real-Time Conflict Alerts & Alternative Suggestions:** Automatic suggestions if the primary venue is occupied.

### 6. Student Portal
- **My Academic Timetable:** Live indicator for currently ongoing classes.
- **Classroom Navigation Link:** One click on any room (e.g., *LH-1* or *LHL-101*) immediately opens the 2D/3D campus map with the room highlighted.
- **Room Change Notifications:** Instant alert badges when disruptions cause venue shifts.
- **End-Semester Exam Schedule:** Seating allotments with spacing validation.

### 7. Participant Portal
- **Digital Fest Pass:** Dynamic pass with simulated QR turnstile code and access authorization.
- **Event Explorer:** Browse technical hackathons, cultural workshops, and guest lectures.
- **Campus Wayfinding:** Instant directions to event venues (Auditorium, SAC, OAT).

### 8. Campus GIS & Multi-Floor Indoor Navigation
- **20 Real Campus Buildings:** Geocoded to exact IIT Bhubaneswar Argul coordinates (20.1482° N, 85.6765° E).
- **Multi-Floor Topological Graph:** 15 nodes for Lalitgiri Lecture Hall Complex with elevator routing, emergency exits, and ADA wheelchair ramps.
- **Facility Directory:** Sanjeevan Health Centre, Central Library, Food Courts, and ATM locations.

---

## 🗄️ Database Architecture (Supabase PostgreSQL)

The database schema (`supabase_migrations/001_initial_schema.sql`) contains 23 normalized tables with PostGIS extensions:
- `buildings` & `rooms` (geometries, capacities, lab equipments)
- `faculty` & `faculty_unavailability`
- `student_groups` & `courses`
- `scheduled_sessions` & `disrupted_sessions`
- `exams` & `exam_rooms`
- `booking_requests` & `booking_decisions`
- `indoor_nodes` & `indoor_edges`
- `campus_facilities`, `campus_events`, and `announcements`

Row Level Security (RLS) policies are active across all tables.

---

## 📄 License & Attribution

- **Hackathon:** IIT Bhubaneswar CrunchWeek 2026
- **Problem Statement:** Smart Campus Management Platform (CIT Public v1)
- **Developed by:** CAMPUSX Team
- **Official Campus Assets:** Indian Institute of Technology Bhubaneswar
