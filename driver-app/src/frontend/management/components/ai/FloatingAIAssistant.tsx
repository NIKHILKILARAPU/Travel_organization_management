import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { Bot, X, Send, Sparkles, Wrench, Check, AlertTriangle } from 'lucide-react';

export const FloatingAIAssistant: React.FC = () => {
  const { 
    isAIFloatingOpen, 
    setIsAIFloatingOpen, 
    aiMessages, 
    isAILoading, 
    sendAIMessage,
    pendingMutation,
    confirmAIMutation,
    cancelAIMutation 
  } = useManagement();

  const [inputPrompt, setInputPrompt] = useState('');

  if (!isAIFloatingOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsAIFloatingOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-dropdown flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
        title="Open AI Fleet Copilot"
      >
        <Bot className="w-6 h-6" />
      </button>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isAILoading) return;
    sendAIMessage(inputPrompt);
    setInputPrompt('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[520px] saas-card shadow-modal flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">AI Operations Copilot</h3>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Ready for queries</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsAIFloatingOpen(false)}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-white dark:bg-slate-900">
        {aiMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                isUser 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                {msg.toolCall && (
                  <div className="mt-2 p-2 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[10px] font-mono border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                    <Wrench className="w-3 h-3 text-blue-500" />
                    <span>{msg.toolCall.toolName}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isAILoading && (
          <div className="text-slate-400 text-xs p-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span>Reasoning...</span>
          </div>
        )}
      </div>

      {/* Mutation prompt if any */}
      {pendingMutation && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border-t border-amber-200 dark:border-amber-900/60 space-y-2">
          <p className="font-semibold text-slate-900 dark:text-white text-xs">{pendingMutation.toolPayload.description}</p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={cancelAIMutation}
              className="btn-secondary py-1 px-2.5 text-xs"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmAIMutation}
              className="btn-primary py-1 px-2.5 text-xs"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSend} className="p-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask AI copilot..."
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          disabled={isAILoading}
          className="input-saas py-1.5 text-xs"
        />
        <button
          type="submit"
          disabled={!inputPrompt.trim() || isAILoading}
          className="btn-primary py-1.5 px-3 text-xs"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
};
