import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Users, 
  Search, 
  Plus, 
  Link2, 
  Star, 
  Car, 
  Phone, 
  CheckCircle2, 
  UserX,
  X 
} from 'lucide-react';
import type { DriverRecord, DriverStatus } from '../../types';

export const DriverManagement: React.FC = () => {
  const { 
    drivers, 
    setSelectedDriver, 
    setIsAddDriverOpen, 
    setIsAssignModalOpen,
    toggleDriverStatus 
  } = useManagement();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<DriverStatus | 'ALL'>('ALL');
  const [vehicleFilter, setVehicleFilter] = useState<'ALL' | 'ASSIGNED' | 'UNASSIGNED'>('ALL');

  const filteredDrivers = drivers.filter(driver => {
    const matchesStatus = statusFilter === 'ALL' || driver.status === statusFilter;
    const matchesVehicle = 
      vehicleFilter === 'ALL' ||
      (vehicleFilter === 'ASSIGNED' && !!driver.assignedVehicleId) ||
      (vehicleFilter === 'UNASSIGNED' && !driver.assignedVehicleId);

    const matchesSearch = 
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.driverId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.phone.includes(searchQuery) ||
      driver.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (driver.assignedVehicleReg && driver.assignedVehicleReg.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesVehicle && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Title & Top Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Driver Partner Directory</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage chauffeur verification, shift rosters, vehicle pairing, and daily ratings</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsAssignModalOpen(true)}
            className="btn-secondary"
          >
            <Link2 className="w-4 h-4 text-slate-500" />
            <span>Assign Vehicle</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddDriverOpen(true)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4" />
            <span>Add Driver</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="saas-card p-4">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Registered Drivers</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{drivers.length}</p>
        </div>
        <div className="saas-card p-4">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Online & Available</span>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {drivers.filter(d => d.status === 'Online' || d.status === 'Available').length}
          </p>
        </div>
        <div className="saas-card p-4">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">On Active Trip</span>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            {drivers.filter(d => d.status === 'On Trip').length}
          </p>
        </div>
        <div className="saas-card p-4">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Offline / Rest</span>
          <p className="text-2xl font-bold text-slate-400 mt-1">
            {drivers.filter(d => d.status === 'Offline' || d.status === 'Break').length}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="saas-card p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="w-full md:max-w-md relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-focus-within:bg-blue-600 group-focus-within:text-white transition-colors">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            placeholder="Search drivers by name, ID, phone, or license..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-saas pl-11 pr-8 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {/* Status selector */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="input-saas py-2 text-xs font-medium cursor-pointer w-auto"
          >
            <option value="ALL">All Statuses</option>
            <option value="Online">Online</option>
            <option value="Available">Available</option>
            <option value="On Trip">On Trip</option>
            <option value="Offline">Offline</option>
            <option value="Break">Break</option>
            <option value="Vehicle Issue">Vehicle Issue</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Vehicle assignment filter */}
          <select
            value={vehicleFilter}
            onChange={(e) => setVehicleFilter(e.target.value as any)}
            className="input-saas py-2 text-xs font-medium cursor-pointer w-auto"
          >
            <option value="ALL">All Vehicles</option>
            <option value="ASSIGNED">Assigned Only</option>
            <option value="UNASSIGNED">Unassigned Only</option>
          </select>
        </div>
      </div>

      {/* Driver Records Table */}
      <div className="saas-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="saas-table-header">
                <th className="py-3 px-4">Driver ID</th>
                <th className="py-3 px-4">Driver Partner</th>
                <th className="py-3 px-4">Contact & License</th>
                <th className="py-3 px-4">Assigned Vehicle</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Trips Today</th>
                <th className="py-3 px-4">Earnings Today</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredDrivers.map((driver: DriverRecord) => (
                <tr key={driver.id} className="saas-table-row">
                  <td className="py-3 px-4 font-mono font-bold text-xs text-slate-800 dark:text-slate-200">
                    {driver.driverId}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center font-bold text-xs shrink-0">
                        {driver.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div 
                          onClick={() => setSelectedDriver(driver)}
                          className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                        >
                          {driver.name}
                        </div>
                        <div className="text-[11px] text-slate-400">Joined: {driver.joiningDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-800 dark:text-slate-200 font-medium text-xs flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{driver.phone}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{driver.licenseNumber}</div>
                  </td>
                  <td className="py-3 px-4">
                    {driver.assignedVehicleReg ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono text-xs font-semibold">
                        <Car className="w-3 h-3 text-slate-500" />
                        <span>{driver.assignedVehicleReg}</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={driver.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                    {driver.tripsToday}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    ₹{driver.earningsToday.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/40">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{driver.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedDriver(driver)}
                        className="btn-secondary py-1 px-2.5 text-xs"
                      >
                        Profile
                      </button>

                      {driver.status === 'Inactive' ? (
                        <button
                          type="button"
                          onClick={() => toggleDriverStatus(driver.id, 'Available')}
                          className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
                        >
                          Activate
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleDriverStatus(driver.id, 'Inactive')}
                          className="btn-ghost py-1 px-2 text-xs text-slate-500 hover:text-rose-600"
                          title="Deactivate driver"
                        >
                          Suspend
                        </button>
                      )}
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
