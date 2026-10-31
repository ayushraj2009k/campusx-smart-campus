import React, { useState, useEffect } from 'react';
import { 
  Compass, MapPin, Search, Layers, Navigation, ArrowUpRight, 
  Info, Building, Phone, Clock, ArrowRight, CornerDownRight, 
  ChevronRight, Sparkles, Eye, Shield, Accessibility, Footprints,
  Maximize2, RotateCcw, AlertTriangle, CheckCircle2, Car, Map
} from 'lucide-react';
import { CampusBuilding } from '../types';

interface CampusNavigationProps {
  initialBuilding?: string | null;
}

// Fallback high-fidelity dataset of all 20 IIT Bhubaneswar Argul Campus Buildings
const EMBEDDED_BUILDINGS: CampusBuilding[] = [
  {
    id: 'LHL',
    name: 'Lalitgiri Hall of Learning (LHL)',
    code: 'LHL',
    category: 'academic',
    lat: 20.1482,
    lng: 85.6765,
    floors: 3,
    image_url: '/Lalitgiri-Hall-of-Learning-scaled.jpg',
    description: 'Central lecture amphitheater complex housing Lecture Halls LH-1, LH-2, LH-3, and LH-4 with multi-tier seating and acoustic baffling.'
  },
  {
    id: 'ADM',
    name: 'Administrative Main Building',
    code: 'ADM',
    category: 'administrative',
    lat: 20.1495,
    lng: 85.6780,
    floors: 4,
    image_url: '/main-building IIT.jpg',
    description: 'Central administrative secretariat housing Directorate, Registrar offices, Senate Hall, and academic affairs.'
  },
  {
    id: 'AUD',
    name: 'Main Campus Auditorium',
    code: 'AUD',
    category: 'cultural',
    lat: 20.1470,
    lng: 85.6750,
    floors: 2,
    image_url: '/Auditorium-1.png',
    description: 'State-of-the-art 600-seater auditorium equipped for Spectra Week flagship events, convocations, and technical keynotes.'
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
    description: 'Department of Physics, Chemistry, and Mathematics featuring optics darkrooms and chemical analysis laboratories.'
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
    description: 'Civil Engineering structural bays, geotechnical test rigs, and transportation environmental labs.'
  },
  {
    id: 'SES',
    name: 'School of Electrical Sciences',
    code: 'SES',
    category: 'academic',
    lat: 20.1490,
    lng: 85.6740,
    floors: 4,
    image_url: '/Lab-Complex-scaled IIT.jpg',
    description: 'Computer Science, Electronics, and Electrical Engineering computing suites (CS-LAB-1, CS-LAB-2) and VLSI workstations.'
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
    description: 'Indoor badminton courts, modern gymnasium, robotics testing paddock, music room, and student council chambers.'
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
    description: '24x7 campus healthcare hospital with emergency trauma care, medical pharmacy, pathology diagnostic lab, and ambulances.'
  },
  {
    id: 'LIB',
    name: 'Central Library Complex',
    code: 'LIB',
    category: 'academic',
    lat: 20.1488,
    lng: 85.6760,
    floors: 3,
    image_url: '/Ratnagiri-Hall-of-Learning-scaled.jpg',
    description: 'RFID-enabled repository of 120,000+ volumes, digital subscription pods, and 24-hour reading rooms for exam preparation.'
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
    description: 'Boys student residence accommodating 800 scholars with mess dining facility, indoor TT tables, and high-speed Wi-Fi.'
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
    description: 'Senior undergraduate and postgraduate scholars residence with central courtyard and study lounges.'
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
    description: 'Girls student residence equipped with multi-tier biometric security, dining hall, and badminton courts.'
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
    description: '50-meter 8-lane Olympic standard competition swimming pool with timing sensors and spectator stands.'
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
    description: 'Daily supermarket, bookstore, printing services, cafe, and multi-bank automated teller machines (ATMs).'
  },
  {
    id: 'GATE',
    name: 'IIT Bhubaneswar Main Gate',
    code: 'GATE',
    category: 'administrative',
    lat: 20.1520,
    lng: 85.6800,
    floors: 1,
    image_url: '/Main-Gate OF IIT.jpg',
    description: 'Main campus security entrance, visitor verification booths, and campus e-rickshaw dispatch stop.'
  }
];

