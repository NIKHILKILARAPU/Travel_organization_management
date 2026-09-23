import React, { useState } from 'react';
import { 
  Home, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Plus, 
  Edit2, 
  Trash2, 
  Navigation, 
  X 
} from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import type { SavedPlace } from '../../types';

export const SavedPlacesScreen: React.FC = () => {
  const { savedPlaces, addSavedPlace, editSavedPlace, deleteSavedPlace, startBookingFlow } = useCustomer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlaceId, setEditingPlaceId] = useState<string | null>(null);

  // Form states
  const [placeName, setPlaceName] = useState('');
  const [placeCategory, setPlaceCategory] = useState<SavedPlace['category']>('Home');
  const [placeAddress, setPlaceAddress] = useState('');
  const [placeLandmark, setPlaceLandmark] = useState('');

  const openAddModal = () => {
    setEditingPlaceId(null);
    setPlaceName('');
    setPlaceCategory('Home');
    setPlaceAddress('');
    setPlaceLandmark('');
    setIsModalOpen(true);
  };

  const openEditModal = (place: SavedPlace) => {
    setEditingPlaceId(place.id);
    setPlaceName(place.name);
    setPlaceCategory(place.category);
    setPlaceAddress(place.address);
    setPlaceLandmark(place.landmark || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPlaceId) {
      editSavedPlace(editingPlaceId, {
        name: placeName,
        category: placeCategory,
        address: placeAddress,
        landmark: placeLandmark,
      });
    } else {
      addSavedPlace({
        name: placeName,
        category: placeCategory,
        address: placeAddress,
        landmark: placeLandmark,
      });
    }
    setIsModalOpen(false);
  };

  const getCategoryIcon = (category: SavedPlace['category']) => {
    switch (category) {
      case 'Home':
        return <Home className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Work':
        return <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'College':
        return <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Other':
      default:
        return <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-6 pb-24 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-[700] text-slate-900 dark:text-slate-100">Saved Places</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Quickly book rides to your home, workplace, college or frequent stops
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="self-start sm:self-auto min-h-[44px] px-4 bg-blue-600 text-white text-xs font-[590] rounded-[14px] transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Place</span>
        </button>
      </div>

      {/* Places List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savedPlaces.map((place) => (
          <div
            key={place.id}
            className="bg-white dark:bg-slate-900 rounded-[14px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 hover:border-blue-600 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-center">
                    {getCategoryIcon(place.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-[700] text-slate-900 dark:text-slate-100">{place.name}</h3>
                      <span className="text-[10px] font-[700] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 px-2 py-0.5 rounded-[14px]">
                        {place.category}
                      </span>
                    </div>
                    {place.landmark && (
                      <p className="text-[11px] text-blue-600 dark:text-blue-400 font-[590] mt-0.5">
                        Landmark: {place.landmark}
                      </p>
                    )}
                  </div>
                </div>

                {/* Edit & Delete Action Buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(place)}
                    className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-900 dark:text-slate-100 rounded-[14px] hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-white dark:bg-slate-900 transition-colors"
                    title="Edit place"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteSavedPlace(place.id)}
                    className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-rose-500 rounded-[14px] hover:bg-rose-50 dark:bg-rose-950/40 transition-colors"
                    title="Delete place"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pl-1 mb-4">
                {place.address}
              </p>
            </div>

            {/* Quick Book to this place */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Frequent stop</span>
              <button
                onClick={() => startBookingFlow(undefined, place.address)}
                className="min-h-[44px] px-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 hover:bg-white dark:hover:bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs font-[590] rounded-[14px] transition-all flex items-center gap-1 active:scale-95"
              >
                <Navigation className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span>Ride Here</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Place Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[14px] max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100">
                {editingPlaceId ? 'Edit Saved Place' : 'Add New Place'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-900 dark:text-slate-100 rounded-[14px] hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-white dark:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category picker */}
              <div>
                <label className="block text-xs font-[700] text-slate-500 dark:text-slate-400 mb-1.5">
                  Category Type
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Home', 'Work', 'College', 'Other'] as SavedPlace['category'][]).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setPlaceCategory(cat)}
                      className={`min-h-[44px] px-2 text-xs font-[700] rounded-[14px] border text-center transition-all ${
                        placeCategory === cat
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-[700] text-slate-500 dark:text-slate-400 mb-1">
                  Custom Place Label
                </label>
                <input
                  type="text"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  placeholder="e.g. Home, SRKR Campus, Grandma's House"
                  required
                  className="w-full bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 px-3.5 min-h-[44px] rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 focus:border-blue-600 outline-none"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-[700] text-slate-500 dark:text-slate-400 mb-1">
                  Full Street Address
                </label>
                <textarea
                  value={placeAddress}
                  onChange={(e) => setPlaceAddress(e.target.value)}
                  placeholder="Door/Flat no, Street, Locality, City, PIN"
                  rows={2}
                  required
                  className="w-full bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 p-3.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 focus:border-blue-600 outline-none resize-none"
                />
              </div>

              {/* Landmark */}
              <div>
                <label className="block text-xs font-[700] text-slate-500 dark:text-slate-400 mb-1">
                  Nearby Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={placeLandmark}
                  onChange={(e) => setPlaceLandmark(e.target.value)}
                  placeholder="e.g. Near Water Tank, Gate No. 2"
                  className="w-full bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 px-3.5 min-h-[44px] rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 focus:border-blue-600 outline-none"
                />
              </div>

              {/* Footer actions */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 min-h-[44px] px-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-xs font-[590] rounded-[14px] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 min-h-[44px] px-4 bg-blue-600 text-white text-xs font-[590] rounded-[14px] transition-all"
                >
                  {editingPlaceId ? 'Update Place' : 'Save Location'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
