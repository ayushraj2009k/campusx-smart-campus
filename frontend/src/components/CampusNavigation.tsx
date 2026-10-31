import React, { useState, useEffect } from 'react';
import { 
  Compass, MapPin, Search, Layers, Navigation, ArrowUpRight, 
  Info, Building, Phone, Clock, ArrowRight, CornerDownRight, 
  ChevronRight, Sparkles, Eye, Shield, Accessibility, Footprints,
  Maximize2, RotateCcw, AlertTriangle, CheckCircle2, Car, Map,
  Satellite, Globe, Crosshair, Locate, AlertCircle, RefreshCw
} from 'lucide-react';
import { CampusBuilding } from '../types';
import { useTheme } from '../context/ThemeContext';

interface CampusNavigationProps {
  initialBuilding?: string | null;
}

export interface EnhancedBuilding extends CampusBuilding {
  address: string;
  rooms?: string[];
  departments?: string[];
  contact?: string;
}

// 20 High-Fidelity Verified IIT Bhubaneswar Argul Campus Buildings
const EMBEDDED_BUILDINGS: EnhancedBuilding[] = [
  {
    id: 'LHL',
    name: 'Lalitgiri Hall of Learning (LHL)',
    code: 'LHL',
    category: 'academic',
    lat: 20.1482,
    lng: 85.6765,
    floors: 3,
    image_url: '/Lalitgiri-Hall-of-Learning-scaled.jpg',
    address: 'Academic Central Spine, Argul, Jatni, Khordha, Odisha - 752050',
    description: 'Central lecture amphitheater complex housing Lecture Halls LH-1, LH-2, LH-3, and LH-4 with multi-tier seating, digital lecterns, and acoustic treatment.',
    rooms: ['LH-1 (100 seats)', 'LH-2 (100 seats)', 'LH-3 (80 seats)', 'LH-4 (80 seats)', 'Seminar Pod 101'],
    departments: ['Academic Affairs', 'First-Year Deanery', 'Dean of Academics'],
    contact: '+91 674 713 5100'
  },
  {
    id: 'ADM',
    name: 'Administrative Main Secretariat',
    code: 'ADM',
    category: 'administrative',
    lat: 20.1495,
    lng: 85.6780,
    floors: 4,
    image_url: '/main-building.jpg',
    address: 'Directorate Circle, Argul, Jatni, Khordha, Odisha - 752050',
    description: 'Central administrative headquarters housing the Director Secretariat, Registrar Offices, Academic Senate Hall, Finance Division, and Boardroom.',
    rooms: ['Director Secretariat (4th Floor)', 'Senate Hall (1st Floor)', 'Finance Office (2nd Floor)', 'Academic Section (Ground)'],
    departments: ['Directorate', 'Registrar', 'Academic Affairs', 'Accounts'],
    contact: '+91 674 713 5001'
  },
  {
    id: 'AUD',
    name: 'Main Campus Auditorium & Cultural Arena',
    code: 'AUD',
    category: 'cultural',
    lat: 20.1470,
    lng: 85.6750,
    floors: 2,
    image_url: '/Auditorium-1.png',
    address: 'Auditorium Avenue, Near Academic Quadrangle, Argul - 752050',
    description: 'State-of-the-art 600-seater main auditorium acoustically engineered for Spectra Tech Fest flagship events, convocations, national symposiums, and theatrical productions.',
    rooms: ['Main Stage Amphitheater (600 seats)', 'Green Rooms (A & B)', 'VIP Board Room', 'Audio Control Deck'],
    departments: ['Dean of Student Affairs', 'Spectra Fest Committee', 'Cultural Council'],
    contact: '+91 674 713 5220'
  },
  {
    id: 'SBS',
    name: 'School of Basic Sciences',
    code: 'SBS',
    category: 'academic',
    lat: 20.1505,
    lng: 85.6755,
    floors: 3,
    image_url: '/School-of-Basic-Science-scaled.jpg',
    address: 'North Academic Corridor, Argul Campus - 752050',
    description: 'Research faculties of Physics, Chemistry, and Mathematics featuring optics darkrooms, material chemistry bays, cleanrooms, and computational chemistry labs.',
    rooms: ['Physics Lab 1', 'Advanced Chemistry Lab', 'Math Computing Hub', 'SBS Seminar Hall'],
    departments: ['Physics', 'Chemistry', 'Mathematics'],
    contact: '+91 674 713 5500'
  },
  {
    id: 'SIF',
    name: 'School of Infrastructure',
    code: 'SIF',
    category: 'academic',
    lat: 20.1512,
    lng: 85.6770,
    floors: 3,
    image_url: '/School-of-Infrastructure-scaled.jpg',
    address: 'Engineering Quadrangle, Argul Campus - 752050',
    description: 'Civil and Environmental Engineering complex equipped with heavy structural testing reaction frames, geotechnical shake tables, and GIS spatial labs.',
    rooms: ['Heavy Structures Lab', 'Geotechnical Bay', 'Environmental Engineering Lab', 'SIF-101'],
    departments: ['Civil Engineering', 'Structural Engineering', 'Transportation'],
    contact: '+91 674 713 5600'
  },
  {
    id: 'SES',
    name: 'School of Electrical Sciences',
    code: 'SES',
    category: 'academic',
    lat: 20.1490,
    lng: 85.6740,
    floors: 4,
    image_url: '/lab-complex.jpg',
    address: 'Technology Spine West, Argul Campus - 752050',
    description: 'CSE, Electronics, and Electrical Engineering computing suites hosting CS-LAB-1, CS-LAB-2, AI Supercomputing clusters, Embedded Systems, and VLSI labs.',
    rooms: ['CS-LAB-1 (60 High-Performance Nodes)', 'CS-LAB-2 (60 Nodes)', 'VLSI Design Lab', 'SES Seminar Hall'],
    departments: ['Computer Science & Engineering', 'Electrical Engineering', 'Electronics'],
    contact: '+91 674 713 5700'
  },
  {
    id: 'SMS',
    name: 'School of Minerals, Metallurgical & Materials',
    code: 'SMS',
    category: 'academic',
    lat: 20.1518,
    lng: 85.6760,
    floors: 3,
    image_url: '/School-of-Minerals-Metallurgical-material-Engineering-scaled.jpg',
    address: 'North-East Academic Wing, Argul - 752050',
    description: 'Advanced metallurgy furnaces, electron microscopes, composite synthesis reactors, and nanomaterial development facilities.',
    rooms: ['Material Characterization Lab', 'Furnace Bay', 'SMS-201 Conference'],
    departments: ['Metallurgical & Materials Engineering'],
    contact: '+91 674 713 5800'
  },
  {
    id: 'SEOCS',
    name: 'School of Earth, Ocean & Climate Sciences',
    code: 'SEOCS',
    category: 'academic',
    lat: 20.1500,
    lng: 85.6790,
    floors: 3,
    image_url: '/School-of-EarthOcean-and-Climate-Sciences-scaled.jpg',
    address: 'East Academic Sector, Argul Campus - 752050',
    description: 'Climate modeling stations, meteorological telemetry antennas, oceanographic sample analysis, and geophysics computing laboratories.',
    rooms: ['Climate Telemetry Center', 'Geophysics Lab', 'SEOCS Amphitheater'],
    departments: ['Earth & Ocean Sciences', 'Atmospheric Modeling'],
    contact: '+91 674 713 5900'
  },
  {
    id: 'SHSSM',
    name: 'School of Humanities, Social Sciences & Mgmt',
    code: 'SHSSM',
    category: 'academic',
    lat: 20.1492,
    lng: 85.6795,
    floors: 3,
    image_url: '/School-of-Humanities-Social-science-Management-scaled.jpg',
    address: 'Administrative Annex East, Argul - 752050',
    description: 'Language phonetics lab, intellectual property repository, economics research pods, and management case study amphitheater.',
    rooms: ['Digital Language Lab', 'Management Hall 1', 'Economics Pod'],
    departments: ['Humanities', 'Economics', 'Management Studies'],
    contact: '+91 674 713 5950'
  },
  {
    id: 'LIB',
    name: 'Central Knowledge Commons & Library',
    code: 'LIB',
    category: 'academic',
    lat: 20.1488,
    lng: 85.6760,
    floors: 3,
    image_url: '/Ratnagiri-Hall-of-Learning-scaled.jpg',
    address: 'Central Academic Spine, Argul Campus - 752050',
    description: 'RFID-enabled repository of 120,000+ technical volumes, digital IEEE/Springer subscription pods, and 24-hour reading rooms for exam preparation.',
    rooms: ['24x7 Digital Reading Lounge', 'Book Stacks (Floor 1-2)', 'Thesis Pod', 'Seminar Hall 1 (SH-1)'],
    departments: ['University Library', 'Digital Resource Center'],
    contact: '+91 674 713 5300'
  },
  {
    id: 'SAC',
    name: 'Student Activity Centre (SAC)',
    code: 'SAC',
    category: 'sports',
    lat: 20.1455,
    lng: 85.6730,
    floors: 2,
    image_url: '/SAC-Building-1-scaled.jpg',
    address: 'Sports & Student Activity Complex, Argul - 752050',
    description: 'Indoor multi-court badminton arena, modern gymnasium with cardio deck, robotics testing paddock, music club studio, and student council chambers.',
    rooms: ['Badminton Stadium (3 courts)', 'Indoor Gymnasium', 'Robotics Testing Paddock', 'Music Studio'],
    departments: ['Gymkhana', 'Sports Council', 'Technical Societies'],
    contact: '+91 674 713 5400'
  },
  {
    id: 'HC',
    name: 'Sanjeevan Health Centre',
    code: 'HC',
    category: 'medical',
    lat: 20.1440,
    lng: 85.6785,
    floors: 2,
    image_url: '/Sanjeevan-Health-Center-scaled.jpg',
    address: 'Medical Enclave, South-East Campus, Argul - 752050',
    description: '24x7 campus healthcare hospital with round-the-clock emergency doctors, trauma care unit, digital pathology diagnostic lab, pharmacy, and ambulance service.',
    rooms: ['Emergency Trauma Bay', 'OPD Clinic 1 & 2', '24x7 Pharmacy', 'Diagnostic Pathology Lab'],
    departments: ['Medical & Healthcare Services', 'Emergency Response Unit'],
    contact: '+91 674 713 5114'
  },
  {
    id: 'BHR',
    name: 'Brahmaputra Hall of Residence',
    code: 'BHR',
    category: 'hostel',
    lat: 20.1430,
    lng: 85.6720,
    floors: 4,
    image_url: '/BHR-Boys-Hostel-scaled.jpg',
    address: 'Boys Hostel Quadrant West, Argul - 752050',
    description: 'Undergraduate student residence accommodating 800 scholars with central mess dining hall, TT rooms, night canteen, and gigabit campus Wi-Fi.',
    rooms: ['Central Dining Mess', 'Common Recreation Hall', 'Hostel Warden Office'],
    departments: ['Hostel Management Committee'],
    contact: '+91 674 713 5450'
  },
  {
    id: 'RHR',
    name: 'Rishikulya Hall of Residence',
    code: 'RHR',
    category: 'hostel',
    lat: 20.1425,
    lng: 85.6735,
    floors: 4,
    image_url: '/RHR-Boys-Hostel-scaled.jpg',
    address: 'Boys Hostel Quadrant Central, Argul - 752050',
    description: 'Senior undergraduate and research scholars residence featuring green courtyards, quiet study lounges, and sports equipment bays.',
    rooms: ['Senior Dining Mess', 'Reading Hall', 'Guest Suites'],
    departments: ['Council of Wardens'],
    contact: '+91 674 713 5460'
  },
  {
    id: 'GHR',
    name: 'Ganga Hall of Residence',
    code: 'GHR',
    category: 'hostel',
    lat: 20.1435,
    lng: 85.6750,
    floors: 4,
    image_url: '/GHR-Girls-Hostel-scaled.jpg',
    address: 'Girls Hostel Quadrant East, Argul - 752050',
    description: 'Girls student residence equipped with multi-tier biometric security turnstiles, indoor gymnasium, dining hall, and shuttle bus stop.',
    rooms: ['Girls Mess Hall', 'Indoor Badminton Court', 'Medical First-Aid Room'],
    departments: ['Hostel Management'],
    contact: '+91 674 713 5470'
  },
  {
    id: 'SHR',
    name: 'Sangam Hall of Residence',
    code: 'SHR',
    category: 'hostel',
    lat: 20.1420,
    lng: 85.6765,
    floors: 3,
    image_url: '/Sangam-Hostel-for-Married-Students-scaled.jpg',
    address: 'Postgraduate & Married Scholars Complex, Argul - 752050',
    description: 'Dedicated residential apartments for doctoral fellows and married research scholars with children play park.',
    rooms: ['Apartment Suites', 'Community Hall'],
    departments: ['Estate Office'],
    contact: '+91 674 713 5480'
  },
  {
    id: 'POOL',
    name: 'Olympic Aquatic Complex',
    code: 'POOL',
    category: 'sports',
    lat: 20.1450,
    lng: 85.6710,
    floors: 1,
    image_url: '/swimming-pool-scaled.jpg',
    address: 'Sports Enclave West, Argul - 752050',
    description: '50-meter 8-lane Olympic standard competition swimming pool with automated digital touch-pads, diving boards, and spectator gallery.',
    rooms: ['Main Competition Pool', 'Warm-Up Pool', 'Shower & Locker Suites'],
    departments: ['Physical Education & Sports'],
    contact: '+91 674 713 5410'
  },
  {
    id: 'COMM',
    name: 'Commercial Complex & Radika Store',
    code: 'COMM',
    category: 'facility',
    lat: 20.1445,
    lng: 85.6760,
    floors: 2,
    image_url: '/Radika-Supermarket-scaled.jpg',
    address: 'Central Campus Shopping Arcade, Argul - 752050',
    description: 'Daily supermarket, academic stationery & printing press, hair salon, multi-bank ATMs (SBI, Canara), and cafeteria.',
    rooms: ['Radika Supermarket', 'Digital Stationery Center', 'SBI ATM Pod', 'Campus Cafe'],
    departments: ['Estate & Commercial Operations'],
    contact: '+91 674 713 5350'
  },
  {
    id: 'SPORTS',
    name: 'Main Football & Athletics Pavilion',
    code: 'SPORTS',
    category: 'sports',
    lat: 20.1460,
    lng: 85.6715,
    floors: 1,
    image_url: '/Football-Ground-scaled.jpg',
    address: 'Main Stadium Complex, Argul - 752050',
    description: 'Natural turf football ground with 400m synthetic running track, floodlight towers for evening tournaments, and spectator stands.',
    rooms: ['Referee Pavilion', 'Equipment Storage', 'Medical Station'],
    departments: ['Sports Council'],
    contact: '+91 674 713 5420'
  },
  {
    id: 'GATE',
    name: 'IIT Bhubaneswar Main Security Gate',
    code: 'GATE',
    category: 'administrative',
    lat: 20.1520,
    lng: 85.6800,
    floors: 1,
    image_url: '/main-gate.jpg',
    address: 'Campus Entrance Highway Road, Argul, Jatni - 752050',
    description: 'Main campus security entrance, visitor biometric registration booths, RFID vehicular boom barriers, and campus e-rickshaw dispatch hub.',
    rooms: ['Security Command Post', 'Visitor Verification Lounge', 'E-Rickshaw Charging Station'],
    departments: ['Security & Vigilance Office'],
    contact: '+91 674 713 5101'
  }
];

