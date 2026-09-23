import React, { useState } from 'react';
import { 
  HelpCircle, 
  Phone, 
  FileText, 
  Plus, 
  ChevronRight, 
  Paperclip, 
  X, 
  ShieldAlert 
} from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import { StatusBadge } from '../common/StatusBadge';
import { EmptyState } from '../common/EmptyState';
import type { SupportTicket } from '../../types';

export const SupportScreen: React.FC = () => {
  const { 
    supportTickets, 
    createSupportTicket, 
    trips, 
    isCreateTicketModalOpen, 
    setIsCreateTicketModalOpen,
    setIsEmergencyModalOpen
  } = useCustomer();

  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  // Form states
  const [issueType, setIssueType] = useState<SupportTicket['issueType']>('Wrong fare');
  const [selectedTripId, setSelectedTripId] = useState<string>(trips[0]?.tripId || '');
  const [description, setDescription] = useState('');
  const [hasAttachment, setHasAttachment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const commonIssues: SupportTicket['issueType'][] = [
    "Driver hasn't arrived",
    'Wrong fare',
    'Payment failed',
    'Lost item',
    'Cancel booking',
    'Report driver',
    'Vehicle issue',
    'Other',
  ];

  const handleCreateTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    await createSupportTicket({
      issueType,
      tripId: selectedTripId || undefined,
      description,
    });
    setIsSubmitting(false);
    setIsCreateTicketModalOpen(false);
    setDescription('');
    setHasAttachment(false);
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-6 pb-24 lg:pb-8">
      {/* 1. Header & Emergency Help Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-[700] text-slate-900 dark:text-slate-100">Help & Support</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-[400]">
            Resolve ride issues, billing questions, lost items and safety inquiries
          </p>
        </div>
        <button
          onClick={() => setIsCreateTicketModalOpen(true)}
          className="self-start sm:self-auto min-h-[44px] px-4 bg-blue-600 text-white text-xs font-[590] rounded-[14px] transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create Support Ticket</span>
        </button>
      </div>

      {/* 2. Common Issues Quick Selector Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-[14px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
        <h3 className="text-xs font-[700] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Choose an Issue to Get Started
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {commonIssues.map((issue) => (
            <button
              key={issue}
              onClick={() => {
                setIssueType(issue);
                setIsCreateTicketModalOpen(true);
              }}
              className="p-3.5 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 hover:bg-[#E5E5EA] dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-left transition-all active:scale-95 group"
            >
              <h4 className="text-xs font-[590] text-slate-900 dark:text-slate-100 leading-snug">
                {issue}
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Get immediate resolution</p>
            </button>
          ))}
        </div>
      </div>

      {/* 3. 24x7 Helpline Banner */}
      <div className="bg-white dark:bg-slate-900 text-white dark:text-slate-100 rounded-[14px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[14px] bg-slate-50 dark:bg-slate-800/60/10 dark:bg-slate-900/50 border border-slate-100/20 flex items-center justify-center text-white">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-[700] text-white">ABC Travels 24x7 Customer Helpline</h4>
            <p className="text-xs text-white/70 mt-0.5">
              Call toll-free: <strong>1800-425-9999</strong> for urgent on-road trip support
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsEmergencyModalOpen(true)}
          className="self-start sm:self-auto min-h-[44px] px-3.5 bg-rose-500 text-white text-xs font-[590] rounded-[14px] transition-all flex items-center gap-1.5 active:scale-95"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Safety SOS Desk</span>
        </button>
      </div>

      {/* 4. Support Tickets List */}
      <div className="bg-white dark:bg-slate-900 rounded-[14px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100">Your Support Tickets</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Live ticket status and support staff responses</p>
          </div>
        </div>

        {supportTickets.length === 0 ? (
          <EmptyState
            icon={HelpCircle}
            title="No Support Tickets"
            description="You don't have any support inquiries open. If you experienced any issue with a ride or fare, file a ticket above."
          />
        ) : (
          <div className="divide-y divide-[#D2D2D7] dark:divide-[#38383A]">
            {supportTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className="py-4 flex items-center justify-between hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 px-2 rounded-[14px] cursor-pointer transition-colors group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5 border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-[700] text-slate-900 dark:text-slate-100">{ticket.id}</span>
                      <StatusBadge status={ticket.status} size="sm" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-[590] text-slate-900 dark:text-slate-100">
                      {ticket.issueType} {ticket.tripId ? `• Trip #${ticket.tripId}` : ''}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{ticket.description}</p>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                      Opened: {ticket.createdAt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <span className="hidden sm:inline text-xs font-[590]">View Thread</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Ticket Modal */}
      {isCreateTicketModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[14px] max-w-lg w-full p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100">Create Support Ticket</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Our support desk will respond within 15 minutes</p>
              </div>
              <button
                onClick={() => setIsCreateTicketModalOpen(false)}
                className="p-1 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 rounded-[14px]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicketSubmit} className="space-y-4">
              {/* Issue Type */}
              <div>
                <label className="block text-[11px] font-[590] text-slate-500 dark:text-slate-400 mb-1">Issue Category</label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value as SupportTicket['issueType'])}
                  className="w-full bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-xs font-[400] text-slate-900 dark:text-slate-100 px-3.5 min-h-[44px] rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 focus:bg-white dark:focus:bg-white dark:bg-slate-900 focus:border-blue-600 outline-none cursor-pointer"
                >
                  {commonIssues.map((issue) => (
                    <option key={issue} value={issue}>
                      {issue}
                    </option>
                  ))}
                </select>
              </div>

              {/* Related Trip */}
              <div>
                <label className="block text-[11px] font-[590] text-slate-500 dark:text-slate-400 mb-1">
                  Related Trip (Optional)
                </label>
                <select
                  value={selectedTripId}
                  onChange={(e) => setSelectedTripId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-xs font-[400] text-slate-900 dark:text-slate-100 px-3.5 min-h-[44px] rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 focus:bg-white dark:focus:bg-white dark:bg-slate-900 focus:border-blue-600 outline-none cursor-pointer"
                >
                  <option value="">-- No specific trip --</option>
                  {trips.map((t) => (
                    <option key={t.id} value={t.tripId}>
                      {t.tripId} ({t.date} • {t.destinationLocation.split(',')[0]} - ₹{t.fare})
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-[590] text-slate-500 dark:text-slate-400 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain what happened in detail..."
                  rows={4}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 p-3.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 focus:bg-white dark:focus:bg-white dark:bg-slate-900 focus:border-blue-600 outline-none resize-none"
                />
              </div>

              {/* Attachment simulator */}
              <div>
                <button
                  type="button"
                  onClick={() => setHasAttachment(!hasAttachment)}
                  className={`inline-flex min-h-[44px] items-center gap-1.5 px-3 rounded-[14px] border text-xs font-[590] transition-all ${
                    hasAttachment
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                      : 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 dark:border-slate-700 hover:bg-[#E5E5EA] dark:hover:bg-slate-800'
                  }`}
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>{hasAttachment ? 'Screenshot Attached (bill_photo.jpg)' : '+ Attach Photo / Screenshot'}</span>
                </button>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreateTicketModalOpen(false)}
                  className="flex-1 min-h-[44px] px-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 hover:bg-[#E5E5EA] dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-[590] rounded-[14px] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !description.trim()}
                  className="flex-1 min-h-[44px] px-4 bg-blue-600 text-white text-xs font-[590] rounded-[14px] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ticket Details & Responses Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[14px] max-w-lg w-full p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 dark:border-slate-700 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100">{selectedTicket.id}</h3>
                  <StatusBadge status={selectedTicket.status} size="sm" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-[590]">{selectedTicket.issueType}</p>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-1 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 rounded-[14px]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 p-1">
              <div className="p-3.5 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100">
                <span className="text-[10px] font-[700] text-slate-500 dark:text-slate-400 uppercase">Original Inquiry</span>
                <p className="mt-1 font-[400]">{selectedTicket.description}</p>
              </div>

              {selectedTicket.responses?.map((res, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-[14px] text-xs ${
                    res.sender === 'support'
                      ? 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 ml-4'
                      : 'bg-blue-600 text-white mr-4'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-[700]">
                      {res.sender === 'support' ? 'ABC Travels Support Desk' : 'You'}
                    </span>
                    <span className={`text-[10px] ${res.sender === 'support' ? 'text-slate-500 dark:text-slate-400' : 'text-white/80'}`}>{res.time}</span>
                  </div>
                  <p className="leading-relaxed font-[400]">{res.message}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 flex justify-end">
              <button
                onClick={() => setSelectedTicket(null)}
                className="min-h-[44px] px-5 bg-blue-600 text-white text-xs font-[590] rounded-[14px] transition-all"
              >
                Close Ticket View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
