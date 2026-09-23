import React, { useState } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Wallet, 
  Banknote, 
  Plus, 
  Trash2, 
  Clock, 
  IndianRupee, 
  Receipt, 
  X 
} from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import { StatusBadge } from '../common/StatusBadge';
import type { PaymentMethodType } from '../../types';

export const PaymentsScreen: React.FC = () => {
  const { 
    paymentMethods, 
    addPaymentMethod, 
    removePaymentMethod, 
    setDefaultPaymentMethod, 
    transactions,
    profile,
    trips
  } = useCustomer();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newType, setNewType] = useState<PaymentMethodType>('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');

  // Computations
  const totalSpentThisMonth = transactions
    .filter(t => t.status === 'Paid')
    .reduce((sum, t) => sum + t.amount, 0);

  const completedTripsCount = trips.filter(t => t.status === 'Completed').length;
  const avgTripCost = completedTripsCount > 0 ? Math.round(totalSpentThisMonth / completedTripsCount) : 180;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newType === 'UPI') {
      addPaymentMethod({
        type: 'UPI',
        title: 'UPI Virtual Payment Address',
        subtitle: upiId || 'customer@okaxis',
        icon: 'smartphone',
        details: { upiId },
      });
    } else if (newType === 'Card') {
      const last4 = cardNumber.slice(-4) || '1234';
      addPaymentMethod({
        type: 'Card',
        title: 'Debit / Credit Card',
        subtitle: `•••• •••• •••• ${last4} (Exp ${cardExpiry || '12/28'})`,
        icon: 'credit-card',
        details: {
          cardNumberMasked: `•••• •••• •••• ${last4}`,
          cardHolder: cardHolder || profile.name,
          expiryDate: cardExpiry || '12/28',
        },
      });
    }
    setIsAddModalOpen(false);
    setUpiId('');
    setCardNumber('');
    setCardHolder('');
    setCardExpiry('');
  };

  const getMethodIcon = (type: PaymentMethodType) => {
    switch (type) {
      case 'UPI':
        return <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Card':
        return <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Wallet':
        return <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Cash':
        return <Banknote className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-6 pb-24 lg:pb-8">
      {/* 1. Header & Quick Top-Up */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-[700] text-slate-900 dark:text-slate-100">Payments & Wallet</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your payment modes, wallet balance and transaction ledger
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="self-start sm:self-auto min-h-[44px] px-4 bg-blue-600 text-white text-xs font-[590] rounded-[14px] transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Payment Method</span>
        </button>
      </div>

      {/* 2. Monthly Spent & Mobility Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Spent */}
        <div className="bg-white dark:bg-slate-900 rounded-[14px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-[700] uppercase tracking-wider">Total Spent This Month</span>
            <div className="w-8 h-8 rounded-[14px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-[700] text-slate-900 dark:text-slate-100">₹{totalSpentThisMonth}</div>
            <p className="text-[11px] text-blue-600 dark:text-blue-400 font-[590] mt-1">
              Across all regional rides & top-ups
            </p>
          </div>
        </div>

        {/* Trips Completed */}
        <div className="bg-white dark:bg-slate-900 rounded-[14px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-[700] uppercase tracking-wider">Total Rides Taken</span>
            <div className="w-8 h-8 rounded-[14px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-[700] text-slate-900 dark:text-slate-100">{profile.totalTrips} Trips</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-[590] mt-1">
              Member since {profile.memberSince}
            </p>
          </div>
        </div>

        {/* Avg Trip Cost */}
        <div className="bg-white dark:bg-slate-900 rounded-[14px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-[700] uppercase tracking-wider">Average Ride Cost</span>
            <div className="w-8 h-8 rounded-[14px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-[700] text-slate-900 dark:text-slate-100">₹{avgTripCost}</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-[590] mt-1">
              Standard local transit average
            </p>
          </div>
        </div>
      </div>

      {/* 3. Payment Methods Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-[14px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100">Saved Payment Methods</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Fast checkout during ride bookings</p>
          </div>
          <span className="text-[11px] font-[700] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-[14px]">
            100% Secure & Encrypted
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((pm) => (
            <div
              key={pm.id}
              className={`p-4 rounded-[14px] border-2 transition-all flex items-center justify-between ${
                pm.isDefault
                  ? 'border-blue-600 bg-blue-600/5'
                  : 'border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 hover:bg-white dark:hover:bg-white dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-[14px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-center">
                  {getMethodIcon(pm.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-[700] text-slate-900 dark:text-slate-100">{pm.title}</h4>
                    {pm.isDefault && (
                      <span className="text-[9px] font-[700] uppercase bg-blue-600 text-white px-1.5 py-0.2 rounded-[14px]">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{pm.subtitle}</p>
                </div>
              </div>

              {/* Actions: Set Default & Remove */}
              <div className="flex items-center gap-2">
                {!pm.isDefault && (
                  <button
                    onClick={() => setDefaultPaymentMethod(pm.id)}
                    className="text-[11px] font-[700] text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:text-blue-400 px-2 py-1 rounded-[14px] hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-white dark:bg-slate-900 transition-colors"
                  >
                    Set Default
                  </button>
                )}
                {pm.type !== 'Cash' && pm.type !== 'Wallet' && (
                  <button
                    onClick={() => removePaymentMethod(pm.id)}
                    className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-rose-500 rounded-[14px] hover:bg-rose-50 dark:bg-rose-950/40 transition-colors"
                    title="Remove method"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Transaction History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[14px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100">Transaction History</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">All payments, refunds, and adjustments</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 dark:border-slate-700 text-slate-500 dark:text-slate-400 uppercase font-[700] text-[10px]">
                <th className="pb-3 pl-2">Date & Time</th>
                <th className="pb-3">Trip ID / Ref</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Method</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3 pr-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D2D2D7] dark:divide-[#38383A]">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 transition-colors">
                  <td className="py-3 pl-2 font-[590] text-slate-900 dark:text-slate-100">
                    {tx.date} <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">({tx.time})</span>
                  </td>
                  <td className="py-3 font-mono font-[700] text-slate-900 dark:text-slate-100">
                    {tx.tripId || tx.id}
                  </td>
                  <td className="py-3 text-slate-500 dark:text-slate-400">{tx.description}</td>
                  <td className="py-3">
                    <span className="font-[590] text-slate-900 dark:text-slate-100">{tx.method}</span>
                  </td>
                  <td className="py-3 font-[700] text-slate-900 dark:text-slate-100">₹{tx.amount}</td>
                  <td className="py-3 pr-2 text-right">
                    <StatusBadge status={tx.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Add Payment Method Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[14px] max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100">Add Payment Method</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-900 dark:text-slate-100 rounded-[14px] hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-white dark:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Type selector */}
            <div className="flex rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 p-1 mb-4 border border-slate-200 dark:border-slate-800 dark:border-slate-700">
              {(['UPI', 'Card'] as PaymentMethodType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setNewType(t)}
                  className={`flex-1 min-h-[32px] text-xs font-[700] rounded-[14px] transition-all ${
                    newType === t
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-900 dark:text-slate-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              {newType === 'UPI' ? (
                <div>
                  <label className="block text-xs font-[700] text-slate-500 dark:text-slate-400 mb-1">
                    UPI ID (VPA)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. yourname@okhdfcbank"
                    required
                    className="w-full bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 px-3.5 min-h-[44px] rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 focus:border-blue-600 outline-none"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Compatible with Google Pay, PhonePe, Paytm, and BHIM
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-[700] text-slate-500 dark:text-slate-400 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="16-digit debit/credit card number"
                      maxLength={19}
                      required
                      className="w-full bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 px-3.5 min-h-[44px] rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-[700] text-slate-500 dark:text-slate-400 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Name on card"
                        required
                        className="w-full bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 px-3.5 min-h-[44px] rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 focus:border-blue-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-[700] text-slate-500 dark:text-slate-400 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                        className="w-full bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 px-3.5 min-h-[44px] rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 focus:border-blue-600 outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 min-h-[44px] px-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-xs font-[590] rounded-[14px] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 min-h-[44px] px-4 bg-blue-600 text-white text-xs font-[590] rounded-[14px] transition-all"
                >
                  Save Payment Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
