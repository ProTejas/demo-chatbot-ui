import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get messages for a chat session
  app.get("/api/chat/:sessionId/messages", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getSessionMessages(sessionId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Send a message
  app.post("/api/chat/:sessionId/messages", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const validatedData = insertMessageSchema.parse({
        ...req.body,
        sessionId,
      });

      const userMessage = await storage.createMessage(validatedData);

      // Simulate bot response with a delay
      setTimeout(async () => {
        const botResponse = generateBotResponse(validatedData.content);
        await storage.createMessage({
          sessionId,
          content: botResponse,
          role: "assistant",
        });
      }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds

      res.json(userMessage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid message data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to send message" });
      }
    }
  });

  // Get or create default chat session
  app.get("/api/chat/default", async (req, res) => {
    try {
      const session = await storage.getChatSession("default-session");
      if (!session) {
        const newSession = await storage.createChatSession({
          userId: null,
          title: "Tata Capital Chat",
        });
        res.json(newSession);
      } else {
        res.json(session);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to get chat session" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Simple bot response generator for Tata Capital
function generateBotResponse(userMessage: string): string {
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
}
