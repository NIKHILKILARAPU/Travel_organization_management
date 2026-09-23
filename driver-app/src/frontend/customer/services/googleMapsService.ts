// Google Maps Places Autocomplete & Geocoding Service
// Supports: Live Google Maps JavaScript Places API + Curated Indian Fallback Database

import type { SavedPlace } from '../types';

export interface PlaceSuggestion {
  id: string;
  primaryText: string;
  secondaryText: string;
  fullAddress: string;
  category: 'airport' | 'railway' | 'bus' | 'college' | 'tech_park' | 'hospital' | 'mall' | 'saved' | 'recent' | 'general';
  distance?: string;
  source: 'google' | 'curated' | 'saved' | 'recent' | 'gps';
  lat?: number;
  lng?: number;
}

// Curated database of prominent Indian destinations (Airports, Stations, Universities, Tech Hubs)
export const CURATED_INDIAN_PLACES: PlaceSuggestion[] = [
  // 1. Airports
  {
    id: 'curated-hyd-airport',
    primaryText: 'Rajiv Gandhi International Airport (HYD)',
    secondaryText: 'Shamshabad, Hyderabad, Telangana 500409',
    fullAddress: 'Rajiv Gandhi International Airport (HYD), Shamshabad, Hyderabad, Telangana 500409',
    category: 'airport',
    distance: '32.4 km',
    source: 'curated',
    lat: 17.2403,
    lng: 78.4294,
  },
  {
    id: 'curated-vga-airport',
    primaryText: 'Vijayawada International Airport (VGA)',
    secondaryText: 'NH16, Gannavaram, Andhra Pradesh 521102',
    fullAddress: 'Vijayawada International Airport (VGA), NH16, Gannavaram, Andhra Pradesh 521102',
    category: 'airport',
    distance: '48.6 km',
    source: 'curated',
    lat: 16.5304,
    lng: 80.7968,
  },
  {
    id: 'curated-vtz-airport',
    primaryText: 'Visakhapatnam International Airport (VTZ)',
    secondaryText: 'P & T Colony, NAD X Road, Visakhapatnam, AP 530009',
    fullAddress: 'Visakhapatnam International Airport (VTZ), NAD X Road, Visakhapatnam, Andhra Pradesh',
    category: 'airport',
    distance: '185 km',
    source: 'curated',
    lat: 17.7214,
    lng: 83.2245,
  },
  {
    id: 'curated-blr-airport',
    primaryText: 'Kempegowda International Airport (BLR)',
    secondaryText: 'KIAL Rd, Devanahalli, Bengaluru, Karnataka 560300',
    fullAddress: 'Kempegowda International Airport (BLR), Devanahalli, Bengaluru, Karnataka',
    category: 'airport',
    distance: '38.2 km',
    source: 'curated',
    lat: 13.1986,
    lng: 77.7066,
  },

  // 2. Railway Stations
  {
    id: 'curated-bvrt-station',
    primaryText: 'Bhimavaram Town Railway Station (BVRT)',
    secondaryText: 'Somavaram, Bhimavaram, West Godavari, AP 534202',
    fullAddress: 'Bhimavaram Town Railway Station, Somavaram, Bhimavaram, Andhra Pradesh 534202',
    category: 'railway',
    distance: '2.1 km',
    source: 'curated',
    lat: 16.5449,
    lng: 81.5212,
  },
  {
    id: 'curated-bvrm-junction',
    primaryText: 'Bhimavaram Junction (BVRM)',
    secondaryText: 'Balusumudi, Bhimavaram, West Godavari, AP 534201',
    fullAddress: 'Bhimavaram Junction, Balusumudi, Bhimavaram, Andhra Pradesh 534201',
    category: 'railway',
    distance: '3.4 km',
    source: 'curated',
    lat: 16.5376,
    lng: 81.5284,
  },
  {
    id: 'curated-sc-junction',
    primaryText: 'Secunderabad Junction Railway Station',
    secondaryText: 'Station Road, Secunderabad, Telangana 500003',
    fullAddress: 'Secunderabad Junction Railway Station, Station Road, Secunderabad, Telangana',
    category: 'railway',
    distance: '8.5 km',
    source: 'curated',
    lat: 17.4344,
    lng: 78.5013,
  },
  {
    id: 'curated-bza-station',
    primaryText: 'Vijayawada Junction Railway Station (BZA)',
    secondaryText: 'Railway Station Road, Tarapet, Vijayawada, AP 520001',
    fullAddress: 'Vijayawada Junction, Tarapet, Vijayawada, Andhra Pradesh 520001',
    category: 'railway',
    distance: '14.2 km',
    source: 'curated',
    lat: 16.5186,
    lng: 80.6199,
  },
  {
    id: 'curated-hyd-deccan',
    primaryText: 'Hyderabad Deccan Railway Station (Nampally)',
    secondaryText: 'Public Garden Rd, Red Hills, Nampally, Hyderabad 500001',
    fullAddress: 'Hyderabad Deccan Railway Station, Nampally, Hyderabad, Telangana',
    category: 'railway',
    distance: '5.6 km',
    source: 'curated',
    lat: 17.3922,
    lng: 78.4697,
  },

  // 3. Bus Terminals & Complex
  {
    id: 'curated-bvrm-bus-complex',
    primaryText: 'Bhimavaram RTC Bus Complex',
    secondaryText: 'Main Road, Ramayanpuram, Bhimavaram, AP 534201',
    fullAddress: 'APSRTC Bus Station Complex, Main Road, Bhimavaram, Andhra Pradesh 534201',
    category: 'bus',
    distance: '1.8 km',
    source: 'curated',
    lat: 16.5412,
    lng: 81.5251,
  },
  {
    id: 'curated-pnbs-vijayawada',
    primaryText: 'Pandit Nehru Bus Station (PNBS)',
    secondaryText: 'RTC Complex, Krishna Lanka, Vijayawada, AP 520013',
    fullAddress: 'Pandit Nehru Bus Station, Krishna Lanka, Vijayawada, Andhra Pradesh',
    category: 'bus',
    distance: '12.8 km',
    source: 'curated',
    lat: 16.5085,
    lng: 80.6277,
  },
  {
    id: 'curated-mgbs-hyderabad',
    primaryText: 'MGBS (Mahatma Gandhi Bus Station)',
    secondaryText: 'Imlibun, Gowliguda, Hyderabad, Telangana 500012',
    fullAddress: 'Mahatma Gandhi Bus Station, Gowliguda, Hyderabad, Telangana',
    category: 'bus',
    distance: '7.2 km',
    source: 'curated',
    lat: 17.3789,
    lng: 78.4812,
  },

  // 4. Universities & Colleges
  {
    id: 'curated-srkr-college',
    primaryText: 'S.R.K.R. Engineering College',
    secondaryText: 'Chinna Amiram, Bhimavaram, Andhra Pradesh 534204',
    fullAddress: 'SRKR Engineering College, Chinna Amiram, Bhimavaram, Andhra Pradesh 534204',
    category: 'college',
    distance: '3.8 km',
    source: 'curated',
    lat: 16.5448,
    lng: 81.4984,
  },
  {
    id: 'curated-vishnu-college',
    primaryText: 'Vishnu Institute of Technology (VIT Bhimavaram)',
    secondaryText: 'Vishnupur, Kovvada, Bhimavaram, Andhra Pradesh 534202',
    fullAddress: 'Vishnu Institute of Technology, Vishnupur, Bhimavaram, Andhra Pradesh 534202',
    category: 'college',
    distance: '5.2 km',
    source: 'curated',
    lat: 16.5683,
    lng: 81.5233,
  },
  {
    id: 'curated-dnr-college',
    primaryText: 'D.N.R. College Campus',
    secondaryText: 'Balusumudi, Bhimavaram, Andhra Pradesh 534202',
    fullAddress: 'DNR College, Balusumudi, Bhimavaram, Andhra Pradesh 534202',
    category: 'college',
    distance: '1.2 km',
    source: 'curated',
    lat: 16.5398,
    lng: 81.5244,
  },
  {
    id: 'curated-iit-hyderabad',
    primaryText: 'IIT Hyderabad (IITH Campus)',
    secondaryText: 'Near NH-65, Kandi, Sangareddy, Telangana 502285',
    fullAddress: 'Indian Institute of Technology Hyderabad, Kandi, Sangareddy, Telangana',
    category: 'college',
    distance: '42.0 km',
    source: 'curated',
    lat: 17.5947,
    lng: 78.1230,
  },
  {
    id: 'curated-iiit-hyderabad',
    primaryText: 'IIIT Hyderabad Campus',
    secondaryText: 'Professor CR Rao Rd, Gachibowli, Hyderabad, Telangana 500032',
    fullAddress: 'International Institute of Information Technology, Gachibowli, Hyderabad',
    category: 'college',
    distance: '11.5 km',
    source: 'curated',
    lat: 17.4455,
    lng: 78.3489,
  },

  // 5. Tech Parks & Business Hubs
  {
    id: 'curated-cyber-towers',
    primaryText: 'Cyber Towers — HITEC City',
    secondaryText: 'Hitech City Main Rd, Madhapur, Hyderabad, Telangana 500081',
    fullAddress: 'Cyber Towers, HITEC City Main Rd, Madhapur, Hyderabad, Telangana 500081',
    category: 'tech_park',
    distance: '9.8 km',
    source: 'curated',
    lat: 17.4504,
    lng: 78.3808,
  },
  {
    id: 'curated-mindspace',
    primaryText: 'Mindspace Madhapur Tech IT Park',
    secondaryText: 'APIIC Software Layout, Hitec City, Hyderabad 500081',
    fullAddress: 'Mindspace Madhapur IT Park, Hitec City, Hyderabad, Telangana',
    category: 'tech_park',
    distance: '10.4 km',
    source: 'curated',
    lat: 17.4399,
    lng: 78.3820,
  },
  {
    id: 'curated-financial-dist',
    primaryText: 'Financial District — WaveRock / Amazon Campus',
    secondaryText: 'Nanakramguda, Gachibowli, Hyderabad, Telangana 500032',
    fullAddress: 'Financial District, Nanakramguda, Hyderabad, Telangana 500032',
    category: 'tech_park',
    distance: '13.6 km',
    source: 'curated',
    lat: 17.4156,
    lng: 78.3417,
  },
  {
    id: 'curated-manyata-park',
    primaryText: 'Manyata Embassy Business Park',
    secondaryText: 'Outer Ring Rd, Nagavara, Bengaluru, Karnataka 560045',
    fullAddress: 'Manyata Embassy Business Park, Nagavara, Bengaluru, Karnataka',
    category: 'tech_park',
    distance: '21.0 km',
    source: 'curated',
    lat: 13.0494,
    lng: 77.6202,
  },

  // 6. Hospitals
  {
    id: 'curated-apollo-jubilee',
    primaryText: 'Apollo Hospitals Jubilee Hills',
    secondaryText: 'Road No. 72, Film Nagar, Hyderabad, Telangana 500033',
    fullAddress: 'Apollo Hospitals, Road No. 72, Jubilee Hills, Hyderabad, Telangana 500033',
    category: 'hospital',
    distance: '7.8 km',
    source: 'curated',
    lat: 17.4162,
    lng: 78.4116,
  },
  {
    id: 'curated-aig-gachibowli',
    primaryText: 'AIG Hospitals (Asian Institute of Gastroenterology)',
    secondaryText: 'Mindspace Rd, Gachibowli, Hyderabad, Telangana 500032',
    fullAddress: 'AIG Hospitals, Mindspace Road, Gachibowli, Hyderabad, Telangana',
    category: 'hospital',
    distance: '11.0 km',
    source: 'curated',
    lat: 17.4419,
    lng: 78.3619,
  },
  {
    id: 'curated-bvm-hospital',
    primaryText: 'Bhimavaram Care Hospitals',
    secondaryText: 'Gandhi Bomma Centre, J.P. Road, Bhimavaram, AP 534201',
    fullAddress: 'Bhimavaram Care Hospitals, J.P. Road, Bhimavaram, Andhra Pradesh',
    category: 'hospital',
    distance: '1.4 km',
    source: 'curated',
    lat: 16.5410,
    lng: 81.5240,
  },

  // 7. Malls & Famous Landmarks
  {
    id: 'curated-inorbit-mall',
    primaryText: 'Inorbit Mall Cyberabad',
    secondaryText: 'APIIC Software Layout, Mindspace, Madhapur, Hyderabad 500081',
    fullAddress: 'Inorbit Mall Cyberabad, Mindspace, Madhapur, Hyderabad, Telangana',
    category: 'mall',
    distance: '9.2 km',
    source: 'curated',
    lat: 17.4349,
    lng: 78.3867,
  },
  {
    id: 'curated-someshwara-temple',
    primaryText: 'Somarama Temple (Someshwara Swamy)',
    secondaryText: 'Gunupudi, Bhimavaram, West Godavari, AP 534201',
    fullAddress: 'Somarama Temple, Gunupudi, Bhimavaram, Andhra Pradesh 534201',
    category: 'general',
    distance: '2.5 km',
    source: 'curated',
    lat: 16.5458,
    lng: 81.5173,
  },
  {
    id: 'curated-charminar',
    primaryText: 'Charminar Historical Monument',
    secondaryText: 'Ghansi Bazaar, Old City, Hyderabad, Telangana 500002',
    fullAddress: 'Charminar, Ghansi Bazaar, Hyderabad, Telangana 500002',
    category: 'general',
    distance: '6.4 km',
    source: 'curated',
    lat: 17.3616,
    lng: 78.4747,
  }
];

