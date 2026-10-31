import React, { useState, useEffect } from 'react';
import { 
  Compass, MapPin, Search, Layers, Navigation, ArrowUpRight, 
  Info, Building, Phone, Clock, ArrowRight, CornerDownRight, 
  ChevronRight, Sparkles, Eye, Shield
} from 'lucide-react';
import { CampusBuilding } from '../types';

interface CampusNavigationProps {
  initialBuilding?: string | null;
}

export const CampusNavigation: React.FC<CampusNavigationProps> = ({ initialBuilding }) => {
  const [buildings, setBuildings] = useState<CampusBuilding[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<CampusBuilding | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'campus' | 'indoor'>('campus');
  const [selectedFloor, setSelectedFloor] = useState<number>(1);
  const [indoorFromNode, setIndoorFromNode] = useState('LHL-F1-ENT');
  const [indoorToNode, setIndoorToNode] = useState('LH-3');
  const [indoorPath, setIndoorPath] = useState<string[]>(['LHL-F1-ENT', 'LHL-F1-COR1', 'LHL-F1-ELEV', 'LHL-F2-ELEV', 'LHL-F2-COR1', 'LH-3']);

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/navigation/buildings');
      if (res.ok) {
        const data = await res.json();
        setBuildings(data.buildings || []);
        if (initialBuilding) {
          const match = data.buildings.find((b: any) => b.id.toLowerCase().includes(initialBuilding.toLowerCase()) || b.name.toLowerCase().includes(initialBuilding.toLowerCase()));
          if (match) setSelectedBuilding(match);
        } else if (data.buildings.length > 0) {
          setSelectedBuilding(data.buildings[0]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredBuildings = buildings.filter((b) => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 text-on-surface">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 mb-8 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
            <Compass className="w-7 h-7 text-secondary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-display">Campus Navigation & Spatial Intelligence</h1>
            <p className="text-xs text-on-surface-variant mt-1">
              IIT Bhubaneswar Argul Master Campus Map • Multi-Floor Indoor Navigation & PostGIS Wayfinding
            </p>
          </div>
        </div>

        {/* View Switcher: Campus Map vs Multi-Floor Indoor */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-surface-container border border-outline-variant/30">
          <button
            onClick={() => setViewMode('campus')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'campus'
                ? 'bg-secondary text-surface font-bold shadow-md'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            Campus Master Map
          </button>
          <button
            onClick={() => setViewMode('indoor')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'indoor'
                ? 'bg-secondary text-surface font-bold shadow-md'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            Multi-Floor Indoor Wayfinding
          </button>
        </div>
      </div>

      {/* VIEW 1: CAMPUS MASTER MAP */}
      {viewMode === 'campus' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel: Search & Building List */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search building, school, or code (e.g. LHC, SBS, SIF)..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-xs text-white focus:outline-none focus:border-secondary transition-colors"
              />
            </div>

            <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-low overflow-hidden max-h-[580px] overflow-y-auto divide-y divide-outline-variant/20">
              {filteredBuildings.map((b) => {
                const isSelected = selectedBuilding?.id === b.id;
                return (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBuilding(b)}
                    className={`p-3.5 cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-secondary/15 border-l-4 border-l-secondary'
                        : 'hover:bg-surface-container'
                    }`}
                  >
                    <img
                      src={b.image_url}
                      alt={b.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0 ring-1 ring-outline-variant/30"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-secondary">{b.code}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant uppercase">
                          {b.category}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white truncate mt-0.5">{b.name}</h4>
                      <p className="text-[11px] text-on-surface-variant truncate mt-0.5">{b.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Interactive 2D/3D Spatial Map & Building Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visual Campus Schematic Map */}
            <div className="relative rounded-3xl overflow-hidden border border-outline-variant/30 bg-[#070e1f] shadow-2xl h-[400px] flex items-center justify-center p-4">
              {/* Map grid lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

              {/* Map Markers for Buildings */}
              <div className="relative w-full h-full">
                {buildings.map((b, idx) => {
                  // Normalize coordinates roughly inside canvas
                  // IIT Bhubaneswar lat ~ 20.143 to 20.155, lng ~ 85.670 to 85.680
                  const topPct = Math.min(90, Math.max(10, ((20.155 - b.lat) / 0.012) * 100));
                  const leftPct = Math.min(90, Math.max(10, ((b.lng - 85.670) / 0.010) * 100));
                  const isSelected = selectedBuilding?.id === b.id;

                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBuilding(b)}
                      style={{ top: `${topPct}%`, left: `${leftPct}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-10 ${
                        isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                      }`}
                    >
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md shadow-lg transition-all ${
                        isSelected
                          ? 'bg-secondary text-surface ring-4 ring-cyan-500/40 shadow-cyan-500/50'
                          : 'bg-surface-container-high/90 text-white border border-outline-variant/30 hover:border-secondary'
                      }`}>
                        <MapPin className={`w-3 h-3 ${isSelected ? 'text-surface' : 'text-secondary'}`} />
                        <span className="truncate max-w-[90px]">{b.code}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Controls Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-on-surface-variant font-mono bg-surface-container-lowest/80 backdrop-blur-md p-2.5 rounded-xl border border-outline-variant/20">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Argul Master Campus GIS: 20.1492° N, 85.6772° E</span>
                </span>
                <span className="text-secondary font-bold">20 Verified Buildings Mapped</span>
              </div>
            </div>

            {/* Selected Building Details Card */}
            {selectedBuilding && (
              <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 shadow-xl flex flex-col md:flex-row gap-6">
                <img
                  src={selectedBuilding.image_url}
                  alt={selectedBuilding.name}
                  className="w-full md:w-56 h-44 rounded-2xl object-cover ring-1 ring-outline-variant/30"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-secondary uppercase">
                        {selectedBuilding.code} • {selectedBuilding.category}
                      </span>
                      <span className="text-xs font-mono text-on-surface-variant">
                        {selectedBuilding.floors} Floors
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white font-display mb-2">
                      {selectedBuilding.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                      {selectedBuilding.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-outline-variant/20 flex flex-wrap gap-3">
                    <button
                      onClick={() => setViewMode('indoor')}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-container to-secondary text-white text-xs font-semibold shadow-md hover:scale-105 active:scale-95 transition-all"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>View Indoor Floor Maps</span>
                    </button>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${selectedBuilding.lat},${selectedBuilding.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 text-xs font-semibold text-on-surface transition-all"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 text-secondary" />
                      <span>Open in Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: MULTI-FLOOR INDOOR NAVIGATION */}
      {viewMode === 'indoor' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Lalitgiri Lecture Hall Complex (LHL) Multi-Floor Indoor Route
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Navigate between Ground Floor entrance, accessible elevators, and upper lecture amphitheaters (LH-1 to LH-4).
              </p>
            </div>

            {/* Floor Selection Buttons */}
            <div className="flex items-center gap-2 bg-surface-container p-1 rounded-xl border border-outline-variant/30">
              <button
                onClick={() => setSelectedFloor(1)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedFloor === 1
                    ? 'bg-secondary text-surface font-bold'
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                Floor 1 (Ground)
              </button>
              <button
                onClick={() => setSelectedFloor(2)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedFloor === 2
                    ? 'bg-secondary text-surface font-bold'
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                Floor 2 (Amphitheaters)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 2D Schematic Floor Map Canvas */}
            <div className="lg:col-span-2 relative rounded-3xl bg-[#091122] border border-outline-variant/30 p-6 min-h-[380px] flex items-center justify-center">
              <div className="relative w-full h-[320px] rounded-2xl border border-dashed border-outline-variant/40 bg-surface-container-lowest p-4">
                {/* Rooms on Current Floor */}
                {selectedFloor === 1 ? (
                  <>
                    {/* Entrance */}
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-bold text-center">
                      Main Entrance Portico & Ramp
                    </div>
                    {/* Corridor */}
                    <div className="absolute left-48 right-48 top-1/2 -translate-y-1/2 h-10 rounded-lg bg-surface-container border border-outline-variant/20 flex items-center justify-center text-[10px] text-on-surface-variant font-mono">
                      Central Foyer & Information Kiosk
                    </div>
                    {/* LH-1 */}
                    <div className="absolute left-48 top-6 p-4 rounded-xl bg-purple-500/20 border border-purple-500/50 text-white text-xs font-bold text-center">
                      LH-1: Lecture Hall 1 (Cap: 200)
                    </div>
                    {/* LH-2 */}
                    <div className="absolute left-48 bottom-6 p-4 rounded-xl bg-purple-500/20 border border-purple-500/50 text-white text-xs font-bold text-center">
                      LH-2: Lecture Hall 2 (Cap: 200)
                    </div>
                    {/* Stairs & Elevator */}
                    <div className="absolute right-6 top-10 p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs text-center font-mono">
                      Staircase A
                    </div>
                    <div className="absolute right-6 bottom-10 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-mono font-bold">
                      Glass Elevator 1 (Wheelchair Accessible)
                    </div>
                  </>
                ) : (
                  <>
                    {/* Floor 2 Concourse */}
                    <div className="absolute left-24 right-24 top-1/2 -translate-y-1/2 h-12 rounded-lg bg-surface-container border border-outline-variant/30 flex items-center justify-center text-xs text-secondary font-mono">
                      Second Floor Upper Concourse
                    </div>
                    {/* LH-3 */}
                    <div className="absolute left-32 top-6 p-4 rounded-xl bg-purple-500/20 border border-purple-500/50 text-white text-xs font-bold text-center ring-2 ring-secondary">
                      LH-3: Lecture Hall 3 (Cap: 120) [Destination]
                    </div>
                    {/* LH-4 */}
                    <div className="absolute left-32 bottom-6 p-4 rounded-xl bg-purple-500/20 border border-purple-500/50 text-white text-xs font-bold text-center">
                      LH-4: Lecture Hall 4 (Cap: 120)
                    </div>
                    {/* Elevator 2 */}
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-mono font-bold">
                      Elevator 1 Exit
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Turn-by-Turn Indoor Route Instructions */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-secondary" />
                <h4 className="text-sm font-bold text-white font-display">Step-by-Step Route Directions</h4>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-surface-container">
                  <span className="w-5 h-5 rounded-full bg-secondary text-surface font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                  <p className="text-white">Enter through Lalitgiri Hall Ground Portico (Wheelchair ramp available on left).</p>
                </div>
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-surface-container">
                  <span className="w-5 h-5 rounded-full bg-secondary text-surface font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                  <p className="text-white">Walk 25 meters down the Central Foyer past Information Kiosk.</p>
                </div>
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-surface-container">
                  <span className="w-5 h-5 rounded-full bg-secondary text-surface font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                  <p className="text-white">Take Glass Elevator 1 to Floor 2 (or use adjacent West Wing Staircase).</p>
                </div>
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-surface-container">
                  <span className="w-5 h-5 rounded-full bg-secondary text-surface font-bold text-[10px] flex items-center justify-center shrink-0">4</span>
                  <p className="text-white">Exit elevator and turn left into North Wing; Lecture Hall 3 (LH-3) is at Door 201.</p>
                </div>
              </div>

              <div className="pt-3 border-t border-outline-variant/20 flex justify-between text-xs text-on-surface-variant font-mono">
                <span>Total Indoor Distance: ~65 meters</span>
                <span className="text-secondary font-bold">Est. Time: 1.5 min</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
