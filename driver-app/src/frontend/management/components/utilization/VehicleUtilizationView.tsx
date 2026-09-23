import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { 
  Gauge, 
  Car, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ExternalLink 
} from 'lucide-react';
import type { VehicleRecord } from '../../types';

export const VehicleUtilizationView: React.FC = () => {
  const { vehicles, setSelectedVehicle } = useManagement();
  const [filterMode, setFilterMode] = useState<'ALL' | 'OVER' | 'UNDER' | 'BALANCED'>('ALL');

  const categorizedVehicles = vehicles.map(v => {
    let utilizationTag: 'OVER' | 'UNDER' | 'BALANCED' = 'BALANCED';
    if (v.utilizationPercent >= 85) utilizationTag = 'OVER';
    else if (v.utilizationPercent < 55) utilizationTag = 'UNDER';
    return { ...v, utilizationTag };
  });

  const filtered = categorizedVehicles.filter(v => {
    if (filterMode === 'ALL') return true;
    return v.utilizationTag === filterMode;
  });

  const avgUtilization = vehicles.length > 0 ? Math.round(vehicles.reduce((acc, v) => acc + v.utilizationPercent, 0) / vehicles.length) : 0;
  const overCount = categorizedVehicles.filter(v => v.utilizationTag === 'OVER').length;
  const underCount = categorizedVehicles.filter(v => v.utilizationTag === 'UNDER').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Fleet Asset Utilization & Duty Cycle Analytics</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Optimize vehicle duty cycles, prevent premature mechanical wear, and rebalance low-mileage assets</p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700/60 overflow-x-auto gap-1">
          <button
            type="button"
            onClick={() => setFilterMode('ALL')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterMode === 'ALL' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All ({vehicles.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('OVER')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterMode === 'OVER' ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Over-utilized ({overCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('UNDER')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterMode === 'UNDER' ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Under-utilized ({underCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('BALANCED')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterMode === 'BALANCED' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Balanced ({vehicles.length - overCount - underCount})
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Fleet Avg Utilization</span>
            <Gauge className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{avgUtilization}%</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Target baseline: 75%</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">High Wear (&gt;85%)</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-2">{overCount} units</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Exceeding daily threshold</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Low Idle (&lt;55%)</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-2">{underCount} units</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Reallocation recommended</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Optimal Duty Cycle</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{vehicles.length - overCount - underCount} units</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Healthy 55% - 84% band</span>
        </div>
      </div>

      {/* Utilization Table */}
      <div className="saas-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="saas-table-header">
                <th className="py-3 px-4">Asset ID</th>
                <th className="py-3 px-4">License Plate</th>
                <th className="py-3 px-4">Model & Chauffeur</th>
                <th className="py-3 px-4">Utilization Rate</th>
                <th className="py-3 px-4">Active Hours</th>
                <th className="py-3 px-4">In-Transit</th>
                <th className="py-3 px-4">Duty Status</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered.map((v) => (
                <tr key={v.id} className="saas-table-row">
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {v.vehicleId}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      type="button" 
                      onClick={() => setSelectedVehicle(v)}
                      className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
                    >
                      {v.registrationNumber}
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{v.brand} {v.model}</div>
                    <div className="text-[11px] text-slate-400">{v.assignedDriverName || 'Unpaired'}</div>
                  </td>
                  <td className="py-3.5 px-4 min-w-[140px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            v.utilizationTag === 'OVER' ? 'bg-rose-500' : v.utilizationTag === 'UNDER' ? 'bg-amber-500' : 'bg-blue-600'
                          }`}
                          style={{ width: `${Math.min(100, v.utilizationPercent)}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white text-xs font-mono">{v.utilizationPercent}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                    {v.activeHours} hrs
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                    {v.tripHours} hrs
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      v.utilizationTag === 'OVER'
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                        : v.utilizationTag === 'UNDER'
                        ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-900'
                        : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900'
                    }`}>
                      {v.utilizationTag}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button" 
                      onClick={() => setSelectedVehicle(v)}
                      className="btn-ghost py-1 px-2.5 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                    >
                      Inspect
                    </button>
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
