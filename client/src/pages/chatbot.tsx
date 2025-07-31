import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import type { Message, ChatSession } from "@shared/schema";

export default function Chatbot() {
  const [sessionId, setSessionId] = useState<string>("default-session");
  const [isTyping, setIsTyping] = useState(false);
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get chat session
  const { data: session } = useQuery<ChatSession>({
    queryKey: ["/api/chat/default"],
  });

  // Get messages for the session
  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ["/api/chat", sessionId, "messages"],
    enabled: !!sessionId,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest("POST", `/api/chat/${sessionId}/messages`, {
        content,
        role: "user",
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat", sessionId, "messages"] });
      setIsTyping(true);
      
      // Poll for new messages to catch bot response
      const pollInterval = setInterval(() => {
        queryClient.invalidateQueries({ queryKey: ["/api/chat", sessionId, "messages"] });
      }, 1000);

      // Stop polling after 10 seconds
      setTimeout(() => {
        clearInterval(pollInterval);
        setIsTyping(false);
      }, 10000);
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Stop typing indicator when new bot message arrives
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        setIsTyping(false);
      }
    }
  }, [messages]);

  const handleSendMessage = (content: string) => {
    sendMessageMutation.mutate(content);
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
                <path d="M12 8V4H8"/>
                <rect width="16" height="12" x="4" y="8" rx="2"/>
                <path d="M2 14h2"/>
                <path d="M20 14h2"/>
                <path d="M15 13v2"/>
                <path d="M9 13v2"/>
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
          isLoading={isLoading}
          isTyping={isTyping}
        />
        <div ref={messagesEndRef} />
      </div>

      <ChatInput 
        onSendMessage={handleSendMessage}
        isLoading={sendMessageMutation.isPending}
        quickActions={quickActions}
      />
    </div>
  );
}
