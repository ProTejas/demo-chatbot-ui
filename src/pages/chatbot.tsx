import React, { useState, useEffect, useRef } from "react";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";

// Add this declaration for Vite env variables
interface ImportMetaEnv {
  VITE_LLM_API: string;
}

// Augment the global ImportMeta type for Vite
declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const API_URL = import.meta.env.VITE_LLM_API;

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [botReply, setBotReply] = useState('');

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (content: string) => {
    setIsLoading(true);
    setIsTyping(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    fetch(`${API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: content })
    })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.text();
      })
      .then(text => text ? JSON.parse(text) : {})
      .then(data => {
        // Simulate bot response with delay
        setTimeout(() => {
          const botResponse: Message = {
            id: (Date.now() + 1).toString(),
            content: data.reply || "Sorry, I didn't understand that.",
            role: "assistant",
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, botResponse]);
          setIsTyping(false);
          setIsLoading(false);
        }, 1000 + Math.random() * 2000);
      })
      .catch(err => {
        setTimeout(() => {
          const errorMessage: Message = {
            id: (Date.now() + 2).toString(),
            content: `Error: ${err.message || err}`,
            role: "assistant",
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, errorMessage]);
          setIsTyping(false);
          setIsLoading(false);
        }, 1000);
      });
  };

  const quickActions = [
    "Check loan status",
    "Investment options",
    "Contact support",
    "Personal loan eligibility"
  ];
  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-xl">
      <ChatHeader title="TIA" />

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[hsl(var(--tata-accent))] rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                <path d="M12 8V4H8" />
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M2 14h2" />
                <path d="M20 14h2" />
                <path d="M15 13v2" />
                <path d="M9 13v2" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-[hsl(var(--tata-text))]">Welcome! I'm your Tata Capital Assistant.</p>
              <p className="text-xs text-gray-500">How can I help you today?</p>
            </div>
          </div>
        </div>

        <ChatMessages
          messages={messages}
          isLoading={false}
          isTyping={isTyping}
        />
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        quickActions={quickActions}
      />
    </div>
  );
}
