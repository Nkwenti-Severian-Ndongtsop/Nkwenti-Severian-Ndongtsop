# Portfolio AI Server

AI-powered chatbot backend for Nkwenti's portfolio website using Groq's Llama 3.3 70B model.

## Features

- Express.js REST API
- Groq AI integration
- CORS enabled for frontend communication
- Health check endpoint
- Environment-based configuration

## Prerequisites

- Node.js 18+ or Docker
- Groq API key

## Environment Setup

Create a `.env` file with the following **required** variables:

```env
# Server Configuration
PORT=3001

# Groq AI Configuration (REQUIRED)
GROQ_API_KEY=your_groq_api_key_here

# CORS Configuration (REQUIRED)
FRONTEND_URL=http://localhost:8080

# AI System Prompt (REQUIRED)
AI_SYSTEM_PROMPT="You are Nkwenti's AI assistant. You help visitors learn about Nkwenti Severian Ndongtsop, a junior software engineer and cybersecurity enthusiast. You can answer questions about his projects, skills, experience, and background. Be helpful, professional, and engaging."
```

### **Required Environment Variables:**

- **`PORT`** - Server port (Render sets this automatically)
- **`GROQ_API_KEY`** - Your Groq API key for AI functionality  
- **`FRONTEND_URL`** - Frontend domain for CORS (e.g., https://your-portfolio.com)
- **`AI_SYSTEM_PROMPT`** - System prompt that defines the AI's behavior and knowledge

## Running with Docker (Local Development)

```bash
# Build the image
docker build -t portfolio-ai-server .

# Run the container
docker run -p 3001:3001 --env-file .env portfolio-ai-server
```

## Running with Node.js

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

- `GET /health` - Health check endpoint
- `POST /api/chat` - Chat with AI (requires JSON body with `message` field)

## Docker Features

- **Multi-stage build**: Optimized for production
- **Security**: Runs as non-root user
- **Health checks**: Automatic container health monitoring
- **Alpine Linux**: Minimal image size
- **Environment variables**: Configurable via .env file

## Render Deployment (Production)

This project is optimized for Render deployment using Docker:

1. **Connect Repository**: Link your GitHub repository to Render
2. **Service Type**: Choose "Web Service"  
3. **Runtime**: Select "Docker"
4. **Dockerfile Path**: `./Dockerfile` (in portfolio-ai-server directory)
5. **Environment Variables**: Set in Render dashboard:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   FRONTEND_URL=https://your-frontend-domain.com
   AI_SYSTEM_PROMPT=You are Nkwenti's AI assistant. You help visitors learn about Nkwenti Severian Ndongtsop, a junior software engineer and cybersecurity enthusiast. You can answer questions about his projects, skills, experience, and background. Be helpful, professional, and engaging.
   ```
   
**Note**: Render automatically sets the `PORT` environment variable, so you don't need to set it manually.

### Other Platforms

The server can also be deployed to:
- Railway
- Heroku  
- AWS ECS
- Google Cloud Run

**Note**: The `.env` file is only for local development. In production, set environment variables through your deployment platform's dashboard.
