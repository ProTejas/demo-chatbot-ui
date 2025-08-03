import React from "react";
import { format } from "date-fns";
import TypingIndicator from "./TypingIndicator";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  isTyping: boolean;
}

export default function ChatMessages({ messages, isLoading, isTyping }: ChatMessagesProps) {
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--tata-accent))]"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 chat-scrollbar">
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "assistant" ? (
            <div className="flex items-start space-x-3" >
              <div className="w-8 h-8 bg-[hsl(var(--tata-accent))] rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="!bg-[#005BAC] rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs md:max-w-md lg:max-w-lg">
                  <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
                <div className="flex items-center mt-1 space-x-2">
                  <span className="text-xs text-gray-500">
                    {message.timestamp ? format(new Date(message.timestamp), 'HH:mm') : 'Now'}
                  </span>
                  <button className="text-xs text-gray-400 hover:text-[hsl(var(--tata-accent))] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 10v12" />
                      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                    </svg>
                  </button>
                  <button className="text-xs text-gray-400 hover:text-[hsl(var(--tata-accent))] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 14V2" />
                      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start space-x-3 justify-end">
              <div className="flex-1 flex justify-end">
                <div className="!bg-gray-200 rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs md:max-w-md">
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 bg-[hsl(var(--tata-primary))] rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>
          )}
        </div>
      ))}

      {isTyping && <TypingIndicator />}
    </div>
  );
}
