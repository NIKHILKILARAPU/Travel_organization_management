import React from 'react';
import { useDriver } from '../../context/DriverContext';
import { ActiveTripView } from '../trip/ActiveTripView';
import { 
  Power, 
  Car, 
  MapPin, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  ArrowRight, 
  Radio, 
  CheckCircle2, 
  Calendar, 
  Wrench, 
  TrendingUp 
} from 'lucide-react';

export const DriverHome: React.FC = () => {
  const { 
    status, 
    setStatus,
    toggleOnline, 
    todayEarnings, 
    todayCompletedCount, 
    todayTotalCount, 
    vehicle, 
    nextTrip, 
    activeTrip, 
    trips, 
    openTripDetails, 
    setActiveTab, 
    setShowAiAssistant, 
    setShowReportIssueModal, 
    simulateIncomingTrip, 
    playBeep 
  } = useDriver();

  const isOnline = status === 'ONLINE' || status === 'AVAILABLE' || status === 'ON TRIP';

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* 1. TOP STATS & STATUS BAR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Status & Online Toggle Card */}
        <div className={`p-5 rounded-[14px] border transition-all duration-200 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] ${
          isOnline 
            ? 'bg-emerald-500/10 dark:bg-emerald-500/15 border-[#34C759]/30' 
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:border-slate-700'
        }`}>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-[590] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Driver Duty Status
              </span>
              {status !== 'ON TRIP' && (
                <button
                  onClick={() => {
                    playBeep('tap');
                    setStatus(status === 'BREAK' ? 'ONLINE' : 'BREAK');
                  }}
                  className={`text-[11px] font-[590] px-2.5 py-1 rounded-[14px] border transition min-h-[32px] ${
                    status === 'BREAK' 
                      ? 'bg-amber-500 text-white border-amber-500' 
                      : 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 dark:border-slate-700'
                  }`}
                >
                  {status === 'BREAK' ? 'End Break' : 'Take Break'}
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5 mt-3">
              <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-[#86868B]'}`} />
              <div className="text-lg font-[700] text-slate-900 dark:text-slate-100 leading-tight">
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-[400] mt-1">
              {isOnline ? "You're available for trips" : "Go online to receive trips"}
            </p>
          </div>

          <button
            onClick={toggleOnline}
            className={`w-full mt-4 min-h-[44px] rounded-[14px] font-[590] text-xs tracking-wider uppercase flex items-center justify-center gap-2 active-press transition ${
              isOnline
                ? 'bg-white dark:bg-slate-800/60 hover:opacity-90 text-white dark:text-white'
                : 'bg-blue-600 hover:opacity-90 text-white'
            }`}
          >
            <Power className="w-4 h-4 stroke-[2.5]" />
            {isOnline ? 'GO OFFLINE' : 'GO ONLINE'}
          </button>
        </div>

        {/* Metric 1: Today's Trips */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-[590] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Today's Trips
            </span>
            <div className="w-8 h-8 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-[700] text-slate-900 dark:text-slate-100 tracking-tight">
              {todayTotalCount}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-[400] mt-1">
              Assigned for today's shift
            </p>
          </div>
        </div>

        {/* Metric 2: Completed */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-[590] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Completed
            </span>
            <div className="w-8 h-8 rounded-[14px] bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-[700] text-emerald-500 tracking-tight">
              {todayCompletedCount}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-[400] mt-1">
              Successfully finished journeys
            </p>
          </div>
        </div>

        {/* Metric 3: Today's Earnings */}
        <div 
          onClick={() => setActiveTab('earnings')}
          className="bg-white dark:bg-slate-900 p-5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] flex flex-col justify-between cursor-pointer hover:border-blue-600 transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-[590] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Today's Earnings
            </span>
            <div className="w-8 h-8 rounded-[14px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-[700] text-slate-900 dark:text-slate-100 tracking-tight flex items-center">
              ₹{todayEarnings.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-[590] mt-1 flex items-center gap-1">
              <span>View daily payouts</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </p>
          </div>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE GRID: TRIP WORKSPACE + FLEET TOOLS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Active Trip or Prominent Next Trip */}
        <div className="lg:col-span-8 space-y-6">
          {activeTrip ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-[700] uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                  Active Trip in Progress (Bhimavaram → Palakollu)
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-[590]">Auto AP 37 AB 1234</span>
              </div>
              <ActiveTripView />
            </div>
          ) : nextTrip ? (
            <div className="bg-white dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-5">
              {/* Header Badge & Scheduled Time */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-[700] rounded-[14px] uppercase tracking-wider">
                    NEXT TRIP DISPATCH
                  </span>
                  <span className="text-sm font-[590] text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    Scheduled for {nextTrip.pickupTime}
                  </span>
                </div>

                <span className="text-xs font-[590] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-[14px] border border-blue-200 dark:border-blue-800">
                  Status: {nextTrip.status}
                </span>
              </div>

              {/* Customer & Fare Row */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#D2D2D7] dark:bg-[#2C2C2E] text-slate-900 dark:text-slate-100 font-[700] text-lg flex items-center justify-center">
                    {nextTrip.customer.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-[590] uppercase">Customer</span>
                    <div className="text-base font-[700] text-slate-900 dark:text-slate-100 leading-tight">
                      {nextTrip.customer.name}
                    </div>
                    <span className="text-xs text-amber-500 font-[590] mt-0.5 block">
                      ★ {nextTrip.customer.rating} Rating
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-[590] uppercase">Estimated Fare</span>
                  <div className="text-2xl font-[700] text-slate-900 dark:text-slate-100">
                    ₹{nextTrip.estimatedFare}
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-[590]">{nextTrip.paymentMode}</span>
                </div>
              </div>

              {/* Route Breakdown Box */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="text-[11px] uppercase font-[590] text-slate-500 dark:text-slate-400">Pickup Point</span>
                    <p className="text-sm font-[590] text-slate-900 dark:text-slate-100">
                      {nextTrip.pickupLocation}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700">
                  <div className="w-3 h-3 rounded-full bg-rose-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="text-[11px] uppercase font-[590] text-slate-500 dark:text-slate-400">Destination</span>
                    <p className="text-sm font-[590] text-slate-900 dark:text-slate-100">
                      {nextTrip.destinationLocation}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-[590] border-t border-slate-200 dark:border-slate-800 dark:border-slate-700">
                  <span>Distance: {nextTrip.distanceKm} km</span>
                  <span>Vehicle: Auto (AP 37 AB 1234)</span>
                  <span>Payment: Cash on Arrival</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => openTripDetails(nextTrip)}
                className="w-full min-h-[44px] py-3.5 bg-blue-600 hover:opacity-90 active-press text-white font-[590] text-sm tracking-wide rounded-[14px] flex items-center justify-center gap-2 transition"
              >
                VIEW TRIP DETAILS & NAVIGATE
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 p-12 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-500 dark:text-slate-400 flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100">No upcoming trips</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-[400]">
                  {isOnline 
                    ? "Your console is active and searching for nearest passenger pickup requests across Bhimavaram." 
                    : "You are currently offline. Go online to receive trip dispatches from ABC Travels fleet office."}
                </p>
              </div>
              {!isOnline && (
                <button
                  onClick={toggleOnline}
                  className="min-h-[44px] py-2.5 px-8 bg-blue-600 hover:opacity-90 active-press text-white font-[590] text-xs rounded-[14px] transition"
                >
                  GO ONLINE
                </button>
              )}
            </div>
          )}

          {/* Quick Schedule Row */}
          <div className="bg-white dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-[700] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Today's Trip Schedule
              </span>
              <button 
                onClick={() => setActiveTab('trips')}
                className="text-xs font-[590] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
              >
                View all ({trips.length})
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-[#D2D2D7] dark:divide-[#38383A]">
              {trips.slice(0, 4).map((t) => (
                <div key={t.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-[590] text-slate-500 dark:text-slate-400 font-mono w-16">{t.pickupTime}</span>
                    <span className="font-[590] text-slate-900 dark:text-slate-100">{t.customer.name}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] hidden sm:inline">({t.pickupLocation.split(',')[0]} → {t.destinationLocation.split(',')[0]})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-[700] text-slate-900 dark:text-slate-100">₹{t.estimatedFare}</span>
                    <span className={`text-[10px] font-[590] px-2.5 py-0.5 rounded-[14px] ${
                      t.status === 'Completed' 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-500 dark:text-slate-400'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Assigned Vehicle Card + AI Copilot */}
        <div className="lg:col-span-4 space-y-6">
          {/* ASSIGNED VEHICLE CARD */}
          <div className="bg-white dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="text-xs font-[700] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  YOUR VEHICLE
                </span>
              </div>
              <span className="text-xs font-[590] text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-[14px] border border-[#34C759]/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {vehicle.status}
              </span>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-[590] uppercase">{vehicle.type}</span>
                <h4 className="text-xl font-[700] text-slate-900 dark:text-slate-100 tracking-tight">{vehicle.model}</h4>
                <div className="mt-1 font-mono text-xs font-[590] px-2.5 py-1 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-[14px] inline-block border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                  {vehicle.registrationNumber}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-[590] block">Today's distance</span>
                <span className="text-lg font-[700] text-slate-900 dark:text-slate-100 block">{vehicle.todayDistanceKm} km</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Next Service:</span>
                <span className="font-[590] text-slate-900 dark:text-slate-100">{vehicle.nextServiceKmRemaining} km remaining</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Fuel Type:</span>
                <span className="font-[590] text-slate-900 dark:text-slate-100">{vehicle.fuelType}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  playBeep('tap');
                  setActiveTab('vehicle');
                }}
                className="min-h-[44px] py-2.5 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 font-[590] text-xs rounded-[14px] active-press transition text-center"
              >
                VIEW VEHICLE
              </button>

              <button
                onClick={() => {
                  playBeep('tap');
                  setShowReportIssueModal(true);
                }}
                className="min-h-[44px] py-2.5 bg-white dark:bg-slate-800/60 hover:opacity-90 text-white dark:text-white font-[590] text-xs rounded-[14px] active-press transition text-center flex items-center justify-center gap-1"
              >
                <Wrench className="w-3.5 h-3.5 text-amber-500" />
                REPORT ISSUE
              </button>
            </div>
          </div>

          {/* DRIVER AI ASSISTANT EMBEDDED WIDGET */}
          <div className="p-5 rounded-[14px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[14px] bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-[700] text-slate-900 dark:text-slate-100">Driver AI Copilot</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">In-Cab Intelligence</p>
                </div>
              </div>
              <button
                onClick={() => setShowAiAssistant(true)}
                className="text-xs font-[590] text-blue-600 dark:text-blue-400 hover:underline"
              >
                Open Voice
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-[400]">
              Quickly ask questions regarding your schedule, pickup directions, vehicle health, or day earnings.
            </p>

            <div className="space-y-1.5">
              <button
                onClick={() => {
                  playBeep('tap');
                  setShowAiAssistant(true);
                }}
                className="w-full min-h-[44px] p-2.5 bg-[#2C2C2E]/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-[14px] text-left text-xs font-[590] transition flex items-center justify-between active-press"
              >
                <span>"What are my trips today?"</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              </button>

              <button
                onClick={() => {
                  playBeep('tap');
                  setShowAiAssistant(true);
                }}
                className="w-full min-h-[44px] p-2.5 bg-[#2C2C2E]/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-[14px] text-left text-xs font-[590] transition flex items-center justify-between active-press"
              >
                <span>"Where is my next pickup?"</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              </button>

              <button
                onClick={() => {
                  playBeep('tap');
                  setShowAiAssistant(true);
                }}
                className="w-full min-h-[44px] p-2.5 bg-[#2C2C2E]/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-[14px] text-left text-xs font-[590] transition flex items-center justify-between active-press"
              >
                <span>"When is my vehicle service due?"</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>
          </div>

          {/* DISPATCH ALERT SIMULATOR HELPER */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-[14px] text-center space-y-2">
            <span className="text-[11px] font-[700] text-slate-900 dark:text-slate-100 uppercase tracking-wide block">
              Dispatcher Simulator
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-[400]">
              Test how new trip incoming requests appear with live 18s countdown and route preview.
            </p>
            <button
              onClick={simulateIncomingTrip}
              className="w-full min-h-[44px] py-2.5 bg-blue-600 hover:opacity-90 text-white font-[590] text-xs rounded-[14px] active-press transition flex items-center justify-center gap-1.5"
            >
              <Radio className="w-3.5 h-3.5" />
              Trigger Incoming Trip Alert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
