import React from 'react';
import { 
  Phone, 
  MessageSquare, 
  ShieldAlert, 
  Navigation, 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles,
  ShieldCheck,
  Radio,
  Gauge
} from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import { TripMap } from './TripMap';
import { TripCompletedScreen } from './TripCompletedScreen';
import { StatusBadge } from '../common/StatusBadge';
import { EmptyState } from '../common/EmptyState';

export const LiveTripScreen: React.FC = () => {
  const { 
    customerStatus, 
    activeTrip, 
    setIsCallModalOpen, 
    setIsMessageModalOpen, 
    setIsEmergencyModalOpen, 
    setIsCancelModalOpen, 
    simulateDriverArrived, 
    simulateStartTrip, 
    simulateCompleteTrip, 
    resetTripToIdle, 
    startBookingFlow, 
  } = useCustomer();

  // If trip completed, show trip completed & rating screen!
  if (customerStatus === 'TRIP_COMPLETED' && activeTrip) {
    return <TripCompletedScreen trip={activeTrip} onDone={resetTripToIdle} />;
  }

  // If no active trip or IDLE, show helpful prompt to book
  if (customerStatus === 'IDLE' || !activeTrip) {
    return (
      <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6 pb-24">
        <EmptyState
          icon={Navigation}
          title="No Active Trip Right Now"
          description="You don't have an active trip in progress. Select a destination or book a ride to start live telematics tracking."
          actionText="Book a Ride Now"
          onAction={() => startBookingFlow()}
        />
      </div>
    );
  }

  // If cancelled
  if (customerStatus === 'CANCELLED') {
    return (
      <div className="p-4 lg:p-8 max-w-xl mx-auto space-y-6 pb-24">
        <div className="bg-white dark:bg-slate-900 rounded-[14px] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-[#FF3B30]/30 text-center">
          <div className="w-14 h-14 rounded-[14px] bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-[700] text-slate-900 dark:text-slate-100">Trip Was Cancelled</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
            {activeTrip.cancellationReason || 'This booking has been cancelled. Any deduction has been credited back to your account.'}
          </p>

          <button
            onClick={resetTripToIdle}
            className="mt-6 min-h-[44px] px-7 rounded-[14px] bg-white dark:bg-slate-800/60 text-white dark:text-slate-100 font-[590] text-xs transition-all active:scale-95"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Get status headline
  const getStatusHeadline = () => {
    switch (customerStatus) {
      case 'SEARCHING_DRIVER':
        return 'Searching for nearby drivers...';
      case 'DRIVER_ASSIGNED':
        return 'Driver assigned • Preparing for departure';
      case 'DRIVER_ARRIVING':
        return 'Driver is arriving at pickup location';
      case 'DRIVER_ARRIVED':
        return 'Driver has arrived! Board vehicle now';
      case 'TRIP_IN_PROGRESS':
        return 'Trip in progress • En route to destination';
      default:
        return 'Ride Active';
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-5 pb-24 lg:pb-8 animate-in fade-in duration-200">
      {/* 1. Top Status Header */}
      <div className="bg-white dark:bg-slate-900 rounded-[14px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-[14px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800 flex-shrink-0">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-[700] text-slate-900 dark:text-slate-100 tracking-tight">{getStatusHeadline()}</h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Trip #{activeTrip.tripId} • {activeTrip.driver.vehicleType} • Live Telematics Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <StatusBadge status={customerStatus} size="lg" />
        </div>
      </div>

      {/* 2. Interactive Testing & Simulation Action Bar */}
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-[14px] p-3 px-4 flex flex-wrap items-center justify-between gap-3 text-xs border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="font-[700]">Trip Progression Simulator:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {customerStatus === 'DRIVER_ARRIVING' && (
            <button
              onClick={simulateDriverArrived}
              className="py-1.5 px-3.5 rounded-[14px] bg-blue-600 text-white font-[590] transition-all active:scale-95"
            >
              Simulate Driver Arrived
            </button>
          )}

          {customerStatus === 'DRIVER_ARRIVED' && (
            <button
              onClick={simulateStartTrip}
              className="py-1.5 px-3.5 rounded-[14px] bg-blue-600 text-white font-[590] transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Play className="w-3 h-3" />
              Simulate Start Trip
            </button>
          )}

          {customerStatus === 'TRIP_IN_PROGRESS' && (
            <button
              onClick={simulateCompleteTrip}
              className="py-1.5 px-3.5 rounded-[14px] bg-emerald-500 text-white font-[590] transition-all flex items-center gap-1.5 active:scale-95"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Simulate Complete Trip
            </button>
          )}

          <button
            onClick={() => setIsCancelModalOpen(true)}
            className="py-1.5 px-3 rounded-[14px] bg-rose-50 dark:bg-rose-950/40 text-rose-500 font-[590] border border-[#FF3B30]/30 transition-all"
          >
            Cancel Trip
          </button>
        </div>
      </div>

      {/* 3. Map Area with Floating Telemetry HUD */}
      <div className="relative">
        <TripMap
          status={customerStatus}
          driverEtaMinutes={activeTrip.driver.currentEtaMinutes}
          pickupLocation={activeTrip.pickupLocation}
          destinationLocation={activeTrip.destinationLocation}
          vehicleType={activeTrip.driver.vehicleType}
          driverName={activeTrip.driver.name}
        />

        {/* Floating Telematics Bar over the Map */}
        <div className="absolute top-4 left-4 right-4 sm:right-auto z-20 flex items-center gap-2">
          <div className="px-3 py-2 rounded-[14px] bg-white dark:bg-slate-900/80 backdrop-blur-md text-slate-900 dark:text-slate-100 border border-white/10 shadow-lg text-xs flex items-center gap-2.5">
            <Gauge className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-[700] block leading-none">Speed</span>
              <span className="font-mono font-[700] text-slate-900 dark:text-slate-100 text-xs">
                {customerStatus === 'TRIP_IN_PROGRESS' ? '38 km/h' : '0 km/h'}
              </span>
            </div>
            <div className="h-5 w-px bg-white/20" />
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-[700] block leading-none">ETA</span>
              <span className="font-mono font-[700] text-slate-900 dark:text-slate-100 text-xs">{activeTrip.driver.currentEtaMinutes} mins</span>
            </div>
            <div className="h-5 w-px bg-white/20" />
            <div className="flex items-center gap-1 text-[11px] text-emerald-500 font-[700]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SOS Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Trip Card & Driver Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Driver profile & in-cab communication */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-[14px] p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex flex-col justify-between space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={activeTrip.driver.photo}
                  alt={activeTrip.driver.name}
                  className="w-16 h-16 rounded-[14px] object-cover ring-2 ring-[#0071E3]"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white dark:border-slate-800 animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100">{activeTrip.driver.name}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 font-[700] text-xs border border-amber-500/30">
                    {activeTrip.driver.rating} ★
                  </span>
                </div>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {activeTrip.driver.vehicleModel} • {activeTrip.driver.vehicleColor}
                </p>

                <div className="mt-1.5">
                  <div className="px-2.5 py-0.5 text-xs border border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-[14px] inline-block text-slate-900 dark:text-slate-100">
                    <span className="mr-1.5 font-[700]">IND</span>
                    <span>{activeTrip.driver.vehicleRegistration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ETA & OTP Pill */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center p-3 sm:p-0 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 sm:bg-transparent rounded-[14px] sm:rounded-none">
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-[700] text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Driver Arrival
                </span>
                <p className="text-2xl font-[700] text-slate-900 dark:text-slate-100 tracking-tight">
                  {activeTrip.driver.currentEtaMinutes} mins
                </p>
              </div>
              <div className="text-right mt-1">
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Share with driver</span>
                <p className="text-xs font-[700] text-slate-900 dark:text-slate-100">
                  OTP: <span className="font-mono text-base font-[700] text-amber-500 ml-1">{activeTrip.otp}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons: Call, Message, Emergency */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700">
            <button
              onClick={() => setIsCallModalOpen(true)}
              className="min-h-[44px] px-3 bg-blue-600 text-white rounded-[14px] text-xs font-[590] transition-all flex items-center justify-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </button>

            <button
              onClick={() => setIsMessageModalOpen(true)}
              className="min-h-[44px] px-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-[14px] text-xs font-[590] transition-all flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-800 dark:border-slate-700"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message</span>
            </button>

            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="min-h-[44px] px-3 bg-rose-50 dark:bg-rose-950/40 text-rose-500 border border-[#FF3B30]/30 rounded-[14px] text-xs font-[590] transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Emergency</span>
            </button>
          </div>
        </div>

        {/* Right: Trip route, distance & estimated fare */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-[14px] p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex flex-col justify-between space-y-4">
          <h3 className="text-xs font-[700] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Trip Route Information
          </h3>

          <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 p-4 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-xs">
            <div className="flex items-start gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-1 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-[700] text-slate-500 dark:text-slate-400">Pickup</span>
                <p className="font-[700] text-slate-900 dark:text-slate-100 truncate">{activeTrip.pickupLocation}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-[700] text-slate-500 dark:text-slate-400">Destination</span>
                <p className="font-[700] text-slate-900 dark:text-slate-100 truncate">{activeTrip.destinationLocation}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 text-[11px]">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Total Distance:</span>
                <p className="font-[700] text-slate-900 dark:text-slate-100">{activeTrip.distanceKm} km</p>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Total Fare:</span>
                <p className="font-[700] text-slate-900 dark:text-slate-100 text-sm">₹{activeTrip.fare}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700">
            <span>Payment Mode: <strong className="text-slate-900 dark:text-slate-100">{activeTrip.paymentMethod}</strong></span>
            <span className="text-emerald-500 font-[700] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Safety Monitored
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
