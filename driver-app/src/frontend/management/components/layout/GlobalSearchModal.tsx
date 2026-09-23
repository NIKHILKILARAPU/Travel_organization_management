import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Car, 
  Users, 
  Navigation, 
  UserCheck, 
  Wrench, 
  ArrowRight
} from 'lucide-react';
import { useManagement } from '../../context/ManagementContext';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    drivers, 
    vehicles, 
    trips, 
    customers, 
    maintenance, 
    setSelectedDriver,
    setSelectedVehicle,
    setSelectedTrip,
    setSelectedCustomer,
    setActiveTab
  } = useManagement();

  const [query, setQuery] = useState('');

  // Handle ESC key and Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  // Search logic
  const matchedDrivers = q ? drivers.filter(d => 
    d.name.toLowerCase().includes(q) || 
    d.phone.includes(q) || 
    d.driverId.toLowerCase().includes(q) ||
    d.licenseNumber.toLowerCase().includes(q) ||
    (d.assignedVehicleReg && d.assignedVehicleReg.toLowerCase().includes(q))
  ).slice(0, 3) : [];

  const matchedVehicles = q ? vehicles.filter(v => 
    v.registrationNumber.toLowerCase().includes(q) ||
    v.brand.toLowerCase().includes(q) ||
    v.model.toLowerCase().includes(q) ||
    v.vehicleId.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const matchedTrips = q ? trips.filter(t => 
    t.tripId.toLowerCase().includes(q) ||
    t.customerName.toLowerCase().includes(q) ||
    (t.driverName && t.driverName.toLowerCase().includes(q)) ||
    t.pickup.toLowerCase().includes(q) ||
    t.destination.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const matchedCustomers = q ? customers.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.phone.includes(q) || 
    c.customerId.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const matchedMaintenance = q ? maintenance.filter(m => 
    m.ticketId.toLowerCase().includes(q) ||
    m.vehicleRegistration.toLowerCase().includes(q) ||
    m.issue.toLowerCase().includes(q)
  ).slice(0, 2) : [];

  const hasResults = matchedDrivers.length > 0 || matchedVehicles.length > 0 || matchedTrips.length > 0 || matchedCustomers.length > 0 || matchedMaintenance.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div 
        className="fixed inset-0" 
        onClick={() => setIsSearchOpen(false)} 
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] z-10">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-white dark:bg-slate-900">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search drivers, vehicle numbers, trips, customers..."
            className="w-full bg-transparent text-sm font-medium text-slate-900 dark:text-white outline-none placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-5 bg-white dark:bg-slate-900">
          {!q ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="font-semibold text-slate-800 dark:text-slate-200">Omni Search</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Try searching for: <span className="font-mono text-brand-600 dark:text-brand-400 font-semibold">AP 39 AB 1234</span>, <span className="text-slate-700 dark:text-slate-300">Rahul</span>, <span className="text-slate-700 dark:text-slate-300">TRP-10248</span></p>
            </div>
          ) : !hasResults ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              <p className="font-semibold text-slate-800 dark:text-slate-200">No matching records found for "{query}"</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Check spelling or search by another parameter</p>
            </div>
          ) : (
            <>
              {/* Matched Vehicles */}
              {matchedVehicles.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-slate-500" />
                    Vehicles ({matchedVehicles.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchedVehicles.map(veh => (
                      <div
                        key={veh.id}
                        onClick={() => {
                          setSelectedVehicle(veh);
                          setIsSearchOpen(false);
                          setActiveTab('vehicles');
                        }}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl p-3 text-sm cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        <div className="flex items-center gap-3">
                          <div className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white">
                            {veh.registrationNumber}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 dark:text-white">{veh.brand} {veh.model}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">• {veh.type}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Drivers */}
              {matchedDrivers.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    Drivers ({matchedDrivers.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchedDrivers.map(drv => (
                      <div
                        key={drv.id}
                        onClick={() => {
                          setSelectedDriver(drv);
                          setIsSearchOpen(false);
                          setActiveTab('drivers');
                        }}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl p-3 text-sm cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        <div className="flex items-center gap-3">
                          <img src={drv.photo} alt={drv.name} className="w-9 h-9 rounded-lg object-cover border border-slate-200 dark:border-slate-700" />
                          <div>
                            <span className="font-semibold text-slate-900 dark:text-white block">{drv.name}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">({drv.driverId}) • {drv.phone}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Trips */}
              {matchedTrips.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-slate-500" />
                    Trips ({matchedTrips.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchedTrips.map(trp => (
                      <div
                        key={trp.id}
                        onClick={() => {
                          setSelectedTrip(trp);
                          setIsSearchOpen(false);
                          setActiveTab('trips');
                        }}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl p-3 text-sm cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md">{trp.tripId}</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{trp.customerName}</span>
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">₹{trp.fare}</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-md">{trp.pickup} → {trp.destination}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Customers */}
              {matchedCustomers.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                    Customers ({matchedCustomers.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchedCustomers.map(c => (
                      <div
                        key={c.id}
                        onClick={() => {
                          setSelectedCustomer(c);
                          setIsSearchOpen(false);
                          setActiveTab('customers');
                        }}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl p-3 text-sm cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        <div className="flex items-center gap-3">
                          <img src={c.photo} alt={c.name} className="w-9 h-9 rounded-lg object-cover border border-slate-200 dark:border-slate-700" />
                          <div>
                            <span className="font-semibold text-slate-900 dark:text-white block">{c.name}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{c.organization}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Maintenance */}
              {matchedMaintenance.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-slate-500" />
                    Maintenance Tickets ({matchedMaintenance.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchedMaintenance.map(m => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setActiveTab('maintenance');
                        }}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl p-3 text-sm cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">{m.ticketId}</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{m.vehicleRegistration}</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-md">{m.issue}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
