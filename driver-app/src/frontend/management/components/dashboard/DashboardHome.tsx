import React from 'react';
import { 
  Car, 
  Users, 
  Navigation, 
  IndianRupee, 
  Wrench, 
  AlertTriangle, 
  Plus, 
  Link2, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  Radio,
  Clock,
  ChevronRight
} from 'lucide-react';
import { useManagement } from '../../context/ManagementContext';
import { StatCard } from '../common/StatCard';
import { StatusBadge } from '../common/StatusBadge';

export const DashboardHome: React.FC = () => {
  const { 
    trips, 
    documentExpiries, 
    activityLogs, 
    setActiveTab, 
    setIsAddDriverOpen, 
    setIsAddVehicleOpen, 
    setIsAssignModalOpen, 
    setIsScheduleMaintenanceOpen, 
    setIsAIFloatingOpen,
    setSelectedTrip
  } = useManagement();

  // Metrics
  const totalVehicles = 50;
  const activeVehicles = 42;
  const availableVehicles = 31;
  const vehiclesInMaint = 5;
  const totalDrivers = 46;
  const activeDrivers = 38;
  const todayTripsCount = 127;
  const todayRevenue = 28450;

  // Breakdown counts
  const vehicleBreakdown = {
    available: 31,
    onTrip: 9,
    maintenance: 5,
    offline: 5
  };

  const driverBreakdown = {
    online: 28,
    onTrip: 10,
    offline: 8
  };

  const criticalDocuments = documentExpiries.filter(d => d.daysRemaining <= 7);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 1. Critical Operational Compliance Banner */}
      {criticalDocuments.length > 0 && (
        <div className="p-4 sm:p-5 rounded-xl bg-amber-100/70 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-slate-900 dark:text-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 flex items-center justify-center shrink-0 border border-amber-300 dark:border-amber-700">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-950 dark:text-amber-200 tracking-tight">
                Compliance Alert: {criticalDocuments.length} Regulatory Documents Expiring
              </h4>
              <p className="text-xs text-amber-900/90 dark:text-amber-300/90 mt-0.5">
                {criticalDocuments[0].entityName} ({criticalDocuments[0].documentType}) expires in {criticalDocuments[0].daysRemaining} days on {criticalDocuments[0].expiryDate}.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('documents')}
            className="self-start sm:self-center px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
          >
            <span>Audit Expiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Top Header & Primary KPI Grid */}
      <div className="space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Fleet Telematics & Command Center</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">Real-time operational indicators across Bhimavaram Hub</p>
          </div>
          <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Dispatch Active
          </span>
        </div>

        {/* Primary 8-Metric Operations Wall with dark blue hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Vehicles"
            value={totalVehicles}
            subtitle="Fleet capacity enrolled"
            icon={Car}
            colorTheme="blue"
            trend={{ value: "+2 this mo", isPositive: true }}
            onClick={() => setActiveTab('vehicles')}
          />

          <StatCard
            title="Active Vehicles"
            value={activeVehicles}
            subtitle="84% fleet utilization"
            icon={Activity}
            colorTheme="emerald"
            onClick={() => setActiveTab('vehicles')}
          />

          <StatCard
            title="Available Vehicles"
            value={availableVehicles}
            subtitle="Ready for dispatch"
            icon={Car}
            colorTheme="blue"
            onClick={() => setActiveTab('vehicles')}
          />

          <StatCard
            title="In Maintenance"
            value={vehiclesInMaint}
            subtitle="2 workshop, 3 scheduled"
            icon={Wrench}
            colorTheme="amber"
            onClick={() => setActiveTab('maintenance')}
          />

          <StatCard
            title="Total Drivers"
            value={totalDrivers}
            subtitle={`${activeDrivers} logged in today`}
            icon={Users}
            colorTheme="purple"
            trend={{ value: "+4 onboarded", isPositive: true }}
            onClick={() => setActiveTab('drivers')}
          />

          <StatCard
            title="Active Drivers"
            value={activeDrivers}
            subtitle="38 on duty across shifts"
            icon={Users}
            colorTheme="emerald"
            onClick={() => setActiveTab('drivers')}
          />

          <StatCard
            title="Today's Trips"
            value={todayTripsCount}
            subtitle="Avg distance: 11.4 km"
            icon={Navigation}
            colorTheme="blue"
            trend={{ value: "+18% vs yday", isPositive: true }}
            onClick={() => setActiveTab('trips')}
          />

          <StatCard
            title="Today's Revenue"
            value={`₹${todayRevenue.toLocaleString('en-IN')}`}
            subtitle="Net margin: ₹5,690"
            icon={IndianRupee}
            colorTheme="emerald"
            trend={{ value: "+12.4%", isPositive: true }}
            onClick={() => setActiveTab('payments')}
          />
        </div>
      </div>

      {/* 3. Quick Actions Toolbar with dark blue hover */}
      <div className="saas-card p-4 sm:p-5">
        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-3">
          Dispatcher Quick Actions
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            type="button"
            onClick={() => setIsAddDriverOpen(true)}
            className="p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-[#091e42] hover:border-blue-500 dark:hover:bg-[#091e42] dark:hover:border-blue-400 hover:shadow-lg transition-all text-left flex flex-col justify-between group cursor-pointer shadow-xs"
          >
            <div className="w-7 h-7 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all border border-blue-200 dark:border-blue-800">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-white block transition-colors">Add Driver</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-blue-200 font-medium transition-colors">Onboard partner</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setIsAddVehicleOpen(true)}
            className="p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-[#091e42] hover:border-blue-500 dark:hover:bg-[#091e42] dark:hover:border-blue-400 hover:shadow-lg transition-all text-left flex flex-col justify-between group cursor-pointer shadow-xs"
          >
            <div className="w-7 h-7 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all border border-blue-200 dark:border-blue-800">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-white block transition-colors">Add Vehicle</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-blue-200 font-medium transition-colors">Fleet register</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setIsAssignModalOpen(true)}
            className="p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-[#091e42] hover:border-blue-500 dark:hover:bg-[#091e42] dark:hover:border-blue-400 hover:shadow-lg transition-all text-left flex flex-col justify-between group cursor-pointer shadow-xs"
          >
            <div className="w-7 h-7 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all border border-purple-200 dark:border-purple-800">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-white block transition-colors">Assign Pair</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-blue-200 font-medium transition-colors">Driver ↔ Auto</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setIsScheduleMaintenanceOpen(true)}
            className="p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-[#091e42] hover:border-blue-500 dark:hover:bg-[#091e42] dark:hover:border-blue-400 hover:shadow-lg transition-all text-left flex flex-col justify-between group cursor-pointer shadow-xs"
          >
            <div className="w-7 h-7 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all border border-amber-200 dark:border-amber-800">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-white block transition-colors">Maintenance</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-blue-200 font-medium transition-colors">Workshop service</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('live')}
            className="p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-[#091e42] hover:border-blue-500 dark:hover:bg-[#091e42] dark:hover:border-blue-400 hover:shadow-lg transition-all text-left flex flex-col justify-between group cursor-pointer shadow-xs"
          >
            <div className="w-7 h-7 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all border border-emerald-200 dark:border-emerald-800">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-white block transition-colors">Live Telematics</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-blue-200 font-medium transition-colors">Radar map tracking</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setIsAIFloatingOpen(true)}
            className="p-3 rounded-lg border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white transition-all text-left flex flex-col justify-between group shadow-sm shadow-blue-500/20 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-md bg-white/20 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">AI Dispatcher</span>
              <span className="text-[10px] text-blue-100 font-medium">Smart prompt</span>
            </div>
          </button>
        </div>
      </div>

      {/* 4. Live Fleet Capacity & Driver Availability Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Vehicle Status */}
        <div className="lg:col-span-6 saas-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Fleet Vehicle Deployment</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Real-time status across 50 authorized units</p>
            </div>
            <span className="badge-blue">50 Active Units</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div 
              onClick={() => setActiveTab('vehicles')}
              className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#091e42] hover:border-blue-500 dark:hover:bg-[#091e42] dark:hover:border-blue-400 hover:shadow-lg cursor-pointer transition-all text-center border border-slate-300 dark:border-slate-700 shadow-xs group"
            >
              <span className="text-xl font-bold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-300 block transition-colors">{vehicleBreakdown.available}</span>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-white mt-0.5 transition-colors">Available</p>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-blue-200 font-medium transition-colors">Ready to pair</span>
            </div>

            <div 
              onClick={() => setActiveTab('live')}
              className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#091e42] hover:border-blue-500 dark:hover:bg-[#091e42] dark:hover:border-blue-400 hover:shadow-lg cursor-pointer transition-all text-center border border-slate-300 dark:border-slate-700 shadow-xs group"
            >
              <span className="text-xl font-bold text-blue-700 dark:text-blue-400 group-hover:text-blue-300 block transition-colors">{vehicleBreakdown.onTrip}</span>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-white mt-0.5 transition-colors">On Trip</p>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-blue-200 font-medium transition-colors">In transit</span>
            </div>

            <div 
              onClick={() => setActiveTab('maintenance')}
              className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#091e42] hover:border-blue-500 dark:hover:bg-[#091e42] dark:hover:border-blue-400 hover:shadow-lg cursor-pointer transition-all text-center border border-slate-300 dark:border-slate-700 shadow-xs group"
            >
              <span className="text-xl font-bold text-amber-700 dark:text-amber-400 group-hover:text-amber-300 block transition-colors">{vehicleBreakdown.maintenance}</span>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-white mt-0.5 transition-colors">Maintenance</p>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-blue-200 font-medium transition-colors">In garage</span>
            </div>

            <div 
              onClick={() => setActiveTab('vehicles')}
              className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#091e42] hover:border-blue-500 dark:hover:bg-[#091e42] dark:hover:border-blue-400 hover:shadow-lg cursor-pointer transition-all text-center border border-slate-300 dark:border-slate-700 shadow-xs group"
            >
              <span className="text-xl font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-200 block transition-colors">{vehicleBreakdown.offline}</span>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-white mt-0.5 transition-colors">Offline</p>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-blue-200 font-medium transition-colors">Depot standby</span>
            </div>
          </div>

          {/* Segmented Capacity Bar */}
          <div className="pt-1">
            <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
              <div style={{ width: '62%' }} className="bg-emerald-500" title="Available: 62%" />
              <div style={{ width: '18%' }} className="bg-blue-600" title="On Trip: 18%" />
              <div style={{ width: '10%' }} className="bg-amber-500" title="Maintenance: 10%" />
              <div style={{ width: '10%' }} className="bg-slate-400" title="Offline: 10%" />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 mt-2 font-medium">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> 62% Available</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-600" /> 18% On Trip</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> 10% Maintenance</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-400" /> 10% Offline</span>
            </div>
          </div>
        </div>

        {/* Right: Driver Availability */}
        <div className="lg:col-span-6 saas-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Driver Partner Roster</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Shift status across Godavari corridor</p>
            </div>
            <span className="badge-emerald">38 / 46 Online</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div 
              onClick={() => setActiveTab('drivers')}
              className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#091e42] hover:border-blue-500 dark:hover:bg-[#091e42] dark:hover:border-blue-400 hover:shadow-lg cursor-pointer transition-all text-center border border-slate-300 dark:border-slate-700 shadow-xs group"
            >
              <span className="text-xl font-bold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-300 block transition-colors">{driverBreakdown.online}</span>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-white mt-0.5 transition-colors">Online</p>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-blue-200 font-medium transition-colors">Available</span>
            </div>

            <div 
              onClick={() => setActiveTab('trips')}
              className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#091e42] hover:border-blue-500 dark:hover:bg-[#091e42] dark:hover:border-blue-400 hover:shadow-lg cursor-pointer transition-all text-center border border-slate-300 dark:border-slate-700 shadow-xs group"
            >
              <span className="text-xl font-bold text-blue-700 dark:text-blue-400 group-hover:text-blue-300 block transition-colors">{driverBreakdown.onTrip}</span>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-white mt-0.5 transition-colors">On Trip</p>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-blue-200 font-medium transition-colors">With rider</span>
            </div>

            <div 
              onClick={() => setActiveTab('drivers')}
              className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#091e42] hover:border-blue-500 dark:hover:bg-[#091e42] dark:hover:border-blue-400 hover:shadow-lg cursor-pointer transition-all text-center border border-slate-300 dark:border-slate-700 shadow-xs group"
            >
              <span className="text-xl font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-200 block transition-colors">{driverBreakdown.offline}</span>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-white mt-0.5 transition-colors">Offline</p>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-blue-200 font-medium transition-colors">Shift ended</span>
            </div>
          </div>

          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs">
            <span className="text-slate-700 dark:text-slate-300">
              Average dispatch pickup ETA: <strong className="text-slate-900 dark:text-white font-bold">4.8 minutes</strong>
            </span>
            <button 
              type="button"
              onClick={() => setActiveTab('drivers')}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Driver directory</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Live Trips Snapshot & Recent Audit Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Active Trips Telematics */}
        <div className="lg:col-span-7 saas-card p-5 space-y-3.5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Passenger Trips</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Live GPS tracking and route navigation</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('live')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View live map</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {trips.slice(0, 3).map(trip => (
              <div
                key={trip.id}
                onClick={() => {
                  setSelectedTrip(trip);
                  setActiveTab('trips');
                }}
                className="p-3.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100/90 dark:bg-slate-800 hover:bg-[#091e42] hover:border-blue-500 dark:hover:bg-[#091e42] dark:hover:border-blue-400 hover:shadow-xl transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group shadow-xs"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-200 bg-white dark:bg-slate-900 group-hover:bg-blue-900/60 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 group-hover:border-blue-700 transition-colors">
                      {trip.tripId}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-white transition-colors">
                      {trip.customerName}
                    </span>
                    <StatusBadge status={trip.status} size="sm" />
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 group-hover:text-blue-100 truncate transition-colors">
                    Driver: <span className="font-semibold text-slate-900 dark:text-white group-hover:text-white">{trip.driverName}</span> ({trip.vehicleRegistration} • {trip.vehicleType})
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 group-hover:text-blue-200 truncate flex items-center gap-1 transition-colors">
                    <span>{trip.pickup}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-300 shrink-0" />
                    <span>{trip.destination}</span>
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200 dark:border-slate-700 group-hover:border-blue-800 flex sm:flex-col justify-between items-center sm:items-end transition-colors">
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-white transition-colors">₹{trip.fare}</span>
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-300 flex items-center gap-1 mt-0.5 transition-colors">
                    <Clock className="w-3 h-3" />
                    ETA: {trip.etaMinutes ? `${trip.etaMinutes}m` : 'Arrived'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Trail */}
        <div className="lg:col-span-5 saas-card p-5 space-y-3.5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Audit & Operations Log</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Authenticated staff actions</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('activity')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Full log</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {activityLogs.slice(0, 4).map(log => (
              <div key={log.id} className="p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100/90 dark:bg-slate-800 hover:bg-[#091e42] hover:border-blue-500 dark:hover:bg-[#091e42] dark:hover:border-blue-400 transition-all text-xs space-y-1 shadow-xs group cursor-default">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 group-hover:text-blue-300 text-[11px] transition-colors">
                  <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-white">{log.user} (Management)</span>
                  <span>{log.timestamp}</span>
                </div>
                <p className="font-semibold text-slate-900 dark:text-white group-hover:text-white transition-colors">{log.action}</p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 group-hover:text-blue-200 transition-colors">{log.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
