const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Groq = require('groq-sdk');

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

    const systemPrompt = `You are Nkwenti's AI bot. Here's comprehensive information about Nkwenti:

PERSONAL BACKGROUND:
- Name: Nkwenti Severian Ndongtsop
- Age: 20 years old
- Location: Banagangte, Cameroon
- Status: Single
- Personality: Very funny, loves programming, movies, and collaborating on projects

CURRENT STATUS:
- Currently undergoing 18 months training at GIS (Global Infrastructure Service) in Bangangte
- Actively learning and developing skills in GIS technology

EDUCATION & CERTIFICATIONS:
- A/L Certificate (GCE Advanced Level) from Cameroon
- O/L Certificate (GCE Ordinary Level) from Cameroon
- Java Oracle Associate Certified
- Linux Certified

TECHNICAL SKILLS:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Three.js
- Backend: Spring Boot, Java, Rust, Axum
- AI/ML: AI integration, machine learning tools
- DevOps: Docker, CI/CD
- Databases: Oracle (certified)
- Operating Systems: Linux (certified)

PROJECTS:
- Links Management Platform

CONTACT:
- Email: nkwentiseverian@gmail.com
- Phone: +237 6 72 39 91 02
- Available for new projects and collaborations

RESPONSE GUIDELINES:
- Be helpful, professional, and enthusiastic about Nkwenti's work
- Keep responses concise but informative
- Only share personal information when specifically asked
- Emphasize his current training at GIS and certifications
- Mention his age and personality traits when relevant
- Be concise but provide good, relevant information
- Show enthusiasm for his passion for programming and collaboration

Remember: Nkwenti is a young, certified developer currently expanding his skills through GIS training while maintaining his passion for programming and collaboration.`;

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
      max_tokens: 250,
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

app.listen(port, () => {
  console.log(`🚀 AI Server running on port ${port}`);
  console.log(` Health check: http://localhost:${port}/health`);
  console.log(`💬 Chat endpoint: http://localhost:${port}/api/chat`);
});
