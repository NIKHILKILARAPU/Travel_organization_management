import React, { useRef } from 'react';
import { Download, Printer, X, CheckCircle2, Car, ShieldCheck } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const ReceiptModal: React.FC = () => {
  const { isReceiptModalOpen, setIsReceiptModalOpen, receiptTrip, profile } = useCustomer();
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isReceiptModalOpen || !receiptTrip) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const textContent = `
=========================================
          ABC TRAVELS MOBILITY
       OFFICIAL E-TAX TRIP RECEIPT
=========================================
Invoice No: INV-${receiptTrip.tripId}
Date: ${receiptTrip.date} ${receiptTrip.time}
GSTIN: 37AAACA1234F1Z8
Customer: ${profile.name} (${profile.phone})

TRIP PARTICULARS:
Driver: ${receiptTrip.driver.name}
Vehicle: ${receiptTrip.driver.vehicleModel} (${receiptTrip.driver.vehicleRegistration})
Pickup: ${receiptTrip.pickupLocation}
Destination: ${receiptTrip.destinationLocation}
Distance: ${receiptTrip.distanceKm} km
Duration: ${receiptTrip.durationMins} mins

FARE COMPUTATION:
Base Fare:            ₹${receiptTrip.fareBreakdown.baseFare.toFixed(2)}
Distance Charge:      ₹${receiptTrip.fareBreakdown.distanceCharge.toFixed(2)}
Convenience & Taxes:  ₹${receiptTrip.fareBreakdown.additionalCharges.toFixed(2)}
Promo Discount:      -₹${receiptTrip.fareBreakdown.discount.toFixed(2)}
-----------------------------------------
TOTAL FARE PAID:      ₹${receiptTrip.fare.toFixed(2)}
Payment Mode:         ${receiptTrip.paymentMethod} (Paid)
=========================================
Thank you for traveling with ABC Travels.
Support: support@abctravels.in | 1800-425-9999
    `;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt_${receiptTrip.tripId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-[14px] max-w-md w-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h3 className="text-sm font-[700] text-slate-900 dark:text-slate-100">Ride Invoice & Receipt</h3>
          </div>
          <button
            onClick={() => setIsReceiptModalOpen(false)}
            className="p-1 text-slate-500 dark:text-slate-400 hover:bg-[#D2D2D7] dark:hover:bg-slate-800 rounded-[14px] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Receipt Body */}
        <div ref={printAreaRef} className="p-6 overflow-y-auto space-y-5 text-slate-900 dark:text-slate-100 text-xs">
          {/* Organization Logo & Header */}
          <div className="text-center pb-4 border-b border-dashed border-slate-200 dark:border-slate-800 dark:border-slate-700">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-[14px] bg-blue-600 text-white mb-2">
              <Car className="w-5 h-5" />
            </div>
            <h2 className="text-base font-[700] text-slate-900 dark:text-slate-100">ABC Travels Mobility</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Fast, Safe & Organized Regional Transport</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[14px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-[700] border border-blue-200 dark:border-blue-800">
              <ShieldCheck className="w-3 h-3" />
              <span>Tax Invoice • GST Verified</span>
            </div>
          </div>

          {/* Meta details */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 p-3 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-[11px]">
            <div>
              <p className="text-slate-500 dark:text-slate-400 font-[590]">Receipt No.</p>
              <p className="font-[700] text-slate-900 dark:text-slate-100 mt-0.5">INV-{receiptTrip.tripId}</p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 font-[590]">Date & Time</p>
              <p className="font-[700] text-slate-900 dark:text-slate-100 mt-0.5">{receiptTrip.date} • {receiptTrip.time}</p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 font-[590]">Passenger</p>
              <p className="font-[700] text-slate-900 dark:text-slate-100 mt-0.5">{profile.name}</p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 font-[590]">Payment Mode</p>
              <p className="font-[700] text-emerald-500 mt-0.5">{receiptTrip.paymentMethod} (Paid)</p>
            </div>
          </div>

          {/* Driver & vehicle */}
          <div className="p-3 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2.5">
              <img
                src={receiptTrip.driver.photo}
                alt={receiptTrip.driver.name}
                className="w-9 h-9 rounded-[14px] object-cover"
              />
              <div>
                <p className="font-[700] text-slate-900 dark:text-slate-100">{receiptTrip.driver.name}</p>
                <p className="text-slate-500 dark:text-slate-400">{receiptTrip.driver.vehicleModel}</p>
              </div>
            </div>
            <span className="font-mono font-[700] text-xs bg-white dark:bg-slate-900 px-2 py-1 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100">
              {receiptTrip.driver.vehicleRegistration}
            </span>
          </div>

          {/* Journey details */}
          <div className="space-y-2 border-l-2 border-slate-200 dark:border-slate-800 dark:border-slate-700 pl-3 py-1 ml-1 text-[11px]">
            <div>
              <p className="text-[10px] font-[700] text-emerald-500 uppercase">Pickup</p>
              <p className="font-[590] text-slate-900 dark:text-slate-100">{receiptTrip.pickupLocation}</p>
            </div>
            <div className="pt-1">
              <p className="text-[10px] font-[700] text-rose-500 uppercase">Destination</p>
              <p className="font-[590] text-slate-900 dark:text-slate-100">{receiptTrip.destinationLocation}</p>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 pt-1">
              Distance: <strong className="text-slate-900 dark:text-slate-100">{receiptTrip.distanceKm} km</strong> • Duration: <strong className="text-slate-900 dark:text-slate-100">{receiptTrip.durationMins} mins</strong>
            </p>
          </div>

          {/* Fare breakdown */}
          <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 text-[11px]">
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Base Fare</span>
              <span>₹{receiptTrip.fareBreakdown.baseFare}</span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Distance Charge ({receiptTrip.distanceKm} km)</span>
              <span>₹{receiptTrip.fareBreakdown.distanceCharge}</span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Convenience & Regulatory GST (5%)</span>
              <span>₹{receiptTrip.fareBreakdown.additionalCharges}</span>
            </div>
            {receiptTrip.fareBreakdown.discount > 0 && (
              <div className="flex justify-between text-emerald-500 font-[590]">
                <span>Special Promo Discount</span>
                <span>-₹{receiptTrip.fareBreakdown.discount}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-[700] text-slate-900 dark:text-slate-100 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 dark:border-slate-700">
              <span>Total Fare Charged</span>
              <span className="text-blue-600 dark:text-blue-400 text-base">₹{receiptTrip.fare}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 min-h-[44px] py-2.5 px-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-[14px] text-xs font-[590] flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 min-h-[44px] py-2.5 px-3 bg-blue-600 text-white rounded-[14px] text-xs font-[590] flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF/Text</span>
          </button>
        </div>
      </div>
    </div>
  );
};