// Helper to get Google Maps API Key from environment or localStorage
export const getGoogleMapsApiKey = (): string => {
  const envKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY;
  if (envKey && typeof envKey === 'string' && envKey.trim().length > 5) {
    return envKey.trim();
  }
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('GOOGLE_MAPS_API_KEY');
    if (stored && stored.trim().length > 5) {
      return stored.trim();
    }
  }
  return '';
};

export const setStoredGoogleMapsApiKey = (key: string): void => {
  if (typeof window !== 'undefined') {
    if (key.trim()) {
      window.localStorage.setItem('GOOGLE_MAPS_API_KEY', key.trim());
    } else {
      window.localStorage.removeItem('GOOGLE_MAPS_API_KEY');
    }
  }
};

let scriptLoadingPromise: Promise<boolean> | null = null;

// Dynamically load Google Maps JS API script with places library
export const loadGoogleMapsScript = (customKey?: string): Promise<boolean> => {
  if (typeof window === 'undefined') return Promise.resolve(false);

  // If already loaded and places library is available
  if ((window as any).google?.maps?.places?.AutocompleteService) {
    return Promise.resolve(true);
  }

  const apiKey = customKey || getGoogleMapsApiKey();
  if (!apiKey) {
    return Promise.resolve(false);
  }

  if (scriptLoadingPromise) {
    return scriptLoadingPromise;
  }

  scriptLoadingPromise = new Promise((resolve) => {
    // Check if script element already exists
    const existing = document.getElementById('google-maps-api-script');
    if (existing) {
      existing.remove();
    }

    const script = document.createElement('script');
    script.id = 'google-maps-api-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&language=en`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      console.warn('[Google Maps] Failed to load Google Maps script. Falling back to Smart Places.');
      resolve(false);
    };

    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
};

// Autocomplete service singleton for Google Maps Places
let googleAutocompleteService: any = null;

const getAutocompleteService = () => {
  if (typeof window === 'undefined') return null;
  const google = (window as any).google;
  if (google?.maps?.places?.AutocompleteService) {
    if (!googleAutocompleteService) {
      googleAutocompleteService = new google.maps.places.AutocompleteService();
    }
    return googleAutocompleteService;
  }
  return null;
};

// Map Google place types to our category icons/tags
const mapGoogleTypeToCategory = (types?: string[]): PlaceSuggestion['category'] => {
  if (!types || !types.length) return 'general';
  if (types.includes('airport')) return 'airport';
  if (types.includes('train_station') || types.includes('subway_station') || types.includes('transit_station')) return 'railway';
  if (types.includes('bus_station')) return 'bus';
  if (types.includes('university') || types.includes('school')) return 'college';
  if (types.includes('hospital') || types.includes('doctor')) return 'hospital';
  if (types.includes('shopping_mall')) return 'mall';
  return 'general';
};

// Fetch place predictions with debounce support
export const searchPlacePredictions = async (
  query: string,
  savedPlaces?: SavedPlace[]
): Promise<{ suggestions: PlaceSuggestion[]; isGooglePowered: boolean }> => {
  const cleanQuery = query.trim().toLowerCase();

  // Check if Google Maps Places API is available
  const service = getAutocompleteService();

  if (service && cleanQuery.length >= 2) {
    try {
      const googleResults = await new Promise<PlaceSuggestion[]>((resolve) => {
        service.getPlacePredictions(
          {
            input: query,
            componentRestrictions: { country: 'in' }, // Prioritize Indian locations
          },
          (predictions: any[], status: string) => {
            const google = (window as any).google;
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              predictions &&
              predictions.length > 0
            ) {
              const mapped: PlaceSuggestion[] = predictions.map((item) => ({
                id: `g-${item.place_id}`,
                primaryText: item.structured_formatting?.main_text || item.description,
                secondaryText: item.structured_formatting?.secondary_text || '',
                fullAddress: item.description,
                category: mapGoogleTypeToCategory(item.types),
                source: 'google',
              }));
              resolve(mapped);
            } else {
              resolve([]);
            }
          }
        );
      });

      if (googleResults.length > 0) {
        return {
          suggestions: googleResults,
          isGooglePowered: true,
        };
      }
    } catch (err) {
      console.warn('[Google Maps] Error fetching place predictions:', err);
    }
  }

  // --- Fallback & Smart Hybrid Search ---
  const results: PlaceSuggestion[] = [];

  // 1. Search in Saved Places first
  if (savedPlaces && savedPlaces.length > 0) {
    for (const sp of savedPlaces) {
      const match =
        !cleanQuery ||
        sp.name.toLowerCase().includes(cleanQuery) ||
        sp.address.toLowerCase().includes(cleanQuery);

      if (match) {
        results.push({
          id: `saved-${sp.id}`,
          primaryText: sp.name,
          secondaryText: sp.address,
          fullAddress: `${sp.name}, ${sp.address}`,
          category: sp.category === 'Home' || sp.category === 'Work' ? 'saved' : 'college',
          source: 'saved',
        });
      }
    }
  }

  // 2. Search in Curated Indian Places
  if (cleanQuery.length === 0) {
    // Return top popular transit & college hubs
    results.push(...CURATED_INDIAN_PLACES.slice(0, 7));
  } else {
    const matchedCurated = CURATED_INDIAN_PLACES.filter((place) => {
      const pText = place.primaryText.toLowerCase();
      const sText = place.secondaryText.toLowerCase();
      const fText = place.fullAddress.toLowerCase();
      const cat = place.category.toLowerCase();

      return (
        pText.includes(cleanQuery) ||
        sText.includes(cleanQuery) ||
        fText.includes(cleanQuery) ||
        cat.includes(cleanQuery) ||
        (cleanQuery === 'airport' && cat === 'airport') ||
        (cleanQuery === 'station' && (cat === 'railway' || cat === 'bus')) ||
        (cleanQuery === 'college' && cat === 'college') ||
        (cleanQuery === 'hospital' && cat === 'hospital')
      );
    });

    results.push(...matchedCurated);
  }

  // Deduplicate by fullAddress
  const seen = new Set<string>();
  const uniqueResults = results.filter((item) => {
    const key = item.fullAddress.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    suggestions: uniqueResults,
    isGooglePowered: false,
  };
};

// Current location GPS reverse geocoder
export const getCurrentGpsLocation = (): Promise<{
  address: string;
  lat: number;
  lng: number;
}> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        // Try Google Geocoder if available
        const google = (window as any).google;
        if (google?.maps?.Geocoder) {
          try {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode(
              { location: { lat: latitude, lng: longitude } },
              (results: any[], status: string) => {
                if (status === 'OK' && results && results[0]) {
                  resolve({
                    address: results[0].formatted_address,
                    lat: latitude,
                    lng: longitude,
                  });
                } else {
                  // Fallback address format
                  resolve({
                    address: `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
                    lat: latitude,
                    lng: longitude,
                  });
                }
              }
            );
            return;
          } catch (e) {
            console.warn('[Google Geocoder] Reverse geocoding failed:', e);
          }
        }

        // Default accurate simulation location in AP / India
        resolve({
          address: 'SRKR College Road, Chinna Amiram, Bhimavaram, AP 534204',
          lat: latitude,
          lng: longitude,
        });
      },
      (err) => {
        // Fallback gracefully on permission denial
        console.warn('[Geolocation] Browser GPS permission error:', err.message);
        resolve({
          address: 'SRKR College Road, Chinna Amiram, Bhimavaram, AP 534204',
          lat: 16.5448,
          lng: 81.4984,
        });
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  });
};
