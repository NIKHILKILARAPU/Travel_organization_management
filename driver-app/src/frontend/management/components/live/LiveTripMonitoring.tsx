import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Radio, 
  Search, 
  MapPin, 
  Navigation, 
  Compass, 
  Crosshair, 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Zap, 
  Gauge 
} from 'lucide-react';
import type { ManagementTripRecord, TripStatus } from '../../types';

export const LiveTripMonitoring: React.FC = () => {
  const { trips, setSelectedTrip, setSelectedDriver, setSelectedCustomer } = useManagement();
  const [filterStatus, setFilterStatus] = useState<TripStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMapVehicle, setActiveMapVehicle] = useState<string | null>('AP 39 AB 1234');

  // Filter trips
  const filteredTrips = trips.filter(trip => {
    const matchesStatus = filterStatus === 'ALL' || trip.status === filterStatus;
    const matchesSearch = 
      trip.tripId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (trip.driverName && trip.driverName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (trip.vehicleRegistration && trip.vehicleRegistration.toLowerCase().includes(searchQuery.toLowerCase())) ||
      trip.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const activeCount = trips.filter(t => t.status === 'IN_PROGRESS' || t.status === 'DRIVER_ARRIVED' || t.status === 'ACCEPTED').length;
  const completedCount = trips.filter(t => t.status === 'COMPLETED').length;
  const requestedCount = trips.filter(t => t.status === 'REQUESTED').length;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span>Live Fleet Telematics & Radar Stream</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real-time GPS tracking stream, geo-fence boundaries, and in-transit monitoring across West Godavari district</p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700/60 overflow-x-auto gap-1">
          {(['ALL', 'IN_PROGRESS', 'ACCEPTED', 'REQUESTED', 'COMPLETED'] as const).map(st => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === st 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* KPI mini-strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="saas-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Live Active Transit</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{activeCount}</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Navigation className="w-4 h-4" />
          </div>
        </div>

        <div className="saas-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pending Acceptance</p>
            <p className="text-2xl font-bold text-amber-500 mt-1">{requestedCount}</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="saas-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Completed Today</p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{completedCount}</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="saas-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Telematics Health</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">99.4%</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Grid: Interactive Telematics Map + Active Vehicle Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Vector Map Preview */}
        <div className="lg:col-span-2 saas-card overflow-hidden relative min-h-[420px] flex flex-col bg-slate-900 text-white">
          {/* Map Toolbar overlay */}
          <div className="absolute top-3.5 left-3.5 z-10 bg-slate-950/80 backdrop-blur-md border border-slate-700/60 rounded-lg px-3 py-1.5 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[11px] font-bold tracking-wider text-slate-200 uppercase font-mono">
              BHIMAVARAM TELEMATICS SECTOR • 14 FLEET ASSETS ONLINE
            </span>
          </div>

          <div className="absolute top-3.5 right-3.5 z-10 flex gap-2">
            <button 
              type="button"
              className="px-3 py-1.5 bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-700/60 rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors"
            >
              Reset Center
            </button>
            <button 
              type="button"
              className="btn-primary py-1.5 px-3 text-xs"
            >
              Live Radar
            </button>
          </div>

          {/* Interactive Vector Map Canvas */}
          <div className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center p-4">
            <svg className="w-full h-full min-h-[340px]" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Roads / delta grid */}
              <defs>
                <pattern id="grid-dark" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" opacity="0.6" />
                </pattern>
              </defs>
              <rect width="800" height="450" fill="url(#grid-dark)" />

              {/* Waterways / Canals around Bhimavaram */}
              <path d="M-20,120 C180,140 260,80 420,100 C580,120 680,60 820,80" stroke="#0f172a" strokeWidth="12" fill="none" />
              <path d="M120,450 C180,320 280,260 380,240 C520,220 680,310 820,300" stroke="#0f172a" strokeWidth="10" fill="none" />

              {/* Arterial Highways */}
              <path d="M 50,420 L 320,260 L 520,190 L 760,110" stroke="#334155" strokeWidth="10" strokeLinecap="round" />
              <path d="M 50,420 L 320,260 L 520,190 L 760,110" stroke="#475569" strokeWidth="4" strokeLinecap="round" />

              {/* Tadepalligudem Road */}
              <path d="M 220,30 L 320,150 L 320,260 L 380,410" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
              <path d="M 220,30 L 320,150 L 320,260 L 380,410" stroke="#475569" strokeWidth="3" strokeLinecap="round" />

              {/* Palakollu Bypass */}
              <path d="M 480,40 L 520,190 L 640,320 L 750,440" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
              <path d="M 480,40 L 520,190 L 640,320 L 750,440" stroke="#475569" strokeWidth="3" strokeLinecap="round" />

              {/* Active Trip Route 1 */}
              <path d="M 180,340 C 220,320 280,280 320,260 C 370,230 420,220 460,200" stroke="#3b82f6" strokeWidth="3" strokeDasharray="6 4" fill="none" />

              {/* Town Markers */}
              <g className="cursor-pointer">
                <circle cx="320" cy="260" r="5" fill="#f8fafc" />
                <text x="332" y="264" fill="#94a3b8" fontSize="10" fontFamily="sans-serif" fontWeight="600">Bhimavaram RTC Depot</text>
              </g>

              <g className="cursor-pointer">
                <circle cx="180" cy="340" r="4" fill="#64748b" />
                <text x="110" y="360" fill="#64748b" fontSize="9" fontFamily="sans-serif">SRKR Engg College</text>
              </g>

              <g className="cursor-pointer">
                <circle cx="460" cy="200" r="4" fill="#64748b" />
                <text x="475" y="204" fill="#64748b" fontSize="9" fontFamily="sans-serif">Mavullamma Temple</text>
              </g>

              <g className="cursor-pointer">
                <circle cx="520" cy="190" r="4" fill="#64748b" />
                <text x="532" y="185" fill="#64748b" fontSize="9" fontFamily="sans-serif">GNR Hospital</text>
              </g>

              {/* Vehicle 1 Marker (Active Trip) */}
              <g 
                className="cursor-pointer transition-transform hover:scale-125"
                onClick={() => setActiveMapVehicle('AP 39 AB 1234')}
              >
                <circle cx="280" cy="285" r="16" fill="#3b82f6" fillOpacity="0.25" className="animate-pulse" />
                <circle cx="280" cy="285" r="9" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                <rect x="235" y="306" width="90" height="20" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <text x="242" y="320" fill="#f8fafc" fontSize="8" fontWeight="bold" fontFamily="monospace">AP 39 AB 1234 • 38k</text>
              </g>

              {/* Vehicle 2 Marker */}
              <g 
                className="cursor-pointer transition-transform hover:scale-125"
                onClick={() => setActiveMapVehicle('AP 39 CD 5678')}
              >
                <circle cx="490" cy="195" r="12" fill="#3b82f6" fillOpacity="0.2" />
                <circle cx="490" cy="195" r="8" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
                <rect x="445" y="212" width="90" height="20" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <text x="452" y="226" fill="#f8fafc" fontSize="8" fontWeight="bold" fontFamily="monospace">AP 39 CD 5678 • 46k</text>
              </g>

              {/* Vehicle 3 Marker (Available) */}
              <g 
                className="cursor-pointer transition-transform hover:scale-125"
                onClick={() => setActiveMapVehicle('AP 31 EF 9012')}
              >
                <circle cx="340" cy="245" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                <rect x="300" y="215" width="80" height="18" rx="4" fill="#0f172a" stroke="#334155" />
                <text x="308" y="227" fill="#10b981" fontSize="8" fontWeight="bold" fontFamily="monospace">AP 31 EF 9012</text>
              </g>
            </svg>
          </div>

          {/* Bottom live stats */}
          <div className="bg-slate-950/80 backdrop-blur-md border-t border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-4">
              <span>Telemetry Focus: <strong className="text-white font-mono">{activeMapVehicle}</strong></span>
              <span className="hidden sm:inline">Telemetry Frequency: <strong className="text-white">2.5s</strong></span>
              <span className="hidden sm:inline">Accuracy: <strong className="text-white">±3.2m</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-emerald-400 font-medium text-[11px]">Stream Active</span>
            </div>
          </div>
        </div>

        {/* Selected Vehicle Telematics Panel */}
        <div className="saas-card p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Selected Telematics Unit</span>
              <span className="badge-blue">
                In Transit
              </span>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-mono tracking-tight">{activeMapVehicle}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Bajaj RE Compact 4S • Auto Rickshaw</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
                  🛺
                </div>
              </div>

              {/* Telematics stats */}
              <div className="grid grid-cols-2 gap-2.5 mt-4">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Speed</span>
                  <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">38 <span className="text-xs font-normal text-slate-400">km/h</span></span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Fuel / CNG</span>
                  <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">78%</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Engine Temp</span>
                  <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">84°C</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Distance Today</span>
                  <span className="text-base font-bold text-blue-600 dark:text-blue-400 mt-0.5 block">46.8 km</span>
                </div>
              </div>

              {/* Current Driver & Trip */}
              <div className="mt-3.5 p-3 rounded-xl bg-slate-50/60 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    RK
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Rahul Kumar <span className="text-[10px] text-slate-400 font-mono">(DRV-001)</span></h4>
                    <p className="text-[11px] text-slate-500">+91 98480 22334</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0"></span>
                    <span className="text-slate-500 truncate">From: <strong className="text-slate-800 dark:text-slate-200 font-medium">Bhimavaram RTC Depot</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0"></span>
                    <span className="text-slate-500 truncate">To: <strong className="text-slate-800 dark:text-slate-200 font-medium">SRKR Engg College</strong></span>
                  </div>
                  <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700 mt-2">
                    <span className="text-[11px] text-slate-400">ETA: <strong className="text-slate-900 dark:text-white">8 mins</strong></span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">₹95</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <button 
              type="button"
              onClick={() => {
                const trip = trips.find(t => t.vehicleRegistration === activeMapVehicle);
                if (trip) setSelectedTrip(trip);
              }}
              className="btn-primary flex-1 text-xs"
            >
              Inspect Active Trip
            </button>
            <button 
              type="button"
              onClick={() => alert(`Ping sent to ${activeMapVehicle} telematics unit`)}
              className="btn-secondary text-xs"
            >
              Ping
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Trips Table */}
      <div className="saas-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Live & Recent Transit Telematics Records</h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono font-medium">
              {filteredTrips.length} units
            </span>
          </div>

          <div className="w-full sm:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search trip, driver, customer, route..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-saas pl-9 py-2 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="saas-table-header">
                <th className="py-3 px-4">Trip ID</th>
                <th className="py-3 px-4">Chauffeur & Asset</th>
                <th className="py-3 px-4">Passenger</th>
                <th className="py-3 px-4">Transit Route</th>
                <th className="py-3 px-4">Start Time / ETA</th>
                <th className="py-3 px-4">Fare</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Radar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredTrips.map((trip: ManagementTripRecord) => (
                <tr key={trip.id} className="saas-table-row">
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-900 dark:text-white">
                    {trip.tripId}
                  </td>
                  <td className="py-3.5 px-4">
                    {trip.driverName ? (
                      <div>
                        <button
                          type="button" 
                          onClick={() => {
                            const d = { id: trip.driverId || '', name: trip.driverName || '' } as any;
                            setSelectedDriver(d);
                          }}
                          className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 transition-colors text-left"
                        >
                          {trip.driverName}
                        </button>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {trip.vehicleRegistration || 'Unpaired'}
                        </div>
                      </div>
                    ) : (
                      <span className="text-amber-500 italic text-[11px]">Pending Chauffeur</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      type="button" 
                      onClick={() => {
                        const c = { id: trip.customerId, name: trip.customerName } as any;
                        setSelectedCustomer(c);
                      }}
                      className="font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 transition-colors text-left"
                    >
                      {trip.customerName}
                    </button>
                    <div className="text-[11px] text-slate-400 mt-0.5">{trip.customerPhone}</div>
                  </td>
                  <td className="py-3.5 px-4 max-w-[200px]">
                    <div className="truncate text-slate-800 dark:text-slate-200 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                      <span className="truncate">{trip.pickup}</span>
                    </div>
                    <div className="truncate text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                      <span className="truncate">{trip.destination}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-700 dark:text-slate-300 font-medium">{trip.time}</div>
                    {trip.etaMinutes ? (
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">ETA ~{trip.etaMinutes} mins</span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">--</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    ₹{trip.fare}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={trip.status} type="trip" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {trip.vehicleRegistration && (
                        <button
                          type="button"
                          onClick={() => setActiveMapVehicle(trip.vehicleRegistration!)}
                          className="btn-ghost p-1 text-slate-400 hover:text-blue-600"
                          title="Center radar on vehicle"
                        >
                          <Crosshair className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedTrip(trip)}
                        className="btn-ghost py-1 px-2.5 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                      >
                        Inspect
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTrips.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs">
              No live transit trips match the selected criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
