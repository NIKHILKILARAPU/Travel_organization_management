import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { 
  Award, 
  Search, 
  Star, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Car 
} from 'lucide-react';
import type { DriverRecord } from '../../types';

export const DriverPerformanceView: React.FC = () => {
  const { drivers, setSelectedDriver } = useManagement();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState<'ALL' | 'STAR' | 'STANDARD' | 'REVIEW'>('ALL');

  const performanceDrivers = drivers.map(d => {
    const completionRate = Math.round(92 + (d.rating - 4.5) * 10);
    const onTimeRate = Math.round(90 + (d.rating - 4.5) * 8);
    let tier: 'STAR' | 'STANDARD' | 'REVIEW' = 'STANDARD';
    if (d.rating >= 4.8 && d.reportedIssues.length === 0) tier = 'STAR';
    else if (d.rating < 4.5 || d.reportedIssues.length > 0) tier = 'REVIEW';

    return {
      ...d,
      completionRate: Math.min(100, Math.max(80, completionRate)),
      onTimeRate: Math.min(100, Math.max(78, onTimeRate)),
      tier
    };
  });

  const filtered = performanceDrivers.filter(d => {
    const matchesTier = filterTier === 'ALL' || d.tier === filterTier;
    const matchesSearch = 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.driverId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const starCount = performanceDrivers.filter(d => d.tier === 'STAR').length;
  const reviewCount = performanceDrivers.filter(d => d.tier === 'REVIEW').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Chauffeur Performance & Quality Audit</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Evaluate chauffeur punctuality, customer satisfaction index, safety compliance, and infraction records</p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700/60 overflow-x-auto gap-1">
          <button
            type="button"
            onClick={() => setFilterTier('ALL')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterTier === 'ALL' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Partners ({drivers.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTier('STAR')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterTier === 'STAR' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Top Performers ({starCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterTier('REVIEW')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterTier === 'REVIEW' ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Needs Review ({reviewCount})
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Avg Fleet Rating</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">4.81 / 5.0</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">High passenger trust</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">On-Time Arrival</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">94.6%</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Pickup punctuality index</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Completion Ratio</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">96.8%</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">&lt; 3.2% driver cancel rate</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Reported Infractions</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
            {drivers.reduce((acc, d) => acc + d.reportedIssues.length, 0)}
          </p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Total logged events</span>
        </div>
      </div>

      {/* Search */}
      <div className="saas-card p-3 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search driver by name or driver ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-saas pl-9"
          />
        </div>
      </div>

      {/* Table */}
      <div className="saas-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="saas-table-header">
                <th className="py-3 px-4">Partner ID</th>
                <th className="py-3 px-4">Chauffeur</th>
                <th className="py-3 px-4">Paired Asset</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">On-Time %</th>
                <th className="py-3 px-4">Completion</th>
                <th className="py-3 px-4">Quality Tier</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered.map((d) => (
                <tr key={d.id} className="saas-table-row">
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-900 dark:text-white">
                    {d.driverId}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      type="button" 
                      onClick={() => setSelectedDriver(d)}
                      className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 transition-colors text-left"
                    >
                      {d.name}
                    </button>
                    <div className="text-[11px] text-slate-400">{d.phone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                      {d.assignedVehicleReg || 'Unpaired'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{d.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                    {d.onTimeRate}%
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                    {d.completionRate}%
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      d.tier === 'STAR'
                        ? 'badge-emerald'
                        : d.tier === 'REVIEW'
                        ? 'badge-rose'
                        : 'badge-blue'
                    }`}>
                      {d.tier}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button" 
                      onClick={() => setSelectedDriver(d)}
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
