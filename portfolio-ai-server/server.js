import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Server is running' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get system prompt from environment variable
    const systemPrompt = process.env.AI_SYSTEM_PROMPT;

    if (!systemPrompt) {
      console.error('AI_SYSTEM_PROMPT environment variable is not set');
      return res.status(500).json({ 
        error: 'Server configuration error' 
      });
    }

    // Choose model based on message complexity
    let model = "llama3.1-70b-8192"; // Default to best model
    
    // For simple questions, use faster model
    if (message.toLowerCase().includes('hello') || 
        message.toLowerCase().includes('hi') ||
        message.toLowerCase().includes('how are you')) {
      model = "llama3.1-8b-8192";
    }
    
    // For technical questions, use the best model
    if (message.toLowerCase().includes('project') ||
        message.toLowerCase().includes('skill') ||
        message.toLowerCase().includes('technology') ||
        message.toLowerCase().includes('experience')) {
      model = "llama3.1-70b-8192";
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: message
        }
      ],
      model: model,
      temperature: 0.7,
      max_tokens: 300, // Increased for better responses
    });

    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    res.json({ 
      response,
      model: model,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Groq API error:', error);
    res.status(500).json({ 
      error: 'Failed to get response',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(port, () => {
  console.log(`🚀 AI Server running on port ${port}`);
  console.log(` Health check: http://localhost:${port}/health`);
  console.log(`💬 Chat endpoint: http://localhost:${port}/api/chat`);
});
