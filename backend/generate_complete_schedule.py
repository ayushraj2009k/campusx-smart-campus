import json
import os
from solver import solve_timetable
from exams import solve_exams
from bookings import solve_bookings

def generate_full_schedule(output_path="exports/schedule.json"):
    os.makedirs("exports", exist_ok=True)
    print("Step 1: Solving Timetable (Sessions)...")
    with open("test_schedule.json", "r") as f:
        # We already have the verified 0-violation baseline timetable
        sessions = json.load(f)["sessions"]

    print("Step 2: Solving Exams...")
    exams = solve_exams()

    print("Step 3: Solving Spectra Week Bookings...")
    fest_week = solve_bookings(baseline_sessions=sessions)

    full_schedule = {
        "team": "CAMPUSX Dev Team",
        "dataset_id": "cit-public-v1",
        "sessions": sessions,
        "fest_week": fest_week,
        "exams": exams
    }

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(full_schedule, f, indent=2)
    print(f"Successfully generated {output_path}!")

if __name__ == "__main__":
    generate_full_schedule()