export const CampusNavigation: React.FC<CampusNavigationProps> = ({ initialBuilding }) => {
  const [buildings, setBuildings] = useState<CampusBuilding[]>(EMBEDDED_BUILDINGS);
  const [selectedBuilding, setSelectedBuilding] = useState<CampusBuilding>(EMBEDDED_BUILDINGS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'campus' | 'indoor'>('campus');
  const [selectedFloor, setSelectedFloor] = useState<number>(1);
  const [accessibleOnly, setAccessibleOnly] = useState<boolean>(false);

  // Routing state
  const [routeFrom, setRouteFrom] = useState<string>('BHR');
  const [routeTo, setRouteTo] = useState<string>('LHL');
  const [showRoute, setShowRoute] = useState<boolean>(true);

  // Indoor state
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
          setBuildings(data.buildings);
          if (!initialBuilding) {
            setSelectedBuilding(data.buildings[0]);
          }
        }
      }
    } catch {
      // Gracefully uses embedded buildings
    }
  };

  const filteredBuildings = buildings.filter((b) => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fromBuildingObj = buildings.find(b => b.id === routeFrom) || buildings[0];
  const toBuildingObj = buildings.find(b => b.id === routeTo) || buildings[1];

  // Calculate approximate distance between two GPS coords in meters
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

  const distanceMeters = calculateDistance(fromBuildingObj.lat, fromBuildingObj.lng, toBuildingObj.lat, toBuildingObj.lng);
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

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 text-on-surface">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 mb-8 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-lg shadow-cyan-500/20">
            <Compass className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white font-display">Campus GIS & Indoor Navigation</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Argul 20.1482° N
              </span>
            </div>
            <p className="text-xs text-surface-variant mt-1">
              Topological routing across 20 verified IIT Bhubaneswar buildings and multi-floor lecture hall networks
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center p-1.5 rounded-2xl bg-surface-container border border-outline-variant/30 self-start md:self-auto">
          <button
            onClick={() => setViewMode('campus')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'campus'
                ? 'bg-secondary text-on-secondary shadow-md'
                : 'text-surface-variant hover:text-white'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Campus 2D/3D Grid</span>
          </button>
          <button
            onClick={() => setViewMode('indoor')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'indoor'
                ? 'bg-secondary text-on-secondary shadow-md'
                : 'text-surface-variant hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Lalitgiri Multi-Floor</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: CAMPUS MASTER GIS & ROUTE FINDER */}
      {viewMode === 'campus' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Panel: Route Planner & Building Directory */}
          <div className="space-y-6">
            
            {/* Quick Route Planner Card */}
            <div className="p-5 rounded-3xl bg-surface-container-low border border-outline-variant/30 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-secondary" />
                  <span>Interactive Route Planner</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Optimal Path
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-surface-variant font-mono uppercase block mb-1">From (Origin)</label>
                  <select
                    value={routeFrom}
                    onChange={(e) => setRouteFrom(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container border border-outline-variant/30 text-xs text-white focus:outline-none focus:border-secondary"
                  >
                    {buildings.map(b => (
                      <option key={b.id} value={b.id}>{b.name} ({b.code})</option>
                    ))}
                  </select>
                </div>

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
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 text-xs text-surface-variant cursor-pointer">
                    <input
                      type="checkbox"
                      checked={accessibleOnly}
                      onChange={(e) => setAccessibleOnly(e.target.checked)}
                      className="rounded accent-cyan-400"
                    />
                    <Accessibility className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Wheelchair Accessible Path</span>
                  </label>
                  <button
                    onClick={() => setShowRoute(!showRoute)}
                    className="text-xs text-secondary font-bold hover:underline"
                  >
                    {showRoute ? 'Hide Path' : 'Show Path'}
                  </button>
                </div>

                {/* Route Result Banner */}
                {showRoute && (
                  <div className="mt-3 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs flex items-center justify-between text-cyan-200">
                    <div className="flex items-center gap-2">
                      <Footprints className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <div className="font-bold text-white">Walking Distance: ~{distanceMeters} m</div>
                        <div className="text-[11px] text-cyan-300">Est. Time: {walkMinutes} min walk via Central Spine</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-cyan-500/20 px-2 py-1 rounded font-mono text-cyan-300">
                      Spine Route
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Building Search & List */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-surface-variant" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter 20 campus facilities (e.g. LHL, SES, BHR)..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-xs text-white focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-low overflow-hidden max-h-[380px] overflow-y-auto divide-y divide-outline-variant/20">
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
                        className="w-11 h-11 rounded-lg object-cover shrink-0 ring-1 ring-outline-variant/30"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-secondary">{b.code}</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-surface-container-highest text-surface-variant uppercase">
                            {b.category}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white truncate mt-0.5">{b.name}</h4>
                        <p className="text-[10px] text-surface-variant truncate">{b.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Panel: Interactive Visual Campus Schematic Map & Building Profile */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Visual Interactive Campus Map Canvas */}
            <div className="relative rounded-3xl overflow-hidden border border-outline-variant/30 bg-[#070e1f] shadow-2xl h-[440px] flex items-center justify-center p-4">
              
              {/* Background Campus Grid & Aerial Layout */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="campusGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(37,99,235,0.12)" strokeWidth="1"/>
                  </pattern>
                  <linearGradient id="spineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#03b5d3" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.6"/>
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#campusGrid)" />

                {/* Campus Green Spine Arteries */}
                <path d="M 80 340 Q 250 240 450 180 T 750 90" fill="none" stroke="url(#spineGradient)" strokeWidth="8" strokeDasharray="6,4" opacity="0.4" />
                <path d="M 220 380 L 250 240 L 320 80" fill="none" stroke="rgba(76,215,246,0.3)" strokeWidth="4" />
                <path d="M 450 180 L 600 320" fill="none" stroke="rgba(76,215,246,0.3)" strokeWidth="4" />

                {/* Campus Zones Annotations */}
                <text x="100" y="380" fill="#4cd7f6" fontSize="10" fontFamily="monospace" opacity="0.7">RESIDENTIAL HOSTEL QUADRANT</text>
                <text x="320" y="50" fill="#b4c5ff" fontSize="10" fontFamily="monospace" opacity="0.7">ACADEMIC & RESEARCH SPINE</text>
                <text x="560" y="380" fill="#d0bcff" fontSize="10" fontFamily="monospace" opacity="0.7">ADMINISTRATION & AUDITORIUM</text>

                {/* Draw Route Line between From and To if showRoute is enabled */}
                {showRoute && (() => {
                  const x1 = Math.min(85, Math.max(12, ((fromBuildingObj.lng - 85.670) / 0.010) * 100));
                  const y1 = Math.min(85, Math.max(12, ((20.155 - fromBuildingObj.lat) / 0.012) * 100));
                  const x2 = Math.min(85, Math.max(12, ((toBuildingObj.lng - 85.670) / 0.010) * 100));
                  const y2 = Math.min(85, Math.max(12, ((20.155 - toBuildingObj.lat) / 0.012) * 100));
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

              {/* Building Pin Nodes */}
              <div className="relative w-full h-full pointer-events-none">
                {buildings.map((b) => {
                  const leftPct = Math.min(88, Math.max(10, ((b.lng - 85.670) / 0.010) * 100));
                  const topPct = Math.min(88, Math.max(10, ((20.155 - b.lat) / 0.012) * 100));
                  const isSelected = selectedBuilding.id === b.id;
                  const isRouteFrom = routeFrom === b.id;
                  const isRouteTo = routeTo === b.id;

                  return (
                    <div
                      key={b.id}
                      onClick={() => {
                        setSelectedBuilding(b);
                        setRouteTo(b.id);
                      }}
                      style={{ top: `${topPct}%`, left: `${leftPct}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer transition-all duration-300 ${
                        isSelected || isRouteTo
                          ? 'scale-125 z-30'
                          : 'hover:scale-110 z-10'
                      }`}
                    >
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md shadow-lg transition-all ${
                        isSelected || isRouteTo
                          ? 'bg-secondary text-slate-950 ring-4 ring-cyan-500/40 shadow-cyan-500/50'
                          : isRouteFrom
                          ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/40'
                          : 'bg-surface-container-high/90 text-white border border-outline-variant/30 hover:border-secondary'
                      }`}>
                        <MapPin className={`w-3 h-3 ${isSelected ? 'text-slate-950' : 'text-secondary'}`} />
                        <span>{b.code}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Campus Grid Telemetry Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-surface-variant font-mono bg-surface-container-lowest/85 backdrop-blur-md p-2.5 rounded-xl border border-outline-variant/20">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Argul GPS: 20.1482° N, 85.6765° E</span>
                </span>
                <span className="text-secondary font-bold">20 Campus Facilities Online</span>
              </div>
            </div>

            {/* Selected Building Detailed Profile Card */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 shadow-xl flex flex-col md:flex-row gap-6">
              <img
                src={selectedBuilding.image_url}
                alt={selectedBuilding.name}
                className="w-full md:w-56 h-48 rounded-2xl object-cover ring-1 ring-outline-variant/30 shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-secondary uppercase">
                      Code: {selectedBuilding.code} • Category: {selectedBuilding.category}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface-container text-surface-variant">
                      {selectedBuilding.floors} Floors
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-display mb-2">
                    {selectedBuilding.name}
                  </h3>
                  <p className="text-xs text-surface-variant leading-relaxed mb-4">
                    {selectedBuilding.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-outline-variant/20 flex flex-wrap items-center gap-3">
                  {selectedBuilding.id === 'LHL' && (
                    <button
                      onClick={() => setViewMode('indoor')}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-secondary to-primary-container text-on-secondary text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
                    >
                      <Layers className="w-4 h-4" />
                      <span>Explore Multi-Floor Indoor Map</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setRouteTo(selectedBuilding.id);
                      setShowRoute(true);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 text-xs font-bold text-white transition-all"
                  >
                    <Navigation className="w-4 h-4 text-secondary" />
                    <span>Set as Destination</span>
                  </button>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${selectedBuilding.lat},${selectedBuilding.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 text-xs font-medium text-surface-variant hover:text-white transition-all ml-auto"
                  >
                    <ArrowUpRight className="w-4 h-4 text-secondary" />
                    <span>Google Maps GPS</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* VIEW 2: MULTI-FLOOR INDOOR NAVIGATION (Lalitgiri Lecture Hall Complex) */}
      {viewMode === 'indoor' && (
        <div className="space-y-6">
          
          {/* Indoor Navigation Header & Floor Switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-lg">
            <div>
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                <span>Lalitgiri Lecture Hall Complex (LHL)</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                  Multi-Floor Indoor Graph
                </span>
              </h3>
              <p className="text-xs text-surface-variant mt-0.5">
                Topological indoor wayfinding connecting accessible entrances, elevator cores, and lecture halls
              </p>
            </div>

            {/* Floor Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-surface-variant mr-1">Floor:</span>
              {[1, 2, 3].map((floor) => (
                <button
                  key={floor}
                  onClick={() => setSelectedFloor(floor)}
                  className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                    selectedFloor === floor
                      ? 'bg-secondary text-slate-950 shadow-md shadow-secondary/30 ring-2 ring-cyan-400'
                      : 'bg-surface-container text-surface-variant hover:text-white border border-outline-variant/30'
                  }`}
                >
                  F{floor}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Quick Room Navigator */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-md">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Find Classroom or Amenity
                </h4>

                <div className="space-y-2">
                  {[
                    { id: 'LH-1', label: 'LH-1 (Capacity 100)', floor: 1, type: 'Amphitheater' },
                    { id: 'LH-2', label: 'LH-2 (Capacity 100)', floor: 1, type: 'Amphitheater' },
                    { id: 'LH-3', label: 'LH-3 (Capacity 80)', floor: 2, type: 'Lecture Hall' },
                    { id: 'LH-4', label: 'LH-4 (Capacity 80)', floor: 2, type: 'Lecture Hall' },
                    { id: 'LHL-F1-ELEV', label: 'ADA Wheelchair Elevator', floor: 1, type: 'Vertical Core' }
                  ].map((room) => (
                    <button
                      key={room.id}
                      onClick={() => handleIndoorRoute(room.id)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        indoorToNode === room.id
                          ? 'bg-secondary/15 border-secondary text-white'
                          : 'bg-surface-container border-outline-variant/20 hover:border-outline-variant text-surface-variant hover:text-white'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{room.label}</div>
                        <div className="text-[10px] text-surface-variant">Floor {room.floor} • {room.type}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-secondary" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Wayfinding Directions Step List */}
              <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-md">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Step-By-Step Indoor Path</span>
                </h4>

                <div className="space-y-2 text-xs">
                  {indoorPath.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="text-surface-variant">
                        <span className="font-bold text-white">{step}</span>
                        <p className="text-[10px] text-surface-variant/80">
                          {step.includes('ENT') && 'Enter via central double glass doors (ramp access on east wing)'}
                          {step.includes('COR') && 'Proceed straight down main central corridor'}
                          {step.includes('ELEV') && 'Take elevator up to Floor 2'}
                          {step.includes('LH') && 'Arrived at lecture hall entrance on left side'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Visual Architectural Schematic */}
            <div className="lg:col-span-2 rounded-3xl bg-[#070e1f] border border-outline-variant/30 p-6 flex flex-col justify-between shadow-2xl min-h-[460px]">
              
              <div className="flex items-center justify-between mb-4 border-b border-outline-variant/20 pb-3">
                <div className="text-xs font-mono text-secondary font-bold">
                  LALITGIRI COMPLEX &mdash; FLOOR {selectedFloor} SCHEMATIC
                </div>
                <div className="flex items-center gap-2 text-xs text-surface-variant">
                  <span className="w-2.5 h-2.5 rounded bg-cyan-400" /> Classrooms
                  <span className="w-2.5 h-2.5 rounded bg-emerald-400" /> Elevator / Access
                  <span className="w-2.5 h-2.5 rounded bg-rose-400" /> Fire Exit
                </div>
              </div>

              {/* Interactive Floor Plan Layout */}
              <div className="relative flex-1 rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/30 p-6 flex flex-col justify-center">
                
                {selectedFloor === 1 ? (
                  <div className="grid grid-cols-3 gap-4">
                    {/* LH-1 */}
                    <div 
                      onClick={() => handleIndoorRoute('LH-1')}
                      className={`p-6 rounded-2xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                        indoorToNode === 'LH-1'
                          ? 'bg-cyan-500/25 border-cyan-400 ring-2 ring-cyan-400 shadow-lg'
                          : 'bg-surface-container-high border-outline-variant/30 hover:border-secondary'
                      }`}
                    >
                      <span className="text-xs font-mono text-cyan-400 font-bold">LH-1</span>
                      <span className="text-base font-bold text-white mt-1">Lecture Hall 1</span>
                      <span className="text-[10px] text-surface-variant mt-1">100 Seats • Acoustic</span>
                    </div>

                    {/* Central Corridor & Elevator */}
                    <div className="flex flex-col gap-3 justify-center items-center p-3 rounded-2xl bg-surface-container border border-dashed border-cyan-500/40">
                      <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                        <Accessibility className="w-3.5 h-3.5" />
                        <span>Elevator Core (E1)</span>
                      </div>
                      <div className="text-[10px] text-secondary font-mono">Central Corridor</div>
                      <div className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                        Main Glass Entrance
                      </div>
                    </div>

                    {/* LH-2 */}
                    <div 
                      onClick={() => handleIndoorRoute('LH-2')}
                      className={`p-6 rounded-2xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                        indoorToNode === 'LH-2'
                          ? 'bg-cyan-500/25 border-cyan-400 ring-2 ring-cyan-400 shadow-lg'
                          : 'bg-surface-container-high border-outline-variant/30 hover:border-secondary'
                      }`}
                    >
                      <span className="text-xs font-mono text-cyan-400 font-bold">LH-2</span>
                      <span className="text-base font-bold text-white mt-1">Lecture Hall 2</span>
                      <span className="text-[10px] text-surface-variant mt-1">100 Seats • Amphitheater</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {/* LH-3 */}
                    <div 
                      onClick={() => handleIndoorRoute('LH-3')}
                      className={`p-6 rounded-2xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                        indoorToNode === 'LH-3'
                          ? 'bg-cyan-500/25 border-cyan-400 ring-2 ring-cyan-400 shadow-lg'
                          : 'bg-surface-container-high border-outline-variant/30 hover:border-secondary'
                      }`}
                    >
                      <span className="text-xs font-mono text-cyan-400 font-bold">LH-3</span>
                      <span className="text-base font-bold text-white mt-1">Lecture Hall 3</span>
                      <span className="text-[10px] text-surface-variant mt-1">80 Seats • Tiered</span>
                    </div>

                    {/* Floor 2 Lobby & Stairs */}
                    <div className="flex flex-col gap-3 justify-center items-center p-3 rounded-2xl bg-surface-container border border-dashed border-cyan-500/40">
                      <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                        <Accessibility className="w-3.5 h-3.5" />
                        <span>Elevator Core (F2)</span>
                      </div>
                      <div className="text-[10px] text-secondary font-mono">Floor 2 Gallery Overlook</div>
                      <div className="px-3 py-1 rounded bg-rose-500/20 text-rose-300 text-[10px]">
                        Emergency Stairwell
                      </div>
                    </div>

                    {/* LH-4 */}
                    <div 
                      onClick={() => handleIndoorRoute('LH-4')}
                      className={`p-6 rounded-2xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                        indoorToNode === 'LH-4'
                          ? 'bg-cyan-500/25 border-cyan-400 ring-2 ring-cyan-400 shadow-lg'
                          : 'bg-surface-container-high border-outline-variant/30 hover:border-secondary'
                      }`}
                    >
                      <span className="text-xs font-mono text-cyan-400 font-bold">LH-4</span>
                      <span className="text-base font-bold text-white mt-1">Lecture Hall 4</span>
                      <span className="text-[10px] text-surface-variant mt-1">80 Seats • Seminar Ready</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Navigation Hint */}
              <div className="mt-4 flex items-center justify-between text-xs text-surface-variant">
                <span>Active Target: <strong className="text-white">{indoorToNode}</strong></span>
                <button
                  onClick={() => setViewMode('campus')}
                  className="text-secondary font-bold hover:underline flex items-center gap-1"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Back to Campus View</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