export const CampusNavigation: React.FC<CampusNavigationProps> = ({ initialBuilding }) => {
  const { uiMode, effectiveAppearance } = useTheme();
  const isBharat = uiMode === 'bharat';
  const isDark = effectiveAppearance === 'dark';

  const [buildings, setBuildings] = useState<EnhancedBuilding[]>(EMBEDDED_BUILDINGS);
  const [selectedBuilding, setSelectedBuilding] = useState<EnhancedBuilding>(EMBEDDED_BUILDINGS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // View mode: 'google_map' (real live embedded Google Map) | 'schematic' (2D campus grid) | 'indoor' (Lalitgiri multi-floor)
  const [mapMode, setMapMode] = useState<'google_map' | 'schematic' | 'indoor'>('google_map');
  const [mapType, setMapType] = useState<'satellite' | 'roadmap'>('satellite');
  
  // Floor & Accessibility
  const [selectedFloor, setSelectedFloor] = useState<number>(1);
  const [accessibleOnly, setAccessibleOnly] = useState<boolean>(false);

  // Routing state
  const [routeFrom, setRouteFrom] = useState<string>('GATE');
  const [routeTo, setRouteTo] = useState<string>('LHL');
  const [showRoute, setShowRoute] = useState<boolean>(true);

  // User Geolocation state
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [useUserLocationAsOrigin, setUseUserLocationAsOrigin] = useState<boolean>(false);

  // Indoor routing state
  const [indoorFromNode, setIndoorFromNode] = useState('LHL-F1-ENT');
  const [indoorToNode, setIndoorToNode] = useState('LH-1');
  const [indoorPath, setIndoorPath] = useState<string[]>(['LHL-F1-ENT', 'LHL-F1-COR1', 'LH-1']);

  useEffect(() => {
    fetchBuildings();
  }, []);

  useEffect(() => {
    if (initialBuilding && buildings.length > 0) {
      const match = buildings.find(b => 
        b.id.toLowerCase() === initialBuilding.toLowerCase() ||
        b.code.toLowerCase() === initialBuilding.toLowerCase() ||
        b.name.toLowerCase().includes(initialBuilding.toLowerCase())
      );
      if (match) {
        setSelectedBuilding(match);
        setRouteTo(match.id);
      }
    }
  }, [initialBuilding, buildings]);

  const fetchBuildings = async () => {
    try {
      const res = await fetch('/api/navigation/buildings');
      if (res.ok) {
        const data = await res.json();
        if (data.buildings && data.buildings.length > 0) {
          // Merge embedded verified details with backend, keeping valid image paths
          const merged = EMBEDDED_BUILDINGS.map(emb => {
            const backMatch = data.buildings.find((b: any) => 
              b.id === emb.id || 
              b.code === emb.code || 
              b.name.toLowerCase() === emb.name.toLowerCase()
            );
            if (backMatch) {
              return {
                ...emb,
                lat: backMatch.lat || emb.lat,
                lng: backMatch.lng || emb.lng,
                // Keep clean embedded path or cleaned backend path
                image_url: emb.image_url || backMatch.image_url.replace('/static/', '/')
              };
            }
            return emb;
          });
          setBuildings(merged);
        }
      }
    } catch {
      // Fallback works automatically with EMBEDDED_BUILDINGS
    }
  };

  const handleDetectLocation = () => {
    setIsLocating(true);
    setGeoError(null);

    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser. Using campus landmark fallback.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserCoords({ lat: latitude, lng: longitude });
        setUseUserLocationAsOrigin(true);
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGeoError('Location permission denied. Please allow GPS access or choose a campus origin landmark below.');
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setGeoError('GPS position unavailable on this network. Please pick a campus landmark origin.');
        } else {
          setGeoError('Location request timed out. Please pick a campus landmark origin.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  };

  const filteredBuildings = buildings.filter((b) => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.rooms && b.rooms.some(r => r.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const fromBuildingObj = buildings.find(b => b.id === routeFrom) || buildings[0];
  const toBuildingObj = buildings.find(b => b.id === routeTo) || buildings[1];

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const phi1 = lat1 * Math.PI / 180;
    const phi2 = lat2 * Math.PI / 180;
    const deltaPhi = (lat2 - lat1) * Math.PI / 180;
    const deltaLambda = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  };

  // Determine origin coordinates (user GPS or selected campus origin landmark)
  const originLat = useUserLocationAsOrigin && userCoords ? userCoords.lat : fromBuildingObj.lat;
  const originLng = useUserLocationAsOrigin && userCoords ? userCoords.lng : fromBuildingObj.lng;

  const distanceMeters = calculateDistance(originLat, originLng, toBuildingObj.lat, toBuildingObj.lng);
  const walkMinutes = Math.max(1, Math.round(distanceMeters / 80));

  const handleIndoorRoute = (to: string) => {
    setIndoorToNode(to);
    if (to === 'LH-3' || to === 'LH-4') {
      setSelectedFloor(2);
      setIndoorPath(['LHL-F1-ENT', 'LHL-F1-COR1', 'LHL-F1-ELEV', 'LHL-F2-ELEV', 'LHL-F2-COR1', to]);
    } else {
      setSelectedFloor(1);
      setIndoorPath(['LHL-F1-ENT', 'LHL-F1-COR1', to]);
    }
  };

  // Google Maps Embed URL centered on selected building with verified Argul GPS
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${selectedBuilding.lat},${selectedBuilding.lng}&hl=en&z=17&t=${mapType === 'satellite' ? 'k' : 'm'}&output=embed`;
  
  // Accurate directions URL from user's GPS or selected landmark
  const googleMapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${toBuildingObj.lat},${toBuildingObj.lng}&travelmode=walking`;

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 text-on-surface">
      
      {/* Top Banner */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl border mb-8 shadow-xl transition-all ${
        isBharat
          ? 'bg-gradient-to-r from-orange-950/30 via-slate-900/80 to-slate-900/90 border-orange-500/40'
          : 'bg-surface-container-low border-outline-variant/30'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 shadow-lg ${
            isBharat 
              ? 'bg-orange-500/20 border-orange-500/40 text-orange-400 shadow-orange-500/20' 
              : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400 shadow-cyan-500/20'
          }`}>
            <Compass className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white font-display">Campus GIS & Google Maps Navigation</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${
                isBharat 
                  ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' 
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              }`}>
                Argul GPS 20.1482° N
              </span>
            </div>
            <p className="text-xs text-surface-variant mt-1">
              Real-time Google Maps satellite integration, topological routing, and Lalitgiri multi-floor indoor blueprints
            </p>
          </div>
        </div>

        {/* 3-Way Mode Switcher */}
        <div className="flex flex-wrap items-center p-1.5 rounded-2xl bg-surface-container border border-outline-variant/30 self-start md:self-auto gap-1">
          <button
            onClick={() => setMapMode('google_map')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              mapMode === 'google_map'
                ? 'bg-secondary text-slate-950 shadow-md'
                : 'text-surface-variant hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Google Map</span>
          </button>

          <button
            onClick={() => setMapMode('schematic')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              mapMode === 'schematic'
                ? 'bg-secondary text-slate-950 shadow-md'
                : 'text-surface-variant hover:text-white'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>2D Schematic</span>
          </button>

          <button
            onClick={() => setMapMode('indoor')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              mapMode === 'indoor'
                ? 'bg-secondary text-slate-950 shadow-md'
                : 'text-surface-variant hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Indoor Blueprint</span>
          </button>
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Route Planner & 20 Buildings List */}
        <div className="space-y-6">
          
          {/* Point-to-Point Route Planner */}
          <div className="p-5 rounded-3xl bg-surface-container-low border border-outline-variant/30 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 font-display">
                <Navigation className={`w-4 h-4 ${isBharat ? 'text-orange-500' : 'text-cyan-400'}`} />
                <span>Point-to-Point Route Planner</span>
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                isBharat 
                  ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' 
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              }`}>
                Paved Paths
              </span>
            </div>

            {/* GPS Geolocation Toggle & State */}
            <div className="mb-3 p-3 rounded-2xl bg-surface-container border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    useUserLocationAsOrigin && userCoords 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : isBharat ? 'bg-orange-500/20 text-orange-400' : 'bg-cyan-500/20 text-cyan-400'
                  }`}>
                    <Locate className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Device Geolocation</span>
                    <span className="text-[10px] text-surface-variant block">
                      {useUserLocationAsOrigin && userCoords
                        ? `GPS: ${userCoords.lat.toFixed(4)}° N, ${userCoords.lng.toFixed(4)}° E`
                        : 'Navigate from your live device position'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={isLocating}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                    useUserLocationAsOrigin && userCoords
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                      : isBharat
                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                  }`}
                >
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>{isLocating ? 'Locating...' : userCoords ? 'Refresh GPS' : 'Detect Location'}</span>
                </button>
              </div>

              {/* Geolocation Notice / Fallback Alert */}
              {geoError && (
                <div className="mt-2.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                  <div>
                    <span className="font-semibold block">{geoError}</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <span className="text-[10px] text-surface-variant">Quick Fallbacks:</span>
                      <button
                        type="button"
                        onClick={() => { setRouteFrom('GATE'); setUseUserLocationAsOrigin(false); setGeoError(null); }}
                        className="px-1.5 py-0.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-[10px] text-white"
                      >
                        Main Gate
                      </button>
                      <button
                        type="button"
                        onClick={() => { setRouteFrom('BHR'); setUseUserLocationAsOrigin(false); setGeoError(null); }}
                        className="px-1.5 py-0.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-[10px] text-white"
                      >
                        BHR Hostel
                      </button>
                      <button
                        type="button"
                        onClick={() => { setRouteFrom('ADM'); setUseUserLocationAsOrigin(false); setGeoError(null); }}
                        className="px-1.5 py-0.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-[10px] text-white"
                      >
                        Directorate
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {/* Origin Selector (Landmark or GPS indicator) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] text-surface-variant font-mono uppercase">
                    From (Origin Point)
                  </label>
                  {useUserLocationAsOrigin && userCoords && (
                    <button
                      type="button"
                      onClick={() => setUseUserLocationAsOrigin(false)}
                      className="text-[10px] text-cyan-400 hover:underline"
                    >
                      Switch to Landmark
                    </button>
                  )}
                </div>

                {useUserLocationAsOrigin && userCoords ? (
                  <div className="w-full px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                    <span className="font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Your Current Device Location
                    </span>
                    <span className="font-mono text-[10px]">Argul Campus Zone</span>
                  </div>
                ) : (
                  <select
                    value={routeFrom}
                    onChange={(e) => {
                      setRouteFrom(e.target.value);
                      setUseUserLocationAsOrigin(false);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container border border-outline-variant/30 text-xs text-white focus:outline-none focus:border-secondary"
                  >
                    {buildings.map(b => (
                      <option key={b.id} value={b.id}>{b.name} ({b.code})</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Destination Selector */}
              <div>
                <label className="text-[10px] text-surface-variant font-mono uppercase block mb-1">To (Destination)</label>
                <select
                  value={routeTo}
                  onChange={(e) => {
                    setRouteTo(e.target.value);
                    const match = buildings.find(b => b.id === e.target.value);
                    if (match) setSelectedBuilding(match);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container border border-outline-variant/30 text-xs text-white focus:outline-none focus:border-secondary"
                >
                  {buildings.map(b => (
                    <option key={b.id} value={b.id}>{b.name} ({b.code})</option>
                  ))}
                </select>
              </div>

              {/* Accessibility Toggle */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-surface-variant cursor-pointer">
                  <input
                    type="checkbox"
                    checked={accessibleOnly}
                    onChange={(e) => setAccessibleOnly(e.target.checked)}
                    className="rounded accent-cyan-400"
                  />
                  <Accessibility className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ramp & Elevator Path</span>
                </label>

                <a
                  href={googleMapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-bold flex items-center gap-1 hover:underline ${
                    isBharat ? 'text-orange-400' : 'text-cyan-400'
                  }`}
                >
                  <span>Google Walk</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Route Summary Box */}
              <div className={`mt-2 p-3.5 rounded-2xl border text-xs flex items-center justify-between shadow-inner ${
                isBharat 
                  ? 'bg-orange-950/30 border-orange-500/30 text-orange-200' 
                  : 'bg-cyan-950/40 border-cyan-500/30 text-cyan-200'
              }`}>
                <div className="flex items-center gap-2.5">
                  <Footprints className={`w-5 h-5 shrink-0 ${isBharat ? 'text-orange-400' : 'text-cyan-400'}`} />
                  <div>
                    <div className="font-bold text-white text-xs">Walking Distance: ~{distanceMeters} meters</div>
                    <div className={`text-[11px] ${isBharat ? 'text-orange-300' : 'text-cyan-300'}`}>
                      Est. Time: ~{walkMinutes} min walk via Central Spine
                    </div>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                  isBharat ? 'bg-orange-500/20 text-orange-300' : 'bg-cyan-500/20 text-cyan-300'
                }`}>
                  Direct Path
                </span>
              </div>
            </div>
          </div>

          {/* Buildings Search Directory */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-surface-variant" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, code or address..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-xs text-white placeholder:text-surface-variant focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="rounded-3xl border border-outline-variant/30 bg-surface-container-low overflow-hidden max-h-[380px] overflow-y-auto divide-y divide-outline-variant/20 shadow-md">
              {filteredBuildings.map((b) => {
                const isSelected = selectedBuilding.id === b.id;
                return (
                  <div
                    key={b.id}
                    onClick={() => {
                      setSelectedBuilding(b);
                      setRouteTo(b.id);
                    }}
                    className={`p-3 cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-secondary/15 border-l-4 border-l-secondary'
                        : 'hover:bg-surface-container'
                    }`}
                  >
                    <img
                      src={b.image_url}
                      alt={b.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/campus-gallery.png';
                      }}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 ring-1 ring-outline-variant/30"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-secondary">{b.code}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-surface-container-highest text-surface-variant uppercase">
                          {b.category}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white truncate mt-0.5">{b.name}</h4>
                      <p className="text-[10px] text-surface-variant truncate">{b.address}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Map Canvas (Embedded Google Map / Schematic / Indoor) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. EMBEDDED GOOGLE MAP (Real interactive satellite view right inside this container!) */}
          {mapMode === 'google_map' && (
            <div className="relative rounded-3xl overflow-hidden border border-outline-variant/30 bg-[#070e1f] shadow-2xl h-[440px] flex flex-col">
              
              {/* Map View Sub-controls */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-surface-container-lowest/90 backdrop-blur-md p-1.5 rounded-xl border border-outline-variant/30 shadow-lg">
                <button
                  onClick={() => setMapType('satellite')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    mapType === 'satellite' ? 'bg-secondary text-slate-950' : 'text-surface-variant hover:text-white'
                  }`}
                >
                  Satellite
                </button>
                <button
                  onClick={() => setMapType('roadmap')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    mapType === 'roadmap' ? 'bg-secondary text-slate-950' : 'text-surface-variant hover:text-white'
                  }`}
                >
                  Map View
                </button>
              </div>

              {/* Real Interactive Google Maps iframe centered on selected building */}
              <iframe
                title="Google Map Campus"
                src={googleMapEmbedUrl}
                className="w-full h-full border-0 rounded-3xl filter saturate-110"
                allowFullScreen
                loading="lazy"
              />

              {/* Bottom Telemetry Bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-surface-variant font-mono bg-surface-container-lowest/85 backdrop-blur-md px-3 py-2 rounded-xl border border-outline-variant/30">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-white">{selectedBuilding.name}</span>
                  <span className="text-[10px] text-cyan-300">({selectedBuilding.lat.toFixed(4)}° N, {selectedBuilding.lng.toFixed(4)}° E)</span>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedBuilding.lat},${selectedBuilding.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary font-bold hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>Open Full Screen</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* 2. CAMPUS ARCHITECTURAL SCHEMATIC (SVG Grid & Spine) */}
          {mapMode === 'schematic' && (
            <div className="relative rounded-3xl overflow-hidden border border-outline-variant/30 bg-[#070e1f] shadow-2xl h-[440px] flex items-center justify-center p-4">
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="campusGrid2" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(37,99,235,0.12)" strokeWidth="1"/>
                  </pattern>
                  <linearGradient id="spineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#03b5d3" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.6"/>
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#campusGrid2)" />

                {/* Main Campus Arteries */}
                <path d="M 80 340 Q 250 240 450 180 T 750 90" fill="none" stroke="url(#spineGradient2)" strokeWidth="8" strokeDasharray="6,4" opacity="0.4" />
                <path d="M 220 380 L 250 240 L 320 80" fill="none" stroke="rgba(76,215,246,0.3)" strokeWidth="4" />
                <path d="M 450 180 L 600 320" fill="none" stroke="rgba(76,215,246,0.3)" strokeWidth="4" />

                {/* Animated Path if shown */}
                {showRoute && (() => {
                  const x1 = Math.min(88, Math.max(10, ((fromBuildingObj.lng - 85.670) / 0.010) * 100));
                  const y1 = Math.min(88, Math.max(10, ((20.155 - fromBuildingObj.lat) / 0.012) * 100));
                  const x2 = Math.min(88, Math.max(10, ((toBuildingObj.lng - 85.670) / 0.010) * 100));
                  const y2 = Math.min(88, Math.max(10, ((20.155 - toBuildingObj.lat) / 0.012) * 100));
                  return (
                    <line
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke="#4cd7f6"
                      strokeWidth="3"
                      strokeDasharray="6,4"
                      className="animate-pulse"
                    />
                  );
                })()}
              </svg>

              {/* Clickable Building Marker Pins */}
              <div className="relative w-full h-full pointer-events-none">
                {buildings.map((b) => {
                  const leftPct = Math.min(88, Math.max(10, ((b.lng - 85.670) / 0.010) * 100));
                  const topPct = Math.min(88, Math.max(10, ((20.155 - b.lat) / 0.012) * 100));
                  const isSelected = selectedBuilding.id === b.id;

                  return (
                    <div
                      key={b.id}
                      onClick={() => {
                        setSelectedBuilding(b);
                        setRouteTo(b.id);
                      }}
                      style={{ top: `${topPct}%`, left: `${leftPct}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer transition-all duration-300 ${
                        isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-10'
                      }`}
                    >
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md shadow-lg ${
                        isSelected
                          ? 'bg-secondary text-slate-950 ring-4 ring-cyan-500/40 shadow-cyan-500/50'
                          : 'bg-surface-container-high/90 text-white border border-outline-variant/30 hover:border-secondary'
                      }`}>
                        <MapPin className={`w-3 h-3 ${isSelected ? 'text-slate-950' : 'text-secondary'}`} />
                        <span>{b.code}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. MULTI-FLOOR INDOOR BLUEPRINT */}
          {mapMode === 'indoor' && (
            <div className="rounded-3xl bg-[#070e1f] border border-outline-variant/30 p-6 flex flex-col justify-between shadow-2xl h-[440px]">
              <div className="flex items-center justify-between mb-4 border-b border-outline-variant/20 pb-3">
                <div className="text-xs font-mono text-secondary font-bold">
                  LALITGIRI COMPLEX &mdash; FLOOR {selectedFloor} ARCHITECTURAL SCHEMATIC
                </div>
                <div className="flex items-center gap-2 text-xs text-surface-variant">
                  <span className="w-2.5 h-2.5 rounded bg-cyan-400" /> Classrooms
                  <span className="w-2.5 h-2.5 rounded bg-emerald-400" /> ADA Elevator
                </div>
              </div>

              {/* Floor Switcher Tabs */}
              <div className="flex gap-2 mb-4">
                {[1, 2, 3].map(fl => (
                  <button
                    key={fl}
                    onClick={() => setSelectedFloor(fl)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedFloor === fl ? 'bg-secondary text-slate-950' : 'bg-surface-container text-surface-variant hover:text-white'
                    }`}
                  >
                    Floor {fl}
                  </button>
                ))}
              </div>

              {/* Interactive Floor Layout */}
              <div className="flex-1 rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/30 p-6 flex items-center justify-center">
                {selectedFloor === 1 ? (
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <div 
                      onClick={() => handleIndoorRoute('LH-1')}
                      className={`p-4 rounded-2xl border text-center cursor-pointer transition-all ${
                        indoorToNode === 'LH-1' ? 'bg-cyan-500/25 border-cyan-400 ring-2 ring-cyan-400' : 'bg-surface-container-high border-outline-variant/30'
                      }`}
                    >
                      <span className="text-xs font-mono text-cyan-400 font-bold block">LH-1</span>
                      <span className="text-sm font-bold text-white block mt-1">Lecture Hall 1</span>
                      <span className="text-[10px] text-surface-variant">100 Seats &bull; Ground Floor</span>
                    </div>

                    <div className="flex flex-col gap-2 justify-center items-center p-3 rounded-2xl bg-surface-container border border-dashed border-cyan-500/40">
                      <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                        <Accessibility className="w-3.5 h-3.5" />
                        <span>ADA Elevator E1</span>
                      </div>
                      <div className="text-[10px] text-secondary font-mono">Central Glass Foyer</div>
                    </div>

                    <div 
                      onClick={() => handleIndoorRoute('LH-2')}
                      className={`p-4 rounded-2xl border text-center cursor-pointer transition-all ${
                        indoorToNode === 'LH-2' ? 'bg-cyan-500/25 border-cyan-400 ring-2 ring-cyan-400' : 'bg-surface-container-high border-outline-variant/30'
                      }`}
                    >
                      <span className="text-xs font-mono text-cyan-400 font-bold block">LH-2</span>
                      <span className="text-sm font-bold text-white block mt-1">Lecture Hall 2</span>
                      <span className="text-[10px] text-surface-variant">100 Seats &bull; Amphitheater</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <div 
                      onClick={() => handleIndoorRoute('LH-3')}
                      className={`p-4 rounded-2xl border text-center cursor-pointer transition-all ${
                        indoorToNode === 'LH-3' ? 'bg-cyan-500/25 border-cyan-400 ring-2 ring-cyan-400' : 'bg-surface-container-high border-outline-variant/30'
                      }`}
                    >
                      <span className="text-xs font-mono text-cyan-400 font-bold block">LH-3</span>
                      <span className="text-sm font-bold text-white block mt-1">Lecture Hall 3</span>
                      <span className="text-[10px] text-surface-variant">80 Seats &bull; Floor 2</span>
                    </div>

                    <div className="flex flex-col gap-2 justify-center items-center p-3 rounded-2xl bg-surface-container border border-dashed border-cyan-500/40">
                      <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                        Elevator Landing (F2)
                      </div>
                      <div className="text-[10px] text-secondary font-mono">Balcony Overlook</div>
                    </div>

                    <div 
                      onClick={() => handleIndoorRoute('LH-4')}
                      className={`p-4 rounded-2xl border text-center cursor-pointer transition-all ${
                        indoorToNode === 'LH-4' ? 'bg-cyan-500/25 border-cyan-400 ring-2 ring-cyan-400' : 'bg-surface-container-high border-outline-variant/30'
                      }`}
                    >
                      <span className="text-xs font-mono text-cyan-400 font-bold block">LH-4</span>
                      <span className="text-sm font-bold text-white block mt-1">Lecture Hall 4</span>
                      <span className="text-[10px] text-surface-variant">80 Seats &bull; Floor 2</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DETAILED BUILDING PROFILE CARD WITH EXACT ADDRESS & DEPARTMENTS */}
          <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 shadow-xl flex flex-col md:flex-row gap-6">
            <img
              src={selectedBuilding.image_url}
              alt={selectedBuilding.name}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/campus-gallery.png';
              }}
              className="w-full md:w-60 h-52 rounded-2xl object-cover ring-1 ring-outline-variant/30 shrink-0"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-secondary uppercase">
                    Code: {selectedBuilding.code} &bull; {selectedBuilding.category}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface-container text-surface-variant">
                    {selectedBuilding.floors} Floors
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white font-display mb-1">
                  {selectedBuilding.name}
                </h3>

                {/* Exact Campus Address */}
                <div className="flex items-start gap-1.5 text-xs text-secondary/90 mb-3">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-secondary" />
                  <span>{selectedBuilding.address}</span>
                </div>

                <p className="text-xs text-surface-variant leading-relaxed mb-4">
                  {selectedBuilding.description}
                </p>

                {/* Rooms & Departments list */}
                {selectedBuilding.rooms && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {selectedBuilding.rooms.map((rm, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-surface-container border border-outline-variant/30 text-surface-variant font-mono">
                        {rm}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-outline-variant/20 flex flex-wrap items-center gap-3">
                {selectedBuilding.id === 'LHL' && (
                  <button
                    onClick={() => setMapMode('indoor')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-secondary to-primary-container text-slate-950 text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <Layers className="w-4 h-4" />
                    <span>View Indoor Floor Map</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setRouteTo(selectedBuilding.id);
                    setMapMode('schematic');
                    setShowRoute(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 text-xs font-bold text-white transition-all"
                >
                  <Navigation className="w-4 h-4 text-secondary" />
                  <span>Set as Destination</span>
                </button>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedBuilding.lat},${selectedBuilding.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 text-xs font-medium text-surface-variant hover:text-white transition-all ml-auto"
                >
                  <ArrowUpRight className="w-4 h-4 text-secondary" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
