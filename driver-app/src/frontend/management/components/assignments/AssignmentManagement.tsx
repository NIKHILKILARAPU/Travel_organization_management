import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { 
  Link2, 
  Plus, 
  Search, 
  ShieldCheck, 
  AlertCircle, 
  Car, 
  UserCheck, 
  Calendar, 
  Clock, 
  XCircle 
} from 'lucide-react';
import type { VehicleAssignmentRecord } from '../../types';

export const AssignmentManagement: React.FC = () => {
  const { assignments, unassignVehicle, setIsAssignModalOpen } = useManagement();
  const [filterType, setFilterType] = useState<'ALL' | 'ACTIVE' | 'ENDED'>('ACTIVE');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssignments = assignments.filter(item => {
    const matchesFilter = 
      filterType === 'ALL' ||
      (filterType === 'ACTIVE' && item.status === 'Active') ||
      (filterType === 'ENDED' && item.status === 'Ended');

    const matchesSearch = 
      item.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.driverPhone.includes(searchQuery) ||
      item.vehicleRegistration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const activeCount = assignments.filter(a => a.status === 'Active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Driver ↔ Asset Assignment Roster</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage driver vehicle pairings, shift reassignments, and conflict prevention</p>
        </div>

        <button
          type="button"
          onClick={() => setIsAssignModalOpen(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          <span>New Pairing</span>
        </button>
      </div>

      {/* Rules Notice */}
      <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 dark:text-slate-300">
          <span className="font-bold text-blue-950 dark:text-blue-200">Enforced System Policies:</span>
          <span className="block text-slate-500 dark:text-slate-400 mt-0.5 text-[11px] leading-relaxed">
            • A commercial vehicle cannot be simultaneously paired with multiple active drivers.
            • Vehicles in workshop maintenance cannot receive dispatch assignment.
            • Deactivated drivers cannot be allocated vehicle keys.
          </span>
        </div>
      </div>

      {/* Search & Tabs */}
      <div className="saas-card p-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex-1 w-full md:max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search driver, phone, or vehicle registration..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-saas pl-9"
          />
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => setFilterType('ACTIVE')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              filterType === 'ACTIVE' 
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('ENDED')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              filterType === 'ENDED' 
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Past History
          </button>
          <button
            type="button"
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              filterType === 'ALL' 
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Logs
          </button>
        </div>
      </div>

      {/* Assignment Table */}
      <div className="saas-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="saas-table-header">
                <th className="py-3 px-4">Chauffeur</th>
                <th className="py-3 px-4">Assigned Asset</th>
                <th className="py-3 px-4">Asset Type</th>
                <th className="py-3 px-4">Allocated Date</th>
                <th className="py-3 px-4">Authorizing Manager</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Notes / Shift</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredAssignments.map((rec: VehicleAssignmentRecord) => (
                <tr key={rec.id} className="saas-table-row">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{rec.driverName}</div>
                    <div className="text-[11px] text-slate-400">{rec.driverPhone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-semibold text-xs text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 inline-block">
                      {rec.vehicleRegistration}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                    {rec.vehicleType}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-700 dark:text-slate-300">{rec.assignmentDate}</div>
                    {rec.unassignedDate && (
                      <div className="text-[11px] text-slate-400">Ended: {rec.unassignedDate}</div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                    {rec.assignedBy}
                  </td>
                  <td className="py-3.5 px-4">
                    {rec.status === 'Active' ? (
                      <span className="badge-emerald">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Active
                      </span>
                    ) : (
                      <span className="badge-slate">
                        Ended
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 max-w-xs truncate">
                    {rec.notes || '--'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {rec.status === 'Active' && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Unassign ${rec.vehicleRegistration} from ${rec.driverName}?`)) {
                            unassignVehicle(rec.id);
                          }
                        }}
                        className="btn-ghost py-1 px-2.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      >
                        Unassign
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
