import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
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

    const systemPrompt = `You are Nkwenti's AI assistant. Here's what you know about Nkwenti:

BACKGROUND:
- Full-stack developer from Banagangte, Cameroon
- Specializes in React, AI integration, and 3D web experiences
- Passionate about creating innovative digital solutions

TECHNICAL SKILLS:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Three.js
- Backend: Spring Boot, Java, Rust, Axum
- AI/ML: AI integration, machine learning tools
- DevOps: Docker, CI/CD

PROJECTS:
- Interactive Data Visualization Platform with 3D charts
- AI-powered applications with modern interfaces
- Immersive 3D web experiences using Three.js
- Full-stack applications with React and modern backends

CONTACT:
- Email: nkwentiseverian@gmail.com
- Phone: +237 6 72 39 91 02
- Available for new projects and collaborations

Be helpful, professional, and enthusiastic about Nkwenti's work. Keep responses concise but informative.`;

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
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 300,
    });

    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    res.json({ 
      response,
      model: "llama3-8b-8192",
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
