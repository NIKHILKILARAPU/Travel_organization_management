import React from 'react';
import { 
  X, 
  Download, 
  AlertCircle, 
  RotateCcw, 
  Star 
} from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import { StatusBadge } from '../common/StatusBadge';

export const TripDetailsModal: React.FC = () => {
  const { 
    selectedTripForDetails, 
    setSelectedTripForDetails, 
    setIsReceiptModalOpen, 
    setReceiptTrip, 
    bookAgain, 
    setIsCreateTicketModalOpen 
  } = useCustomer();

  if (!selectedTripForDetails) return null;

  const trip = selectedTripForDetails;

  const handleDownloadReceipt = () => {
    setReceiptTrip(trip);
    setIsReceiptModalOpen(true);
  };

  const handleReportIssue = () => {
    setSelectedTripForDetails(null);
    setIsCreateTicketModalOpen(true);
  };

  const handleBookAgain = () => {
    bookAgain(trip);
    setSelectedTripForDetails(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-[14px] max-w-lg w-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100">Trip Details</h3>
              <StatusBadge status={trip.status} size="sm" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">#{trip.tripId}</p>
          </div>
          <button
            onClick={() => setSelectedTripForDetails(null)}
            className="p-1.5 rounded-[14px] text-slate-500 dark:text-slate-400 hover:bg-[#D2D2D7] dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable details */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-900 dark:text-slate-100">
          {/* Booking & Date meta */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 p-3.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-[590]">Trip Date & Time</span>
              <p className="font-[700] text-slate-900 dark:text-slate-100 mt-0.5">{trip.date} • {trip.time}</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-[590]">Payment Status</span>
              <p className="font-[700] text-emerald-500 mt-0.5">{trip.paymentStatus} ({trip.paymentMethod})</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-[590]">Distance & Time</span>
              <p className="font-[700] text-slate-900 dark:text-slate-100 mt-0.5">{trip.distanceKm} km ({trip.durationMins} mins)</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-[590]">Trip Security OTP</span>
              <p className="font-mono font-[700] text-blue-600 dark:text-blue-400 mt-0.5">{trip.otp}</p>
            </div>
          </div>

          {/* Driver & Vehicle */}
          <div className="p-4 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={trip.driver.photo}
                alt={trip.driver.name}
                className="w-12 h-12 rounded-[14px] object-cover border border-slate-200 dark:border-slate-800 dark:border-slate-700"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-[700] text-slate-900 dark:text-slate-100">{trip.driver.name}</h4>
                  <span className="flex items-center gap-0.5 text-[11px] font-[700] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded-[6px] border border-blue-200 dark:border-blue-800">
                    ★ {trip.driver.rating}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{trip.driver.vehicleModel}</p>
                <p className="font-mono text-xs font-[700] text-slate-900 dark:text-slate-100 mt-0.5">
                  {trip.driver.vehicleRegistration}
                </p>
              </div>
            </div>
          </div>

          {/* Route details */}
          <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 p-4 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
            <div className="flex items-start gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
              <div>
                <span className="text-[10px] font-[700] text-slate-500 dark:text-slate-400 uppercase">Pickup Location</span>
                <p className="font-[590] text-slate-900 dark:text-slate-100">{trip.pickupLocation}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1 flex-shrink-0" />
              <div>
                <span className="text-[10px] font-[700] text-slate-500 dark:text-slate-400 uppercase">Destination</span>
                <p className="font-[590] text-slate-900 dark:text-slate-100">{trip.destinationLocation}</p>
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700">
            <h4 className="font-[700] text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider">
              Payment Breakdown
            </h4>
            <div className="bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 p-3.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 space-y-1.5">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Base Fare</span>
                <span>₹{trip.fareBreakdown.baseFare}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Distance Charge</span>
                <span>₹{trip.fareBreakdown.distanceCharge}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Additional Charges & GST</span>
                <span>₹{trip.fareBreakdown.additionalCharges}</span>
              </div>
              {trip.fareBreakdown.discount > 0 && (
                <div className="flex justify-between text-emerald-500 font-[590]">
                  <span>Discount</span>
                  <span>-₹{trip.fareBreakdown.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-[700] text-slate-900 dark:text-slate-100 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 dark:border-slate-700">
                <span>Total Fare</span>
                <span className="text-blue-600 dark:text-blue-400 text-base">₹{trip.fare}</span>
              </div>
            </div>
          </div>

          {/* Rating given (if any) */}
          {trip.rating && (
            <div className="p-3.5 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-[700] text-slate-500 dark:text-slate-400 uppercase">Your Rating</span>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(trip.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#0071E3] text-blue-600 dark:text-blue-400" />
                  ))}
                </div>
                {trip.feedback && <p className="text-[11px] text-slate-900 dark:text-slate-100 mt-1 font-[400] italic">"{trip.feedback}"</p>}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions: Download Receipt, Report Issue, Book Again */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 flex flex-wrap gap-2.5">
          <button
            onClick={handleDownloadReceipt}
            className="flex-1 min-h-[44px] px-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-[590] rounded-[14px] transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Download Receipt</span>
          </button>

          <button
            onClick={handleReportIssue}
            className="flex-1 min-h-[44px] px-3 bg-white dark:bg-slate-900 hover:bg-rose-50 dark:bg-rose-950/40 dark:hover:bg-rose-500/20 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-rose-500 text-xs font-[590] rounded-[14px] transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
            <span>Report Issue</span>
          </button>

          <button
            onClick={handleBookAgain}
            className="w-full sm:w-auto min-h-[44px] px-4 bg-blue-600 text-white text-xs font-[590] rounded-[14px] transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Book Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
