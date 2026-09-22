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
        <div className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
          isOnline 
            ? 'bg-emerald-500/10 border-emerald-500/30' 
            : 'bg-white border-slate-200/90 shadow-card'
        }`}>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Driver Duty Status
              </span>
              {status !== 'ON TRIP' && (
                <button
                  onClick={() => {
                    playBeep('tap');
                    setStatus(status === 'BREAK' ? 'ONLINE' : 'BREAK');
                  }}
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border transition ${
                    status === 'BREAK' ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  {status === 'BREAK' ? 'End Break' : 'Take Break'}
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5 mt-2">
              <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              <div className="text-lg font-black text-slate-900 leading-tight">
                {isOnline ? '🟢 ONLINE' : '⚪ OFFLINE'}
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {isOnline ? "You're available for trips" : "Go online to receive trips"}
            </p>
          </div>

          <button
            onClick={toggleOnline}
            className={`w-full mt-3 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 active-press transition shadow-xs ${
              isOnline
                ? 'bg-slate-900 hover:bg-slate-800 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Power className="w-3.5 h-3.5 stroke-[2.5]" />
            {isOnline ? 'GO OFFLINE' : 'GO ONLINE'}
          </button>
        </div>

        {/* Metric 1: Today's Trips */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Today's Trips
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {todayTotalCount}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Assigned for today's shift
            </p>
          </div>
        </div>

        {/* Metric 2: Completed */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Completed
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-black text-emerald-600 tracking-tight">
              {todayCompletedCount}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Successfully finished journeys
            </p>
          </div>
        </div>

        {/* Metric 3: Today's Earnings */}
        <div 
          onClick={() => setActiveTab('earnings')}
          className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-card flex flex-col justify-between cursor-pointer hover:border-emerald-300 transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Today's Earnings
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-black text-slate-900 tracking-tight flex items-center">
              ₹{todayEarnings.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <span>View daily payouts</span>
              <ChevronRight className="w-3 h-3" />
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
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  Active Trip in Progress (Bhimavaram → Palakollu)
                </span>
                <span className="text-xs text-slate-500 font-medium">Auto AP 37 AB 1234</span>
              </div>
              <ActiveTripView />
            </div>
          ) : nextTrip ? (
            <div className="bg-white rounded-3xl border-2 border-emerald-500/30 p-6 shadow-card space-y-5">
              {/* Header Badge & Scheduled Time */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full uppercase tracking-wider">
                    NEXT TRIP DISPATCH
                  </span>
                  <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    Scheduled for {nextTrip.pickupTime}
                  </span>
                </div>

                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                  Status: {nextTrip.status}
                </span>
              </div>

              {/* Customer & Fare Row */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-800 font-bold text-lg flex items-center justify-center">
                    {nextTrip.customer.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold uppercase">Customer</span>
                    <div className="text-base font-bold text-slate-900 leading-tight">
                      {nextTrip.customer.name}
                    </div>
                    <span className="text-xs text-amber-600 font-bold mt-0.5 block">
                      ★ {nextTrip.customer.rating} Rating
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Estimated Fare</span>
                  <div className="text-2xl font-black text-slate-900">
                    ₹{nextTrip.estimatedFare}
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">{nextTrip.paymentMode}</span>
                </div>
              </div>

              {/* Route Breakdown Box */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mt-1 flex-shrink-0 ring-4 ring-emerald-100" />
                  <div className="flex-1">
                    <span className="text-[11px] uppercase font-bold text-slate-400">Pickup Point</span>
                    <p className="text-sm font-bold text-slate-900">
                      {nextTrip.pickupLocation}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-200/60">
                  <div className="w-3 h-3 rounded-full bg-rose-500 mt-1 flex-shrink-0 ring-4 ring-rose-100" />
                  <div className="flex-1">
                    <span className="text-[11px] uppercase font-bold text-slate-400">Destination</span>
                    <p className="text-sm font-bold text-slate-900">
                      {nextTrip.destinationLocation}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-600 font-semibold border-t border-slate-200/60">
                  <span>Distance: {nextTrip.distanceKm} km</span>
                  <span>Vehicle: Auto (AP 37 AB 1234)</span>
                  <span>Payment: Cash on Arrival</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => openTripDetails(nextTrip)}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active-press text-white font-black text-base tracking-wide rounded-2xl shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 transition"
              >
                VIEW TRIP DETAILS & NAVIGATE
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-card space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-base font-bold text-slate-800">No upcoming trips</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {isOnline 
                    ? "Your console is active and searching for nearest passenger pickup requests across Bhimavaram." 
                    : "You are currently offline. Go online to receive trip dispatches from ABC Travels fleet office."}
                </p>
              </div>
              {!isOnline && (
                <button
                  onClick={toggleOnline}
                  className="py-3 px-8 bg-emerald-600 hover:bg-emerald-700 active-press text-white font-bold text-xs rounded-xl shadow-xs transition"
                >
                  GO ONLINE
                </button>
              )}
            </div>
          )}

          {/* Quick Schedule Row */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Today's Trip Schedule
              </span>
              <button 
                onClick={() => setActiveTab('trips')}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-0.5"
              >
                View all ({trips.length})
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {trips.slice(0, 4).map((t) => (
                <div key={t.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-700 font-mono w-16">{t.pickupTime}</span>
                    <span className="font-bold text-slate-900">{t.customer.name}</span>
                    <span className="text-slate-400 text-[11px] hidden sm:inline">({t.pickupLocation.split(',')[0]} → {t.destinationLocation.split(',')[0]})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900">₹{t.estimatedFare}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      t.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
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
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  YOUR VEHICLE
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {vehicle.status}
              </span>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase">{vehicle.type}</span>
                <h4 className="text-xl font-black text-slate-900 tracking-tight">{vehicle.model}</h4>
                <div className="mt-1 font-mono text-xs font-extrabold px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg inline-block border border-slate-200">
                  {vehicle.registrationNumber}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 font-semibold block">Today's distance</span>
                <span className="text-lg font-black text-slate-900 block">{vehicle.todayDistanceKm} km</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Next Service:</span>
                <span className="font-bold text-slate-900">{vehicle.nextServiceKmRemaining} km remaining</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Fuel Type:</span>
                <span className="font-bold text-slate-900">{vehicle.fuelType}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  playBeep('tap');
                  setActiveTab('vehicle');
                }}
                className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl active-press transition text-center"
              >
                VIEW VEHICLE
              </button>

              <button
                onClick={() => {
                  playBeep('tap');
                  setShowReportIssueModal(true);
                }}
                className="py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl active-press transition text-center flex items-center justify-center gap-1"
              >
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                REPORT ISSUE
              </button>
            </div>
          </div>

          {/* DRIVER AI ASSISTANT EMBEDDED WIDGET */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Driver AI Copilot</h4>
                  <p className="text-[10px] text-slate-400">In-Cab Intelligence</p>
                </div>
              </div>
              <button
                onClick={() => setShowAiAssistant(true)}
                className="text-xs font-bold text-emerald-400 hover:underline"
              >
                Open Voice
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Quickly ask questions regarding your schedule, pickup directions, vehicle health, or day earnings.
            </p>

            <div className="space-y-1.5">
              <button
                onClick={() => {
                  playBeep('tap');
                  setShowAiAssistant(true);
                }}
                className="w-full p-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl text-left text-xs font-medium transition flex items-center justify-between active-press"
              >
                <span>"What are my trips today?"</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  playBeep('tap');
                  setShowAiAssistant(true);
                }}
                className="w-full p-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl text-left text-xs font-medium transition flex items-center justify-between active-press"
              >
                <span>"Where is my next pickup?"</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  playBeep('tap');
                  setShowAiAssistant(true);
                }}
                className="w-full p-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl text-left text-xs font-medium transition flex items-center justify-between active-press"
              >
                <span>"When is my vehicle service due?"</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* DISPATCH ALERT SIMULATOR HELPER */}
          <div className="p-4 bg-emerald-50/70 border border-dashed border-emerald-300 rounded-3xl text-center space-y-2">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block">
              Dispatcher Simulator
            </span>
            <p className="text-xs text-slate-600">
              Test how new trip incoming requests appear with live 18s countdown and route preview.
            </p>
            <button
              onClick={simulateIncomingTrip}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl active-press transition flex items-center justify-center gap-1.5 shadow-xs"
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
