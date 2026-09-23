import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { X, Wrench, Check, AlertTriangle } from 'lucide-react';
import type { MaintenancePriority } from '../../types';

export const ScheduleMaintenanceModal: React.FC = () => {
  const { 
    isScheduleMaintenanceOpen, 
    setIsScheduleMaintenanceOpen, 
    vehicles, 
    scheduleMaintenance 
  } = useManagement();

  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [issue, setIssue] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<MaintenancePriority>('MEDIUM');
  const [mechanic, setMechanic] = useState('Srinivas Rao (Head Mechanic)');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [expectedDate, setExpectedDate] = useState('2026-09-28');
  const [cost, setCost] = useState(2500);

  const [error, setError] = useState('');

  if (!isScheduleMaintenanceOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicleId) {
      setError('Please select a fleet vehicle');
      return;
    }
    if (!issue.trim()) {
      setError('Issue headline is required');
      return;
    }

    const veh = vehicles.find(v => v.id === selectedVehicleId);
    if (!veh) return;

    scheduleMaintenance({
      vehicleId: veh.id,
      vehicleRegistration: veh.registrationNumber,
      vehicleModel: `${veh.brand} ${veh.model}`,
      issue: issue.trim(),
      description: description.trim(),
      priority,
      assignedMechanic: mechanic,
      reportedDate: startDate,
      startDate,
      expectedCompletionDate: expectedDate,
      estimatedCost: Number(cost)
    });

    setIsScheduleMaintenanceOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="saas-card max-w-lg w-full overflow-hidden my-6 shadow-modal">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Schedule Workshop Maintenance</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Open a formal work order and ground vehicle asset for repair</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsScheduleMaintenanceOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs bg-white dark:bg-slate-900">
          
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Vehicle selection */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Select Fleet Asset to Ground *</label>
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="input-saas"
            >
              <option value="">-- Choose vehicle to ground for service --</option>
              {vehicles.map(v => (
                <option key={v.id} value={v.id}>
                  {v.registrationNumber} - {v.brand} {v.model} ({v.type}) [{v.status}]
                </option>
              ))}
            </select>
          </div>

          {/* Issue title */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Primary Issue / Service Title *</label>
            <input
              type="text"
              placeholder="e.g. 30,000 km Major Service & Brake Pad Replacement"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="input-saas"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Diagnostic Notes & Parts Required</label>
            <textarea
              rows={2}
              placeholder="e.g. Engine oil change, oil filter, rear brake shoe replacement, wheel alignment check."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-saas"
            />
          </div>

          {/* Priority & Mechanic */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as MaintenancePriority)}
                className="input-saas"
              >
                <option value="LOW">LOW (Scheduled Routine)</option>
                <option value="MEDIUM">MEDIUM (Standard Repair)</option>
                <option value="HIGH">HIGH (Mechanical Fault)</option>
                <option value="URGENT">URGENT (Safety Breakdown)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Assigned Mechanic</label>
              <input
                type="text"
                value={mechanic}
                onChange={(e) => setMechanic(e.target.value)}
                className="input-saas"
              />
            </div>
          </div>

          {/* Dates & Cost */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 text-[11px] mb-1.5">Service Start</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-saas py-1.5"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 text-[11px] mb-1.5">Est. Release</label>
              <input
                type="date"
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
                className="input-saas py-1.5"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 text-[11px] mb-1.5">Est. Cost (₹)</label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                className="input-saas py-1.5"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsScheduleMaintenanceOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <Check className="w-4 h-4" />
              <span>Create Work Order</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
