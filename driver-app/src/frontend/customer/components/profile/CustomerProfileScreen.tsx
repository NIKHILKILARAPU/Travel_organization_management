import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Shield, 
  CreditCard, 
  Clock, 
  Bell, 
  HelpCircle, 
  Lock, 
  LogOut, 
  ChevronRight, 
  Edit3, 
  Check, 
  Star, 
  Bookmark, 
  X 
} from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import { ConfirmationModal } from '../common/ConfirmationModal';

export const CustomerProfileScreen: React.FC = () => {
  const { profile, updateProfile, setActiveTab, onLogout } = useCustomer();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Edit fields
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [city, setCity] = useState(profile.city);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, email, city });
    setIsEditModalOpen(false);
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setIsPasswordModalOpen(false);
      setCurrentPassword('');
      setNewPassword('');
    }, 1200);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      setActiveTab('home');
    }
  };

  const profileSections = [
    {
      title: 'Saved Places',
      subtitle: 'Home, Work, College & frequent destinations',
      icon: Bookmark,
      action: () => setActiveTab('saved-places'),
    },
    {
      title: 'Payment Methods',
      subtitle: 'Manage UPI, cards and ABC Travels wallet',
      icon: CreditCard,
      action: () => setActiveTab('payments'),
    },
    {
      title: 'Trip History',
      subtitle: 'View receipts, ratings and travel invoices',
      icon: Clock,
      action: () => setActiveTab('trips'),
    },
    {
      title: 'Notifications',
      subtitle: 'Trip alerts, driver updates and promos',
      icon: Bell,
      action: () => setActiveTab('notifications'),
    },
    {
      title: 'Privacy & Security',
      subtitle: 'Account protection, GPS permissions and 2FA',
      icon: Shield,
      action: () => setIsPrivacyModalOpen(true),
    },
    {
      title: 'Help & Support',
      subtitle: '24x7 mobility desk and support tickets',
      icon: HelpCircle,
      action: () => setActiveTab('support'),
    },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6 pb-24 lg:pb-8">
      {/* 1. Profile Top Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[14px] p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="relative">
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)]"
            />
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-blue-600 text-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)]"
              title="Edit photo/profile"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-xl font-[700] text-slate-900 dark:text-slate-100">{profile.name}</h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-[590] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-[14px] border border-blue-200 dark:border-blue-800 self-center">
                <Star className="w-3 h-3" />
                {profile.rating} Rider Rating
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-[400] mt-1">{profile.organization}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-900 dark:text-slate-100 mt-3 font-[590]">
              <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <Phone className="w-3.5 h-3.5" />
                {profile.phone}
              </span>
              <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <Mail className="w-3.5 h-3.5" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                <MapPin className="w-3.5 h-3.5" />
                {profile.city}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="min-h-[44px] px-4 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 hover:bg-[#E5E5EA] dark:hover:bg-slate-800 text-xs font-[590] transition-all self-center sm:self-start active:scale-95"
        >
          Edit Profile
        </button>
      </div>

      {/* 2. Rider Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-center">
          <span className="text-[10px] font-[590] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Rides</span>
          <p className="text-lg font-[700] text-slate-900 dark:text-slate-100 mt-0.5">{profile.totalTrips}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-center">
          <span className="text-[10px] font-[590] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Wallet Balance</span>
          <p className="text-lg font-[700] text-slate-900 dark:text-slate-100 mt-0.5">₹{profile.walletBalance}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-center">
          <span className="text-[10px] font-[590] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Rider Rating</span>
          <p className="text-lg font-[700] text-slate-900 dark:text-slate-100 mt-0.5">★ {profile.rating}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-center">
          <span className="text-[10px] font-[590] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Member Since</span>
          <p className="text-xs font-[700] text-slate-900 dark:text-slate-100 mt-1">{profile.memberSince}</p>
        </div>
      </div>

      {/* 3. Navigation Sections List */}
      <div className="bg-white dark:bg-slate-900 rounded-[14px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
        <h3 className="text-xs font-[700] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">
          Account Settings & Preferences
        </h3>

        <div className="space-y-1">
          {profileSections.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={item.action}
                className="py-3.5 px-3 flex items-center justify-between hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 rounded-[14px] cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-800 dark:border-slate-700`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-[590] text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.subtitle}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Action Buttons: Change Password & Logout */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="w-full sm:flex-1 min-h-[44px] px-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 hover:bg-[#E5E5EA] dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-[590] rounded-[14px] transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Lock className="w-4 h-4" />
          <span>Change Password</span>
        </button>

        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-full sm:flex-1 min-h-[44px] px-4 bg-rose-500 text-white text-xs font-[590] rounded-[14px] transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[14px] max-w-md w-full p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100">Edit Personal Information</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 rounded-[14px]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div>
                <label className="block text-[11px] font-[590] text-slate-500 dark:text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full min-h-[44px] px-3.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:bg-white dark:focus:bg-white dark:bg-slate-900 focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-[590] text-slate-500 dark:text-slate-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full min-h-[44px] px-3.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:bg-white dark:focus:bg-white dark:bg-slate-900 focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-[590] text-slate-500 dark:text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full min-h-[44px] px-3.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:bg-white dark:focus:bg-white dark:bg-slate-900 focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-[590] text-slate-500 dark:text-slate-400 mb-1">Default City / Region</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full min-h-[44px] px-3.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:bg-white dark:focus:bg-white dark:bg-slate-900 focus:border-blue-600 outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 min-h-[44px] px-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 hover:bg-[#E5E5EA] dark:hover:bg-slate-800 text-xs font-[590] rounded-[14px] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 min-h-[44px] px-4 bg-blue-600 text-white text-xs font-[590] rounded-[14px] transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[14px] max-w-md w-full p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100">Change Password</h3>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-1 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 rounded-[14px]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePasswordSave} className="space-y-4">
              <div>
                <label className="block text-[11px] font-[590] text-slate-500 dark:text-slate-400 mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full min-h-[44px] px-3.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:bg-white dark:focus:bg-white dark:bg-slate-900 focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-[590] text-slate-500 dark:text-slate-400 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  required
                  minLength={8}
                  className="w-full min-h-[44px] px-3.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:bg-white dark:focus:bg-white dark:bg-slate-900 focus:border-blue-600 outline-none"
                />
              </div>

              {passwordSuccess && (
                <div className="p-3 bg-emerald-500/10 text-emerald-500 border border-[#34C759]/20 rounded-[14px] text-xs font-[590] flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Password updated successfully!</span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="flex-1 min-h-[44px] px-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 hover:bg-[#E5E5EA] dark:hover:bg-slate-800 text-xs font-[590] rounded-[14px] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 min-h-[44px] px-4 bg-blue-600 text-white text-xs font-[590] rounded-[14px] transition-all"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Privacy & Security Modal */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[14px] max-w-md w-full p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100">Privacy & Security</h3>
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="p-1 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 rounded-[14px]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                <div>
                  <h4 className="font-[590] text-slate-900 dark:text-slate-100">High Precision GPS Sharing</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Share live coordinates during active rides</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#0071E3]" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                <div>
                  <h4 className="font-[590] text-slate-900 dark:text-slate-100">Two-Factor Authentication</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Require OTP on sign-in from new device</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#0071E3]" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                <div>
                  <h4 className="font-[590] text-slate-900 dark:text-slate-100">Mask Phone Number</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Never reveal real number to drivers</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#0071E3]" />
              </div>

              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="w-full mt-4 min-h-[44px] px-4 bg-blue-600 text-white font-[590] text-xs rounded-[14px] transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Logout of ABC Travels?"
        message="You will need to re-verify your phone number to sign back in."
        confirmText="Yes, Logout"
        cancelText="Stay Logged In"
        type="warning"
      />
    </div>
  );
};
