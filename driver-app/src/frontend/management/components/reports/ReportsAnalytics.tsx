import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  FileText, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  Car, 
  Users, 
  Clock 
} from 'lucide-react';

export const ReportsAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | 'thisMonth'>('7days');
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>('ALL');

  const dailyData = [
    { day: 'Mon', trips: 118, revenue: 26400, activeFleet: 40 },
    { day: 'Tue', trips: 124, revenue: 27900, activeFleet: 41 },
    { day: 'Wed', trips: 132, revenue: 29500, activeFleet: 43 },
    { day: 'Thu', trips: 120, revenue: 26800, activeFleet: 39 },
    { day: 'Fri', trips: 145, revenue: 32600, activeFleet: 45 },
    { day: 'Sat', trips: 160, revenue: 36200, activeFleet: 46 },
    { day: 'Sun', trips: 127, revenue: 28450, activeFleet: 42 },
  ];
  const maxRevenue = Math.max(...dailyData.map(d => d.revenue));

  const peakHours = [
    { hour: '06:00 - 09:00', label: 'Morning Commute & Colleges', percent: 84 },
    { hour: '09:00 - 12:00', label: 'Commercial Business Center', percent: 68 },
    { hour: '12:00 - 16:00', label: 'Mid-day Transit & Hospitals', percent: 45 },
    { hour: '16:00 - 20:00', label: 'Evening Peak & RTC Station', percent: 92 },
    { hour: '20:00 - 23:00', label: 'Night Dining & Junction Express', percent: 56 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Organization Business Intelligence & Reports</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Comprehensive intelligence on fleet utilization, passenger demand, driver efficiency, and revenue margins</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => alert('Compiling analytics summary report...')}
            className="btn-secondary text-xs"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Download PDF</span>
          </button>
          <button
            type="button"
            onClick={() => alert('Exporting raw dataset...')}
            className="btn-primary text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="saas-card p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => setTimeRange('7days')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              timeRange === '7days' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Last 7 Days
          </button>
          <button
            type="button"
            onClick={() => setTimeRange('30days')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              timeRange === '30days' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Last 30 Days
          </button>
          <button
            type="button"
            onClick={() => setTimeRange('thisMonth')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              timeRange === 'thisMonth' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            This Month
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Category:</span>
          <select
            value={vehicleTypeFilter}
            onChange={(e) => setVehicleTypeFilter(e.target.value)}
            className="input-saas w-auto py-1.5 text-xs"
          >
            <option value="ALL">All Fleet Asset Types</option>
            <option value="Auto">Auto Rickshaw</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Avg Daily Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">₹29,692</p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 block flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3 inline" /> +8.4% vs last period
          </span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Avg Trip Distance</span>
            <span className="text-xs font-mono text-slate-400">KM</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">6.8 km</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Delta Sector Urban zone</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Fleet Utilization</span>
            <Car className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">78.5%</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Target optimum: 70-85%</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cancellation Rate</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">3.2%</p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 block flex items-center gap-0.5">
            <ArrowDownRight className="w-3 h-3 inline" /> -1.1% vs state benchmark
          </span>
        </div>
      </div>

      {/* Chart & Surge Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 saas-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Daily Revenue & Dispatch Volume</h3>
              <p className="text-slate-400 text-xs mt-0.5">Operational dispatch trends across the current observation cycle</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                <span className="w-2.5 h-2.5 rounded bg-blue-600"></span> Revenue (₹)
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                <span className="w-2.5 h-2.5 rounded bg-slate-800 dark:bg-slate-300"></span> Trips
              </span>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-3 pt-6">
            {dailyData.map((item) => {
              const heightPct = Math.round((item.revenue / maxRevenue) * 100);
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative">
                  <div className="hidden group-hover:block absolute -top-8 bg-slate-900 text-white text-[11px] py-1 px-2 rounded-md font-mono whitespace-nowrap z-10 shadow-xs">
                    ₹{item.revenue.toLocaleString('en-IN')} • {item.trips} trips
                  </div>
                  <div className="w-full flex items-end justify-center gap-1.5 h-44">
                    <div 
                      className="w-1/2 bg-blue-600 dark:bg-blue-500 rounded-t-md transition-all group-hover:bg-blue-700"
                      style={{ height: `${heightPct}%` }}
                    />
                    <div 
                      className="w-1/3 bg-slate-800 dark:bg-slate-400 rounded-t-md transition-all group-hover:bg-slate-900"
                      style={{ height: `${Math.round((item.trips / 160) * 85)}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="saas-card p-5 space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Peak Hour Transit Demand</h3>
            <p className="text-slate-400 text-xs mt-0.5">Surge scheduling allocation guides</p>
          </div>

          <div className="space-y-3.5 text-xs">
            {peakHours.map(ph => (
              <div key={ph.hour} className="space-y-1.5">
                <div className="flex justify-between items-center font-medium">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">{ph.hour}</span>
                  <span className="text-slate-900 dark:text-white font-bold">{ph.percent}% load</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-blue-600 dark:bg-blue-500" 
                    style={{ width: `${ph.percent}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-400 block">{ph.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
