import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Bot, 
  Minimize2, 
  Maximize2,
  Terminal
} from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const CustomerAIAssistant: React.FC = () => {
  const { 
    isAIModalOpen, 
    setIsAIModalOpen, 
    aiMessages, 
    sendAIMessage, 
    executeAIToolConfirmation, 
    clearAIChat 
  } = useCustomer();

  const [inputPrompt, setInputPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'Book an auto to the railway station.',
    'Where is my driver?',
    'How much was my last trip?',
    'Cancel my current booking.',
    'Why was I charged ₹250?',
    'Show my trips from this week.',
    'Report a problem with my last ride.',
  ];

  useEffect(() => {
    if (isAIModalOpen && !isMinimized) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiMessages, isAIModalOpen, isMinimized]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || isProcessing) return;

    if (!textToSend) setInputPrompt('');
    setIsProcessing(true);
    await sendAIMessage(text);
    setIsProcessing(false);
  };

  return (
    <>
      {/* 1. Global Floating AI Assistant Bubble / Launcher Button */}
      {!isAIModalOpen && (
        <button
          onClick={() => setIsAIModalOpen(true)}
          className="fixed bottom-20 lg:bottom-8 right-5 z-40 min-h-[44px] px-4 rounded-full bg-blue-600 text-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] flex items-center gap-2.5 transition-all duration-300 active:scale-95 group border-2 border-blue-300 dark:border-blue-700"
          title="Open Travel AI Assistant"
        >
          <div className="relative">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="hidden sm:inline text-xs font-[700] tracking-tight pr-1">
            Travel Assistant
          </span>
        </button>
      )}

      {/* 2. Interactive AI Chat Drawer / Modal */}
      {isAIModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-t-[14px] sm:rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] flex flex-col overflow-hidden w-full transition-all duration-200 ${
              isMinimized
                ? 'max-w-sm h-16'
                : 'max-w-lg h-[88vh] sm:h-[620px]'
            }`}
          >
            {/* Header */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[14px] bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-[700] text-slate-900 dark:text-slate-100">Travel Assistant</h3>
                    <span className="text-[10px] font-[590] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded-[6px] border border-blue-200 dark:border-blue-800">
                      AI Powered
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Safe tool calls • Customer confirmation required
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={clearAIChat}
                  className="p-1.5 text-slate-500 dark:text-slate-400 hover:bg-[#D2D2D7] dark:hover:bg-slate-800 rounded-[14px] transition-colors"
                  title="Clear chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 text-slate-500 dark:text-slate-400 hover:bg-[#D2D2D7] dark:hover:bg-slate-800 rounded-[14px] transition-colors"
                  title={isMinimized ? 'Expand' : 'Minimize'}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsAIModalOpen(false)}
                  className="p-1.5 text-slate-500 dark:text-slate-400 hover:bg-[#D2D2D7] dark:hover:bg-slate-800 rounded-[14px] transition-colors"
                  title="Close Assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Architecture Safety Notice Strip */}
                <div className="bg-amber-50 dark:bg-amber-950/40 px-4 py-2 border-b border-amber-500/20 flex items-center gap-2 text-[11px] text-amber-500 font-[590] flex-shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>
                    Tools-mediated architecture: Sensitive actions require your explicit approval.
                  </span>
                </div>

                {/* Messages View */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-white dark:bg-slate-900">
                  {aiMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-start gap-2 max-w-[88%]">
                        {msg.sender === 'assistant' && (
                          <div className="w-7 h-7 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Bot className="w-4 h-4" />
                          </div>
                        )}

                        <div className="space-y-2">
                          {/* Message bubble */}
                          <div
                            className={`p-3.5 rounded-[14px] text-xs font-[400] leading-relaxed ${
                              msg.sender === 'user'
                                ? 'bg-blue-600 text-white rounded-tr-[4px]'
                                : 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-tl-[4px] whitespace-pre-line'
                            }`}
                          >
                            {msg.content}
                          </div>

                          {/* Tool Call Action Card (If present & requires confirmation) */}
                          {msg.toolCall && (
                            <div className="bg-white dark:bg-slate-900 rounded-[14px] p-3.5 border border-slate-200 dark:border-slate-800 dark:border-slate-700 space-y-2.5">
                              <div className="flex items-center gap-2 text-[11px] font-[700] text-slate-500 dark:text-slate-400">
                                <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                <span>Tool: {msg.toolCall.toolName}()</span>
                              </div>

                              {msg.toolCall.status === 'pending_confirmation' ? (
                                <div className="p-2.5 rounded-[14px] bg-amber-50 dark:bg-amber-950/40 border border-amber-500/20">
                                  <div className="flex items-start gap-2 mb-2">
                                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs font-[700] text-amber-500">
                                      {msg.toolCall.confirmationPrompt || 'Please confirm to execute this action.'}
                                    </p>
                                  </div>

                                  <div className="flex items-center gap-2 pt-1">
                                    <button
                                      onClick={() => executeAIToolConfirmation(msg.id, false)}
                                      className="flex-1 min-h-[44px] py-1.5 px-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-[590] rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 transition-all"
                                    >
                                      Dismiss
                                    </button>
                                    <button
                                      onClick={() => executeAIToolConfirmation(msg.id, true)}
                                      className="flex-1 min-h-[44px] py-1.5 px-3 bg-blue-600 text-white text-xs font-[590] rounded-[14px] transition-all flex items-center justify-center gap-1"
                                    >
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                      <span>Confirm Action</span>
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-[11px] font-[590] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                  {msg.toolCall.status === 'executed' ? (
                                    <>
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                      <span className="text-emerald-500">Action executed successfully</span>
                                    </>
                                  ) : (
                                    <>
                                      <X className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                                      <span>Action cancelled by user</span>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {isProcessing && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <div className="w-6 h-6 rounded-[14px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center animate-spin">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span>Travel Assistant is processing your request...</span>
                    </div>
                  )}

                  <div ref={chatBottomRef} />
                </div>

                {/* Prompt suggestion chips */}
                <div className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
                  {samplePrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(p)}
                      className="flex-shrink-0 text-[11px] font-[590] text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 hover:bg-[#E5E5EA] dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 dark:border-slate-700 px-3 py-1.5 rounded-full transition-colors active:scale-95"
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {/* Input area */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center gap-2 flex-shrink-0"
                >
                  <input
                    type="text"
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    placeholder="Ask about rides, fares, driver tracking, or support..."
                    className="flex-1 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs px-4 min-h-[44px] rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 focus:bg-white dark:focus:bg-white dark:bg-slate-900 focus:border-blue-600 outline-none transition-all placeholder:text-slate-500 dark:text-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!inputPrompt.trim() || isProcessing}
                    className="min-h-[44px] px-4 rounded-[14px] bg-blue-600 text-white disabled:opacity-40 transition-all flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
