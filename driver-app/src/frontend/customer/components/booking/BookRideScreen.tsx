import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  Check, 
  ChevronRight,
  Info,
  Car,
  Phone,
  MessageSquare,
  ArrowUpDown,
  ShieldCheck,
  CreditCard,
  Wallet,
  Banknote,
  Smartphone,
  Tag,
  Navigation
} from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import { VEHICLE_OPTIONS, CANCELLATION_POLICY_TEXT } from '../../data/customerMockData';
import type { VehicleCategory, PaymentMethodType } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { LocationAutocompleteInput } from '../common/LocationAutocompleteInput';

export const BookRideScreen: React.FC = () => {
  const { 
    pickupLocation, 
    setPickupLocation, 
    destinationLocation, 
    setDestinationLocation, 
    selectedVehicle, 
    setSelectedVehicle, 
    selectedPaymentMethod, 
    setSelectedPaymentMethod, 
    confirmBooking, 
    customerStatus, 
    activeTrip,
    setActiveTab,
    setIsCallModalOpen,
    setIsMessageModalOpen,
    setIsCancelModalOpen,
    profile
  } = useCustomer();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showFareBreakdown, setShowFareBreakdown] = useState(false);

  // Selected vehicle details
  const currentVehicleOption = VEHICLE_OPTIONS.find(v => v.id === selectedVehicle) || VEHICLE_OPTIONS[0];

  // Calculated distance & duration
  const distanceKm = 6.2;
  const durationMins = 16;
  const rawFare = Math.round(currentVehicleOption.baseFare + distanceKm * currentVehicleOption.perKmRate);
  const orgDiscount = 20; // Enterprise / Campus Pass Subsidy
  const finalFare = Math.max(40, rawFare - orgDiscount);

  const handleSwapLocations = () => {
    const temp = pickupLocation;
    setPickupLocation(destinationLocation);
    setDestinationLocation(temp);
  };

  const getVehicleVisual = (category: VehicleCategory) => {
    switch (category) {
      case 'auto':
        return (
          <div className="w-[52px] h-[52px] rounded-[14px] bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center font-[700] text-2xl border border-amber-500/30">
            🛺
          </div>
        );
      case 'sedan':
        return (
          <div className="w-[52px] h-[52px] rounded-[14px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-[700] text-2xl border border-blue-200 dark:border-blue-800">
            🚗
          </div>
        );
      case 'suv':
        return (
          <div className="w-[52px] h-[52px] rounded-[14px] bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-[700] text-2xl border border-[#34C759]/30">
            🚙
          </div>
        );
      case 'premium':
        return (
          <div className="w-[52px] h-[52px] rounded-[14px] bg-white dark:bg-slate-900/10 text-slate-900 dark:text-slate-100 flex items-center justify-center font-[700] text-2xl border border-white dark:border-slate-900/30 dark:border-white/30">
            ✨
          </div>
        );
    }
  };

  const getVehicleBadge = (category: VehicleCategory) => {
    switch (category) {
      case 'auto':
        return { label: '⚡ FASTEST • 4 MINS', color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-500 border-amber-500/30' };
      case 'sedan':
        return { label: '🔥 POPULAR CHOICE', color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800' };
      case 'suv':
        return { label: '👨‍👩‍👧‍👦 6 SEATS • SPACIOUS', color: 'bg-emerald-500/10 text-emerald-500 border-[#34C759]/30' };
      case 'premium':
        return { label: '✨ TOP-RATED DRIVERS', color: 'bg-white dark:bg-slate-900/10 dark:bg-slate-900/10 text-slate-900 dark:text-slate-100 border-white dark:border-slate-900/30 dark:border-white/30' };
    }
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    await confirmBooking();
    setIsSubmitting(false);
  };

  // If driver assigned or searching, show live confirmation view
  const isPostBookingState = customerStatus === 'SEARCHING_DRIVER' || customerStatus === 'DRIVER_ASSIGNED' || customerStatus === 'DRIVER_ARRIVING';

  if (isPostBookingState && activeTrip) {
    return (
      <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6 pb-24 animate-in fade-in duration-300">
        {/* Searching Driver Animated Radar Screen */}
        {customerStatus === 'SEARCHING_DRIVER' && (
          <div className="bg-white dark:bg-slate-900 rounded-[14px] p-8 sm:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-center relative overflow-hidden">
            <div className="relative mx-auto w-28 h-28 mb-6 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-800 animate-ping absolute inset-0" />
              <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/40 border-2 border-blue-300 dark:border-blue-700 animate-pulse absolute" />
              <div className="w-16 h-16 rounded-[14px] bg-blue-600 text-white flex items-center justify-center relative z-10">
                <Car className="w-8 h-8 animate-pulse text-white" />
              </div>
            </div>

            <div className="inline-block mb-3">
              <StatusBadge status="SEARCHING_DRIVER" size="lg" />
            </div>

            <h2 className="text-2xl font-[700] text-slate-900 dark:text-slate-100 tracking-tight">
              Finding your nearest driver...
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed mt-1 mb-6">
              Contacting verified {currentVehicleOption.name} drivers around {pickupLocation.split(',')[0]}. Your ride will be confirmed in a few seconds.
            </p>

            <div className="max-w-md mx-auto bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] p-4 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-left text-xs space-y-2.5 mb-6">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span className="font-[590]">Pickup:</span>
                <span className="font-[700] text-slate-900 dark:text-slate-100 text-right truncate max-w-[240px]">{pickupLocation}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span className="font-[590]">Destination:</span>
                <span className="font-[700] text-slate-900 dark:text-slate-100 text-right truncate max-w-[240px]">{destinationLocation}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700">
                <span className="font-[700]">Estimated Total Fare:</span>
                <div className="text-right">
                  <span className="text-base font-[700] text-slate-900 dark:text-slate-100">₹{finalFare}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 line-through ml-1.5">₹{rawFare}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsCancelModalOpen(true)}
              className="text-xs font-[700] text-rose-500 hover:opacity-80 py-2 px-5 rounded-[14px] bg-rose-50 dark:bg-rose-950/40 border border-[#FF3B30]/30 transition-colors"
            >
              Cancel Search
            </button>
          </div>
        )}

        {/* Driver Found State */}
        {(customerStatus === 'DRIVER_ASSIGNED' || customerStatus === 'DRIVER_ARRIVING') && (
          <div className="bg-white dark:bg-slate-900 rounded-[14px] p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 animate-in fade-in duration-300 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 dark:border-slate-700">
              <div>
                <span className="text-[11px] font-[700] text-emerald-500 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-[14px]">
                  Ride Confirmed
                </span>
                <h2 className="text-xl sm:text-2xl font-[700] text-slate-900 dark:text-slate-100 mt-2 tracking-tight">Driver Assigned</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Your driver partner has accepted and is en route</p>
              </div>
              <StatusBadge status={customerStatus} size="lg" />
            </div>

            {/* Driver Profile Card with License Plate */}
            <div className="p-6 rounded-[14px] bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={activeTrip.driver.photo}
                    alt={activeTrip.driver.name}
                    className="w-16 h-16 rounded-[14px] object-cover ring-2 ring-[#0071E3]"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 border-2 border-white dark:border-slate-900 dark:border-slate-900 rounded-full animate-ping" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-[700] text-slate-900 dark:text-slate-100">{activeTrip.driver.name}</h3>
                    <span className="px-2 py-0.5 rounded-[14px] bg-amber-500/20 text-amber-500 font-[700] text-xs">
                      ★ {activeTrip.driver.rating}
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {activeTrip.driver.vehicleModel} • {activeTrip.driver.vehicleColor}
                  </p>

                  <div className="mt-2">
                    <div className="px-2.5 py-0.5 text-xs border border-slate-200 dark:border-slate-700 rounded-[14px] inline-block">
                      <span className="mr-1.5 font-[700]">IND</span>
                      <span>{activeTrip.driver.vehicleRegistration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400">Estimated Arrival</p>
                <p className="text-2xl font-[700] text-blue-600 dark:text-blue-400">{activeTrip.driver.currentEtaMinutes} mins</p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 rounded-[14px] border border-amber-500/30 text-xs">
                  <span className="text-amber-500">Share OTP:</span>
                  <span className="font-mono font-[700] text-slate-900 dark:text-slate-100 tracking-widest text-sm">{activeTrip.otp}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Call, Message, Live Map */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setIsCallModalOpen(true)}
                className="min-h-[44px] px-4 rounded-[14px] bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 font-[700] text-xs flex items-center justify-center gap-2 transition-all active:scale-95 border border-slate-200 dark:border-slate-700"
              >
                <Phone className="w-4 h-4" />
                <span>Call Driver</span>
              </button>

              <button
                onClick={() => setIsMessageModalOpen(true)}
                className="min-h-[44px] px-4 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-[700] text-xs flex items-center justify-center gap-2 transition-all active:scale-95 border border-slate-200 dark:border-slate-800 dark:border-slate-700"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Driver</span>
              </button>

              <button
                onClick={() => setActiveTab('live')}
                className="min-h-[44px] px-4 rounded-[14px] bg-blue-600 hover:opacity-90 text-white font-[700] text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>View Full Map</span>
              </button>
            </div>

            {/* Cancellation Notice */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Need to cancel this booking?</span>
              <button
                onClick={() => setIsCancelModalOpen(true)}
                className="text-rose-500 font-[700] hover:underline"
              >
                Cancel Ride
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6 pb-24 lg:pb-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-[700] text-slate-900 dark:text-slate-100 tracking-tight">Book a Ride</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select your route, vehicle tier, and payment method for instant pickup
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-[700] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-[14px] border border-blue-200 dark:border-blue-800 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4" />
          <span>Campus & Org Subsidy Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Step 1, 2 (Route) & Step 3 (Vehicle Selection) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1 & 2: Location Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[14px] p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-[700] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Step 1 & 2: Route & Stops
              </h3>
              <div className="flex items-center gap-2 text-[11px] font-[700] text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 px-2.5 py-1 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                <span>{distanceKm} km</span>
                <span>•</span>
                <span>~{durationMins} mins</span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Pickup input */}
              <LocationAutocompleteInput
                label="Step 1: Pickup Location"
                value={pickupLocation}
                onChange={setPickupLocation}
                placeholder="Enter pickup point, landmark or tap GPS"
                type="pickup"
                required
              />

              {/* Swap Button */}
              <div className="flex justify-end -my-2 pr-4">
                <button
                  type="button"
                  onClick={handleSwapLocations}
                  className="p-1.5 rounded-[14px] bg-white dark:bg-slate-900 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 transition-all active:scale-90"
                  title="Swap pickup and destination"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Destination input */}
              <LocationAutocompleteInput
                label="Step 2: Destination"
                value={destinationLocation}
                onChange={setDestinationLocation}
                placeholder="Enter destination location"
                type="destination"
                required
              />
            </div>
          </div>

          {/* Step 3: Vehicle Type Selection */}
          <div className="bg-white dark:bg-slate-900 rounded-[14px] p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-xs font-[700] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Step 3: Select Vehicle Type
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Choose the ride suited for your travel</p>
              </div>
              <span className="text-[11px] font-[700] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-[14px] border border-blue-200 dark:border-blue-800">
                4 Options Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {VEHICLE_OPTIONS.map((veh) => {
                const isSelected = selectedVehicle === veh.id;
                const dynamicFare = Math.round(veh.baseFare + distanceKm * veh.perKmRate);
                const badge = getVehicleBadge(veh.id);

                return (
                  <div
                    key={veh.id}
                    onClick={() => setSelectedVehicle(veh.id)}
                    className={`p-4 rounded-[14px] border cursor-pointer transition-all active:scale-98 flex flex-col justify-between relative overflow-hidden ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600/5'
                        : 'border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800'
                    }`}
                  >
                    {/* Top Micro-badge */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className={`text-[9px] font-[700] px-2 py-0.5 rounded-md border ${badge.color}`}>
                        {badge.label}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-start gap-3 mb-3">
                      {getVehicleVisual(veh.id)}
                      <div className="min-w-0">
                        <h4 className="text-sm font-[700] text-slate-900 dark:text-slate-100">{veh.name}</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate leading-snug">{veh.description}</p>
                        
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                          <span className="flex items-center gap-1 font-[590] text-slate-900 dark:text-slate-100">
                            <Users className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                            {veh.capacity} seats
                          </span>
                          <span>•</span>
                          <span className="text-blue-600 dark:text-blue-400 font-[700]">{veh.etaMinutes} min away</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-baseline justify-between">
                      <span className="text-[11px] font-[700] text-slate-500 dark:text-slate-400">Total Fare</span>
                      <div className="text-right">
                        <span className="text-base font-[700] text-slate-900 dark:text-slate-100">₹{dynamicFare}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 ml-1">
                          (₹{veh.minFare}–₹{veh.maxFare})
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Trip Summary, Payment Method & Confirm */}
        <div className="lg:col-span-5 space-y-6">
          {/* Trip Summary Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[14px] p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 space-y-4">
            <h3 className="text-xs font-[700] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Trip Summary & Fare
            </h3>

            <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 p-4 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-[700] text-slate-500 dark:text-slate-400">Pickup</span>
                  <p className="font-[700] text-slate-900 dark:text-slate-100 truncate">{pickupLocation}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-[700] text-slate-500 dark:text-slate-400">Destination</span>
                  <p className="font-[700] text-slate-900 dark:text-slate-100 truncate">{destinationLocation}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 text-[11px]">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Total Distance:</span>
                  <p className="font-[700] text-slate-900 dark:text-slate-100">{distanceKm} km</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Est. Duration:</span>
                  <p className="font-[700] text-slate-900 dark:text-slate-100">{durationMins} mins</p>
                </div>
              </div>
            </div>

            {/* Organization Pass Benefit Alert */}
            <div className="flex items-center gap-2.5 p-3 rounded-[14px] bg-emerald-500/10 border border-[#34C759]/30 text-emerald-500 text-xs">
              <Tag className="w-4 h-4 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-[700]">₹{orgDiscount} Org Subsidy Applied</span>
                <p className="text-[10px] text-emerald-500">Subsidized by ABC Organization Mobility Fund</p>
              </div>
            </div>

            {/* Fare Breakdown Accordion */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setShowFareBreakdown(!showFareBreakdown)}
                className="w-full flex items-center justify-between text-xs font-[700] text-slate-900 dark:text-slate-100 py-1"
              >
                <span>Fare Breakdown</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${showFareBreakdown ? 'rotate-90' : ''}`} />
              </button>

              {showFareBreakdown && (
               <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] space-y-1.5 text-xs text-slate-900 dark:text-slate-100 animate-in fade-in duration-150">
                  <div className="flex justify-between">
                    <span>Base Fare ({currentVehicleOption.name}):</span>
                    <span>₹{currentVehicleOption.baseFare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distance Charge ({distanceKm} km × ₹{currentVehicleOption.perKmRate}):</span>
                    <span>₹{Math.round(distanceKm * currentVehicleOption.perKmRate)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-500 font-[700]">
                    <span>Organization Subsidy:</span>
                    <span>-₹{orgDiscount}</span>
                  </div>
                </div>
              )}

              <div className="flex items-baseline justify-between pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700">
                <div>
                  <span className="text-xs font-[700] text-slate-500 dark:text-slate-400 uppercase">Payable Total</span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Includes all taxes and tolls</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-[700] text-slate-900 dark:text-slate-100">₹{finalFare}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 line-through ml-2">₹{rawFare}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white dark:bg-slate-900 rounded-[14px] p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 space-y-4">
            <h3 className="text-xs font-[700] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Payment Method
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'UPI' as PaymentMethodType, label: 'Instant UPI', desc: 'GPay, PhonePe, Paytm', icon: Smartphone },
                { id: 'Card' as PaymentMethodType, label: 'Debit / Credit', desc: 'Visa, Mastercard', icon: CreditCard },
                { id: 'Wallet' as PaymentMethodType, label: 'Travel Wallet', desc: `Balance: ₹${profile.walletBalance}`, icon: Wallet },
                { id: 'Cash' as PaymentMethodType, label: 'Cash to Driver', desc: 'Pay after trip ends', icon: Banknote },
              ].map((pm) => {
                const Icon = pm.icon;
                const isSelected = selectedPaymentMethod === pm.id;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setSelectedPaymentMethod(pm.id)}
                    className={`p-3 rounded-[14px] border text-left transition-all active:scale-95 flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`} />
                      {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                    </div>
                    <div>
                      <h5 className="text-xs font-[700] text-slate-900 dark:text-slate-100">{pm.label}</h5>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{pm.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Confirm Booking CTA */}
          <div className="space-y-3">
            <button
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="w-full min-h-[44px] px-6 rounded-[14px] bg-blue-600 text-white font-[590] text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>{isSubmitting ? 'Confirming Booking...' : `Confirm & Book ${currentVehicleOption.name} (₹${finalFare})`}</span>
            </button>

            {/* Cancellation Policy Link */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowPolicy(!showPolicy)}
                className="text-[11px] font-[700] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-900 dark:text-slate-100 hover:underline inline-flex items-center gap-1"
              >
                <Info className="w-3.5 h-3.5" />
                <span>View Free Cancellation Policy</span>
              </button>

              {showPolicy && (
                <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 text-left leading-relaxed animate-in fade-in duration-150">
                  {CANCELLATION_POLICY_TEXT}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
