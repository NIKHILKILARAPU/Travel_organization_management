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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-float border border-slate-100 flex flex-col h-[80vh] max-h-[640px]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Message {messageModal.name}
            </h3>
            <p className="text-xs text-slate-500">Trip #{messageModal.tripId}</p>
          </div>
          <button 
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
          {messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col ${m.sender === 'driver' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs font-medium leading-relaxed shadow-2xs ${
                  m.sender === 'driver' 
                    ? 'bg-emerald-600 text-white rounded-br-xs' 
                    : 'bg-white text-slate-800 border border-slate-200/70 rounded-bl-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 px-1 flex items-center gap-1">
                {m.time}
                {m.sender === 'driver' && <Check className="w-3 h-3 text-emerald-600" />}
              </span>
            </div>
          ))}
        </div>

        {/* Safe Canned Quick Responses for One-Tap Driver Use */}
        <div className="p-3 bg-white border-t border-slate-100">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            One-Tap Quick Driver Replies
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleSend(reply)}
                className="whitespace-nowrap px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition active-press"
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
          className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Type a message..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white flex items-center justify-center transition active-press"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
