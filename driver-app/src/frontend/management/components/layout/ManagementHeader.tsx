import React from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Calendar,
  MapPin,
  Building2,
  Users,
  Car
} from 'lucide-react';
import { useManagement } from '../../context/ManagementContext';

interface ManagementHeaderProps {
  onOpenMobileMenu: () => void;
}

export const ManagementHeader: React.FC<ManagementHeaderProps> = ({ onOpenMobileMenu }) => {
  const { 
    currentOrg, 
    unreadNotificationsCount, 
    setActiveTab, 
    setIsSearchOpen 
  } = useManagement();

  const formattedDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 bg-[#091e42] border-b border-blue-900/80 px-4 sm:px-6 lg:px-8 py-2.5 select-none shrink-0 transition-colors shadow-md shadow-blue-950/20 text-white">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu & Organization Hub + Date Pill */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg text-blue-200 hover:text-white hover:bg-blue-900/60 transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Org & Hub Badge */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0c2452] rounded-lg border border-blue-800/80 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Building2 className="w-3.5 h-3.5 text-blue-300" />
              <span className="text-xs font-bold text-white truncate max-w-[130px] sm:max-w-none">{currentOrg.name}</span>
              <span className="text-blue-400">•</span>
              <span className="text-xs font-semibold text-blue-200 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-blue-300" />
                {currentOrg.city} Hub
              </span>
            </div>

            {/* Date Pill */}
            <div className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-blue-200 bg-[#0c2452] px-3 py-1.5 rounded-lg border border-blue-800/80 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-blue-300" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Center: Restyled Driver & Vehicle Omnisearch Bar in Dark Navy Theme */}
        <div className="flex-1 max-w-2xl mx-2 sm:mx-4 hidden md:block">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="w-full bg-[#0c2452] hover:bg-[#102e68] text-white px-3.5 py-1.5 rounded-xl border border-blue-800/80 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-950/40 transition-all cursor-pointer flex items-center justify-between group shadow-2xs h-10"
            title="Search drivers, vehicles, trips, manifests (Ctrl+K)"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-blue-600/40 text-blue-300 flex items-center justify-center shrink-0 border border-blue-500/30 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Search className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-medium text-blue-200/90 group-hover:text-white truncate">
                Search drivers, vehicles, trips, manifests...
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-semibold text-blue-200 bg-blue-900/50 px-2 py-0.5 rounded-md border border-blue-700/60 shadow-2xs">
                <Users className="w-3 h-3 text-blue-300" />
                Drivers
              </span>
              <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-semibold text-blue-200 bg-blue-900/50 px-2 py-0.5 rounded-md border border-blue-700/60 shadow-2xs">
                <Car className="w-3 h-3 text-emerald-300" />
                Vehicles
              </span>
              <kbd className="inline-flex items-center gap-0.5 bg-blue-950/90 px-2 py-0.5 rounded-md border border-blue-800 text-[10px] font-mono font-bold text-blue-300 shadow-2xs">
                ⌘K
              </kbd>
            </div>
          </button>
        </div>

        {/* Right: Mobile search trigger & Notifications */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Mobile search trigger */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg border border-blue-800/80 bg-[#0c2452] text-blue-200 hover:bg-[#102e68] hover:text-white transition-colors cursor-pointer"
            aria-label="Search drivers and vehicles"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notifications Center Button */}
          <button
            type="button"
            onClick={() => setActiveTab('notifications')}
            className="relative h-9 w-9 flex items-center justify-center rounded-lg border border-blue-800/80 bg-[#0c2452] text-blue-200 hover:bg-[#102e68] hover:text-white transition-colors cursor-pointer shadow-2xs"
            aria-label="Notifications"
            title="Management Alerts & Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-[#091e42]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
