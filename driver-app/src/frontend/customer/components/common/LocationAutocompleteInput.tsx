import React, { useState, useEffect, useRef, useTransition } from 'react';
import { 
  MapPin, 
  Navigation, 
  Plane, 
  Train, 
  Bus, 
  GraduationCap, 
  Building2, 
  Stethoscope, 
  Bookmark, 
  Check, 
  X, 
  Key, 
  Loader2, 
  Search,
  Sparkles
} from 'lucide-react';
import { 
  searchPlacePredictions, 
  getCurrentGpsLocation, 
  loadGoogleMapsScript, 
  getGoogleMapsApiKey, 
  setStoredGoogleMapsApiKey,
  type PlaceSuggestion 
} from '../../services/googleMapsService';
import { useCustomer } from '../../context/CustomerContext';

interface LocationAutocompleteInputProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  onSelectPlace?: (place: PlaceSuggestion) => void;
  placeholder?: string;
  type: 'pickup' | 'destination';
  required?: boolean;
  className?: string;
  showGpsOption?: boolean;
}

export const LocationAutocompleteInput: React.FC<LocationAutocompleteInputProps> = ({
  label,
  value,
  onChange,
  onSelectPlace,
  placeholder,
  type,
  required = false,
  className = '',
  showGpsOption = true,
}) => {
  const { savedPlaces } = useCustomer();
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isGooglePowered, setIsGooglePowered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [, startTransition] = useTransition();

  // API Key Settings Modal
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => getGoogleMapsApiKey());
  const [isKeySaving, setIsKeySaving] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<number | null>(null);

  // Initialize Google Maps script on mount if key exists
  useEffect(() => {
    const key = getGoogleMapsApiKey();
    if (key) {
      loadGoogleMapsScript(key).then((loaded) => {
        if (loaded) {
          setIsGooglePowered(true);
        }
      });
    }
  }, []);

  // Fetch suggestions with debounce
  useEffect(() => {
    if (!isOpen) return;

    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }

    setIsLoading(true);

    debounceTimerRef.current = window.setTimeout(async () => {
      try {
        const { suggestions: results, isGooglePowered: googleActive } = await searchPlacePredictions(
          value,
          savedPlaces
        );
        startTransition(() => {
          setSuggestions(results);
          setIsGooglePowered(googleActive);
          setIsLoading(false);
          setHighlightedIndex(-1);
        });
      } catch (err) {
        console.error('Error fetching suggestions:', err);
        setIsLoading(false);
      }
    }, 180);

    return () => {
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, [value, isOpen, savedPlaces]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle GPS detection
  const handleDetectLocation = async () => {
    setIsDetectingGps(true);
    try {
      const loc = await getCurrentGpsLocation();
      onChange(loc.address);
      if (onSelectPlace) {
        onSelectPlace({
          id: 'gps-current-loc',
          primaryText: 'Current GPS Location',
          secondaryText: loc.address,
          fullAddress: loc.address,
          category: 'saved',
          source: 'gps',
          lat: loc.lat,
          lng: loc.lng,
        });
      }
      setIsOpen(false);
    } catch (err: any) {
      alert(err.message || 'Unable to retrieve current location.');
    } finally {
      setIsDetectingGps(false);
    }
  };

  // Handle item selection
  const handleSelectSuggestion = (place: PlaceSuggestion) => {
    onChange(place.fullAddress || `${place.primaryText}, ${place.secondaryText}`);
    if (onSelectPlace) {
      onSelectPlace(place);
    }
    setIsOpen(false);
  };

  // Handle key saving
  const handleSaveApiKey = async () => {
    setIsKeySaving(true);
    setStoredGoogleMapsApiKey(apiKeyInput);
    if (apiKeyInput.trim()) {
      const loaded = await loadGoogleMapsScript(apiKeyInput.trim());
      setIsGooglePowered(loaded);
    } else {
      setIsGooglePowered(false);
    }
    setIsKeySaving(false);
    setShowKeyModal(false);

    // Re-trigger suggestions search
    const { suggestions: results, isGooglePowered: googleActive } = await searchPlacePredictions(
      value,
      savedPlaces
    );
    setSuggestions(results);
    setIsGooglePowered(googleActive);
  };

  // Filter suggestions by active category chip
  const filteredSuggestions = suggestions.filter((item) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'stations') return item.category === 'railway' || item.category === 'bus';
    if (selectedCategory === 'airport') return item.category === 'airport';
    if (selectedCategory === 'colleges') return item.category === 'college';
    if (selectedCategory === 'tech_park') return item.category === 'tech_park';
    return true;
  });

  // Category Icon helper (Apple unified colors)
  const renderCategoryIcon = (category: PlaceSuggestion['category']) => {
    switch (category) {
      case 'airport':
        return <Plane className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'railway':
        return <Train className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'bus':
        return <Bus className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'college':
        return <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'tech_park':
        return <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'hospital':
        return <Stethoscope className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'saved':
        return <Bookmark className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      default:
        return <MapPin className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => 
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
        handleSelectSuggestion(filteredSuggestions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const isPickup = type === 'pickup';

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-[11px] font-[700] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {label}
          </label>
          <div className="flex items-center gap-1.5">
            {isGooglePowered ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-[700] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                Google Maps Live
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setShowKeyModal(true)}
                className="inline-flex items-center gap-1 text-[10px] font-[700] px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 hover:bg-[#E5E5EA] dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 transition-colors cursor-pointer border border-slate-200 dark:border-slate-800 dark:border-slate-700"
                title="Configure Google Maps API Key"
              >
                <Sparkles className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
                <span>Smart Places</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 font-[400]">| +API Key</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Location Input Box */}
      <div 
        className={`flex items-center bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 focus-within:bg-white dark:focus-within:bg-white dark:bg-slate-900 rounded-[14px] border min-h-[44px] transition-all ${
          isOpen 
            ? 'border-blue-600 ring-1 ring-[#0071E3] bg-white dark:bg-slate-900' 
            : 'border-slate-200 dark:border-slate-800 dark:border-slate-700 hover:border-[#86868B]'
        } px-3.5`}
      >
        {/* Leading Indicator Dot/Pin */}
        <div 
          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2.5 ${
            isPickup 
              ? 'bg-emerald-500/10 text-emerald-500' 
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-500'
          }`}
        >
          {isPickup ? (
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          ) : (
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
          )}
        </div>

        {/* Input Text Box */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || (isPickup ? 'Enter pickup point or landmark' : 'Where to?')}
          required={required}
          className="w-full bg-transparent text-xs sm:text-sm font-[400] text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-500 dark:text-slate-400"
        />

        {/* Loading Spinner or Clear Button */}
        <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
          {isLoading && (
            <Loader2 className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" />
          )}

          {value && (
            <button
              type="button"
              onClick={() => {
                onChange('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-[14px] text-slate-500 dark:text-slate-400 hover:bg-[#D2D2D7] dark:hover:bg-slate-800 transition-colors"
              title="Clear input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Quick GPS button inside input for pickup */}
          {isPickup && showGpsOption && (
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={isDetectingGps}
              className="p-1.5 rounded-[14px] bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 transition-colors border border-blue-200 dark:border-blue-800 active:scale-95 flex items-center gap-1 text-[11px] font-[590]"
              title="Detect my current location"
            >
              <Navigation className={`w-3.5 h-3.5 ${isDetectingGps ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">GPS</span>
            </button>
          )}
        </div>
      </div>

      {/* Autocomplete Dropdown Popover */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 overflow-hidden z-50 animate-in fade-in duration-150">
          {/* Header Action & Categories Filter */}
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 dark:border-slate-700">
            {/* Quick GPS Action row */}
            {showGpsOption && (
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isDetectingGps}
                className="w-full mb-2 flex items-center gap-2.5 px-3 min-h-[44px] rounded-[14px] bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 transition-all text-left text-xs font-[700] border border-blue-200 dark:border-blue-800"
              >
                <div className="w-6 h-6 rounded-[14px] bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                  <Navigation className={`w-3.5 h-3.5 ${isDetectingGps ? 'animate-spin' : ''}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-[700] text-blue-600 dark:text-blue-400">
                    {isDetectingGps ? 'Detecting GPS coordinates...' : 'Use Current Location'}
                  </div>
                  <div className="text-[10px] text-blue-600 dark:text-blue-400/80 truncate">
                    Tap to auto-fill your instant door pickup point
                  </div>
                </div>
              </button>
            )}

            {/* Quick category filter chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
              {[
                { id: 'all', label: 'All Places' },
                { id: 'stations', label: 'Stations' },
                { id: 'airport', label: 'Airport' },
                { id: 'colleges', label: 'Colleges' },
                { id: 'tech_park', label: 'Tech Parks' },
              ].map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setSelectedCategory(chip.id)}
                  className={`px-3 min-h-[32px] rounded-full font-[590] whitespace-nowrap transition-all border ${
                    selectedCategory === chip.id
                      ? 'bg-white dark:bg-slate-800/60 text-white dark:text-slate-100 border-transparent'
                      : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 dark:border-slate-700'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Suggestions List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((place, index) => {
                const isHighlighted = highlightedIndex === index;
                return (
                  <button
                    key={`${place.id}-${index}`}
                    type="button"
                    onClick={() => handleSelectSuggestion(place)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`w-full text-left px-3.5 py-2.5 flex items-start gap-3 border-b border-slate-200 dark:border-slate-800 dark:border-slate-700 last:border-b-0 transition-colors ${
                      isHighlighted ? 'bg-slate-50 dark:bg-slate-800/60 dark:bg-[#2C2C2E]' : 'hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {renderCategoryIcon(place.category)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm font-[590] text-slate-900 dark:text-slate-100 truncate">
                          {place.primaryText}
                        </span>
                        {place.distance && (
                          <span className="text-[10px] font-[700] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 px-1.5 py-0.5 rounded-[14px] flex-shrink-0 border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                            {place.distance}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {place.secondaryText || place.fullAddress}
                      </div>
                    </div>

                    {place.source === 'google' && (
                      <span className="text-[9px] uppercase font-[700] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded-[14px] border border-blue-200 dark:border-blue-800 flex-shrink-0 self-center">
                        Google
                      </span>
                    )}

                    {place.source === 'saved' && (
                      <span className="text-[9px] uppercase font-[700] text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 px-1.5 py-0.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex-shrink-0 self-center">
                        Saved
                      </span>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-6 text-center text-slate-500 dark:text-slate-400">
                <Search className="w-6 h-6 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-[700] text-slate-900 dark:text-slate-100">No matching locations found</p>
                <p className="text-[11px] mt-0.5">
                  You can still proceed with "{value}" or type a landmark
                </p>
              </div>
            )}
          </div>

          {/* Footer Attribution & Key Link */}
          <div className="p-2 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 px-3">
            <span className="flex items-center gap-1">
              {isGooglePowered ? (
                <span className="font-[400]">Powered by Google Maps Places API</span>
              ) : (
                <span>Smart Indian Mobility Places Catalog</span>
              )}
            </span>
            <button
              type="button"
              onClick={() => setShowKeyModal(true)}
              className="text-blue-600 dark:text-blue-400 hover:underline font-[590] inline-flex items-center gap-1"
            >
              <Key className="w-2.5 h-2.5" />
              <span>{isGooglePowered ? 'Update API Key' : 'Connect Google Maps'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Google Maps API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-[14px] max-w-md w-full p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[14px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-[700] text-sm">
                  G
                </div>
                <div>
                  <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100">Google Maps API Setup</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Enable live Google Places Autocomplete</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 p-1 rounded-[14px]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-900 dark:text-slate-100 font-[400] leading-relaxed">
              Enter your Google Maps JavaScript API Key with the <span className="font-[700]">Places API</span> enabled. 
              You can also specify it in <code className="bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 px-1 py-0.5 rounded-[6px] text-[11px] font-mono">.env</code> as <code className="bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 px-1 py-0.5 rounded-[6px] text-[11px] font-mono text-blue-600 dark:text-blue-400">VITE_GOOGLE_MAPS_API_KEY</code>.
            </p>

            <div>
              <label className="block text-[11px] font-[700] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Google Maps API Key
              </label>
              <input
                type="text"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3.5 min-h-[44px] rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-xs font-mono focus:outline-none focus:border-blue-600 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setApiKeyInput('');
                  setStoredGoogleMapsApiKey('');
                  setIsGooglePowered(false);
                  setShowKeyModal(false);
                }}
                className="px-3 min-h-[44px] text-xs font-[590] text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 rounded-[14px]"
              >
                Clear / Fallback
              </button>
              <button
                type="button"
                disabled={isKeySaving}
                onClick={handleSaveApiKey}
                className="px-4 min-h-[44px] bg-blue-600 text-white rounded-[14px] text-xs font-[590] flex items-center gap-1.5 active:scale-95"
              >
                {isKeySaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>Save & Activate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
