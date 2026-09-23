import React, { useState } from 'react';
import { Send, X, Shield, CheckCheck } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const MessageDriverModal: React.FC = () => {
  const { isMessageModalOpen, setIsMessageModalOpen, activeTrip } = useCustomer();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'customer' | 'driver'; text: string; time: string }>>([
    {
      sender: 'driver',
      text: 'Namaste! I am on my way to your pickup location.',
      time: 'Just now',
    },
  ]);

  const quickChips = [
    "I'm at the main entrance gate.",
    'Please turn on the AC.',
    'I have luggage with me.',
    'Traffic is clear this side.',
    'Coming down in 1 minute.',
  ];

  const driver = activeTrip?.driver || {
    name: 'Rahul Kumar',
    vehicleModel: 'Bajaj Compact Auto',
    vehicleRegistration: 'AP 39 XX 1234',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  };

  if (!isMessageModalOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const content = textToSend || inputText;
    if (!content.trim()) return;

    const newMsg = {
      sender: 'customer' as const,
      text: content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputText('');

    // Simulate driver reply
    setTimeout(() => {
      const driverReplies = [
        'Understood! Reaching in 2 minutes.',
        'Noted sir, I am near the landmark.',
        'Okay, waiting at the gate with hazard lights on.',
        'Sure thing, see you shortly!',
      ];
      const randomReply = driverReplies[Math.floor(Math.random() * driverReplies.length)];
      setMessages((prev) => [
        ...prev,
        {
          sender: 'driver',
          text: randomReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-[14px] max-w-md w-full h-[540px] flex flex-col shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={driver.photo}
                alt={driver.name}
                className="w-10 h-10 rounded-[14px] object-cover"
              />
              <span className="absolute bottom-[-2px] right-[-2px] w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-100 dark:border-slate-900" />
            </div>
            <div>
              <h4 className="text-sm font-[700] text-slate-900 dark:text-slate-100">{driver.name}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {driver.vehicleModel} • {driver.vehicleRegistration}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsMessageModalOpen(false)}
            className="p-1.5 text-slate-500 dark:text-slate-400 hover:bg-[#D2D2D7] dark:hover:bg-slate-800 rounded-[14px] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Safety banner */}
        <div className="bg-blue-50 dark:bg-blue-900/30 px-4 py-2 border-b border-blue-200 dark:border-blue-800 flex items-center gap-2 text-[11px] text-blue-600 dark:text-blue-400 font-[590]">
          <Shield className="w-3.5 h-3.5 flex-shrink-0" />
          <span>In-app chat is monitored by ABC Travels for safety.</span>
        </div>

        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white dark:bg-slate-900">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'customer' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] px-3.5 py-2 text-xs ${
                  m.sender === 'customer'
                    ? 'bg-blue-600 text-white rounded-t-[14px] rounded-bl-[14px]'
                    : 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-t-[14px] rounded-br-[14px]'
                }`}
              >
                {m.text}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 mt-1 px-1">
                <span>{m.time}</span>
                {m.sender === 'customer' && <CheckCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {quickChips.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(chip)}
              className="flex-shrink-0 text-[11px] font-[590] text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 hover:bg-[#E5E5EA] dark:hover:bg-slate-800 px-2.5 py-1.5 rounded-[14px] transition-colors active:scale-95"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message to driver..."
            className="flex-1 min-h-[44px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs px-3.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 focus:border-blue-600 focus:bg-white dark:focus:bg-white dark:bg-slate-900 outline-none transition-all placeholder:text-slate-500 dark:text-slate-400"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="min-h-[44px] px-4 rounded-[14px] bg-blue-600 text-white disabled:opacity-40 transition-all flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
