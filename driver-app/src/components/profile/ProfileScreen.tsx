import React, { useState } from 'react';
import { useDriver } from '../../context/DriverContext';
import { 
  LogOut, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  Car
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { driver, vehicle, setActiveTab, playBeep } = useDriver();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [driverName, setDriverName] = useState(driver.name);
  const [driverPhone, setDriverPhone] = useState(driver.phone);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    playBeep('success');
    setShowEditModal(false);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Driver Profile & Compliance
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Verified identity, commercial licenses, and ABC Travels fleet records
          </p>
        </div>

        <button
          onClick={() => {
            playBeep('tap');
            setShowLogoutConfirm(true);
          }}
          className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl active-press transition flex items-center gap-2 self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          Log Out
        </button>
      </div>

      {/* 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Driver Avatar, Personal Information */}
        <div className="lg:col-span-5 space-y-6">
          {/* Hero Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={driver.avatar}
                  alt={driver.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-emerald-500/20 shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                  {driver.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                    ID: {driver.id}
                  </span>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    ⭐ {driver.rating}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {driver.organization} • Joined {driver.joiningDate}
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-center">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-xs text-slate-400 font-medium block">Trips Completed</span>
                <span className="text-xl font-black text-slate-900 mt-0.5 block">{driver.totalTripsCompleted.toLocaleString('en-IN')}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-xs text-slate-400 font-medium block">Driver Rating</span>
                <span className="text-xl font-black text-slate-900 mt-0.5 block">⭐ 4.8 / 5.0</span>
              </div>
            </div>

            <button
              onClick={() => {
                playBeep('tap');
                setShowEditModal(true);
              }}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl active-press transition"
            >
              EDIT PROFILE
            </button>
          </div>

          {/* Personal Information */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Personal Information
            </h4>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Full Legal Name</span>
                <span className="font-bold text-slate-900">{driver.name}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Phone Number</span>
                <span className="font-mono font-bold text-slate-900">{driver.phone}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Driver ID</span>
                <span className="font-mono font-bold text-slate-900">{driver.id}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Blood Group</span>
                <span className="font-bold text-slate-900">{driver.bloodGroup}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Emergency Contact</span>
                <span className="font-bold text-slate-900">{driver.emergencyContact.name} ({driver.emergencyContact.phone})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): License, Documents, Vehicle & Account */}
        <div className="lg:col-span-7 space-y-6">
          {/* Driving License Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Commercial Driving License
              </h4>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified & Compliant
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 font-medium">License Number</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{driver.licenseNumber}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 font-medium">License Expiry Date</span>
                <span className="font-bold text-slate-900">{driver.licenseExpiry}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Licensing Authority</span>
                <span className="font-bold text-slate-900">RTO Bhimavaram (AP-37)</span>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Compliance Documents
              </h4>
              <span className="text-xs font-bold text-emerald-600">All Verified (4/4)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {driver.documents.map(doc => (
                <div key={doc.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      {doc.name}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Expires: {doc.expiry}
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {doc.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Vehicle Quick Link */}
          <div 
            onClick={() => {
              playBeep('tap');
              setActiveTab('vehicle');
            }}
            className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-card flex items-center justify-between cursor-pointer active-press hover:border-emerald-300 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Assigned Vehicle</div>
                <div className="text-xs text-slate-500 font-mono">
                  {vehicle.model} • {vehicle.registrationNumber}
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          {/* Account Settings */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Console Preferences
            </h4>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-700 font-medium">Interface Language</span>
                <span className="font-bold text-slate-900">English (India)</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-700 font-medium">Audio Chimes & Dispatch Cues</span>
                <span className="font-bold text-emerald-600">Synthesizer Active</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-700 font-medium">Client Application Build</span>
                <span className="font-mono text-slate-500">v2.4.0-web (Enterprise Fleet)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <LogOut className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Log out of Driver Console?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your duty status will be marked as OFFLINE and you will stop receiving passenger trip assignments until you sign back in.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl active-press transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  playBeep('tap');
                  setShowLogoutConfirm(false);
                  alert("Session ended. In production, this redirects to driver login.");
                }}
                className="py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl active-press transition"
              >
                YES, LOG OUT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Edit Driver Profile
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-left">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase">Driver Name</label>
                <input
                  type="text"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase">Phone Number</label>
                <input
                  type="text"
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>

              <div className="pt-2 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl active-press transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl active-press transition"
                >
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
