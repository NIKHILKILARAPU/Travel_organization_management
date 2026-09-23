import React from 'react';
import { useManagement } from '../../context/ManagementContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  X, 
  AlertTriangle, 
  Wrench, 
  ShieldCheck, 
  Calendar, 
  UserCheck, 
  Car, 
  FileText, 
  Clock, 
  Gauge 
} from 'lucide-react';

export const VehicleDetailsModal: React.FC = () => {
  const { 
    selectedVehicle, 
    setSelectedVehicle, 
    setIsScheduleMaintenanceOpen,
    setIsAssignModalOpen 
  } = useManagement();

  if (!selectedVehicle) return null;

  // Calculate days to insurance expiry
  const today = new Date();
  const insDate = new Date(selectedVehicle.insuranceExpiry);
  const fitDate = new Date(selectedVehicle.fitnessExpiry);
  const insDays = Math.ceil((insDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const fitDays = Math.ceil((fitDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="saas-card max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden my-6 shadow-modal">
        
        {/* Header Banner */}
        <div className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 p-5 relative">
          <button
            type="button"
            onClick={() => setSelectedVehicle(null)}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-lg font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-900 dark:text-white">
                  {selectedVehicle.registrationNumber}
                </span>
                <StatusBadge status={selectedVehicle.status} type="vehicle" />
              </div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-2">
                {selectedVehicle.brand} {selectedVehicle.model} ({selectedVehicle.year}) • {selectedVehicle.type} • {selectedVehicle.fuelType}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span>Asset ID: {selectedVehicle.vehicleId}</span>
                <span>•</span>
                <span>RC: {selectedVehicle.rcNumber}</span>
                <span>•</span>
                <span>Odometer: {selectedVehicle.odometerKm.toLocaleString('en-IN')} km</span>
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Assigned Driver</span>
              {selectedVehicle.assignedDriverName ? (
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {selectedVehicle.assignedDriverName.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white text-sm">{selectedVehicle.assignedDriverName}</span>
                </div>
              ) : (
                <span className="text-slate-400 text-xs italic mt-1.5">Unpaired</span>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5 bg-white dark:bg-slate-900">
          
          {/* Critical Compliance Warning Banners */}
          {(insDays <= 30 || fitDays <= 30 || selectedVehicle.odometerKm >= selectedVehicle.serviceDueKm - 500) && (
            <div className="space-y-2.5">
              {insDays <= 30 && (
                <div className="p-3.5 rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-xs text-amber-900 dark:text-amber-200">
                      {insDays <= 0 ? 'Vehicle Insurance has EXPIRED!' : `Vehicle Insurance expires in ${insDays} days (${selectedVehicle.insuranceExpiry})`}
                    </h4>
                    <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">Renew policy promptly to maintain road transit authorization.</p>
                  </div>
                </div>
              )}

              {fitDays <= 30 && (
                <div className="p-3.5 rounded-lg border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-xs text-rose-900 dark:text-rose-200">
                      {fitDays <= 0 ? 'RTO Fitness Certificate has EXPIRED!' : `RTO Fitness Certificate expires in ${fitDays} days (${selectedVehicle.fitnessExpiry})`}
                    </h4>
                    <p className="text-[11px] text-rose-700 dark:text-rose-400 mt-0.5">Schedule inspection at nearest RTO testing depot.</p>
                  </div>
                </div>
              )}

              {selectedVehicle.odometerKm >= selectedVehicle.serviceDueKm - 500 && (
                <div className="p-3.5 rounded-lg border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30 flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-xs text-blue-900 dark:text-blue-200">
                      Scheduled Service Due in {Math.max(0, selectedVehicle.serviceDueKm - selectedVehicle.odometerKm)} km
                    </h4>
                    <p className="text-[11px] text-blue-700 dark:text-blue-400 mt-0.5">Next preventive maintenance due at {selectedVehicle.serviceDueKm.toLocaleString('en-IN')} km.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Operational Utilization Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="saas-card p-3 text-center">
              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider block">Utilization</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1 block">{selectedVehicle.utilizationPercent}%</span>
            </div>
            <div className="saas-card p-3 text-center">
              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider block">Active Hours</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-1 block">{selectedVehicle.activeHours} hrs</span>
            </div>
            <div className="saas-card p-3 text-center">
              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider block">In-Transit</span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">{selectedVehicle.tripHours} hrs</span>
            </div>
            <div className="saas-card p-3 text-center">
              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider block">Idle Time</span>
              <span className="text-lg font-bold text-slate-500 dark:text-slate-400 mt-1 block">{selectedVehicle.idleHours} hrs</span>
            </div>
            <div className="saas-card p-3 text-center">
              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider block">Downtime</span>
              <span className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-1 block">{selectedVehicle.maintenanceHours} hrs</span>
            </div>
          </div>

          {/* Grid: Vehicle Specs & Service Telemetry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="saas-card p-4 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2">
                <Car className="w-4 h-4 text-blue-500" />
                <span>Vehicle Specifications</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">Manufacturer</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedVehicle.brand}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">Model Variant</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedVehicle.model}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">Mfg Year</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedVehicle.year}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">Capacity</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedVehicle.capacity} Persons</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">Color</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedVehicle.color}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">Ownership</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedVehicle.owner}</span>
                </div>
              </div>
            </div>

            <div className="saas-card p-4 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-indigo-500" />
                <span>Service & Telemetry Milestones</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Last Service Date</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{selectedVehicle.lastServiceDate}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Next Service Schedule</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">{selectedVehicle.nextServiceDate}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Pollution (PUCC) Expiry</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{selectedVehicle.pollutionExpiry}</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Odometer Milestone</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">{selectedVehicle.odometerKm} / {selectedVehicle.serviceDueKm} km</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statutory Documents Check */}
          <div className="saas-card p-4 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Mandatory Statutory Documents</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">RC Smart Card</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Valid</span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono mt-1">{selectedVehicle.rcNumber}</p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">Motor Insurance</span>
                  <span className={`text-[10px] font-bold ${insDays <= 7 ? 'text-rose-600' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {insDays <= 0 ? 'Expired' : 'Active'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Exp: {selectedVehicle.insuranceExpiry}</p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">Fitness (FC)</span>
                  <span className={`text-[10px] font-bold ${fitDays <= 7 ? 'text-rose-600' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {fitDays <= 0 ? 'Expired' : 'Active'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Exp: {selectedVehicle.fitnessExpiry}</p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">PUCC Emission</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Active</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Exp: {selectedVehicle.pollutionExpiry}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                setSelectedVehicle(null);
                setIsScheduleMaintenanceOpen(true);
              }}
              className="btn-secondary text-xs"
            >
              <Wrench className="w-3.5 h-3.5 text-slate-500" />
              <span>Schedule Service</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedVehicle(null);
                setIsAssignModalOpen(true);
              }}
              className="btn-primary text-xs"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{selectedVehicle.assignedDriverId ? 'Reassign Driver' : 'Assign Driver'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSelectedVehicle(null)}
            className="btn-secondary text-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
