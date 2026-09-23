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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[14px] sm:rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 min-h-[44px] py-2 border-b border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-[700] text-slate-900 dark:text-slate-100">
                Report Vehicle Issue
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Auto — AP 37 AB 1234</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="w-8 min-h-[44px] rounded-full hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body or Success State */}
        <div className="p-5 overflow-y-auto">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-[700] text-slate-900 dark:text-slate-100">
                Vehicle issue reported successfully.
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                ABC Travels Fleet Maintenance team has been notified. An inspector will check your vehicle at the depot.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="w-full min-h-[44px] px-6 bg-blue-600 text-white font-[700] rounded-[14px] transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Radio Grid */}
              <div>
                <label className="text-xs font-[700] text-slate-900 dark:text-slate-100 uppercase tracking-wider block mb-2">
                  Select Issue Category:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      onClick={() => playBeep('tap')}
                      className={`flex items-center min-h-[44px] gap-2.5 p-3 rounded-[14px] border cursor-pointer transition ${
                        category === cat 
                          ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-600 text-blue-600 dark:text-blue-400 font-[700]' 
                          : 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="issueCategory"
                        value={cat}
                        checked={category === cat}
                        onChange={() => setCategory(cat)}
                        className="text-blue-600 dark:text-blue-400 focus:ring-[#0071E3]"
                      />
                      <span className="text-xs">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-[700] text-slate-900 dark:text-slate-100 uppercase tracking-wider block mb-1.5">
                  Description:
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the problem (e.g. rear left tyre pressure low, strange noise when applying brake)..."
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-[14px] text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Optional Photo Upload */}
              <div>
                <label className="text-xs font-[700] text-slate-900 dark:text-slate-100 uppercase tracking-wider block mb-1.5">
                  Optional Photo Upload:
                </label>
                
                {photoAdded ? (
                  <div className="p-3 bg-emerald-500/10 border border-[#34C759]/30 rounded-[14px] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-[700] text-emerald-500">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Tyre_Inspection_Photo.jpg attached
                    </div>
                    <button
                      type="button"
                      onClick={() => setPhotoAdded(false)}
                      className="text-xs text-rose-500 font-[590]"
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
                    className="w-full min-h-[44px] py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-[14px] flex flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400 transition"
                  >
                    <Camera className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    <span className="text-xs font-[590]">Tap to attach photo from camera</span>
                  </button>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!description.trim()}
                  className="w-full min-h-[44px] px-6 bg-blue-600 disabled:opacity-50 text-white font-[700] text-sm tracking-wide rounded-[14px] transition"
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
