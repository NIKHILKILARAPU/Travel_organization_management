import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Users, 
  UserCheck, 
  UserX, 
  CreditCard, 
  Search, 
  Building2, 
  Phone, 
  Mail, 
  Calendar, 
  ShieldAlert, 
  CheckCircle2,
  Navigation
} from 'lucide-react';
import type { CustomerRecord } from '../../types';

export const CustomerManagement: React.FC = () => {
  const { customers, setSelectedCustomer, toggleBlockCustomer } = useManagement();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Active' | 'Blocked'>('ALL');

  const filteredCustomers = customers.filter(c => {
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.organization.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const activeCount = customers.filter(c => c.status === 'Active').length;
  const blockedCount = customers.filter(c => c.status === 'Blocked').length;
  const totalSpend = customers.reduce((acc, c) => acc + c.totalSpent, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Customer Directory & Corporate Accounts</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage passenger profiles, corporate billing accounts, trip volumes, and security flags</p>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Registered Riders</span>
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{customers.length}</p>
          <span className="text-[11px] text-slate-400">Total consumer accounts</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Accounts</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{activeCount}</p>
          <span className="text-[11px] text-slate-400">In good standing</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Security Flagged</span>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-2">{blockedCount}</p>
          <span className="text-[11px] text-slate-400">Restricted accounts</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Gross Spend</span>
            <CreditCard className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">₹{totalSpend.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-slate-400">Lifetime passenger revenue</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="saas-card p-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex-1 w-full md:max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by customer name, phone, email, organization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-saas pl-9"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="input-saas w-auto py-2 text-xs"
          >
            <option value="ALL">All Account Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Blocked">Blocked Only</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="saas-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="saas-table-header">
                <th className="py-3 px-4">Account ID</th>
                <th className="py-3 px-4">Passenger Name</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Corporate Entity</th>
                <th className="py-3 px-4">Trips Completed</th>
                <th className="py-3 px-4">Gross Spend</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredCustomers.map((c: CustomerRecord) => (
                <tr key={c.id} className="saas-table-row">
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {c.customerId}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                        {c.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => setSelectedCustomer(c)}
                          className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                        >
                          {c.name}
                        </button>
                        <div className="text-[11px] text-slate-400 mt-0.5">Joined: {c.joinedDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800 dark:text-slate-200">{c.phone}</div>
                    <div className="text-[11px] text-slate-400">{c.email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                    {c.organization}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                    {c.totalTrips} rides
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    ₹{c.totalSpent.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    {c.lastTripDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={c.status} type="customer" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedCustomer(c)}
                        className="btn-ghost py-1 px-2.5 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                      >
                        Profile
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleBlockCustomer(c.id)}
                        className={`btn-ghost py-1 px-2.5 text-xs ${
                          c.status === 'Blocked' 
                            ? 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40' 
                            : 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                        }`}
                      >
                        {c.status === 'Blocked' ? 'Unblock' : 'Block'}
                      </button>
                    </div>
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
