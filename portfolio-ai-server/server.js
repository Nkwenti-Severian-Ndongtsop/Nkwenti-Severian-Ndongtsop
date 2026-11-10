import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Groq model configuration.
// `llama-3.3-70b-versatile` was decommissioned on 2026-08-16.
// Keep the model in an env var so future deprecations don't require a code change.
const DEFAULT_MODEL = 'openai/gpt-oss-120b';
const FALLBACK_MODEL = 'openai/gpt-oss-20b';
const configuredModel = process.env.GROQ_MODEL || DEFAULT_MODEL;

// Request limits
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 8;
const MAX_HISTORY_CONTENT_LENGTH = 2000;

const parsePositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

// Render (and most PaaS providers) sit behind a proxy. This lets rate limiting
// identify clients by their real IP instead of the proxy IP.
app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json({ limit: process.env.JSON_BODY_LIMIT || '16kb' }));

const chatLimiter = rateLimit({
  windowMs: parsePositiveInt(process.env.CHAT_RATE_WINDOW_MS, 60_000),
  limit: parsePositiveInt(process.env.CHAT_RATE_LIMIT, 20),
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    error: 'Too many requests. Please wait a moment and try again.'
  }
});

// Initialize Groq
if (!process.env.GROQ_API_KEY) {
  console.warn('GROQ_API_KEY is not set. /api/chat requests will fail until it is configured.');
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// The full system prompt is provided through AI_SYSTEM_PROMPT so Nkwenti's
// personal information is never committed to the repository.
// The fallback below is intentionally generic and contains no personal data.
const FALLBACK_SYSTEM_PROMPT =
  "You are a portfolio assistant. Only answer questions about the site owner " +
  "and help visitors navigate this portfolio. Never invent facts. If you do " +
  "not know something, say so and direct the visitor to the contact page.";

if (!process.env.AI_SYSTEM_PROMPT) {
  console.warn(
    'AI_SYSTEM_PROMPT is not set. The assistant will use a generic fallback prompt.'
  );
}

// Load AI context from environment variable only
const loadAIContext = () => {
  return process.env.AI_CONTEXT || '';
};

const aiContext = loadAIContext();

// Enhanced system prompt
const createSystemPrompt = (userMessage = '') => {
  const currentTime = new Date().toISOString();
  const basePrompt = process.env.AI_SYSTEM_PROMPT || FALLBACK_SYSTEM_PROMPT;

  return `${basePrompt}

════════════════════════════════════════
RUNTIME CONTEXT
════════════════════════════════════════
Current date and time (UTC): ${currentTime}
${aiContext ? `\nAdditional context supplied by the site owner:\n${aiContext}` : ''}`;
};

// Generate unique conversation ID
const generateConversationId = () => {
  return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Generate follow-up suggestions based on message content
const generateFollowUpSuggestions = (message) => {
  const suggestions = [
    "Tell me about his work at Adorsys",
    "What certifications does he hold?",
    "How can I collaborate with him?",
    "What's his experience with Rust?",
    "What is Alkelang?"
  ];

  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('project')) {
    return [
      "Tell me about his AI portfolio project",
      "What's LinkSphere about?",
      "Can you explain keycloak-config-cli?",
      "What is Alkelang?"
    ];
  }

  if (lowerMessage.includes('skill') || lowerMessage.includes('experience') || lowerMessage.includes('certification')) {
    return [
      "What's his strongest programming language?",
      "Tell me about his Azure certification",
      "How did he get started in tech?"
    ];
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('collaborate')) {
    return [
      "What's his availability?",
      "How can I work with him?",
      "What's his email address?"
    ];
  }

  if (lowerMessage.includes('background') || lowerMessage.includes('personal') || lowerMessage.includes('story')) {
    return [
      "Where is he from in Cameroon?",
      "What are his hobbies?",
      "What are his career goals?"
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
    version: '2.1',
    model: configuredModel,
    features: ['conversation-memory', 'follow-up-suggestions', 'smart-responses']
  });
});

// Only accept well-formed, bounded history entries from the client.
const sanitizeConversationHistory = (history) => {
  if (!Array.isArray(history)) return [];

  return history
    .filter((item) =>
      item &&
      (item.role === 'user' || item.role === 'assistant') &&
      typeof item.content === 'string'
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map(({ role, content }) => ({
      role,
      content: content.slice(0, MAX_HISTORY_CONTENT_LENGTH)
    }));
};

// Enhanced chat endpoint
app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body || {};

    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ 
        error: 'A non-empty message is required',
        timestamp: new Date().toISOString()
      });
    }

    const userMessage = message.trim();

    if (userMessage.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer`,
        timestamp: new Date().toISOString()
      });
    }

    const safeHistory = sanitizeConversationHistory(conversationHistory);

    // Analyze message complexity and choose appropriate parameters
    let model = configuredModel;
    let maxTokens = 300;
    let temperature = 0.6;

    // Adjust parameters based on message type
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('project') ||
        lowerMessage.includes('experience') ||
        lowerMessage.includes('skill') ||
        lowerMessage.includes('certification')) {
      maxTokens = 400; // Allow more detailed responses
      temperature = 0.5; // More factual
    }

    if (lowerMessage.includes('hello') ||
        lowerMessage.includes('hi') ||
        lowerMessage.includes('how are you')) {
      maxTokens = 150; // Shorter greetings
      temperature = 0.8; // More creative
    }

    // Build conversation messages with memory
    const messages = [
      {
        role: "system",
        content: createSystemPrompt(userMessage)
      },
      ...safeHistory,
      {
        role: "user",
        content: userMessage
      }
    ];

    console.log(`Processing message for conversation: ${generateConversationId()}`);

    let completion;
    try {
      completion = await groq.chat.completions.create({
        messages,
        model,
        temperature,
        max_tokens: maxTokens,
      });
    } catch (error) {
      // If the configured model has been retired, retry with the fallback model.
      const errorText = `${error?.code || ''} ${error?.message || ''}`;
      const isModelNotFound =
        error?.status === 404 ||
        /model_not_found|does not exist|do not have access to it/i.test(errorText);
      if (!isModelNotFound || model === FALLBACK_MODEL) {
        throw error;
      }

      console.warn(`Model "${model}" unavailable, falling back to "${FALLBACK_MODEL}"`);
      model = FALLBACK_MODEL;
      completion = await groq.chat.completions.create({
        messages,
        model,
        temperature,
        max_tokens: maxTokens,
      });
    }

    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    res.json({ 
      response,
      model: model,
      timestamp: new Date().toISOString(),
      conversationId: generateConversationId(),
      suggestions: generateFollowUpSuggestions(userMessage),
      messageLength: userMessage.length,
      responseLength: response.length
    });

  } catch (error) {
    // Log full details server-side, but never expose upstream/provider errors to clients.
    console.error('Chat error:', error);
    res.status(502).json({
      error: 'Failed to get response',
      timestamp: new Date().toISOString(),
      fallbackResponse: "I'm experiencing technical difficulties. Please try again later or contact Nkwenti directly at severiannkwenti@gmail.com"
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err?.type === 'entity.too.large') {
    return res.status(413).json({
      error: 'Request body is too large',
      timestamp: new Date().toISOString()
    });
  }

  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      error: 'Invalid JSON body',
      timestamp: new Date().toISOString()
    });
  }

  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Something went wrong!',
    timestamp: new Date().toISOString()
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
  console.log(`AI server listening on port ${port} (model: ${configuredModel})`);
});
