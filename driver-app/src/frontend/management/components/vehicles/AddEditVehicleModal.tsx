import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { X, Car, ShieldCheck, Gauge, Check } from 'lucide-react';
import type { VehicleCategory, VehicleStatus } from '../../types';

export const AddEditVehicleModal: React.FC = () => {
  const { isAddVehicleOpen, setIsAddVehicleOpen, addVehicle } = useManagement();

  const [regNumber, setRegNumber] = useState('');
  const [brand, setBrand] = useState('Bajaj');
  const [model, setModel] = useState('RE Compact 4S');
  const [year, setYear] = useState(2023);
  const [type, setType] = useState<VehicleCategory>('Auto');
  const [fuelType, setFuelType] = useState<'CNG' | 'Petrol' | 'Diesel' | 'Electric'>('CNG');
  const [color, setColor] = useState('Yellow-Black');
  const [capacity, setCapacity] = useState(3);
  const [owner, setOwner] = useState('Vijaya Travel Fleet Org');
  const [purchaseDate, setPurchaseDate] = useState('2023-04-10');
  const [rcNumber, setRcNumber] = useState('');
  const [insuranceExpiry, setInsuranceExpiry] = useState('2027-04-10');
  const [fitnessExpiry, setFitnessExpiry] = useState('2026-11-20');
  const [pollutionExpiry, setPollutionExpiry] = useState('2027-01-15');
  const [odometerKm, setOdometerKm] = useState(24000);
  const [serviceDueKm, setServiceDueKm] = useState(28000);
  const [status, setStatus] = useState<VehicleStatus>('AVAILABLE');

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isAddVehicleOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!regNumber.trim() || regNumber.length < 6) {
      errs.regNumber = 'Valid Indian registration is required (e.g. AP 39 AB 1234)';
    }
    if (!brand.trim()) errs.brand = 'Brand is required';
    if (!model.trim()) errs.model = 'Model is required';
    if (!rcNumber.trim()) errs.rcNumber = 'RC Smart Card number is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addVehicle({
      registrationNumber: regNumber.trim().toUpperCase(),
      brand: brand.trim(),
      model: model.trim(),
      year: Number(year),
      type,
      fuelType,
      color: color.trim(),
      capacity: Number(capacity),
      owner: owner.trim(),
      purchaseDate,
      status,
      insuranceExpiry,
      fitnessExpiry,
      pollutionExpiry,
      rcNumber: rcNumber.trim().toUpperCase(),
      lastServiceDate: new Date().toISOString().split('T')[0],
      nextServiceDate: '2026-12-15',
      odometerKm: Number(odometerKm),
      serviceDueKm: Number(serviceDueKm)
    });

    setIsAddVehicleOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="saas-card max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden my-6 shadow-modal">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Register New Fleet Asset</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Add commercial vehicle, registration particulars, and statutory compliance limits</p>
          </div>
          <button
            type="button"
            onClick={() => setIsAddVehicleOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 overflow-y-auto space-y-5 bg-white dark:bg-slate-900">
          
          {/* Basic Vehicle Details */}
          <div className="space-y-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <h3 className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-2">
              <Car className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Registration & Technical Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Registration Number (RTO) *</label>
                <input
                  type="text"
                  placeholder="e.g. AP 39 AB 1234"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  className={`input-saas font-mono uppercase ${errors.regNumber ? 'border-rose-500' : ''}`}
                />
                {errors.regNumber && <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.regNumber}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Vehicle Category *</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as VehicleCategory)}
                  className="input-saas"
                >
                  <option value="Auto">Auto Rickshaw</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Van">Van</option>
                  <option value="Bus">Bus</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Manufacturer Brand *</label>
                <input
                  type="text"
                  placeholder="e.g. Bajaj, Maruti Suzuki"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="input-saas"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Model Variant *</label>
                <input
                  type="text"
                  placeholder="e.g. Dzire Tour S"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="input-saas"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Fuel Type</label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value as any)}
                  className="input-saas"
                >
                  <option value="CNG">CNG</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Electric">Electric (EV)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Manufacturing Year</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="input-saas"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Exterior Color</label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="input-saas"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Passenger Seating Capacity</label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="input-saas"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Registered Fleet Owner</label>
                <input
                  type="text"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  className="input-saas"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Induction / Purchase Date</label>
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="input-saas"
                />
              </div>
            </div>
          </div>

          {/* Compliance & Expiry Dates */}
          <div className="space-y-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <h3 className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Statutory Compliance & Expiry Dates</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">RC Smart Card Number *</label>
                <input
                  type="text"
                  placeholder="e.g. AP39RC2023901"
                  value={rcNumber}
                  onChange={(e) => setRcNumber(e.target.value)}
                  className={`input-saas font-mono uppercase ${errors.rcNumber ? 'border-rose-500' : ''}`}
                />
                {errors.rcNumber && <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.rcNumber}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Insurance Expiry Date *</label>
                <input
                  type="date"
                  value={insuranceExpiry}
                  onChange={(e) => setInsuranceExpiry(e.target.value)}
                  className="input-saas"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Fitness Certificate (FC) Expiry *</label>
                <input
                  type="date"
                  value={fitnessExpiry}
                  onChange={(e) => setFitnessExpiry(e.target.value)}
                  className="input-saas"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">PUCC Pollution Expiry</label>
                <input
                  type="date"
                  value={pollutionExpiry}
                  onChange={(e) => setPollutionExpiry(e.target.value)}
                  className="input-saas"
                />
              </div>
            </div>
          </div>

          {/* Odometer & Status */}
          <div className="space-y-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <h3 className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-2">
              <Gauge className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Odometer & Operational Status</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Current Odometer (km)</label>
                <input
                  type="number"
                  value={odometerKm}
                  onChange={(e) => setOdometerKm(Number(e.target.value))}
                  className="input-saas"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Next Service Due (km)</label>
                <input
                  type="number"
                  value={serviceDueKm}
                  onChange={(e) => setServiceDueKm(Number(e.target.value))}
                  className="input-saas"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Initial Dispatch Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as VehicleStatus)}
                  className="input-saas"
                >
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="MAINTENANCE">MAINTENANCE</option>
                  <option value="OFFLINE">OFFLINE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddVehicleOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <Check className="w-4 h-4" />
              <span>Save Vehicle Asset</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
