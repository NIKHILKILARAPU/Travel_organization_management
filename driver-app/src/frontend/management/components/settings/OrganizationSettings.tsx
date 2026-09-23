import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  Sliders, 
  Save, 
  Check, 
  Users 
} from 'lucide-react';

export const OrganizationSettings: React.FC = () => {
  const { currentOrg } = useManagement();

  const [orgName, setOrgName] = useState(currentOrg.name);
  const [phone, setPhone] = useState(currentOrg.phone);
  const [email, setEmail] = useState(currentOrg.email);
  const [commissionRate, setCommissionRate] = useState(20);
  const [autoBaseFare, setAutoBaseFare] = useState(40);
  const [autoPerKm, setAutoPerKm] = useState(15);
  const [sedanBaseFare, setSedanBaseFare] = useState(100);
  const [sedanPerKm, setSedanPerKm] = useState(18);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Organization Master Configurations</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Control legal entity profile, fare matrices, commission splits, and role-based permissions</p>
        </div>

        {saveSuccess && (
          <div className="px-3.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Master settings saved</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-5 text-xs text-slate-700 dark:text-slate-300">
        
        {/* Organization Identity */}
        <div className="saas-card p-5 space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-500" />
              <span>Transport Entity Profile</span>
            </h3>
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
              Code: {currentOrg.code}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Organization Legal Name</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="input-saas"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Support Contact Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-saas"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Official Invoicing Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-saas"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Operating Headquarters City</label>
              <input
                type="text"
                value={currentOrg.city}
                disabled
                className="input-saas opacity-70 cursor-not-allowed bg-slate-100 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">State Jurisdiction</label>
              <input
                type="text"
                value={currentOrg.state}
                disabled
                className="input-saas opacity-70 cursor-not-allowed bg-slate-100 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">State Transport Reg. Number</label>
              <input
                type="text"
                value={currentOrg.registrationNumber}
                disabled
                className="input-saas opacity-70 cursor-not-allowed bg-slate-100 dark:bg-slate-800 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Tariff & Commission Rules */}
        <div className="saas-card p-5 space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-500" />
              <span>Fare Calculation & Platform Commission Matrix</span>
            </h3>
            <span className="badge-emerald font-semibold">
              Currency: Indian Rupees (₹)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs">Organization Take</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  className="w-20 input-saas py-1 font-bold text-sm"
                />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">%</span>
              </div>
              <span className="text-[11px] text-slate-400 block">Driver receives {100 - commissionRate}%</span>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs">Auto Rickshaw Tariff</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">Base (₹)</span>
                  <input
                    type="number"
                    value={autoBaseFare}
                    onChange={(e) => setAutoBaseFare(Number(e.target.value))}
                    className="w-full input-saas py-1 text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">Per Km (₹)</span>
                  <input
                    type="number"
                    value={autoPerKm}
                    onChange={(e) => setAutoPerKm(Number(e.target.value))}
                    className="w-full input-saas py-1 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs">Sedan Car Tariff</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">Base (₹)</span>
                  <input
                    type="number"
                    value={sedanBaseFare}
                    onChange={(e) => setSedanBaseFare(Number(e.target.value))}
                    className="w-full input-saas py-1 text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">Per Km (₹)</span>
                  <input
                    type="number"
                    value={sedanPerKm}
                    onChange={(e) => setSedanPerKm(Number(e.target.value))}
                    className="w-full input-saas py-1 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs mb-1">Service Triggers</span>
              <div className="text-[11px] text-slate-500 space-y-1">
                <div>Service notice: <strong className="text-slate-800 dark:text-slate-200">500 km</strong></div>
                <div>Insurance alert: <strong className="text-slate-800 dark:text-slate-200">30 days</strong></div>
                <div>Fitness test: <strong className="text-slate-800 dark:text-slate-200">15 days</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* Management Authority Overview */}
        <div className="saas-card p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Management Console Authority
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  Unified enterprise access across dispatch operations, fleet management, finance, CRM, and system controls
                </p>
              </div>
            </div>
            <span className="self-start sm:self-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 font-semibold text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Role: Management
            </span>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="btn-primary"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration Changes</span>
          </button>
        </div>

      </form>
    </div>
  );
};
