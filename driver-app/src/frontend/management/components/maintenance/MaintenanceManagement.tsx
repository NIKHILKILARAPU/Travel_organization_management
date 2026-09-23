import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Wrench, 
  Plus, 
  Search, 
  Car, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Play, 
  Filter 
} from 'lucide-react';
import type { MaintenanceRecord, MaintenanceStatus } from '../../types';

export const MaintenanceManagement: React.FC = () => {
  const { maintenance, setIsScheduleMaintenanceOpen, updateMaintenanceStatus, setSelectedVehicle, vehicles } = useManagement();
  const [statusFilter, setStatusFilter] = useState<MaintenanceStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = maintenance.filter(m => {
    const matchesStatus = statusFilter === 'ALL' || m.status === statusFilter;
    const matchesSearch = 
      m.vehicleRegistration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.assignedMechanic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const inMaintenanceCount = maintenance.filter(m => m.status === 'IN_PROGRESS').length;
  const reportedCount = maintenance.filter(m => m.status === 'REPORTED').length;
  const completedCount = maintenance.filter(m => m.status === 'COMPLETED').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Fleet Workshop & Repair Management</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Service work orders, scheduled preventive inspections, mechanic allocations, and parts expenditure</p>
        </div>

        <button
          type="button"
          onClick={() => setIsScheduleMaintenanceOpen(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Service Ticket</span>
        </button>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">In Workshop</span>
            <Wrench className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-2">{inMaintenanceCount} <span className="text-xs font-medium text-slate-400">units</span></p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Under active repair</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Reported Issues</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-2">{reportedCount} <span className="text-xs font-medium text-slate-400">units</span></p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Pending diagnosis</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Released to Fleet</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{completedCount} <span className="text-xs font-medium text-slate-400">units</span></p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Service completed</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Estimated Repair Cost</span>
            <span className="text-xs font-bold text-slate-400">₹</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
            ₹{maintenance.reduce((acc, m) => acc + m.estimatedCost, 0).toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Budgeted repair expenses</span>
        </div>
      </div>

      {/* Search & Status Filter */}
      <div className="saas-card p-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex-1 w-full md:max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search ticket, registration, issue, or mechanic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-saas pl-9"
          />
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700/60 overflow-x-auto gap-1">
          {(['ALL', 'REPORTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as const).map(st => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Maintenance Tickets Table */}
      <div className="saas-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="saas-table-header">
                <th className="py-3 px-4">Ticket</th>
                <th className="py-3 px-4">Fleet Asset</th>
                <th className="py-3 px-4">Fault Description</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Assigned Mechanic</th>
                <th className="py-3 px-4">Reported On</th>
                <th className="py-3 px-4">Est. Completion</th>
                <th className="py-3 px-4">Cost (₹)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered.map((item: MaintenanceRecord) => (
                <tr key={item.id} className="saas-table-row">
                  <td className="py-3.5 px-4 font-mono font-semibold text-blue-600 dark:text-blue-400">
                    {item.ticketId}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      type="button" 
                      onClick={() => {
                        const v = vehicles.find(veh => veh.id === item.vehicleId);
                        if (v) setSelectedVehicle(v);
                      }}
                      className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-block text-left"
                    >
                      {item.vehicleRegistration}
                    </button>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.vehicleModel}</div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-semibold text-slate-900 dark:text-white">{item.issue}</div>
                    <div className="text-slate-400 text-[11px] truncate mt-0.5">{item.description}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                      item.priority === 'URGENT' 
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900' 
                        : item.priority === 'HIGH'
                        ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-900'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                    <div className="flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.assignedMechanic}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {item.reportedDate}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">
                    {item.expectedCompletionDate}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    ₹{item.estimatedCost.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={item.status} type="maintenance" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {item.status !== 'COMPLETED' && (
                        <button
                          type="button"
                          onClick={() => updateMaintenanceStatus(item.id, 'COMPLETED')}
                          className="btn-ghost py-1 px-2 text-xs text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                        >
                          Mark Ready
                        </button>
                      )}
                      {item.status === 'REPORTED' && (
                        <button
                          type="button"
                          onClick={() => updateMaintenanceStatus(item.id, 'IN_PROGRESS')}
                          className="btn-ghost py-1 px-2 text-xs text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                        >
                          Begin Work
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs">
              No workshop service records match your filter criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
