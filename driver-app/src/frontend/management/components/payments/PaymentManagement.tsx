import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  CreditCard, 
  Download, 
  Search, 
  ArrowUpRight, 
  Building2, 
  RefreshCw, 
  FileText, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import type { PaymentTransactionRecord } from '../../types';

export const PaymentManagement: React.FC = () => {
  const { payments } = useManagement();
  const [methodFilter, setMethodFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPayments = payments.filter(p => {
    const matchesMethod = methodFilter === 'ALL' || p.paymentMethod === methodFilter;
    const matchesStatus = statusFilter === 'ALL' || p.paymentStatus === statusFilter;
    const matchesSearch = 
      p.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tripId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.driverName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesMethod && matchesStatus && matchesSearch;
  });

  const totalPaid = payments.filter(p => p.paymentStatus === 'PAID').reduce((acc, p) => acc + p.amount, 0);
  const pendingAmount = payments.filter(p => p.paymentStatus === 'PENDING').reduce((acc, p) => acc + p.amount, 0);
  const refundsAmount = payments.filter(p => p.paymentStatus === 'REFUNDED').reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Financial Ledger & Revenue Accounting</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real-time settlement tracking, UPI gateways, cash reconciliations, and platform audit logs</p>
        </div>

        <button
          type="button"
          onClick={() => alert('Exporting full financial ledger...')}
          className="btn-primary"
        >
          <Download className="w-4 h-4" />
          <span>Export Ledger</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Today's Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">₹28,450</p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 block">+14.2% vs yesterday</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Weekly Revenue</span>
            <CreditCard className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">₹1,94,800</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Current cycle</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Monthly Revenue</span>
            <Building2 className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">₹8,42,100</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">September 2026</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pending Clearance</span>
            <RefreshCw className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-2">₹{pendingAmount.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">In transit</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Refunds & Claims</span>
            <ShieldCheck className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-2">₹{refundsAmount.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Disputes</span>
        </div>
      </div>

      {/* Revenue Breakdown & Bank Settlement */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 saas-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Settlement by Channel Breakdown</h3>
              <p className="text-slate-500 text-xs mt-0.5">Cleared Gross Fares: <span className="font-bold text-blue-600 dark:text-blue-400">₹{totalPaid.toLocaleString('en-IN')}</span></p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-slate-700 dark:text-slate-300">UPI / QR Dynamic Code</span>
                <span className="font-bold text-slate-900 dark:text-white">54% (₹{(totalPaid * 0.54).toLocaleString('en-IN')})</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '54%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-slate-700 dark:text-slate-300">Direct Cash Collection</span>
                <span className="font-bold text-slate-900 dark:text-white">32% (₹{(totalPaid * 0.32).toLocaleString('en-IN')})</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-slate-700 dark:text-slate-300">Credit / Debit Cards</span>
                <span className="font-bold text-slate-900 dark:text-white">10% (₹{(totalPaid * 0.10).toLocaleString('en-IN')})</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-slate-700 dark:text-slate-300">Digital Wallet Stored Balance</span>
                <span className="font-bold text-slate-900 dark:text-white">4% (₹{(totalPaid * 0.04).toLocaleString('en-IN')})</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '4%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="saas-card p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Settlement Bank Node</h3>
              <span className="badge-emerald">Active</span>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block text-xs">State Bank of India</span>
                <span className="text-slate-400 text-[11px] block">Bhimavaram Commercial Branch</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex justify-between text-xs">
                <span className="text-slate-400">Escrow Account:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">XXXX 4910</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">IFSC Code:</span>
                <span className="font-mono font-medium text-slate-700 dark:text-slate-300">SBIN0001234</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert('Manual payout sweep initiated')}
            className="btn-secondary w-full text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Trigger Escrow Sweep</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="saas-card p-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex-1 w-full md:max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search txn ID, trip ID, customer or driver..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-saas pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="input-saas w-auto py-2 text-xs"
          >
            <option value="ALL">All Payment Methods</option>
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Wallet">Wallet</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-saas w-auto py-2 text-xs"
          >
            <option value="ALL">All Settlement Statuses</option>
            <option value="PAID">PAID</option>
            <option value="PENDING">PENDING</option>
            <option value="FAILED">FAILED</option>
            <option value="REFUNDED">REFUNDED</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="saas-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="saas-table-header">
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Trip Reference</th>
                <th className="py-3 px-4">Passenger</th>
                <th className="py-3 px-4">Chauffeur</th>
                <th className="py-3 px-4">Gross Amount</th>
                <th className="py-3 px-4">Gateway Fee</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Settled At</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredPayments.map((p: PaymentTransactionRecord) => (
                <tr key={p.id} className="saas-table-row">
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-900 dark:text-white">
                    {p.transactionId}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {p.tripId}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                    {p.customerName}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                    {p.driverName}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    ₹{p.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">
                    ₹{p.feeDeduction}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {p.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={p.paymentStatus} type="payment" />
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    <div>{p.date}</div>
                    <div className="text-[11px] text-slate-400">{p.time}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Generating receipt for ${p.transactionId}`)}
                      className="btn-ghost py-1 px-2.5 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                    >
                      Invoice
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
