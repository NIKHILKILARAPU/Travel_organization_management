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
          <h2 className="text-2xl font-[700] text-slate-900 dark:text-slate-100 tracking-tight">
            My Earnings & Settlements
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-[400] mt-0.5">
            Real-time fare ledger, incentives, and direct bank settlement details
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-[590] text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-[14px] border border-[#34C759]/20 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Daily Auto-Settlement Active
          </span>
        </div>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Today */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-[14px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-[590] uppercase tracking-wider">Today's Earnings</span>
            <span className="text-xs font-[590] bg-emerald-500/20 text-emerald-500 px-2.5 py-0.5 rounded-[14px] border border-[#34C759]/30">
              Live
            </span>
          </div>
          <div className="text-4xl font-[700] tracking-tight text-slate-900 dark:text-slate-100">
            ₹{todayEarnings.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-emerald-500 font-[590] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +14% higher than last Tuesday
          </p>
        </div>

        {/* Card 2: This Week */}
        <div className="bg-white dark:bg-slate-900 rounded-[14px] p-6 border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-3">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-[590] uppercase tracking-wider">This Week</span>
            <span className="text-xs font-[590] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-2.5 py-0.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
              Mon – Sun
            </span>
          </div>
          <div className="text-4xl font-[700] tracking-tight text-slate-900 dark:text-slate-100">
            ₹{thisWeekEarnings.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-[400]">
            Projected week total: ₹8,200
          </p>
        </div>

        {/* Card 3: This Month */}
        <div className="bg-white dark:bg-slate-900 rounded-[14px] p-6 border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-3">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-[590] uppercase tracking-wider">This Month</span>
            <span className="text-xs font-[590] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-2.5 py-0.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
              September 2026
            </span>
          </div>
          <div className="text-4xl font-[700] tracking-tight text-slate-900 dark:text-slate-100">
            ₹{thisMonthEarnings.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-[400]">
            Includes ₹1,200 fleet safety incentive
          </p>
        </div>
      </div>

      {/* Main 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Weekly Breakdown Chart & Performance Numbers */}
        <div className="lg:col-span-7 space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] text-center">
              <span className="text-xs font-[400] text-slate-500 dark:text-slate-400 block">Completed Trips</span>
              <span className="text-2xl font-[700] text-slate-900 dark:text-slate-100 mt-1 block">42</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] text-center">
              <span className="text-xs font-[400] text-slate-500 dark:text-slate-400 block">Average Fare</span>
              <span className="text-2xl font-[700] text-blue-600 dark:text-blue-400 mt-1 block">₹210</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] text-center">
              <span className="text-xs font-[400] text-slate-500 dark:text-slate-400 block">Distance Driven</span>
              <span className="text-2xl font-[700] text-slate-900 dark:text-slate-100 mt-1 block">384 km</span>
            </div>
          </div>

          {/* Weekly Chart */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-[700] text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Weekly Earnings Breakdown
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Day-by-day revenue generated from completed fares</p>
              </div>
              <span className="text-xs font-[590] text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 px-3 py-1 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                Average: ₹940 / day
              </span>
            </div>

            <div className="h-48 flex items-end justify-between gap-4 pt-6 px-4">
              {chartData.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-xs font-[590] text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:text-slate-100 dark:group-hover:text-slate-900 dark:text-slate-100 transition">
                    ₹{item.amount}
                  </span>
                  <div 
                    style={{ height: `${item.height}%` }}
                    className={`w-full max-w-[42px] rounded-t-[8px] transition-all duration-300 ${
                      item.active 
                        ? 'bg-blue-600' 
                        : 'bg-[#D2D2D7] dark:bg-[#38383A] hover:bg-[#86868B]'
                    }`}
                  />
                  <span className={`text-xs ${
                    item.active ? 'text-blue-600 dark:text-blue-400 font-[700]' : 'text-slate-500 dark:text-slate-400 font-[400]'
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
          <div className="p-5 bg-white dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-[590] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Settlement Account
              </span>
              <span className="text-[11px] font-[590] text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-[14px] border border-[#34C759]/20">
                Primary Account
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="w-12 h-12 rounded-[14px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-[700]">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-[700] text-slate-900 dark:text-slate-100">State Bank of India</div>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">A/C: •••••••• 4029 • Ravi Kumar</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">IFSC: SBIN0000824 (Bhimavaram Branch)</div>
              </div>
            </div>
          </div>

          {/* Earnings History List */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-[700] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Settlement History
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-[400]">Last 7 Days</span>
            </div>

            <div className="divide-y divide-[#D2D2D7] dark:divide-[#38383A]">
              {EARNINGS_HISTORY.map((entry, i) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-[590] text-slate-900 dark:text-slate-100">
                      {entry.day}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {entry.trips} completed passenger journeys
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-[700] text-slate-900 dark:text-slate-100">
                      ₹{entry.isToday ? todayEarnings : entry.amount}
                    </div>
                    <span className="text-[10px] text-emerald-500 font-[590] bg-emerald-500/10 px-2 py-0.5 rounded-[14px]">
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
