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
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Assigned Fleet Vehicle
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Technical specs, scheduled maintenance intervals, and fleet safety compliance
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
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
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {vehicle.type} Rickshaw
                </span>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                  {vehicle.model}
                </h3>
                <div className="mt-1 font-mono text-sm font-extrabold px-3 py-1 bg-slate-100 text-slate-800 rounded-lg inline-block border border-slate-200">
                  {vehicle.registrationNumber}
                </div>
              </div>

              <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm">
                <Car className="w-10 h-10" />
              </div>
            </div>

            {/* Numbers */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <span className="text-xs text-slate-500 font-semibold block">Today's Distance Driven</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">{vehicle.todayDistanceKm} km</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <span className="text-xs text-slate-500 font-semibold block">Total Completed Trips</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">{vehicle.totalTrips}</span>
              </div>
            </div>
          </div>

          {/* Maintenance Section */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-emerald-600" />
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                  Maintenance Schedule
                </h4>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-xl">
                {vehicle.nextServiceKmRemaining} km remaining
              </span>
            </div>

            <div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${maintenanceProgress}%` }}
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 mt-1.5 font-medium">
                <span>Last service: {vehicle.lastServiceDate}</span>
                <span>Interval: Every 5,000 km</span>
              </div>
            </div>

            {/* Quick Health Indicators */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-center">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[11px] text-slate-400 font-medium block">Tyre Pressure</span>
                <span className="text-xs font-bold text-emerald-700 mt-0.5 block">28 PSI (Optimal)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[11px] text-slate-400 font-medium block">Engine Oil</span>
                <span className="text-xs font-bold text-emerald-700 mt-0.5 block">Optimal Level</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[11px] text-slate-400 font-medium block">Battery State</span>
                <span className="text-xs font-bold text-emerald-700 mt-0.5 block">12.6V Normal</span>
              </div>
            </div>

            {/* Report Issue Button */}
            <button
              onClick={() => {
                playBeep('tap');
                setShowReportIssueModal(true);
              }}
              className="w-full mt-2 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs tracking-wider uppercase rounded-2xl active-press transition flex items-center justify-center gap-2 shadow-sm"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              REPORT VEHICLE ISSUE
            </button>
          </div>
        </div>

        {/* Right Column (6 cols): Registration & Compliance Table + Reported Issues */}
        <div className="lg:col-span-6 space-y-6">
          {/* Detailed Registration Table */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">
              Registration & Legal Compliance
            </h4>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Registration Number</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{vehicle.registrationNumber}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Vehicle Model</span>
                <span className="font-bold text-slate-900">{vehicle.model} (Auto Rickshaw)</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Fuel System</span>
                <span className="font-bold text-slate-900">{vehicle.fuelType}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Insurance Policy Expiry</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {vehicle.insuranceExpiry} (Active)
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Fitness Certificate Expiry</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {vehicle.fitnessExpiry} (Active)
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Odometer Distance</span>
                <span className="font-bold text-slate-900">{vehicle.totalDistanceKm.toLocaleString('en-IN')} km</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Registered Fleet Owner</span>
                <span className="font-bold text-slate-900">{vehicle.organization}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Registered RTO</span>
                <span className="font-bold text-slate-900">RTO Bhimavaram (AP-37)</span>
              </div>
            </div>
          </div>

          {/* Reported Issues History (if any) */}
          {vehicleIssues.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Recent Issue Reports
              </h4>
              <div className="space-y-2.5">
                {vehicleIssues.map(issue => (
                  <div key={issue.id} className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-900">{issue.category} Issue</span>
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        {issue.status}
                      </span>
                    </div>
                    <p className="text-slate-700">{issue.description}</p>
                    <div className="text-[10px] text-slate-400 font-medium pt-1">
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
