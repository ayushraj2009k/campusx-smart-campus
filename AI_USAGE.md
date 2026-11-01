# CAMPUSX &mdash; AI Usage & Mathematical Optimization Disclosure

This document provides a transparent and detailed breakdown of artificial intelligence, natural language processing, and mathematical optimization techniques utilized in **CAMPUSX** for the **TechZephyr 2026 Web Hackathon** by **Team `itayush756`** (Team Leader: **Ayush Raj**).

---

## 1. Overview of AI & Optimization Architecture

CAMPUSX separates probabilistic natural language understanding from deterministic mathematical scheduling:
- **LLM / Generative AI (Gemini API):** Handles unstructured human inputs, natural English and Hinglish booking requests, role-contextual questions, and campus navigation assistance.
- **Deterministic Optimization (Google OR-Tools CP-SAT):** Enforces 100% mathematical constraint compliance, zero hard violations, zero priority inversions, and high-stability disruption recovery.

```
[ User Input (Voice / Text) ]
           │
           ▼
[ Gemini NLP Engine ] ──► Extracts: { venue, date, time_slot, capacity, priority }
           │
           ▼
[ Google OR-Tools CP-SAT ] ──► Enforces H1–H13, S1–S6, Disruption Hints
           │
           ▼
[ Certified Valid Schedule ] ──► Verified by official validator.py (0 Violations)
```

---

## 2. Gemini API Integration

### A. Natural Language Venue Booking Parser (`/api/ai/parse-booking`)
Allows club representatives and faculty to submit requests in conversational English and Hinglish:
- **Example Inputs:**
  - *"We need an auditorium for 100 students next Friday from 6 PM to 9 PM for robotics demo"*
  - *"Lalitgiri me ek bada classroom chahiye for 80 students on Wednesday afternoon"*
- **Extraction Schema:**
  - `venue_category`: Academic room, Seminar Hall, Auditorium, or Open Space.
  - `target_date` & `periods`: Mapped to timetable periods `P1` through `P7`.
  - `expected_attendance`: Parsed integer for capacity validation.
  - `priority_tier`: Automated classification based on user role (`academic_makeup` = 1.0, `department_event` = 2.0, `club_event` = 3.0, `general_booking` = 4.0).

### B. Context-Aware Campus Assistant (`/api/ai/chat`)
- Multi-persona conversational agent with 6 role-tailored context profiles.
- Integrated with PostGIS building locations, live timetable matrices, exam allotments, and campus medical/sports directories.
- Formats structured interactive action chips (e.g., *[📍 Navigate to Lalitgiri Hall]*, *[📅 Open Schedule]*, *[Submit Booking]*).

---

## 3. Google OR-Tools CP-SAT Constraint Modeling

The scheduling and disruption repair engines utilize Google OR-Tools Constraint Programming - Satisfiability (`cp_model.CpModel`):

### Hard Constraints Formulated & Solved:
1. **H1 (No Double Booking of Rooms):** Every room hosts at most one academic session or approved event per day/period.
2. **H2 (No Double Booking of Faculty):** Every instructor is assigned to at most one session per day/period.
3. **H3 (No Double Booking of Student Groups):** Student cohorts never have overlapping classes.
4. **H4 (Room Capacity Constraints):** Allocated room capacity $\ge$ class cohort size.
5. **H5 (Lab Session Continuity & Equipment):** 3-period lab sessions occur in uninterrupted blocks in designated lab rooms.
6. **H6 (Room Unavailability Windows):** Scheduled maintenance blocks cannot have any sessions assigned.
7. **H7 (Faculty Unavailability Windows):** Faculty commitments or leave windows are strictly respected.
8. **H8 (Basket Slots):** Electives sharing basket identifiers run concurrently without room collisions.
9. **H9 (Maximum 1 Exam per Day):** No student group has more than one end-semester exam on any given date.
10. **H10 (50% Exam Seating Spacing):** Exam seating density $\le 0.5 \times \text{Capacity}$ for academic integrity.
11. **H11–H13 (Spectra Week Venue Allocation):** Approved booking requests strictly follow priority ordering with zero priority inversions and category caps.

### Stability Optimization via Solution Hints:
During disruption repair, baseline assignments are provided as hints (`model.AddHint(var, 1)`), and the objective function incorporates a penalty on session displacements:
$$\text{Minimize} \quad W_{\text{time}} \cdot \sum \Delta_{\text{time}} + W_{\text{room}} \cdot \sum \Delta_{\text{room}} + \text{Soft Penalties}$$
This achieved **only 14 session displacements** out of 190 total sessions (92.6% stability) when absorbing emergency full-day maintenance in `sample_disruption.json`.

---

## 4. Official Validator Results

```text
Baseline Schedule:
- Hard Violations: 0
- Priority Inversions: 0
- Bookings Score: 64.5
- Exam Soft Penalty: 0

Post-Disruption Schedule:
- Hard Violations: 0
- Priority Inversions: 0
- Stability: 14 sessions moved (7 changed time, 7 room only)
```
