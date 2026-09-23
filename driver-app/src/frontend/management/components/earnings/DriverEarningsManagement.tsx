import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { 
  DollarSign, 
  Search, 
  TrendingUp, 
  Send, 
  Receipt, 
  Percent, 
  Wallet, 
  Users, 
  Calendar 
} from 'lucide-react';
import type { DriverEarningsReport } from '../../types';

export const DriverEarningsManagement: React.FC = () => {
  const { drivers } = useManagement();
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'custom'>('today');
  const [searchQuery, setSearchQuery] = useState('');

  // Map drivers to earnings report structure
  const earningsData: DriverEarningsReport[] = drivers.map(d => {
    let multiplier = 1;
    if (dateRange === 'week') multiplier = 5.8;
    if (dateRange === 'month') multiplier = 24.2;

    const gross = Math.round((d.earningsToday || 1200) * multiplier);
    const orgComm = Math.round(gross * 0.20); // 20% org commission
    const driverBase = gross - orgComm; // 80%
    const bonuses = (d.tripsToday > 5 ? 150 : 0) * (dateRange === 'today' ? 1 : 4);
    const penalties = d.reportedIssues.length > 0 ? 100 : 0;
    const net = driverBase + bonuses - penalties;

    return {
      driverId: d.driverId,
      driverName: d.name,
      vehicleRegistration: d.assignedVehicleReg || 'Unassigned',
      totalTrips: Math.round((d.tripsToday || 6) * multiplier),
      completedTrips: Math.round(((d.tripsToday || 6) * multiplier) * 0.95),
      grossEarnings: gross,
      organizationCommission: orgComm,
      driverEarnings: driverBase,
      bonuses,
      penalties,
      netAmount: net
    };
  });

  const filteredData = earningsData.filter(d => 
    d.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.driverId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.vehicleRegistration.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalGross = filteredData.reduce((acc, d) => acc + d.grossEarnings, 0);
  const totalOrgCommission = filteredData.reduce((acc, d) => acc + d.organizationCommission, 0);
  const totalNetPayout = filteredData.reduce((acc, d) => acc + d.netAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Driver Earnings & Commission Accounting</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Automated 80/20 revenue split calculation, performance incentives, and disbursement batches</p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => setDateRange('today')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              dateRange === 'today' 
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => setDateRange('week')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              dateRange === 'week' 
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            This Week
          </button>
          <button
            type="button"
            onClick={() => setDateRange('month')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              dateRange === 'month' 
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Aggregate KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Gross Fares</span>
            <DollarSign className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">₹{totalGross.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-slate-400">Total billable transit fares</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Platform Take (20%)</span>
            <Percent className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">₹{totalOrgCommission.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-slate-400">Retained organization share</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Net Driver Disbursal</span>
            <Wallet className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">₹{totalNetPayout.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-slate-400">Net payable after incentive balance</span>
        </div>
      </div>

      {/* Formula Explainer Banner */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-700 dark:text-slate-300">
          <span className="font-bold text-slate-900 dark:text-white">Active Split Formula:</span>{' '}
          <span className="font-mono text-blue-600 dark:text-blue-400">Gross (100%) - Org Retainer (20%) + Tier Incentive - Deductions = Net Payout</span>
        </div>
        <button 
          type="button"
          onClick={() => alert('Batch payout dispatched to banking gateway')}
          className="btn-primary py-2 px-4 text-xs whitespace-nowrap"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Disburse Batch Payout</span>
        </button>
      </div>

      {/* Search */}
      <div className="saas-card p-3 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Filter by driver name, driver ID, or vehicle plate..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-saas pl-9"
          />
        </div>
      </div>

      {/* Earnings Table */}
      <div className="saas-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="saas-table-header">
                <th className="py-3 px-4">Chauffeur ID</th>
                <th className="py-3 px-4">Partner Name</th>
                <th className="py-3 px-4">Asset Plate</th>
                <th className="py-3 px-4">Completed Rides</th>
                <th className="py-3 px-4">Gross Fare</th>
                <th className="py-3 px-4">Org Cut (20%)</th>
                <th className="py-3 px-4">Driver Base (80%)</th>
                <th className="py-3 px-4">Adjustments</th>
                <th className="py-3 px-4">Net Disbursal</th>
                <th className="py-3 px-4 text-right">Statement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredData.map((d) => (
                <tr key={d.driverId} className="saas-table-row">
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-900 dark:text-white">
                    {d.driverId}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                    {d.driverName}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                      {d.vehicleRegistration}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                    {d.completedTrips} of {d.totalTrips}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    ₹{d.grossEarnings.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">
                    ₹{d.organizationCommission.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">
                    ₹{d.driverEarnings.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">+₹{d.bonuses}</span>
                    {d.penalties > 0 && (
                      <span className="text-rose-500 ml-1.5 font-medium">-₹{d.penalties}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    ₹{d.netAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Payslip statement for ${d.driverName}`)}
                      className="btn-ghost py-1 px-2.5 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                    >
                      Payslip
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
