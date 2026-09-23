import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  X, 
  Phone, 
  Mail, 
  Calendar, 
  Award, 
  TrendingUp, 
  Car, 
  ShieldCheck, 
  AlertCircle, 
  Plus, 
  Check, 
  Power 
} from 'lucide-react';

export const DriverDetailsModal: React.FC = () => {
  const { 
    selectedDriver, 
    setSelectedDriver, 
    toggleDriverStatus, 
    setIsAssignModalOpen,
    updateDriver
  } = useManagement();

  const [issueText, setIssueText] = useState('');
  const [showIssueBox, setShowIssueBox] = useState(false);

  if (!selectedDriver) return null;

  const handleAddIssue = () => {
    if (!issueText.trim()) return;
    const updatedIssues = [...selectedDriver.reportedIssues, `${new Date().toLocaleDateString('en-GB')}: ${issueText.trim()}`];
    updateDriver(selectedDriver.id, { reportedIssues: updatedIssues });
    setIssueText('');
    setShowIssueBox(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="saas-card max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden my-6 shadow-modal">
        
        {/* Header Banner */}
        <div className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 p-5 relative">
          <button
            type="button"
            onClick={() => setSelectedDriver(null)}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pr-8">
            <div className="w-16 h-16 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-xs shrink-0">
              {selectedDriver.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{selectedDriver.name}</h2>
                <StatusBadge status={selectedDriver.status} type="driver" />
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 font-mono font-semibold text-slate-700 dark:text-slate-300">
                  {selectedDriver.driverId}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedDriver.phone}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedDriver.email}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Joined: {selectedDriver.joiningDate}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5 bg-white dark:bg-slate-900">
          
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <div className="saas-card p-3 text-center">
              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider block">Total Trips</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white mt-1 block">{selectedDriver.totalTrips}</span>
            </div>
            <div className="saas-card p-3 text-center">
              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider block">Completed</span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">{Math.round(selectedDriver.totalTrips * 0.94)}</span>
            </div>
            <div className="saas-card p-3 text-center">
              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider block">Cancelled</span>
              <span className="text-lg font-bold text-rose-500 mt-1 block">{Math.round(selectedDriver.totalTrips * 0.06)}</span>
            </div>
            <div className="saas-card p-3 text-center">
              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider block">Gross Earnings</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1 block">₹{selectedDriver.totalEarnings.toLocaleString('en-IN')}</span>
            </div>
            <div className="saas-card p-3 text-center">
              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider block">Rating</span>
              <span className="text-lg font-bold text-amber-500 mt-1 block">★ {selectedDriver.rating.toFixed(1)}</span>
            </div>
            <div className="saas-card p-3 text-center">
              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider block">Distance</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-1 block">{selectedDriver.totalDistanceKm} km</span>
            </div>
          </div>

          {/* Grid: Profile Details + Assigned Vehicle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Personal & License Information */}
            <div className="saas-card p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2.5 uppercase tracking-wider">
                Personal & Driving Credentials
              </h3>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">Date of Birth</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedDriver.dob}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">Emergency Contact</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedDriver.emergencyContact}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">Residential Address</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedDriver.address}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">Driving License No.</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white mt-0.5 block">{selectedDriver.licenseNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">License Expiry</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedDriver.licenseExpiry}</span>
                </div>
              </div>
            </div>

            {/* Assigned Vehicle Section */}
            <div className="saas-card p-4 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-blue-500" />
                    <span>Assigned Fleet Vehicle</span>
                  </h3>
                  <button 
                    type="button"
                    onClick={() => {
                      setSelectedDriver(null);
                      setIsAssignModalOpen(true);
                    }}
                    className="text-blue-600 dark:text-blue-400 font-semibold text-xs hover:underline"
                  >
                    Change
                  </button>
                </div>

                {selectedDriver.assignedVehicleReg ? (
                  <div className="mt-3 p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-mono text-base font-bold text-slate-900 dark:text-white block">
                        {selectedDriver.assignedVehicleReg}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {selectedDriver.assignedVehicleType || 'Standard Fleet Unit'}
                      </span>
                    </div>
                    <span className="badge-blue">
                      Paired
                    </span>
                  </div>
                ) : (
                  <div className="mt-3 p-5 bg-slate-50/60 dark:bg-slate-800/30 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-center">
                    <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">No vehicle paired with this driver</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDriver(null);
                        setIsAssignModalOpen(true);
                      }}
                      className="btn-primary py-1 px-3 text-xs"
                    >
                      Assign Vehicle
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
                <span>Last Telemetry Sync:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{selectedDriver.lastActive}</span>
              </div>
            </div>
          </div>

          {/* Documentation Verification Cards */}
          <div className="saas-card p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>KYC & Statutory Verification Checks</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">Driving License</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Verified</span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-1">{selectedDriver.licenseNumber}</p>
                <p className="text-[11px] text-slate-400">Exp: {selectedDriver.licenseExpiry}</p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">Aadhaar Identity</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Verified</span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-1">XXXX-XXXX-8921</p>
                <p className="text-[11px] text-slate-400">UIDAI Government Verified</p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">Police Verification</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Clear</span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-1">BVRM-PS-2025/110</p>
                <p className="text-[11px] text-slate-400">Valid till Dec 2026</p>
              </div>
            </div>
          </div>

          {/* Reported Issues / Notes */}
          <div className="saas-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>Driver Incident & Infraction Logs</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowIssueBox(!showIssueBox)}
                className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Log Incident</span>
              </button>
            </div>

            {showIssueBox && (
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3">
                <input
                  type="text"
                  placeholder="Enter infraction detail or supervisor note..."
                  value={issueText}
                  onChange={(e) => setIssueText(e.target.value)}
                  className="input-saas"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowIssueBox(false)}
                    className="btn-secondary py-1 px-3 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddIssue}
                    className="btn-primary py-1 px-3 text-xs"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            )}

            {selectedDriver.reportedIssues && selectedDriver.reportedIssues.length > 0 ? (
              <ul className="space-y-2 mt-2">
                {selectedDriver.reportedIssues.map((issue, idx) => (
                  <li key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 flex items-start gap-2.5 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 text-xs italic">No reported infractions or disciplinary issues on record.</p>
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {selectedDriver.status === 'Inactive' ? (
              <button
                type="button"
                onClick={() => {
                  toggleDriverStatus(selectedDriver.id, 'Available');
                  setSelectedDriver(null);
                }}
                className="btn-secondary text-xs"
              >
                <Power className="w-3.5 h-3.5 text-emerald-500" />
                <span>Reactivate Driver</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  toggleDriverStatus(selectedDriver.id, 'Inactive');
                  setSelectedDriver(null);
                }}
                className="btn-secondary text-xs hover:border-rose-400 hover:text-rose-600"
              >
                <Power className="w-3.5 h-3.5 text-rose-500" />
                <span>Deactivate Driver</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setSelectedDriver(null)}
            className="btn-secondary text-xs"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
};
