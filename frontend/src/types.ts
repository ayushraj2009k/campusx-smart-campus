export type UserRole = 
  | 'admin'
  | 'department_coordinator'
  | 'faculty'
  | 'club'
  | 'student'
  | 'participant';

export const ALL_ROLES: UserRole[] = [
  'admin',
  'department_coordinator',
  'faculty',
  'club',
  'student',
  'participant'
];

export interface UserProfile {
  id?: string;
  email: string;
  full_name: string;
  role: UserRole;
  department?: string;
  department_id?: string;
  designation?: string;
  avatar_url?: string;
  faculty_id?: string;
  club_id?: string;
  student_group_id?: string;
  is_demo_account?: boolean;
  token?: string;
  created_at?: string;
}

export type User = UserProfile;

export interface DemoAccount {
  role: UserRole;
  email: string;
  password: string;
  full_name: string;
  designation: string;
  department: string;
  avatar_url: string;
  description: string;
}

export interface ScheduledSession {
  session_id: string;
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';
  start_period: number;
  duration: number;
  end_period: number;
  room_id: string;
  room_name: string;
  building: string;
  course_id: string;
  course_name: string;
  kind: 'lecture' | 'tutorial' | 'lab';
  groups: string[];
  faculty_id: string;
  faculty_name: string;
  size: number;
  basket_slot?: string | null;
}

export interface ExamEntry {
  exam_id: string;
  day: string;
  session: 'AM' | 'PM';
  time_slot: string;
  course_ids: string[];
  course_titles: string[];
  groups: string[];
  size: number;
  rooms: string[];
  room_names: string[];
}

export interface BookingDecision {
  request_id: string;
  title: string;
  requester: string;
  role: string;
  category: string;
  attendance: number;
  duration_periods: number;
  status: 'approved' | 'alternative_offered' | 'rejected';
  day?: string;
  start_period?: number;
  end_period?: number;
  room_id?: string;
  room_name?: string;
  building?: string;
  reason: string;
  raw_text?: string;
}

export interface CampusBuilding {
  id: string;
  name: string;
  code: string;
  category: 'academic' | 'administrative' | 'hostel' | 'facility' | 'sports' | 'cultural' | 'medical';
  lat: number;
  lng: number;
  floors: number;
  image_url: string;
  description: string;
}

export interface IndoorNode {
  id: string;
  floor: number;
  node_type: 'entrance' | 'corridor' | 'room' | 'stair' | 'elevator';
  label: string;
  x: number;
  y: number;
  accessible: boolean;
  connected_nodes: string[];
  room_id?: string;
}

export interface CampusFacility {
  id: string;
  name: string;
  category: string;
  building: string;
  opening_hours: string;
  phone: string;
  image_url: string;
  amenities: string[];
}

export interface CampusEvent {
  id: string;
  title: string;
  category: string;
  organizer: string;
  venue: string;
  day: string;
  time: string;
  capacity: number;
  registered_count: number;
  banner_url: string;
  status: string;
}
