import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { 
  History, 
  Search, 
  Download, 
  ShieldCheck, 
  User, 
  Clock, 
  Filter 
} from 'lucide-react';
import type { ActivityLogItem } from '../../types';

export const ActivityLogView: React.FC = () => {
  const { activityLogs } = useManagement();
  const [filterAction, setFilterAction] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = activityLogs.filter(log => {
    const matchesAction = filterAction === 'ALL' || log.action.includes(filterAction);
    const matchesSearch = 
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAction && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Security & Operational Audit Trail</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Immutable audit logging of manager actions, dispatch changes, and system mutations</p>
        </div>
        <button
          type="button"
          onClick={() => alert('Exporting signed audit trail log...')}
          className="btn-secondary text-xs"
        >
          <Download className="w-3.5 h-3.5 text-slate-400" />
          <span>Export Audit Trail</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="saas-card p-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex-1 w-full md:max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search audit trail by description, user, or entity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-saas pl-9"
          />
        </div>
        <select
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="input-saas w-auto py-2 text-xs"
        >
          <option value="ALL">All Logged Events</option>
          <option value="ASSIGN">Vehicle Assignment</option>
          <option value="UNASSIGN">Vehicle Unassignment</option>
          <option value="MAINTENANCE">Workshop Maintenance</option>
          <option value="ADD">New Registrations</option>
          <option value="CANCEL">Dispatch Cancellations</option>
          <option value="BLOCK">Security Flags</option>
        </select>
      </div>

      {/* Logs List */}
      <div className="saas-card p-4 space-y-2.5">
        {filteredLogs.map((log: ActivityLogItem) => (
          <div key={log.id} className="p-3.5 rounded-lg bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 shrink-0 mt-0.5">
              <History className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-semibold text-xs text-slate-900 dark:text-white">{log.user}</span>
                <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">(Management)</span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {log.action}
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">{log.description}</p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Ref: {log.entity} • {log.entityId}</span>
                <span>{log.timestamp}</span>
              </div>
            </div>
          </div>
        ))}

        {filteredLogs.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-xs">
            No audit log entries found matching criteria.
          </div>
        )}
      </div>
    </div>
  );
};
