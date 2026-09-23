import React, { useState } from 'react';
import { 
  Star, 
  Download, 
  CheckCircle2, 
  CreditCard, 
  ThumbsUp, 
  RotateCcw 
} from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import type { CustomerTrip } from '../../types';

interface TripCompletedScreenProps {
  trip: CustomerTrip;
  onDone: () => void;
}

export const TripCompletedScreen: React.FC<TripCompletedScreenProps> = ({ trip, onDone }) => {
  const { rateTrip, setIsReceiptModalOpen, setReceiptTrip, bookAgain } = useCustomer();
  const [rating, setRating] = useState(trip.rating || 5);
  const [feedback, setFeedback] = useState(trip.feedback || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(trip.feedbackTags || ['Clean Vehicle', 'Polite Driver']);
  const [submitted, setSubmitted] = useState(false);

  const feedbackOptions = [
    'Clean Vehicle',
    'Polite Driver',
    'Safe Driving',
    'Quick Route',
    'AC Cooling',
    'On-time Arrival',
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    rateTrip(trip.tripId, rating, feedback, selectedTags);
    setSubmitted(true);
    setTimeout(() => {
      onDone();
    }, 1200);
  };

  const handleViewReceipt = () => {
    setReceiptTrip(trip);
    setIsReceiptModalOpen(true);
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 space-y-6 animate-in zoom-in-95 duration-200">
      {/* 1. Trip Completed Celebration Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-[14px] p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-center relative overflow-hidden">
        <div className="w-16 h-16 rounded-[14px] bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-[11px] font-[700] text-emerald-500 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-[14px] border border-[#34C759]/30">
          Ride Finished Safely
        </span>
        <h2 className="text-2xl font-[700] text-slate-900 dark:text-slate-100 mt-2">Trip Completed</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Thank you for traveling with {trip.driver.name}
        </p>

        {/* Fare Total Display */}
        <div className="mt-5 p-4 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 inline-block min-w-[200px]">
          <span className="text-xs font-[590] text-slate-500 dark:text-slate-400">Total Fare</span>
          <div className="text-3xl font-[700] text-slate-900 dark:text-slate-100 mt-0.5">₹{trip.fare}</div>
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-900 dark:text-slate-100 font-[700] mt-1">
            <CreditCard className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Paid via {trip.paymentMethod}</span>
          </div>
        </div>

        {/* Trip details summary */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 text-left text-xs space-y-2.5">
          <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
            <span className="font-[590]">Driver & Vehicle:</span>
            <span className="font-[700] text-slate-900 dark:text-slate-100">
              {trip.driver.name} ({trip.driver.vehicleModel} • {trip.driver.vehicleRegistration})
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
            <span className="font-[590]">Pickup:</span>
            <span className="font-[700] text-slate-900 dark:text-slate-100 truncate max-w-[240px] text-right">
              {trip.pickupLocation}
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
            <span className="font-[590]">Destination:</span>
            <span className="font-[700] text-slate-900 dark:text-slate-100 truncate max-w-[240px] text-right">
              {trip.destinationLocation}
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
            <span className="font-[590]">Distance & Duration:</span>
            <span className="font-[700] text-slate-900 dark:text-slate-100">
              {trip.distanceKm} km • {trip.durationMins} mins
            </span>
          </div>
        </div>
      </div>

      {/* 2. Rate Your Driver Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[14px] p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
        <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100 text-center mb-1">
          Rate your driver
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-5">
          Your feedback helps maintain quality and safety on ABC Travels
        </p>

        <form onSubmit={handleRatingSubmit} className="space-y-5">
          {/* Star selector */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1.5 focus:outline-none transition-transform hover:scale-125"
              >
                <Star
                  className={`w-9 h-9 ${
                    star <= rating
                      ? 'fill-[#FF9500] text-amber-500 drop-shadow-sm'
                      : 'text-[#D2D2D7] dark:text-[#38383A]'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Feedback tags */}
          <div>
            <label className="block text-xs font-[700] text-slate-500 dark:text-slate-400 mb-2 text-center">
              How was your trip?
            </label>
            <div className="flex flex-wrap justify-center gap-2">
              {feedbackOptions.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-[14px] text-xs font-[590] transition-all border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 dark:border-slate-700 hover:opacity-80'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional review input */}
          <div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Leave optional compliment or comments for the driver..."
              rows={2}
              className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-3 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 focus:outline-none focus:border-blue-600 placeholder:text-slate-500 dark:text-slate-400 resize-none text-xs"
            />
          </div>

          {/* Buttons: Submit Rating & Download Receipt */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={submitted}
              className="flex-1 min-h-[44px] px-4 bg-blue-600 hover:opacity-90 active:scale-95 text-white text-xs font-[590] rounded-[14px] transition-all flex items-center justify-center gap-2"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{submitted ? 'Rating Saved!' : 'Submit Rating'}</span>
            </button>

            <button
              type="button"
              onClick={handleViewReceipt}
              className="flex-1 min-h-[44px] px-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-xs font-[590] rounded-[14px] transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download Receipt</span>
            </button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-between text-xs">
          <button
            onClick={() => bookAgain(trip)}
            className="text-blue-600 dark:text-blue-400 font-[700] flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Book this route again</span>
          </button>
          <button
            onClick={onDone}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-900 dark:text-slate-100 font-[590]"
          >
            Skip to Home
          </button>
        </div>
      </div>
    </div>
  );
};
