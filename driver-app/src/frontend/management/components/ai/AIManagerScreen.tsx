import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  Wrench, 
  Check, 
  X, 
  User, 
  ArrowRight, 
  Cpu 
} from 'lucide-react';

export const AIManagerScreen: React.FC = () => {
  const { 
    aiMessages, 
    isAILoading, 
    sendAIMessage, 
    pendingMutation, 
    confirmAIMutation, 
    cancelAIMutation 
  } = useManagement();

  const [inputPrompt, setInputPrompt] = useState('');

  const quickPrompts = [
    "Summarize today's revenue and performance",
    "Show available vehicles in Bhimavaram",
    "Which drivers are currently offline?",
    "Any vehicles due for service or maintenance?",
    "Show documents expiring within 30 days",
    "Assign vehicle VH-004 to driver Suresh Naidu"
  ];

  const handleSend = (text: string) => {
    if (!text.trim() || isAILoading) return;
    sendAIMessage(text);
    setInputPrompt('');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col saas-card overflow-hidden">
      
      {/* Top Bar */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">Organization AI Fleet Operations Manager</h2>
              <span className="badge-blue text-[10px]">
                Active Reasoning
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Autonomous telematics surveillance, predictive fleet diagnostics, and verified mutations</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <ShieldAlert className="w-4 h-4 text-blue-500" />
          <span>Guardrail: <strong className="text-slate-800 dark:text-slate-200">Confirmation Required for Mutations</strong></span>
        </div>
      </div>

      {/* Quick Prompts Strip */}
      <div className="px-4 py-2.5 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-semibold text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Inquiries:</span>
        </span>
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-white dark:bg-slate-900">
        {aiMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-2xl w-full rounded-xl p-4 text-xs leading-relaxed ${
                isUser 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800'
              }`}>
                <div className="flex items-center justify-between gap-4 text-[10px] font-semibold mb-1.5 opacity-70">
                  <span>{isUser ? 'You (Fleet Manager)' : 'Fleet Intelligence AI Agent'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Message Text */}
                <div className="leading-relaxed whitespace-pre-line text-xs font-medium">
                  {msg.text}
                </div>

                {/* Tool Call & Structured Data Cards */}
                {msg.toolCall && (
                  <div className="mt-3 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-[11px] space-y-1.5">
                    <div className="flex items-center justify-between font-bold text-xs text-blue-600 dark:text-blue-400">
                      <span className="flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5" />
                        Tool: {msg.toolCall.toolName}
                      </span>
                      <span className="text-[10px] font-normal text-slate-400">Payload verified</span>
                    </div>
                    <p className="text-slate-500 font-sans text-xs">{msg.toolCall.description}</p>
                    {msg.toolCall.params && Object.keys(msg.toolCall.params).length > 0 && (
                      <pre className="p-2 rounded bg-slate-50 dark:bg-slate-800 text-[10px] overflow-x-auto border border-slate-200 dark:border-slate-700/60 mt-1.5 text-slate-700 dark:text-slate-300">
                        {JSON.stringify(msg.toolCall.params, null, 2)}
                      </pre>
                    )}
                  </div>
                )}

                {/* Data Summary Tables/Lists */}
                {msg.dataSummary && Array.isArray(msg.dataSummary) && msg.dataSummary.length > 0 && (
                  <div className="mt-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-2 overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold text-[10px] uppercase">
                          {Object.keys(msg.dataSummary[0]).slice(0, 4).map(k => (
                            <th key={k} className="py-1 px-2.5">{k}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                        {msg.dataSummary.slice(0, 5).map((row: any, i: number) => (
                          <tr key={i}>
                            {Object.values(row).slice(0, 4).map((val: any, j: number) => (
                              <td key={j} className="py-1.5 px-2.5 font-mono text-slate-800 dark:text-slate-200 text-[11px]">{String(val)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isAILoading && (
          <div className="flex gap-2.5 items-center text-slate-400 text-xs font-medium">
            <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center animate-spin">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <span>Analyzing fleet telematics & executing API tools...</span>
          </div>
        )}
      </div>

      {/* Sensitive Mutation Confirmation Card */}
      {pendingMutation && (
        <div className="m-3 p-4 rounded-xl border border-amber-300 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs">Manager Confirmation Required</h4>
              <p className="text-slate-700 dark:text-slate-300 text-xs mt-0.5">{pendingMutation.toolPayload.description}</p>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                Target Tool: {pendingMutation.toolPayload.toolName}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={cancelAIMutation}
              className="btn-secondary py-1 px-3 text-xs"
            >
              Reject Action
            </button>
            <button
              type="button"
              onClick={confirmAIMutation}
              className="btn-primary py-1 px-3 text-xs"
            >
              Authorize & Apply Change
            </button>
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputPrompt);
          }}
          className="flex items-center gap-2.5"
        >
          <input
            type="text"
            placeholder="Ask AI Manager anything or instruct: 'Assign vehicle VH-004 to Suresh Naidu'..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            disabled={isAILoading}
            className="input-saas"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isAILoading}
            className="btn-primary"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      </div>

    </div>
  );
};
