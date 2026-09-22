import React, { useState } from 'react';
import { useDriver } from '../../context/DriverContext';
import type { VehicleIssueReport } from '../../types';
import { 
  X, 
  Wrench, 
  Camera, 
  CheckCircle2 
} from 'lucide-react';

export const ReportIssueModal: React.FC = () => {
  const { 
    showReportIssueModal, 
    setShowReportIssueModal, 
    reportVehicleIssue,
    playBeep 
  } = useDriver();

  const [category, setCategory] = useState<VehicleIssueReport['category']>('Tyres');
  const [description, setDescription] = useState('');
  const [photoAdded, setPhotoAdded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!showReportIssueModal) return null;

  const categories: VehicleIssueReport['category'][] = [
    'Engine',
    'Tyres',
    'Brakes',
    'Lights',
    'Electrical',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    reportVehicleIssue(
      category, 
      description.trim(), 
      photoAdded ? 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=300&auto=format&fit=crop&q=80' : undefined
    );
    setIsSubmitted(true);
    playBeep('success');
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setDescription('');
    setPhotoAdded(false);
    setShowReportIssueModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-float border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Report Vehicle Issue
              </h3>
              <p className="text-xs text-slate-500">Auto — AP 37 AB 1234</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body or Success State */}
        <div className="p-5 overflow-y-auto">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Vehicle issue reported successfully.
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                ABC Travels Fleet Maintenance team has been notified. An inspector will check your vehicle at the depot.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl active-press transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Radio Grid */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Select Issue Category:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      onClick={() => playBeep('tap')}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl border cursor-pointer transition active-press ${
                        category === cat 
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="issueCategory"
                        value={cat}
                        checked={category === cat}
                        onChange={() => setCategory(cat)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-xs">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Description:
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the problem (e.g. rear left tyre pressure low, strange noise when applying brake)..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
                />
              </div>

              {/* Optional Photo Upload */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Optional Photo Upload:
                </label>
                
                {photoAdded ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Tyre_Inspection_Photo.jpg attached
                    </div>
                    <button
                      type="button"
                      onClick={() => setPhotoAdded(false)}
                      className="text-xs text-rose-600 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      playBeep('tap');
                      setPhotoAdded(true);
                    }}
                    className="w-full py-4 border-2 border-dashed border-slate-200 hover:border-slate-300 rounded-2xl flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-slate-700 transition active-press"
                  >
                    <Camera className="w-5 h-5 text-slate-400" />
                    <span className="text-xs font-semibold">Tap to attach photo from camera</span>
                  </button>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!description.trim()}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-sm tracking-wide rounded-2xl shadow-md shadow-emerald-700/20 active-press transition"
                >
                  SUBMIT REPORT
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
