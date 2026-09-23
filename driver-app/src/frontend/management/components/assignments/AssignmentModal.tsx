import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { X, Link2, Check, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AssignmentModal: React.FC = () => {
  const { 
    isAssignModalOpen, 
    setIsAssignModalOpen, 
    drivers, 
    vehicles, 
    assignVehicle 
  } = useManagement();

  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isAssignModalOpen) return null;

  const activeDrivers = drivers.filter(d => d.status !== 'Inactive');
  const availableVehicles = vehicles.filter(v => v.status !== 'MAINTENANCE' && v.status !== 'INACTIVE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!selectedDriverId) {
      setErrorMessage('Please select a driver');
      return;
    }
    if (!selectedVehicleId) {
      setErrorMessage('Please select a vehicle');
      return;
    }

    const res = assignVehicle(selectedDriverId, selectedVehicleId, notes);
    if (!res.success) {
      setErrorMessage(res.message);
    } else {
      setSuccessMessage(res.message);
      setTimeout(() => {
        setIsAssignModalOpen(false);
        setSuccessMessage('');
        setSelectedDriverId('');
        setSelectedVehicleId('');
        setNotes('');
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="saas-card max-w-lg w-full overflow-hidden my-6 shadow-modal">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Allocate Vehicle to Chauffeur</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Pair driver credentials with commercial vehicle registration</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAssignModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 bg-white dark:bg-slate-900 text-xs">
          
          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Select Driver */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Select Chauffeur Partner *</label>
            <select
              value={selectedDriverId}
              onChange={(e) => setSelectedDriverId(e.target.value)}
              className="input-saas"
            >
              <option value="">-- Choose active driver --</option>
              {activeDrivers.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.driverId}) - {d.status} {d.assignedVehicleReg ? `[Paired: ${d.assignedVehicleReg}]` : '[Free]'}
                </option>
              ))}
            </select>
          </div>

          {/* Select Vehicle */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Select Fleet Asset *</label>
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="input-saas"
            >
              <option value="">-- Choose fleet vehicle --</option>
              {availableVehicles.map(v => (
                <option key={v.id} value={v.id}>
                  {v.registrationNumber} - {v.brand} {v.model} ({v.type}) [{v.status}] {v.assignedDriverName ? `[Driver: ${v.assignedDriverName}]` : '[Free]'}
                </option>
              ))}
            </select>
          </div>

          {/* Assignment Date */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Effective Roster Date</label>
            <input
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              className="input-saas"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Shift Notes / Shift Timing</label>
            <textarea
              rows={2}
              placeholder="e.g. Morning 06:00 - 18:00 shift roster"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input-saas"
            />
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsAssignModalOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Pairing</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
