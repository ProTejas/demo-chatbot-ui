import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  quickActions: string[];
}

export default function ChatInput({ onSendMessage, isLoading, quickActions }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) return;
    
    onSendMessage(trimmedMessage);
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action: string) => {
    setMessage(action);
    textareaRef.current?.focus();
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 128) + "px";
    }
  }, [message]);

  return (
    <div className="bg-white border-t border-gray-200 px-6 py-4">
      {/* Quick Actions */}
      <div className="mb-3 flex flex-wrap gap-2">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleQuickAction(action)}
            className="px-3 py-1 text-xs bg-gray-100 text-[hsl(var(--tata-text))] rounded-full hover:bg-gray-200 transition-colors"
          >
            {action}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-[hsl(var(--tata-accent))] focus:border-transparent text-sm text-[hsl(var(--tata-text))] placeholder-gray-500 min-h-[48px] max-h-32"
            rows={1}
            disabled={isLoading}
          />
          {/* Attachment Button */}
          <button className="absolute bottom-3 right-3 text-gray-400 hover:text-[hsl(var(--tata-accent))] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>
          </button>
        </div>
        
        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!message.trim() || isLoading}
          className="bg-[hsl(var(--tata-accent))] hover:bg-blue-600 text-white rounded-2xl px-6 py-3 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--tata-accent))] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none h-12 flex items-center justify-center min-w-[48px]"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m22 2-7 20-4-9-9-4Z"/>
              <path d="M22 2 11 13"/>
            </svg>
          )}
        </button>
      </div>

      {/* Footer Info */}
      <div className="mt-2 text-center">
        <p className="text-xs text-gray-500">
          Powered by AI • Your data is secure and encrypted
        </p>
      </div>
    </div>
  );
}
