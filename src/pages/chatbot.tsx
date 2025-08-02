import { useState, useEffect, useRef } from "react";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";

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

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Generate bot response based on user message
  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("loan") || lowerMessage.includes("personal loan")) {
      return "I'd be happy to help you with information about our personal loans! Tata Capital offers competitive personal loans with:\n\n• Interest rates starting from 10.99% p.a.*\n• Loan amounts up to ₹25 lakhs\n• Flexible tenure options\n• Quick approval process\n\nWould you like to know more about eligibility criteria or start your application process?";
    }
    
    if (lowerMessage.includes("eligibility") || lowerMessage.includes("eligible")) {
      return "Here are the basic eligibility criteria for our personal loans:\n\n• Age: 21-65 years\n• Minimum monthly income: ₹25,000\n• Work experience: 2+ years\n• Good credit score (650+)\n\nBased on your profile, we can provide you with a personalized quote. Would you like me to connect you with our loan specialist?";
    }
    
    if (lowerMessage.includes("investment") || lowerMessage.includes("invest")) {
      return "Tata Capital offers various investment solutions:\n\n• Mutual Funds\n• Fixed Deposits\n• Insurance Plans\n• Wealth Management Services\n\nEach option has different risk levels and returns. What's your investment goal and risk appetite? I can suggest the best options for you.";
    }
    
    if (lowerMessage.includes("contact") || lowerMessage.includes("support") || lowerMessage.includes("help")) {
      return "I'm here to help! You can reach Tata Capital support through:\n\n• Phone: 1800-209-8800 (Toll-free)\n• Email: customercare@tatacapital.com\n• Website: www.tatacapital.com\n• Visit any of our 500+ branches\n\nIs there anything specific I can assist you with right now?";
    }
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! Welcome to Tata Capital. I'm here to assist you with all your financial needs - loans, investments, insurance, and more. How can I help you today?";
    }
    
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "You're welcome! I'm glad I could help. If you have any other questions about Tata Capital's products and services, feel free to ask. Have a great day!";
    }
    
    // Default response
    return "Thank you for your query. I'm here to help you with information about Tata Capital's products and services including personal loans, home loans, car loans, investments, and insurance. Could you please tell me more about what you're looking for so I can assist you better?";
  };

  const handleSendMessage = (content: string) => {
    setIsLoading(true);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate bot response with delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(content),
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
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
