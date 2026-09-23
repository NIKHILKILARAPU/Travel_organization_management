import React from 'react';
import { 
  MapPin, 
  Navigation, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Bookmark, 
  History, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  Home, 
  GraduationCap, 
  Train, 
  Bus, 
  Plane, 
  Zap,
  ArrowUpDown,
  BadgePercent,
  Radio
} from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import { RECENT_DESTINATIONS } from '../../data/customerMockData';
import { StatusBadge } from '../common/StatusBadge';
import { LocationAutocompleteInput } from '../common/LocationAutocompleteInput';

export const CustomerHome: React.FC = () => {
  const { 
    pickupLocation, 
    setPickupLocation, 
    destinationLocation, 
    setDestinationLocation, 
    bookingDate, 
    setBookingDate, 
    bookingTime, 
    setBookingTime, 
    startBookingFlow, 
    setActiveTab, 
    customerStatus, 
    activeTrip, 
    setIsAIModalOpen,
    profile,
    savedPlaces
  } = useCustomer();

  const isRideActive = customerStatus !== 'IDLE' && customerStatus !== 'TRIP_COMPLETED' && customerStatus !== 'CANCELLED';

  const getRecentIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return <Home className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'graduation-cap':
        return <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'train':
        return <Train className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'bus':
        return <Bus className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'plane':
        return <Plane className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      default:
        return <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    }
  };

  const handleRecentClick = (address: string) => {
    setDestinationLocation(address);
    startBookingFlow(pickupLocation, address);
  };

  const handleSwapLocations = () => {
    const temp = pickupLocation;
    setPickupLocation(destinationLocation);
    setDestinationLocation(temp);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startBookingFlow(pickupLocation, destinationLocation);
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6 pb-24 lg:pb-8 animate-in fade-in duration-200">
      {/* 1. Executive Commuter Greeting & Fleet Radar Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-5 rounded-[14px] relative overflow-hidden">
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-[14px] bg-blue-600 animate-pulse" />
            <span className="text-[11px] font-[700] text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Bhimavaram Mobility Hub Live
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-[700] tracking-tight">
            Welcome back, {profile.name}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
            <span>28°C Clear Skies</span>
            <span>•</span>
            <span className="text-blue-600 dark:text-blue-400 font-[590]">12 Fleet Drivers Active Nearby</span>
          </p>
        </div>

        {/* Quick 1-Tap Place Shortcuts */}
        <div className="relative z-10 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {savedPlaces.slice(0, 3).map((sp) => (
            <button
              key={sp.id}
              onClick={() => {
                setDestinationLocation(sp.address);
                startBookingFlow(pickupLocation, sp.address);
              }}
              className="flex items-center gap-1.5 px-3 min-h-[44px] rounded-[14px] bg-white/10 hover:bg-white/20 text-slate-900 dark:text-slate-100 text-xs font-[590] border border-white/10 transition-all active:scale-95 whitespace-nowrap"
            >
              {sp.category === 'Home' && <Home className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              {sp.category === 'Work' && <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              {sp.category === 'College' && <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              {sp.category === 'Other' && <Bookmark className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              <span>{sp.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Active Trip Live Alert Card (If customer has a ride in progress) */}
      {isRideActive && activeTrip && (
        <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-[14px] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-blue-600 relative overflow-hidden animate-in fade-in duration-300">
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="relative">
                <img
                  src={activeTrip.driver.photo}
                  alt={activeTrip.driver.name}
                  className="w-16 h-16 rounded-[14px] object-cover border-2 border-blue-600"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 border-2 border-white dark:border-slate-900 rounded-[14px] animate-ping" />
              </div>

              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <span className="text-xs font-[700] text-blue-600 dark:text-blue-400 tracking-wider uppercase flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 animate-pulse text-blue-600 dark:text-blue-400" />
                    Ride in Progress
                  </span>
                  <StatusBadge status={customerStatus} size="sm" />
                </div>

                <h3 className="text-lg font-[700] text-slate-900 dark:text-slate-100">
                  {activeTrip.driver.name} • {activeTrip.driver.vehicleModel}
                </h3>

                <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 mt-2">
                  <div className="px-2 py-0.5 text-xs border border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-[14px]">
                    <span className="mr-1.5 font-[700]">IND</span>
                    <span>{activeTrip.driver.vehicleRegistration}</span>
                  </div>

                  <span className="bg-white/10 px-2.5 py-1 rounded-[14px] border border-white/10 text-slate-900 dark:text-slate-100">
                    ETA: <strong className="font-[700]">{activeTrip.driver.currentEtaMinutes} mins away</strong>
                  </span>

                  <span className="bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-[14px] text-amber-500 font-[700]">
                    OTP: <strong className="font-mono text-sm tracking-wider ml-1">{activeTrip.otp}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center">
              <button
                onClick={() => setActiveTab('live')}
                className="min-h-[44px] px-6 bg-blue-600 hover:opacity-90 text-white font-[590] text-xs rounded-[14px] transition-all flex items-center gap-2 active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>Track Live Telematics</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Booking Hub & Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Where are you going? Card */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-[14px] p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-[11px] font-[700] text-blue-600 dark:text-blue-400 tracking-wider uppercase bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-[14px]">
                  Instant Mobility Booking
                </span>
                <h2 className="text-xl sm:text-2xl font-[700] text-slate-900 dark:text-slate-100 mt-2.5 tracking-tight">
                  Where are you going today?
                </h2>
              </div>
              
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-[590] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 px-3 py-1.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Verified Fleets</span>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="relative space-y-3.5">
                <div className="absolute left-[19px] top-[38px] bottom-[38px] w-0.5 border-l-2 border-dashed border-slate-200 dark:border-slate-800 dark:border-slate-700 z-0 pointer-events-none" />

                <div className="relative z-10">
                  <LocationAutocompleteInput
                    label="Pickup Location"
                    value={pickupLocation}
                    onChange={setPickupLocation}
                    placeholder="Enter pickup address, landmark or tap GPS"
                    type="pickup"
                    required
                  />
                </div>

                <div className="flex justify-end -my-2 relative z-20 pr-4">
                  <button
                    type="button"
                    onClick={handleSwapLocations}
                    className="p-1.5 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 transition-all active:scale-90"
                    title="Swap pickup and destination"
                  >
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="relative z-10">
                  <LocationAutocompleteInput
                    label="Destination"
                    value={destinationLocation}
                    onChange={setDestinationLocation}
                    placeholder="Where to?"
                    type="destination"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-[700] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Schedule Date
                  </label>
                  <div className="flex items-center bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 px-3 min-h-[44px] text-xs font-[590] text-slate-900 dark:text-slate-100">
                    <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                    <select
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="bg-transparent w-full outline-none cursor-pointer"
                    >
                      <option value="Today">Today (Instant)</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="Friday, 25 Sep">Friday, 25 Sep</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-[700] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Departure Time
                  </label>
                  <div className="flex items-center bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 px-3 min-h-[44px] text-xs font-[590] text-slate-900 dark:text-slate-100">
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="bg-transparent w-full outline-none cursor-pointer"
                    >
                      <option value="Now">Leave Now (~3 mins)</option>
                      <option value="In 15 mins">In 15 mins</option>
                      <option value="In 30 mins">In 30 mins</option>
                      <option value="In 1 hour">In 1 hour</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-5 min-h-[44px] rounded-[14px] bg-blue-600 text-white font-[590] text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Find Available Rides & Fares</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Quick Actions & Fleet Status */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Quick Actions Grid */}
          <div className="bg-white dark:bg-slate-900 rounded-[14px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-[700] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Services & Quick Actions
              </h3>
              <span className="text-[11px] font-[590] text-blue-600 dark:text-blue-400">Org Fleet</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => startBookingFlow()}
                className="p-4 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-left transition-all active:scale-95 group border border-slate-200 dark:border-slate-800 dark:border-slate-700"
              >
                <div className="w-10 h-10 rounded-[14px] bg-blue-600 text-white flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-[700] text-slate-900 dark:text-slate-100">Book Now</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Instant door pickup</p>
              </button>

              <button
                onClick={() => startBookingFlow()}
                className="p-4 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-left transition-all active:scale-95 group border border-slate-200 dark:border-slate-800 dark:border-slate-700"
              >
                <div className="w-10 h-10 rounded-[14px] bg-blue-600 text-white flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-[700] text-slate-900 dark:text-slate-100">Schedule Ride</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Reserve for later time</p>
              </button>

              <button
                onClick={() => setActiveTab('trips')}
                className="p-4 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-left transition-all active:scale-95 group border border-slate-200 dark:border-slate-800 dark:border-slate-700"
              >
                <div className="w-10 h-10 rounded-[14px] bg-blue-600 text-white flex items-center justify-center mb-3">
                  <History className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-[700] text-slate-900 dark:text-slate-100">My Trips</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">History & receipts</p>
              </button>

              <button
                onClick={() => setActiveTab('saved-places')}
                className="p-4 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-left transition-all active:scale-95 group border border-slate-200 dark:border-slate-800 dark:border-slate-700"
              >
                <div className="w-10 h-10 rounded-[14px] bg-blue-600 text-white flex items-center justify-center mb-3">
                  <Bookmark className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-[700] text-slate-900 dark:text-slate-100">Saved Places</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Home, college, work</p>
              </button>
            </div>
          </div>

          {/* Organization Mobility Pass Card */}
          <div className="p-4 rounded-[14px] bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[14px] bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-200 dark:border-blue-800">
                <BadgePercent className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-[700] text-slate-900 dark:text-slate-100">Campus & Org Pass Active</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Flat ₹20 org subsidy auto-applied on all rides</p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-[700] bg-white/10 px-2 py-1 rounded-[14px]">
              PASS-ACTIVE
            </span>
          </div>

          {/* AI Travel Assistant Prompt Card */}
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-[14px] p-5 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-[700]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Travel Assistant</span>
              </div>
              <h4 className="text-sm font-[700] text-slate-900 dark:text-slate-100">Ask anything about your commute</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                "Book an auto to railway station" or "Explain my last fare"
              </p>
            </div>
            <button
              onClick={() => setIsAIModalOpen(true)}
              className="min-h-[44px] px-4 bg-blue-600 text-white text-xs font-[590] rounded-[14px] transition-all active:scale-95 flex-shrink-0"
            >
              Ask AI
            </button>
          </div>
        </div>
      </div>

      {/* 4. Recent Destinations Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[14px] p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100 tracking-tight">Recent Destinations</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Quickly select from your frequently visited points</p>
          </div>
          <button
            onClick={() => setActiveTab('saved-places')}
            className="text-xs font-[700] text-blue-600 dark:text-blue-400 flex items-center gap-1"
          >
            <span>Manage Places</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {RECENT_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              onClick={() => handleRecentClick(dest.address)}
              className="p-4 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 hover:border-blue-600 cursor-pointer transition-all active:scale-95 flex items-center gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-[14px] bg-white dark:bg-slate-900 flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                {getRecentIcon(dest.icon)}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-[700] text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:text-blue-400 truncate">
                  {dest.label}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{dest.address}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-[700] bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded-[14px]">
                    ~{dest.distanceKm} km
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Quick Book</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
