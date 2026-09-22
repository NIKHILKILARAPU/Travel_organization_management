import React from 'react';
import { useDriver } from '../../context/DriverContext';
import { EARNINGS_HISTORY } from '../../data/mockData';
import { 
  TrendingUp, 
  CreditCard,
  CheckCircle2
} from 'lucide-react';

export const EarningsScreen: React.FC = () => {
  const { todayEarnings, thisWeekEarnings, thisMonthEarnings } = useDriver();

  const chartData = [
    { day: 'Wed', amount: 740, height: 45 },
    { day: 'Thu', amount: 840, height: 55 },
    { day: 'Fri', amount: 980, height: 68 },
    { day: 'Sat', amount: 1280, height: 95 },
    { day: 'Sun', amount: 1150, height: 82 },
    { day: 'Mon', amount: 920, height: 62 },
    { day: 'Tue', amount: todayEarnings, height: Math.min(100, Math.round((todayEarnings / 1300) * 100)), active: true },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            My Earnings & Settlements
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time fare ledger, incentives, and direct bank settlement details
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Daily Auto-Settlement Active
          </span>
        </div>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Today */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-card space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-xs font-bold uppercase tracking-wider">Today's Earnings</span>
            <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Live
            </span>
          </div>
          <div className="text-4xl font-black tracking-tight text-white">
            ₹{todayEarnings.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +14% higher than last Tuesday
          </p>
        </div>

        {/* Card 2: This Week */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">This Week</span>
            <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
              Mon – Sun
            </span>
          </div>
          <div className="text-4xl font-black tracking-tight text-slate-900">
            ₹{thisWeekEarnings.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Projected week total: ₹8,200
          </p>
        </div>

        {/* Card 3: This Month */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">This Month</span>
            <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
              September 2026
            </span>
          </div>
          <div className="text-4xl font-black tracking-tight text-slate-900">
            ₹{thisMonthEarnings.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Includes ₹1,200 fleet safety incentive
          </p>
        </div>
      </div>

      {/* Main 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Weekly Breakdown Chart & Performance Numbers */}
        <div className="lg:col-span-7 space-y-6">
          {/* Performance Metrics: Completed Trips, Average Fare, Distance Driven */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-card text-center">
              <span className="text-xs font-medium text-slate-500 block">Completed Trips</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">42</span>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-card text-center">
              <span className="text-xs font-medium text-slate-500 block">Average Fare</span>
              <span className="text-2xl font-black text-emerald-700 mt-1 block">₹210</span>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-card text-center">
              <span className="text-xs font-medium text-slate-500 block">Distance Driven</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">384 km</span>
            </div>
          </div>

          {/* Weekly Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Weekly Earnings Breakdown
                </h3>
                <p className="text-xs text-slate-500">Day-by-day revenue generated from completed fares</p>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
                Average: ₹940 / day
              </span>
            </div>

            <div className="h-48 flex items-end justify-between gap-4 pt-6 px-4">
              {chartData.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-xs font-bold text-slate-400 group-hover:text-slate-800 transition">
                    ₹{item.amount}
                  </span>
                  <div 
                    style={{ height: `${item.height}%` }}
                    className={`w-full max-w-[42px] rounded-t-xl transition-all duration-300 ${
                      item.active 
                        ? 'bg-emerald-600 shadow-md shadow-emerald-600/30' 
                        : 'bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                  <span className={`text-xs font-bold ${
                    item.active ? 'text-emerald-700 font-extrabold' : 'text-slate-500'
                  }`}>
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Bank Account & Earnings History */}
        <div className="lg:col-span-5 space-y-6">
          {/* Payout Bank Account Info */}
          <div className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Settlement Account
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Primary Account
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">State Bank of India</div>
                <div className="text-xs font-mono text-slate-500">A/C: •••••••• 4029 • Ravi Kumar</div>
                <div className="text-[11px] text-slate-400">IFSC: SBIN0000824 (Bhimavaram Branch)</div>
              </div>
            </div>
          </div>

          {/* Earnings History List */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Settlement History
              </h3>
              <span className="text-xs text-slate-500 font-medium">Last 7 Days</span>
            </div>

            <div className="divide-y divide-slate-100">
              {EARNINGS_HISTORY.map((entry, i) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {entry.day}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {entry.trips} completed passenger journeys
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-black text-slate-900">
                      ₹{entry.isToday ? todayEarnings : entry.amount}
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                      Settled to Bank
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
