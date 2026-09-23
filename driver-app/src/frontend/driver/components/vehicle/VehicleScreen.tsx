import React from 'react';
import { useDriver } from '../../context/DriverContext';
import { 
  Car, 
  Wrench, 
  AlertTriangle, 
  CheckCircle2
} from 'lucide-react';

export const VehicleScreen: React.FC = () => {
  const { 
    vehicle, 
    vehicleIssues, 
    setShowReportIssueModal, 
    playBeep 
  } = useDriver();

  const maintenanceProgress = Math.max(0, Math.min(100, Math.round(((5000 - vehicle.nextServiceKmRemaining) / 5000) * 100)));

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-[700] text-slate-900 dark:text-slate-100 tracking-tight">
            Assigned Fleet Vehicle
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-[400] mt-0.5">
            Technical specs, scheduled maintenance intervals, and fleet safety compliance
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-[590] text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-[14px] border border-[#34C759]/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Vehicle Status: {vehicle.status}
          </span>
        </div>
      </div>

      {/* Main 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (6 cols): Vehicle Hero, Distance, and Maintenance */}
        <div className="lg:col-span-6 space-y-6">
          {/* Vehicle Hero Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-[590] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {vehicle.type} Rickshaw
                </span>
                <h3 className="text-3xl font-[700] text-slate-900 dark:text-slate-100 tracking-tight mt-0.5">
                  {vehicle.model}
                </h3>
                <div className="mt-1 font-mono text-sm font-[590] px-3 py-1 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-[14px] inline-block border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                  {vehicle.registrationNumber}
                </div>
              </div>

              <div className="w-20 h-20 rounded-[14px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800">
                <Car className="w-10 h-10" />
              </div>
            </div>

            {/* Numbers */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-center">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-[590] block">Today's Distance Driven</span>
                <span className="text-2xl font-[700] text-slate-900 dark:text-slate-100 mt-1 block">{vehicle.todayDistanceKm} km</span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-center">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-[590] block">Total Completed Trips</span>
                <span className="text-2xl font-[700] text-slate-900 dark:text-slate-100 mt-1 block">{vehicle.totalTrips}</span>
              </div>
            </div>
          </div>

          {/* Maintenance Section */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h4 className="text-sm font-[700] uppercase tracking-wider text-slate-900 dark:text-slate-100">
                  Maintenance Schedule
                </h4>
              </div>
              <span className="text-xs font-[590] text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 px-3 py-1 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                {vehicle.nextServiceKmRemaining} km remaining
              </span>
            </div>

            <div>
              <div className="w-full bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 h-3 rounded-[14px] overflow-hidden border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                <div 
                  style={{ width: `${maintenanceProgress}%` }}
                  className="bg-blue-600 h-full rounded-[14px] transition-all duration-500"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-[400]">
                <span>Last service: {vehicle.lastServiceDate}</span>
                <span>Interval: Every 5,000 km</span>
              </div>
            </div>

            {/* Quick Health Indicators */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 text-center">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-[400] block">Tyre Pressure</span>
                <span className="text-xs font-[590] text-emerald-500 mt-0.5 block">28 PSI (Optimal)</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-[400] block">Engine Oil</span>
                <span className="text-xs font-[590] text-emerald-500 mt-0.5 block">Optimal Level</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-[400] block">Battery State</span>
                <span className="text-xs font-[590] text-emerald-500 mt-0.5 block">12.6V Normal</span>
              </div>
            </div>

            {/* Report Issue Button */}
            <button
              onClick={() => {
                playBeep('tap');
                setShowReportIssueModal(true);
              }}
              className="w-full mt-2 min-h-[44px] py-3 bg-white dark:bg-slate-800/60 hover:opacity-90 text-white dark:text-white font-[590] text-xs tracking-wider uppercase rounded-[14px] active-press transition flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              REPORT VEHICLE ISSUE
            </button>
          </div>
        </div>

        {/* Right Column (6 cols): Registration & Compliance Table + Reported Issues */}
        <div className="lg:col-span-6 space-y-6">
          {/* Detailed Registration Table */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-4">
            <h4 className="text-sm font-[700] uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Registration & Legal Compliance
            </h4>

            <div className="divide-y divide-[#D2D2D7] dark:divide-[#38383A] text-xs">
              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">Registration Number</span>
                <span className="font-mono font-[590] text-slate-900 dark:text-slate-100 text-sm">{vehicle.registrationNumber}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">Vehicle Model</span>
                <span className="font-[590] text-slate-900 dark:text-slate-100">{vehicle.model} (Auto Rickshaw)</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">Fuel System</span>
                <span className="font-[590] text-slate-900 dark:text-slate-100">{vehicle.fuelType}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">Insurance Policy Expiry</span>
                <span className="font-[590] text-emerald-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {vehicle.insuranceExpiry} (Active)
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">Fitness Certificate Expiry</span>
                <span className="font-[590] text-emerald-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {vehicle.fitnessExpiry} (Active)
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">Odometer Distance</span>
                <span className="font-[590] text-slate-900 dark:text-slate-100">{vehicle.totalDistanceKm.toLocaleString('en-IN')} km</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">Registered Fleet Owner</span>
                <span className="font-[590] text-slate-900 dark:text-slate-100">{vehicle.organization}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">Registered RTO</span>
                <span className="font-[590] text-slate-900 dark:text-slate-100">RTO Bhimavaram (AP-37)</span>
              </div>
            </div>
          </div>

          {/* Reported Issues History (if any) */}
          {vehicleIssues.length > 0 && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-3">
              <h4 className="text-xs font-[700] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Recent Issue Reports
              </h4>
              <div className="space-y-2.5">
                {vehicleIssues.map(issue => (
                  <div key={issue.id} className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-500/20 rounded-[14px] text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-[590] text-amber-500">{issue.category} Issue</span>
                      <span className="text-[10px] font-[590] text-amber-500 bg-amber-500/20 px-2 py-0.5 rounded-[14px]">
                        {issue.status}
                      </span>
                    </div>
                    <p className="text-slate-900 dark:text-slate-100">{issue.description}</p>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-[400] pt-1">
                      Reported: {issue.reportedAt}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
