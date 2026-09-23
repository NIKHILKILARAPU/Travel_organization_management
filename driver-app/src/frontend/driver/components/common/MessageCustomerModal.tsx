import React, { useState } from 'react';
import { useDriver } from '../../context/DriverContext';
import { X, Send, Check } from 'lucide-react';

export const MessageCustomerModal: React.FC = () => {
  const { messageModal, setMessageModal, playBeep } = useDriver();
  const [messages, setMessages] = useState<{ sender: 'driver' | 'customer'; text: string; time: string }[]>([
    { sender: 'customer', text: 'Hello driver, please wait 2 minutes at the railway station gate.', time: '10:24 AM' }
  ]);
  const [inputVal, setInputVal] = useState('');

  if (!messageModal || !messageModal.open) return null;

  const quickReplies = [
    "I have arrived at the pickup location.",
    "Trapped in traffic, arriving in 4 mins.",
    "I am driving Auto AP 37 AB 1234 near gate 1.",
    "Please come to the main entrance.",
    "Okay, no problem."
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    playBeep('tap');
    const newMsg = {
      sender: 'driver' as const,
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
    setInputVal('');
  };

  const handleClose = () => {
    playBeep('tap');
    setMessageModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[14px] sm:rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex flex-col h-[80vh] max-h-[640px]">
        {/* Header */}
        <div className="px-5 min-h-[44px] py-2 border-b border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-[700] text-slate-900 dark:text-slate-100">
              Message {messageModal.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Trip #{messageModal.tripId}</p>
          </div>
          <button 
            onClick={handleClose}
            className="w-8 min-h-[44px] rounded-full hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900">
          {messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col ${m.sender === 'driver' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[82%] px-4 py-2.5 rounded-[14px] text-xs font-[590] leading-relaxed ${
                  m.sender === 'driver' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 px-1 flex items-center gap-1">
                {m.time}
                {m.sender === 'driver' && <Check className="w-3 h-3 text-blue-600 dark:text-blue-400" />}
              </span>
            </div>
          ))}
        </div>

        {/* Safe Canned Quick Responses for One-Tap Driver Use */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700">
          <p className="text-[11px] font-[700] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            One-Tap Quick Driver Replies
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleSend(reply)}
                className="whitespace-nowrap px-3 min-h-[44px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-[14px] text-xs font-[590] text-slate-900 dark:text-slate-100 transition"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputVal);
          }}
          className="p-3 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Type a message..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 min-h-[44px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-[14px] px-4 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="w-10 min-h-[44px] rounded-[14px] bg-blue-600 disabled:opacity-40 text-white flex items-center justify-center transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
