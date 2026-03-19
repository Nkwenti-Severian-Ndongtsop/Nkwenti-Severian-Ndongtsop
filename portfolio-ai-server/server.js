import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Load AI context from environment variable only
const loadAIContext = () => {
  return process.env.AI_CONTEXT || '';
};

const aiContext = loadAIContext();

// Enhanced system prompt
const createSystemPrompt = (userMessage = '') => {
  const currentTime = new Date().toISOString();
  const basePrompt = process.env.AI_SYSTEM_PROMPT || `You are Nkwenti Severian Ndongtsop's AI assistant. Current time: ${currentTime}.

CONTEXT:
${aiContext}

RESPONSE GUIDELINES:
1. Be professional yet friendly and approachable
2. Provide specific, detailed answers about Nkwenti's skills and experience
3. When discussing projects, include live URLs and GitHub links when relevant
4. For technical questions, showcase Nkwenti's expertise without exaggerating
5. If asked about availability, mention he's open to opportunities
6. Keep responses concise but comprehensive (2-4 paragraphs max)
7. Use emojis occasionally to appear more engaging
8. If you don't know something, be honest and suggest contacting Nkwenti directly

ENHANCED FEATURES:
- Remember conversation context
- Provide project-specific details
- Suggest relevant projects based on user interests
- Offer to connect user with Nkwenti for serious inquiries`;

  return basePrompt;
};

// Generate unique conversation ID
const generateConversationId = () => {
  return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Generate follow-up suggestions based on message content
const generateFollowUpSuggestions = (message) => {
  const suggestions = [
    "Tell me about your work at Adorsys",
    "What certifications do you hold?",
    "How can I collaborate with you?",
    "What's your experience with Rust?"
  ];

  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('project')) {
    return [
      "Tell me about your AI portfolio project",
      "What's LinkSphere about?",
      "Can you explain keycloak-config-cli?"
    ];
  }

  if (lowerMessage.includes('skill') || lowerMessage.includes('experience') || lowerMessage.includes('certification')) {
    return [
      "What's your strongest programming language?",
      "Tell me about your Azure certification",
      "How did you get started in tech?"
    ];
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('collaborate')) {
    return [
      "What's your availability?",
      "How can we work together?",
      "What's your email address?"
    ];
  }

  if (lowerMessage.includes('background') || lowerMessage.includes('personal') || lowerMessage.includes('story')) {
    return [
      "Where are you from in Cameroon?",
      "What are your hobbies?",
      "What are your career goals?"
    ];
  }

  return suggestions.slice(0, 3);
};

// Enhanced health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Enhanced AI Server is running',
    timestamp: new Date().toISOString(),
    version: '2.0',
    features: ['conversation-memory', 'follow-up-suggestions', 'smart-responses']
  });
});

// Enhanced chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ 
        error: 'Message is required',
        timestamp: new Date().toISOString()
      });
    }

    // Analyze message complexity and choose appropriate parameters
    let model = "llama-3.3-70b-versatile";
    let maxTokens = 300;
    let temperature = 0.6;

    // Adjust parameters based on message type
    if (message.toLowerCase().includes('project') || 
        message.toLowerCase().includes('experience') ||
        message.toLowerCase().includes('skill') ||
        message.toLowerCase().includes('certification')) {
      maxTokens = 400; // Allow more detailed responses
      temperature = 0.5; // More factual
    }

    if (message.toLowerCase().includes('hello') || 
        message.toLowerCase().includes('hi') ||
        message.toLowerCase().includes('how are you')) {
      maxTokens = 150; // Shorter greetings
      temperature = 0.8; // More creative
    }

    // Build conversation messages with memory
    const messages = [
      {
        role: "system",
        content: createSystemPrompt(message)
      },
      ...conversationHistory.slice(-5), // Keep last 5 messages for context
      {
        role: "user",
        content: message
      }
    ];

    console.log(`Processing message for conversation: ${generateConversationId()}`);

    const completion = await groq.chat.completions.create({
      messages,
      model,
      temperature,
      max_tokens: maxTokens,
    });

    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    res.json({ 
      response,
      model: model,
      timestamp: new Date().toISOString(),
      conversationId: generateConversationId(),
      suggestions: generateFollowUpSuggestions(message),
      messageLength: message.length,
      responseLength: response.length
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to get response',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      fallbackResponse: "I'm experiencing technical difficulties. Please try again later or contact Nkwenti directly at severiannkwenti@gmail.com"
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Something went wrong!',
    timestamp: new Date().toISOString(),
    details: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    timestamp: new Date().toISOString(),
    availableEndpoints: ['/health', '/api/chat']
  });
});

app.listen(port, () => {
  console.log(`ok`)
});
