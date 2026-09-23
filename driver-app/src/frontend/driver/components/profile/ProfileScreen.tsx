import React, { useState } from 'react';
import { useDriver } from '../../context/DriverContext';
import { 
  LogOut, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  Car
} from 'lucide-react';

interface ProfileScreenProps {
  onLogout?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
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
          <h2 className="text-2xl font-[700] text-slate-900 dark:text-slate-100 tracking-tight">
            Driver Profile & Compliance
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-[400] mt-0.5">
            Verified identity, commercial licenses, and ABC Travels fleet records
          </p>
        </div>

        <button
          onClick={() => {
            playBeep('tap');
            setShowLogoutConfirm(true);
          }}
          className="min-h-[44px] px-4 py-2 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-500/20 text-rose-500 border border-rose-200 dark:border-rose-800 font-[590] text-xs rounded-[14px] active-press transition flex items-center gap-2 self-start sm:self-auto"
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
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={driver.avatar}
                  alt={driver.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-200 dark:border-blue-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                />
                <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-[700] text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                  {driver.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono font-[590] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-2 py-0.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                    ID: {driver.id}
                  </span>
                  <span className="text-xs font-[590] text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-[14px] border border-amber-500/20">
                    ⭐ {driver.rating}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-[400]">
                  {driver.organization} • Joined {driver.joiningDate}
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 text-center">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-[400] block">Trips Completed</span>
                <span className="text-xl font-[700] text-slate-900 dark:text-slate-100 mt-0.5 block">{driver.totalTripsCompleted.toLocaleString('en-IN')}</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-[400] block">Driver Rating</span>
                <span className="text-xl font-[700] text-slate-900 dark:text-slate-100 mt-0.5 block">⭐ 4.8 / 5.0</span>
              </div>
            </div>

            <button
              onClick={() => {
                playBeep('tap');
                setShowEditModal(true);
              }}
              className="w-full min-h-[44px] py-2.5 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 font-[590] text-xs uppercase tracking-wider rounded-[14px] active-press transition"
            >
              EDIT PROFILE
            </button>
          </div>

          {/* Personal Information */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-4">
            <h4 className="text-xs font-[700] uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Personal Information
            </h4>

            <div className="divide-y divide-[#D2D2D7] dark:divide-[#38383A] text-xs">
              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">Full Legal Name</span>
                <span className="font-[590] text-slate-900 dark:text-slate-100">{driver.name}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">Phone Number</span>
                <span className="font-mono font-[590] text-slate-900 dark:text-slate-100">{driver.phone}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">Driver ID</span>
                <span className="font-mono font-[590] text-slate-900 dark:text-slate-100">{driver.id}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">Blood Group</span>
                <span className="font-[590] text-slate-900 dark:text-slate-100">{driver.bloodGroup}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">Emergency Contact</span>
                <span className="font-[590] text-slate-900 dark:text-slate-100">{driver.emergencyContact.name} ({driver.emergencyContact.phone})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): License, Documents, Vehicle & Account */}
        <div className="lg:col-span-7 space-y-6">
          {/* Driving License Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-[700] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Commercial Driving License
              </h4>
              <span className="text-xs font-[590] text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-[14px] border border-[#34C759]/20 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Verified & Compliant
              </span>
            </div>

            <div className="divide-y divide-[#D2D2D7] dark:divide-[#38383A] text-xs">
              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">License Number</span>
                <span className="font-mono font-[590] text-slate-900 dark:text-slate-100 text-sm">{driver.licenseNumber}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">License Expiry Date</span>
                <span className="font-[590] text-slate-900 dark:text-slate-100">{driver.licenseExpiry}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">Licensing Authority</span>
                <span className="font-[590] text-slate-900 dark:text-slate-100">RTO Bhimavaram (AP-37)</span>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-[700] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Compliance Documents
              </h4>
              <span className="text-xs font-[590] text-emerald-500">All Verified (4/4)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {driver.documents.map(doc => (
                <div key={doc.id} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-[590] text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      {doc.name}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Expires: {doc.expiry}
                    </div>
                  </div>

                  <span className="text-[10px] font-[590] px-2 py-0.5 rounded-[14px] bg-emerald-500/10 text-emerald-500 border border-[#34C759]/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
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
            className="bg-white dark:bg-slate-900 p-5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] flex items-center justify-between cursor-pointer active-press hover:border-blue-600 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[14px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-[700] text-slate-900 dark:text-slate-100">Assigned Vehicle</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {vehicle.model} • {vehicle.registrationNumber}
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </div>

          {/* Account Settings */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-3">
            <h4 className="text-xs font-[700] uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Console Preferences
            </h4>

            <div className="divide-y divide-[#D2D2D7] dark:divide-[#38383A] text-xs">
              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">Interface Language</span>
                <span className="font-[590] text-slate-900 dark:text-slate-100">English (India)</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">Audio Chimes & Dispatch Cues</span>
                <span className="font-[590] text-emerald-500">Synthesizer Active</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-[400]">Client Application Build</span>
                <span className="font-mono text-slate-500 dark:text-slate-400">v2.4.0-web (Enterprise Fleet)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[14px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto">
              <LogOut className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-[700] text-slate-900 dark:text-slate-100">
                Log out of Driver Console?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-[400]">
                Your duty status will be marked as OFFLINE and you will stop receiving passenger trip assignments until you sign back in.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="min-h-[44px] py-2.5 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 font-[590] text-xs rounded-[14px] active-press transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  playBeep('tap');
                  setShowLogoutConfirm(false);
                  onLogout?.();
                }}
                className="min-h-[44px] py-2.5 bg-rose-500 hover:opacity-90 text-white font-[590] text-xs rounded-[14px] active-press transition"
              >
                YES, LOG OUT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[14px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 space-y-4">
            <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100">
              Edit Driver Profile
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-left">
              <div>
                <label className="text-[11px] font-[590] text-slate-500 dark:text-slate-400 uppercase">Driver Name</label>
                <input
                  type="text"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full min-h-[44px] mt-1 px-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-[14px] text-xs font-[590] focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-[590] text-slate-500 dark:text-slate-400 uppercase">Phone Number</label>
                <input
                  type="text"
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  className="w-full min-h-[44px] mt-1 px-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-[14px] text-xs font-mono font-[590] focus:border-blue-600 outline-none"
                />
              </div>

              <div className="pt-2 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="min-h-[44px] py-2.5 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 font-[590] text-xs rounded-[14px] active-press transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] py-2.5 bg-blue-600 hover:opacity-90 text-white font-[590] text-xs rounded-[14px] active-press transition"
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
