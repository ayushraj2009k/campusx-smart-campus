-- ==========================================================
-- CAMPUSX: Production Database Schema
-- IIT Bhubaneswar Smart Campus Management Platform
-- ==========================================================

-- Enable PostGIS and UUID
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SYSTEM SETTINGS
CREATE TABLE IF NOT EXISTS system_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BUILDINGS
CREATE TABLE IF NOT EXISTS buildings (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    category TEXT NOT NULL, -- academic, administrative, hostel, facility, sports
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    geom GEOMETRY(Point, 4326),
    floors INTEGER DEFAULT 1,
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DEPARTMENTS / SCHOOLS
CREATE TABLE IF NOT EXISTS departments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    building_id TEXT REFERENCES buildings(id),
    head_faculty_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ROOMS
CREATE TABLE IF NOT EXISTS rooms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    building_id TEXT REFERENCES buildings(id),
    type TEXT NOT NULL, -- classroom, lecture_hall, auditorium, seminar_hall, outdoor, lab_cs, lab_elec, lab_phy, workshop, lab_civil
    capacity INTEGER NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    accessible BOOLEAN DEFAULT TRUE,
    allowed_uses JSONB DEFAULT '["lecture","tutorial","lab","exam","event"]'::jsonb,
    floor_level INTEGER DEFAULT 1,
    coordinates JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ROOM UNAVAILABILITY
CREATE TABLE IF NOT EXISTS room_unavailability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id TEXT REFERENCES rooms(id) ON DELETE CASCADE,
    day TEXT NOT NULL, -- MON, TUE, WED, THU, FRI, SAT
    periods JSONB NOT NULL, -- array of integers [1, 2, ...]
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. FACULTY
CREATE TABLE IF NOT EXISTS faculty (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    department_id TEXT,
    max_hours_per_day INTEGER DEFAULT 4,
    needs_accessible BOOLEAN DEFAULT FALSE,
    unavailable JSONB DEFAULT '[]'::jsonb,
    preferences JSONB DEFAULT '[]'::jsonb,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. STUDENT GROUPS
CREATE TABLE IF NOT EXISTS student_groups (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    year INTEGER NOT NULL,
    department_id TEXT,
    size INTEGER NOT NULL,
    needs_accessible BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. COURSES
CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    department_id TEXT,
    lecture_hours INTEGER DEFAULT 3,
    tutorial_hours INTEGER DEFAULT 0,
    lab_blocks INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SESSIONS (Curriculum sessions to schedule)
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    course_id TEXT REFERENCES courses(id) ON DELETE CASCADE,
    kind TEXT NOT NULL, -- lecture, tutorial, lab
    groups JSONB NOT NULL, -- array of student group ids
    faculty_id TEXT REFERENCES faculty(id) ON DELETE CASCADE,
    size INTEGER NOT NULL,
    duration INTEGER NOT NULL DEFAULT 1,
    room_types JSONB NOT NULL,
    needs_accessible BOOLEAN DEFAULT FALSE,
    basket_slot TEXT,
    fixed_slot JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. TIMETABLES (Active / Versioned Weekly Schedules)
CREATE TABLE IF NOT EXISTS timetables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dataset_id TEXT NOT NULL,
    name TEXT NOT NULL,
    version INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT FALSE,
    is_baseline BOOLEAN DEFAULT FALSE,
    assignments JSONB NOT NULL, -- array of {session_id, day, start_period, room_id}
    hard_violation_count INTEGER DEFAULT 0,
    hard_violations JSONB DEFAULT '[]'::jsonb,
    soft_penalties JSONB DEFAULT '{}'::jsonb,
    soft_total INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. SPECTRA WEEK BOOKING REQUESTS
CREATE TABLE IF NOT EXISTS booking_requests (
    id TEXT PRIMARY KEY,
    submitted_at TIMESTAMPTZ NOT NULL,
    requester TEXT NOT NULL,
    role TEXT NOT NULL, -- admin, department_coordinator, faculty, club
    requested_category TEXT NOT NULL,
    effective_category TEXT NOT NULL,
    title TEXT NOT NULL,
    attendance INTEGER NOT NULL,
    duration_periods INTEGER NOT NULL,
    windows JSONB NOT NULL,
    room_types JSONB NOT NULL,
    needs JSONB DEFAULT '[]'::jsonb,
    requested_room TEXT,
    mandatory_for_groups JSONB DEFAULT '[]'::jsonb,
    series_id TEXT,
    raw_text TEXT,
    status TEXT DEFAULT 'pending', -- approved, rejected, alternative_offered, cancelled, pending
    assigned_day TEXT,
    assigned_start_period INTEGER,
    assigned_end_period INTEGER,
    assigned_room_id TEXT REFERENCES rooms(id),
    decision_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. SPECTRA WEEK SESSION OVERRIDES
CREATE TABLE IF NOT EXISTS session_overrides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT REFERENCES sessions(id) ON DELETE CASCADE,
    day TEXT NOT NULL,
    start_period INTEGER NOT NULL,
    room_id TEXT REFERENCES rooms(id) ON DELETE CASCADE,
    displaced_by TEXT REFERENCES booking_requests(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. EXAMS
CREATE TABLE IF NOT EXISTS exams (
    id TEXT PRIMARY KEY,
    course_ids JSONB NOT NULL,
    groups JSONB NOT NULL,
    size INTEGER NOT NULL,
    duration_hours INTEGER DEFAULT 2,
    day TEXT, -- MON..SAT
    session TEXT, -- AM, PM
    rooms JSONB DEFAULT '[]'::jsonb, -- array of room_ids
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. DISRUPTIONS & RESCHEDULING AUDIT
CREATE TABLE IF NOT EXISTS disruptions (
    id TEXT PRIMARY KEY,
    dataset_id TEXT NOT NULL,
    description TEXT,
    changes JSONB NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, applied, rejected
    impact_summary JSONB,
    applied_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. SCHEDULE CHANGES (Faculty & Coordinator change requests)
CREATE TABLE IF NOT EXISTS schedule_changes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id TEXT NOT NULL,
    requester_role TEXT NOT NULL,
    session_id TEXT REFERENCES sessions(id) ON DELETE CASCADE,
    original_slot JSONB NOT NULL,
    proposed_slot JSONB NOT NULL,
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, approved, rejected
    reviewed_by TEXT,
    review_notes TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. USER PROFILES & AUTH RBAC
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL, -- admin, department_coordinator, faculty, club, student, participant
    department_id TEXT,
    designation TEXT,
    phone TEXT,
    avatar_url TEXT,
    preferences JSONB DEFAULT '{}'::jsonb,
    is_demo_account BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_email TEXT NOT NULL,
    recipient_role TEXT,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info', -- info, success, warning, alert, schedule_change, booking
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. CAMPUS FACILITIES
CREATE TABLE IF NOT EXISTS campus_facilities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- medical, library, sports, dining, banking, shopping, security
    building_id TEXT REFERENCES buildings(id),
    location_desc TEXT,
    opening_hours TEXT,
    contact_phone TEXT,
    contact_email TEXT,
    image_url TEXT,
    coordinates JSONB,
    amenities JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. INDOOR NAVIGATION NODES & ROUTES
CREATE TABLE IF NOT EXISTS indoor_nodes (
    id TEXT PRIMARY KEY,
    building_id TEXT REFERENCES buildings(id) ON DELETE CASCADE,
    floor INTEGER NOT NULL,
    node_type TEXT NOT NULL, -- room, corridor, stair, elevator, entrance, restroom
    label TEXT NOT NULL,
    x DOUBLE PRECISION NOT NULL,
    y DOUBLE PRECISION NOT NULL,
    accessible BOOLEAN DEFAULT TRUE,
    connected_nodes JSONB DEFAULT '[]'::jsonb,
    room_id TEXT REFERENCES rooms(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. EVENTS & SPECTRA FEST SCHEDULE
CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- hackathon, cultural, technical, sports, workshop, guest_lecture
    organizer TEXT NOT NULL,
    venue_id TEXT REFERENCES rooms(id),
    building_id TEXT REFERENCES buildings(id),
    day TEXT,
    start_time TEXT,
    end_time TEXT,
    capacity INTEGER,
    registered_count INTEGER DEFAULT 0,
    description TEXT,
    banner_url TEXT,
    status TEXT DEFAULT 'upcoming',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. EVENT REGISTRATIONS & DIGITAL BADGES
CREATE TABLE IF NOT EXISTS event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id TEXT REFERENCES events(id) ON DELETE CASCADE,
    participant_email TEXT NOT NULL,
    participant_name TEXT NOT NULL,
    participant_org TEXT,
    qr_code_hash TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'confirmed', -- confirmed, checked_in, cancelled
    checked_in_at TIMESTAMPTZ,
    certificate_issued BOOLEAN DEFAULT FALSE,
    certificate_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 22. ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL, -- academic, administrative, fest, emergency, general
    priority TEXT DEFAULT 'normal', -- low, normal, urgent
    target_roles JSONB DEFAULT '["all"]'::jsonb,
    author_name TEXT NOT NULL,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 23. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email TEXT,
    user_role TEXT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_rooms_building ON rooms(building_id);
CREATE INDEX IF NOT EXISTS idx_rooms_type ON rooms(type);
CREATE INDEX IF NOT EXISTS idx_sessions_course ON sessions(course_id);
CREATE INDEX IF NOT EXISTS idx_sessions_faculty ON sessions(faculty_id);
CREATE INDEX IF NOT EXISTS idx_booking_requests_status ON booking_requests(status);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_email, is_read);
CREATE INDEX IF NOT EXISTS idx_indoor_nodes_building_floor ON indoor_nodes(building_id, floor);
CREATE INDEX IF NOT EXISTS idx_event_reg_email ON event_registrations(participant_email);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Enable Row Level Security (RLS) on sensitive tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_changes ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Allow public read access for general campus and directory tables
ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read buildings" ON buildings FOR SELECT USING (true);
CREATE POLICY "Public read rooms" ON rooms FOR SELECT USING (true);
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read faculty" ON faculty FOR SELECT USING (true);
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read student_groups" ON student_groups FOR SELECT USING (true);
ALTER TABLE student_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read courses" ON courses FOR SELECT USING (true);
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read sessions" ON sessions FOR SELECT USING (true);
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read timetables" ON timetables FOR SELECT USING (true);
ALTER TABLE timetables ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read booking_requests" ON booking_requests FOR SELECT USING (true);
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read announcements" ON announcements FOR SELECT USING (true);
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read campus_facilities" ON campus_facilities FOR SELECT USING (true);
ALTER TABLE campus_facilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read indoor_nodes" ON indoor_nodes FOR SELECT USING (true);
ALTER TABLE indoor_nodes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read system_settings" ON system_settings FOR SELECT USING (true);
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous full read on profiles for demo system exploration
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public read notifications" ON notifications FOR SELECT USING (true);
CREATE POLICY "Public read schedule_changes" ON schedule_changes FOR SELECT USING (true);
CREATE POLICY "Public read event_registrations" ON event_registrations FOR SELECT USING (true);

-- Allow full mutations for authenticated/service role (and anon in demo mode)
CREATE POLICY "Public write booking_requests" ON booking_requests FOR ALL USING (true);
CREATE POLICY "Public write schedule_changes" ON schedule_changes FOR ALL USING (true);
CREATE POLICY "Public write notifications" ON notifications FOR ALL USING (true);
CREATE POLICY "Public write event_registrations" ON event_registrations FOR ALL USING (true);
CREATE POLICY "Public write timetables" ON timetables FOR ALL USING (true);
CREATE POLICY "Public write system_settings" ON system_settings FOR ALL USING (true);
CREATE POLICY "Public write audit_logs" ON audit_logs FOR ALL USING (true);
