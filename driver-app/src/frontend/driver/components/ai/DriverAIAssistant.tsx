import React, { useState } from 'react';
import { useDriver } from '../../context/DriverContext';
import { 
  Sparkles, 
  X, 
  Send, 
  Volume2, 
  ArrowRight
} from 'lucide-react';

export const DriverAIAssistant: React.FC = () => {
  const { 
    showAiAssistant, 
    setShowAiAssistant, 
    driver, 
    vehicle, 
    todayEarnings, 
    todayCompletedCount, 
    todayTotalCount, 
    nextTrip, 
    trips,
    setActiveTab,
    playBeep 
  } = useDriver();

  const [inputVal, setInputVal] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'driver'; text: string; time: string; action?: string }>>([
    {
      sender: 'ai',
      text: `Hello ${driver.name.split(' ')[0]}! I am your ABC Travels In-Cab AI Assistant. How can I assist your shift today?`,
      time: 'Now'
    }
  ]);

  if (!showAiAssistant) return null;

  const quickChips = [
    { label: "Today's Trips", query: "What are my trips today?" },
    { label: "My Earnings", query: "How much did I earn today?" },
    { label: "Next Pickup", query: "Where is my next pickup?" },
    { label: "Vehicle Status", query: "When is my vehicle service due?" },
    { label: "Pending Trips", query: "Do I have any pending trips?" },
    { label: "Contact Manager", query: "Contact ABC Travels Manager" },
  ];

  const generateAiAnswer = (query: string): { reply: string; action?: string } => {
    const q = query.toLowerCase();

    if (q.includes('what are my trips today') || q.includes("today's trips") || q.includes('trip schedule')) {
      return {
        reply: `You have ${todayTotalCount} trips scheduled today. ${todayCompletedCount} are completed. Your next pickup is at ${nextTrip ? nextTrip.pickupTime : '10:30 AM'} from ${nextTrip ? nextTrip.pickupLocation : 'Bhimavaram Railway Station'}.`,
        action: 'trips'
      };
    }

    if (q.includes('where is my next pickup') || q.includes('next pickup')) {
      if (nextTrip) {
        return {
          reply: `Your next pickup is at ${nextTrip.pickupLocation} at ${nextTrip.pickupTime} for passenger ${nextTrip.customer.name} (Fare: ₹${nextTrip.estimatedFare}). Distance is 1.4 km from your current spot.`,
          action: 'trips'
        };
      }
      return {
        reply: "You currently have no assigned next pickup. Keep your status ONLINE to receive incoming dispatches.",
      };
    }

    if (q.includes('earn today') || q.includes('my earnings') || q.includes('how much did i earn')) {
      return {
        reply: `You have earned ₹${todayEarnings} today from ${todayCompletedCount} completed trips. Your projected day total with pending trips is ₹1,450. Daily settlement is active to SBI.`,
        action: 'earnings'
      };
    }

    if (q.includes('service') || q.includes('vehicle status') || q.includes('vehicle')) {
      return {
        reply: `Your Bajaj RE (${vehicle.registrationNumber}) status is Active. You have driven ${vehicle.todayDistanceKm} km today. Next service is due in ${vehicle.nextServiceKmRemaining} km. All permits and insurance are valid.`,
        action: 'vehicle'
      };
    }

    if (q.includes('pending') || q.includes('upcoming')) {
      const upcoming = trips.filter(t => t.status === 'Upcoming' || t.status === 'Assigned');
      return {
        reply: `Yes, you have ${upcoming.length} pending trips: 1 scheduled for ${nextTrip?.pickupLocation || 'Bhimavaram'} and 1 afternoon trip to Veeravasaram.`,
        action: 'trips'
      };
    }

    if (q.includes('manager') || q.includes('dispatch') || q.includes('contact')) {
      return {
        reply: "ABC Travels Dispatch Desk is reachable at +91 8816 223344. Fleet Duty Officer: Vikram Varma (West Godavari Depot).",
      };
    }

    return {
      reply: `Got it. For trip #${nextTrip?.tripNumber || 'TR1023'}, your route via Bhimavaram - Palakollu highway is clear with minor traffic near Somaram. You can ask me about earnings, next pickup, or vehicle service anytime.`,
    };
  };

  const handleAsk = (query: string) => {
    if (!query.trim()) return;
    playBeep('tap');

    const driverMsg = {
      sender: 'driver' as const,
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const { reply, action } = generateAiAnswer(query);

    setMessages(prev => [
      ...prev,
      driverMsg,
      {
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action
      }
    ]);

    setInputVal('');

    setIsSpeaking(true);
    setTimeout(() => {
      setIsSpeaking(false);
    }, 2500);
  };

  const handleActionClick = (actionName?: string) => {
    playBeep('tap');
    setShowAiAssistant(false);
    if (actionName === 'trips') setActiveTab('trips');
    if (actionName === 'earnings') setActiveTab('earnings');
    if (actionName === 'vehicle') setActiveTab('vehicle');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[14px] sm:rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] flex flex-col h-[82vh] max-h-[680px] overflow-hidden">
        {/* Compact In-Cab AI Header */}
        <div className="px-5 min-h-[44px] py-2 border-b border-slate-200 dark:border-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-[700] text-slate-900 dark:text-slate-100">
                  Driver AI Assistant
                </h3>
                <span className="text-[10px] font-[700] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.2 rounded border border-blue-200 dark:border-blue-800">
                  Fleet Copilot
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Optimized for fast hands-free operation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {isSpeaking && (
              <span className="flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 font-[700] bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                Speaking
              </span>
            )}
            <button
              onClick={() => {
                playBeep('tap');
                setShowAiAssistant(false);
              }}
              className="w-8 min-h-[44px] rounded-full hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-white dark:bg-slate-900">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'driver' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[86%] p-3.5 rounded-[14px] text-xs leading-relaxed ${
                  m.sender === 'driver'
                    ? 'bg-blue-600 text-white font-[590]'
                    : 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100'
                }`}
              >
                {m.sender === 'ai' && (
                  <div className="flex items-center gap-1.5 text-[10px] font-[700] text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                    <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    AI Assistant
                  </div>
                )}
                
                <p className={`text-xs ${m.sender === 'driver' ? 'text-white' : 'text-slate-900 dark:text-slate-100'} leading-relaxed font-[400]`}>
                  {m.text}
                </p>

                {/* Optional Jump Action Chip */}
                {m.action && (
                  <button
                    onClick={() => handleActionClick(m.action)}
                    className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-[700] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-[14px] border border-blue-200 dark:border-blue-800 transition"
                  >
                    Open {m.action.toUpperCase()}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 px-1">
                {m.time}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Driver Action Chips */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-[700] uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Quick Driver Questions
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">One-tap query</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {quickChips.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleAsk(chip.query)}
                className="min-h-[44px] px-2 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-[14px] text-left text-[11px] font-[700] text-slate-900 dark:text-slate-100 transition truncate"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(inputVal);
          }}
          className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask AI (e.g. When is my next service?)..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 min-h-[44px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-[14px] px-4 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="w-12 h-12 rounded-[14px] bg-blue-600 disabled:opacity-40 text-white flex items-center justify-center transition flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
