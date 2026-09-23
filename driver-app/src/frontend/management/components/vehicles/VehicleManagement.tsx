import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Car, 
  Wrench, 
  Plus, 
  Search, 
  Filter, 
  Fuel, 
  Calendar, 
  Gauge, 
  UserCheck, 
  ShieldAlert, 
  ChevronRight,
  Sparkles,
  Link2,
  X
} from 'lucide-react';
import type { VehicleRecord, VehicleStatus, VehicleCategory } from '../../types';

export const VehicleManagement: React.FC = () => {
  const { 
    vehicles, 
    setSelectedVehicle, 
    setIsAddVehicleOpen, 
    setIsAssignModalOpen,
    setIsScheduleMaintenanceOpen 
  } = useManagement();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<VehicleStatus | 'ALL'>('ALL');
  const [typeFilter, setTypeFilter] = useState<VehicleCategory | 'ALL'>('ALL');
  const [fuelFilter, setFuelFilter] = useState<string>('ALL');

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesStatus = statusFilter === 'ALL' || vehicle.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || vehicle.type === typeFilter;
    const matchesFuel = fuelFilter === 'ALL' || vehicle.fuelType === fuelFilter;

    const matchesSearch = 
      vehicle.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.vehicleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vehicle.assignedDriverName && vehicle.assignedDriverName.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesType && matchesFuel && matchesSearch;
  });

  const availableCount = vehicles.filter(v => v.status === 'AVAILABLE').length;
  const onTripCount = vehicles.filter(v => v.status === 'ON_TRIP').length;
  const maintenanceCount = vehicles.filter(v => v.status === 'MAINTENANCE').length;
  const offlineCount = vehicles.filter(v => v.status === 'OFFLINE' || v.status === 'INACTIVE').length;

  return (
    <div className="space-y-6">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Fleet Asset Inventory</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Control commercial organization assets, registrations, roadworthiness compliance, and driver pairings</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsScheduleMaintenanceOpen(true)}
            className="btn-secondary"
          >
            <Wrench className="w-4 h-4 text-slate-500" />
            <span>Schedule Service</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddVehicleOpen(true)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vehicle</span>
          </button>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Fleet</span>
            <Car className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{vehicles.length}</p>
          <span className="text-[11px] text-slate-400">Total registered units</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Available</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{availableCount}</p>
          <span className="text-[11px] text-slate-400">Ready for dispatch</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">On Active Trip</span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </div>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">{onTripCount}</p>
          <span className="text-[11px] text-slate-400">In customer service</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Maintenance</span>
            <Wrench className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-2">{maintenanceCount}</p>
          <span className="text-[11px] text-slate-400">Under garage repair</span>
        </div>

        <div className="saas-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Offline</span>
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
          </div>
          <p className="text-2xl font-bold text-slate-500 dark:text-slate-400 mt-2">{offlineCount}</p>
          <span className="text-[11px] text-slate-400">Parked / Unassigned</span>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="saas-card p-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex-1 w-full md:max-w-md relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-focus-within:bg-emerald-600 group-focus-within:text-white transition-colors">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            placeholder="Search vehicles by registration, model, driver..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-saas pl-11 pr-8 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
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

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="input-saas w-auto py-2 text-xs"
          >
            <option value="ALL">All Statuses</option>
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="ON_TRIP">ON TRIP</option>
            <option value="MAINTENANCE">MAINTENANCE</option>
            <option value="OFFLINE">OFFLINE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="input-saas w-auto py-2 text-xs"
          >
            <option value="ALL">All Categories</option>
            <option value="Auto">Auto Rickshaw</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
            <option value="Bus">Bus</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="input-saas w-auto py-2 text-xs"
          >
            <option value="ALL">All Fuel Types</option>
            <option value="CNG">CNG</option>
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="Electric">Electric (EV)</option>
          </select>
        </div>
      </div>

      {/* Vehicle Table */}
      <div className="saas-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="saas-table-header">
                <th className="py-3 px-4">Vehicle ID</th>
                <th className="py-3 px-4">License Plate</th>
                <th className="py-3 px-4">Make & Model</th>
                <th className="py-3 px-4">Category / Fuel</th>
                <th className="py-3 px-4">Assigned Driver</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Insurance Expiry</th>
                <th className="py-3 px-4">Odometer & Service</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredVehicles.map((vehicle: VehicleRecord) => (
                <tr key={vehicle.id} className="saas-table-row">
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {vehicle.vehicleId}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      type="button" 
                      onClick={() => setSelectedVehicle(vehicle)}
                      className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {vehicle.registrationNumber}
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{vehicle.brand} {vehicle.model}</div>
                    <div className="text-[11px] text-slate-400">{vehicle.year} • {vehicle.color}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-700 dark:text-slate-300">{vehicle.type}</div>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 inline-block mt-0.5">
                      {vehicle.fuelType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {vehicle.assignedDriverName ? (
                      <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
                        <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                        <span>{vehicle.assignedDriverName}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic text-[11px]">Unpaired</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={vehicle.status} type="vehicle" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{vehicle.insuranceExpiry}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-700 dark:text-slate-300">{vehicle.odometerKm.toLocaleString('en-IN')} km</div>
                    <div className="text-[11px] text-slate-400">Last: {vehicle.lastServiceDate}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="btn-ghost py-1 px-2.5 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                      >
                        Inspect
                      </button>

                      {!vehicle.assignedDriverId && (
                        <button
                          type="button"
                          onClick={() => setIsAssignModalOpen(true)}
                          className="btn-primary py-1 px-2.5 text-xs"
                        >
                          <Link2 className="w-3 h-3" />
                          <span>Assign</span>
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
