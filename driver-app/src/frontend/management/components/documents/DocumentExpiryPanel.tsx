import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { 
  Send, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Calendar,
  ExternalLink 
} from 'lucide-react';
import type { DocumentExpiryAlert } from '../../types';

export const DocumentExpiryPanel: React.FC = () => {
  const { documentExpiries, vehicles, drivers, setSelectedVehicle, setSelectedDriver } = useManagement();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = documentExpiries.filter(item => {
    const matchesFilter = 
      filterStatus === 'ALL' ||
      item.status === filterStatus;

    const matchesSearch = 
      item.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.documentType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const expiredCount = documentExpiries.filter(d => d.status === 'EXPIRED').length;
  const exp7Count = documentExpiries.filter(d => d.status === 'EXPIRING_7_DAYS').length;
  const exp30Count = documentExpiries.filter(d => d.status === 'EXPIRING_30_DAYS').length;

  const handleOpenEntity = (item: DocumentExpiryAlert) => {
    if (item.entityType === 'vehicle') {
      const v = vehicles.find(veh => veh.registrationNumber === item.entityName || veh.id === item.entityId);
      if (v) setSelectedVehicle(v);
    } else {
      const d = drivers.find(drv => drv.name === item.entityName || drv.id === item.entityId);
      if (d) setSelectedDriver(d);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Statutory Compliance & Document Expiry Control</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Automated surveillance for Motor Insurance policies, RTO Fitness, PUCC emissions, and Commercial Driver Licenses</p>
        </div>

        <button
          type="button"
          onClick={() => alert('Broadcasted automated renewal notifications via SMS/WhatsApp to stakeholders')}
          className="btn-primary"
        >
          <Send className="w-4 h-4" />
          <span>Broadcast Renewal Alerts</span>
        </button>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Already Expired</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-2">{expiredCount} <span className="text-xs text-slate-400">docs</span></p>
          <span className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold mt-0.5 block">Immediate ground alert</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Expires &lt; 7 Days</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-2">{exp7Count} <span className="text-xs text-slate-400">docs</span></p>
          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-0.5 block">Urgent action required</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Expires &lt; 30 Days</span>
            <Calendar className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">{exp30Count} <span className="text-xs text-slate-400">docs</span></p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Renewal in pipeline</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Compliant & Valid</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
            {documentExpiries.filter(d => d.status === 'VALID').length} <span className="text-xs text-slate-400">docs</span>
          </p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 block">96.8% compliance rate</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="saas-card p-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex-1 w-full md:max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search vehicle registration, driver name, document type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-saas pl-9"
          />
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700/60 overflow-x-auto gap-1">
          <button
            type="button"
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${filterStatus === 'ALL' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            All Docs
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('EXPIRED')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${filterStatus === 'EXPIRED' ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Expired ({expiredCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('EXPIRING_7_DAYS')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${filterStatus === 'EXPIRING_7_DAYS' ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            &lt; 7 Days ({exp7Count})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('EXPIRING_30_DAYS')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${filterStatus === 'EXPIRING_30_DAYS' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            &lt; 30 Days ({exp30Count})
          </button>
        </div>
      </div>

      {/* Grid of Expiry Alert Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(item => {
          const isExpired = item.status === 'EXPIRED';
          const is7Days = item.status === 'EXPIRING_7_DAYS';
          const is30Days = item.status === 'EXPIRING_30_DAYS';

          return (
            <div 
              key={item.id} 
              className="saas-card p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                    isExpired 
                      ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900' 
                      : is7Days 
                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-900' 
                      : is30Days 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-900' 
                      : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900'
                  }`}>
                    {isExpired ? 'EXPIRED' : is7Days ? '< 7 DAYS LEFT' : is30Days ? '< 30 DAYS LEFT' : 'VALID'}
                  </span>

                  <span className="text-[11px] font-medium text-slate-400 capitalize">
                    {item.entityType} Document
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.documentType}</h3>
                  <p className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-300 mt-0.5">{item.entityName}</p>
                </div>

                <div className="mt-3.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                    <span className="text-[11px]">Expiry Date:</span>
                    <strong className="text-slate-900 dark:text-white font-medium">{item.expiryDate}</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                    <span className="text-[11px]">Remaining:</span>
                    <strong className={`font-semibold ${
                      isExpired ? 'text-rose-600 dark:text-rose-400' : is7Days ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'
                    }`}>
                      {item.daysRemaining <= 0 ? `${Math.abs(item.daysRemaining)} days OVERDUE` : `${item.daysRemaining} days`}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleOpenEntity(item)}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Inspect Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Marked ${item.documentType} renewal ticket initiated for ${item.entityName}.`)}
                  className="btn-secondary py-1 px-2.5 text-xs"
                >
                  Renew Doc
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="saas-card p-8 text-center text-slate-400 text-xs">
          No matching statutory compliance records found.
        </div>
      )}
    </div>
  );
};
