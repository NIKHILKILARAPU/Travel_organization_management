import React, { useState } from 'react';
import { 
  Car, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  Building2,
  Navigation,
  Smartphone,
  Lock,
  Sparkles
} from 'lucide-react';

export type UserRole = 'customer' | 'driver' | 'management';

interface LoginPageProps {
  onLoginSuccess: (role: UserRole, userDetails?: any) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('management');
  const [authMode, setAuthMode] = useState<'otp' | 'password'>('password');

  // Phone & OTP states
  const [phoneNumber, setPhoneNumber] = useState('9848011223');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState('9999');

  // Email / Password states
  const [emailOrId, setEmailOrId] = useState('admin@vijayatravels.in');
  const [password, setPassword] = useState('password123');

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // When changing role, pre-fill matching demo credentials
  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setOtpSent(false);
    setOtp('');
    setErrorMsg('');
    if (role === 'customer') {
      setPhoneNumber('9848099821');
      setEmailOrId('arjun.reddy@example.com');
      setSimulatedOtp('4821');
    } else if (role === 'driver') {
      setPhoneNumber('9848022334');
      setEmailOrId('DRV1023');
      setSimulatedOtp('1023');
    } else {
      setPhoneNumber('9848011223');
      setEmailOrId('admin@vijayatravels.in');
      setSimulatedOtp('9999');
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setOtp(simulatedOtp);
    }, 400);
  };

  const handleVerifyOtpAndLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== simulatedOtp && otp.length < 4) {
      setErrorMsg(`Invalid verification code. Use demo code: ${simulatedOtp}`);
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(selectedRole, {
        role: selectedRole,
        phone: `+91 ${phoneNumber}`,
        authMethod: 'OTP',
        name: selectedRole === 'management' ? 'Vikram Sharma' : selectedRole === 'driver' ? 'Ravi Kumar' : 'Arjun Reddy'
      });
    }, 400);
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrId || !password) {
      setErrorMsg('Please enter your credentials');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(selectedRole, {
        role: selectedRole,
        identifier: emailOrId,
        authMethod: 'PASSWORD',
        name: selectedRole === 'management' ? 'Vikram Sharma' : selectedRole === 'driver' ? 'Ravi Kumar' : 'Arjun Reddy'
      });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 antialiased relative">
      {/* Top Bar with Brand Badge & Dark Mode */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between py-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
            <Navigation className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">Vijaya Travel & Fleet OS</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block -mt-0.5">Enterprise Mobility Platform</span>
          </div>
        </div>

      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5 overflow-hidden">
        {/* Card Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Sign in to your account</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Select your portal role to access live telemetry and operations</p>

          {/* Role Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mt-4">
            <button
              type="button"
              onClick={() => handleRoleChange('customer')}
              className={`py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'customer'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5 shrink-0" />
              <span>Customer</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('driver')}
              className={`py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'driver'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Car className="w-3.5 h-3.5 shrink-0" />
              <span>Driver</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('management')}
              className={`py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'management'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 shrink-0" />
              <span>Management</span>
            </button>
          </div>
        </div>

        {/* Auth Method Segmented Control */}
        <div className="px-6 pt-4 flex items-center justify-center gap-6 text-xs font-medium border-b border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              setAuthMode('password');
              setErrorMsg('');
            }}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              authMode === 'password'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Password Login</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode('otp');
              setErrorMsg('');
            }}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              authMode === 'otp'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile OTP</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {authMode === 'password' ? (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {selectedRole === 'customer' ? 'Email Address' : selectedRole === 'driver' ? 'Driver Registration ID' : 'Organization Email'}
                </label>
                <input
                  type="text"
                  value={emailOrId}
                  onChange={(e) => setEmailOrId(e.target.value)}
                  placeholder={selectedRole === 'customer' ? 'you@example.com' : selectedRole === 'driver' ? 'DRV1023' : 'admin@vijayatravels.in'}
                  required
                  className="input-saas"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline">
                    Forgot?
                  </span>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-saas font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-2.5 mt-2"
              >
                <span>{isLoading ? 'Signing in...' : `Enter ${selectedRole === 'management' ? 'Management Dashboard' : selectedRole === 'driver' ? 'Driver Console' : 'Customer Portal'}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : !otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Registered Mobile Number
                </label>
                <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 mr-2 shrink-0">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit number"
                    maxLength={10}
                    required
                    className="bg-transparent text-sm text-slate-900 dark:text-slate-100 outline-none w-full placeholder:text-slate-400"
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                  Demo code will be automatically simulated for instant preview.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || phoneNumber.length < 10}
                className="w-full btn-primary py-2.5 mt-2"
              >
                <span>{isLoading ? 'Sending code...' : 'Send Verification Code'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtpAndLogin} className="space-y-4">
              <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                <span className="text-xs text-slate-600 dark:text-slate-400">Code sent to +91 {phoneNumber}</span>
                <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-blue-700 dark:text-blue-400 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Demo OTP: {simulatedOtp}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 text-center">
                  Enter 4-Digit Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="••••"
                  maxLength={4}
                  required
                  className="input-saas text-center tracking-[0.8em] text-lg font-bold font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.length < 4}
                className="w-full btn-primary py-2.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isLoading ? 'Verifying...' : 'Verify & Continue'}</span>
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="hover:text-slate-800 dark:hover:text-slate-200"
                >
                  Change number
                </button>
                <button
                  type="button"
                  onClick={() => setOtp(simulatedOtp)}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Auto-fill demo code
                </button>
              </div>
            </form>
          )}

          {/* Quick Demo Credentials */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2 text-center">
              1-Click Demo Profiles
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  onLoginSuccess('customer', {
                    name: 'Arjun Reddy',
                    phone: '+91 98480 99821',
                    role: 'customer',
                  });
                }}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 text-left transition-all group"
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">Customer</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">Arjun Reddy</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onLoginSuccess('driver', {
                    name: 'Ravi Kumar',
                    phone: '+91 98480 22334',
                    vehicle: 'AP 37 AB 1234',
                    role: 'driver',
                  });
                }}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 text-left transition-all group"
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">Driver</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">Ravi Kumar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onLoginSuccess('management', {
                    name: 'Vikram Sharma',
                    role: 'management',
                    email: 'admin@vijayatravels.in',
                    organization: 'Vijaya Travel & Transport'
                  });
                }}
                className="p-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30 hover:bg-blue-50 text-left transition-all group"
              >
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 block truncate">Admin / Ops</span>
                <span className="text-[10px] text-blue-600/80 dark:text-blue-400 block truncate">Vikram Sharma</span>
              </button>
            </div>
          </div>
        </div>

        {/* Trust & Security Footer */}
        <div className="py-2.5 px-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 text-center flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>256-bit TLS Encrypted Mobility Telematics • Vijaya Travels</span>
        </div>
      </div>
    </div>
  );
};
