import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Minus, 
  LocateFixed 
} from 'lucide-react';
import type { CustomerTripStatus } from '../../types';

interface TripMapProps {
  status: CustomerTripStatus;
  driverEtaMinutes?: number;
  pickupLocation: string;
  destinationLocation: string;
  vehicleType?: string;
  driverName?: string;
}

export const TripMap: React.FC<TripMapProps> = ({
  status,
  driverEtaMinutes = 4,
  pickupLocation,
  destinationLocation,
  driverName = 'Rahul Kumar',
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showTraffic, setShowTraffic] = useState(true);

  // Interpolate driver position along the route based on status
  const getDriverProgressPercentage = () => {
    switch (status) {
      case 'SEARCHING_DRIVER':
        return 0;
      case 'DRIVER_ASSIGNED':
        return 15;
      case 'DRIVER_ARRIVING':
        return 50;
      case 'DRIVER_ARRIVED':
        return 98;
      case 'TRIP_IN_PROGRESS':
        return 65;
      case 'TRIP_COMPLETED':
        return 100;
      default:
        return 20;
    }
  };

  const progress = getDriverProgressPercentage();

  return (
    <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] rounded-[14px] overflow-hidden bg-[#E5E5EA] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 select-none">
      {/* 1. Vector Map Canvas */}
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full object-cover transition-transform duration-300"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <defs>
          {/* Map Grid Pattern */}
          <pattern id="street-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D2D2D7" strokeWidth="0.8" className="dark:stroke-[#38383A]" />
          </pattern>

          {/* Linear Gradients */}
          <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0071E3" />
            <stop offset="100%" stopColor="#0071E3" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* Base Landmass */}
        <rect width="800" height="500" className="fill-slate-100 dark:fill-slate-900" />
        <rect width="800" height="500" fill="url(#street-grid)" opacity="0.6" />

        {/* Canals / Waterway in Godavari Delta */}
        <path
          d="M -10 180 Q 220 220 400 160 T 820 190"
          fill="none"
          stroke="#5AC8FA"
          strokeWidth="28"
          strokeLinecap="round"
          opacity="0.3"
        />
        <text x="600" y="210" fill="#5AC8FA" fontSize="10" fontWeight="bold" opacity="0.6" letterSpacing="2">
          GODAVARI CANAL
        </text>

        {/* Green Parks / Farmlands */}
        <path
          d="M 50 60 Q 140 40 180 110 T 80 150 Z"
          fill="#34C759"
          opacity="0.15"
        />
        <path
          d="M 620 320 Q 750 280 770 410 T 640 430 Z"
          fill="#34C759"
          opacity="0.15"
        />

        {/* Major Road Arteries */}
        <path d="M 0 340 L 800 340" className="stroke-white dark:stroke-slate-800" strokeWidth="12" />
        <path d="M 0 340 L 800 340" className="stroke-[#E5E5EA] dark:stroke-[#38383A]" strokeWidth="8" />

        <path d="M 280 0 L 280 500" className="stroke-white dark:stroke-slate-800" strokeWidth="10" />
        <path d="M 520 0 L 520 500" className="stroke-white dark:stroke-slate-800" strokeWidth="10" />

        {/* Diagonal Arteries */}
        <path d="M 60 500 L 740 0" className="stroke-[#E5E5EA] dark:stroke-[#38383A]" strokeWidth="8" />

        {/* Live Traffic Highlight (optional) */}
        {showTraffic && (
          <>
            <path d="M 280 120 L 280 260" stroke="#FF3B30" strokeWidth="3" opacity="0.8" />
            <path d="M 380 340 L 560 340" stroke="#FF9500" strokeWidth="3" opacity="0.8" />
            <path d="M 60 340 L 220 340" stroke="#34C759" strokeWidth="3" opacity="0.8" />
          </>
        )}

        {/* Navigation Route Path: From Pickup (180, 290) to Destination (620, 140) */}
        {/* Route Shadow / Background Glow */}
        <path
          d="M 180 290 Q 280 290 320 230 T 480 220 T 620 140"
          fill="none"
          stroke="#2563eb"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.3"
          filter="url(#glow)"
        />

        {/* Animated Dashed Polyline Route */}
        <path
          d="M 180 290 Q 280 290 320 230 T 480 220 T 620 140"
          fill="none"
          stroke="#2563eb"
          strokeWidth="5"
          strokeLinecap="round"
          className="route-animate"
        />

        {/* Landmark Points */}
        <g opacity="0.8">
          <circle cx="280" cy="100" r="3" className="fill-[#86868B]" />
          <text x="290" y="104" className="fill-[#86868B]" fontSize="10" fontWeight="600">SRKR Campus Gate</text>

          <circle cx="520" cy="380" r="3" className="fill-[#86868B]" />
          <text x="410" y="395" className="fill-[#86868B]" fontSize="10" fontWeight="600">Town Railway Junction</text>

          <circle cx="480" cy="80" r="3" className="fill-[#86868B]" />
          <text x="490" y="84" className="fill-[#86868B]" fontSize="10" fontWeight="600">Somaram Temple Rd</text>
        </g>

        {/* Pickup Marker (180, 290) */}
        <g transform="translate(180, 290)">
          <circle r="14" fill="#0071E3" opacity="0.3" className="animate-ping" />
          <circle r="9" fill="#0071E3" stroke="#ffffff" strokeWidth="2.5" />
          <circle r="3" fill="#FFFFFF" />
          <text x="-20" y="-18" className="fill-slate-800 dark:fill-slate-200" fontSize="11" fontWeight="bold">
            📍 Pickup
          </text>
        </g>

        {/* Destination Marker (620, 140) */}
        <g transform="translate(620, 140)">
          <circle r="14" fill="#FF3B30" opacity="0.3" className="animate-ping" />
          <circle r="9" fill="#FF3B30" stroke="#ffffff" strokeWidth="2.5" />
          <circle r="3" fill="#FFFFFF" />
          <text x="-35" y="-18" className="fill-slate-800 dark:fill-slate-200" fontSize="11" fontWeight="bold">
            🏁 Destination
          </text>
        </g>

        {/* Live Driver Moving Marker */}
        {/* Dynamic position calculation along bezier curve */}
        {(() => {
          const t = progress / 100;
          // Approximate quadratic/cubic bezier calculation
          const p0 = { x: 180, y: 290 };
          const p1 = { x: 320, y: 230 };
          const p2 = { x: 620, y: 140 };
          const cx = Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x;
          const cy = Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y;

          return (
            <g transform={`translate(${cx}, ${cy})`} className="transition-all duration-700">
              {/* Radar pulse wave */}
              <circle r="22" fill="#0071E3" opacity="0.25" className="animate-ping" />
              {/* Vehicle Halo */}
              <circle r="16" className="fill-white dark:fill-slate-800" stroke="#2563eb" strokeWidth="2" filter="url(#glow)" />
              {/* Mini Car Icon */}
              <circle r="12" fill="#0071E3" />
              <text x="-6" y="4" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                🚕
              </text>
              {/* Driver tag */}
              <g transform="translate(20, -10)">
                <rect width="90" height="22" rx="6" className="fill-white dark:fill-slate-800" stroke="#2563eb" strokeWidth="1" />
                <text x="8" y="15" className="fill-slate-800 dark:fill-slate-200" fontSize="9" fontWeight="bold">
                  {driverName.split(' ')[0]} ({driverEtaMinutes}m)
                </text>
              </g>
            </g>
          );
        })()}
      </svg>

      {/* 2. Top Status Badge on Map */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-lg flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-[14px] bg-blue-600 animate-ping" />
          <div>
            <p className="text-[10px] uppercase font-[700] text-slate-500 dark:text-slate-400">Live GPS Telematics</p>
            <p className="text-xs font-[700] text-slate-900 dark:text-slate-100">
              {status === 'DRIVER_ARRIVED'
                ? 'Driver Waiting at Pickup'
                : status === 'TRIP_IN_PROGRESS'
                ? 'En Route to Destination'
                : `Driver Arriving in ~${driverEtaMinutes} mins`}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Interactive Map Controls Overlay */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => setShowTraffic(!showTraffic)}
          className={`p-2.5 rounded-[14px] border backdrop-blur-md text-xs font-[700] transition-all shadow-md ${
            showTraffic
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 dark:border-slate-700'
          }`}
          title="Toggle Traffic Layer"
        >
          <Layers className="w-4 h-4" />
        </button>

        <button
          onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
          className="p-2.5 rounded-[14px] bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 backdrop-blur-md shadow-md transition-all active:scale-95"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>

        <button
          onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
          className="p-2.5 rounded-[14px] bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 backdrop-blur-md shadow-md transition-all active:scale-95"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>

        <button
          onClick={() => setZoomLevel(1)}
          className="p-2.5 rounded-[14px] bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 backdrop-blur-md shadow-md transition-all active:scale-95"
          title="Recenter Map"
        >
          <LocateFixed className="w-4 h-4" />
        </button>
      </div>

      {/* 4. Bottom Map Sub-Bar */}
      <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] text-slate-900 dark:text-slate-100 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
        <span className="truncate">
          📍 {pickupLocation.split(',')[0]} → 🏁 {destinationLocation.split(',')[0]}
        </span>
        <span className="text-blue-600 dark:text-blue-400 font-[700] flex-shrink-0 ml-2">GPS 2.4 GHz Active</span>
      </div>
    </div>
  );
};
