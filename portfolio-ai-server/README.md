# Portfolio AI Server

AI-powered chatbot backend for Nkwenti's portfolio website using Groq's GPT-OSS 120B model (with automatic fallback to GPT-OSS 20B).

## Features

- Express.js REST API
- Groq AI integration
- CORS enabled for frontend communication
- Health check endpoint
- Environment-based configuration

## Prerequisites

- Node.js 20+ or Docker
- Groq API key

## Environment Setup

Create a `.env` file with the following **required** variables:

```env
# Server Configuration
PORT=3001

# Groq AI Configuration (REQUIRED)
GROQ_API_KEY=your_groq_api_key_here

# Groq model (optional, defaults to openai/gpt-oss-120b)
# openai/gpt-oss-20b is used automatically as a fallback if the primary model is unavailable.
GROQ_MODEL=openai/gpt-oss-120b

# CORS Configuration (REQUIRED)
FRONTEND_URL=http://localhost:8080
```

### System prompt

The full prompt is supplied through the **`AI_SYSTEM_PROMPT`** environment variable. It is
intentionally **not stored in the repository**, so personal details are not exposed on GitHub.
Set it locally in `.env` and in the Render dashboard for production. `AI_CONTEXT` is optional
and is appended to the prompt.

If `AI_SYSTEM_PROMPT` is missing, the server falls back to a generic prompt with no personal
information and logs a startup warning.

### **Environment Variables:**

- **`PORT`** - Server port (Render sets this automatically)
- **`GROQ_API_KEY`** - Your Groq API key for AI functionality
- **`GROQ_MODEL`** - Groq model ID (optional, defaults to `openai/gpt-oss-120b`)
- **`FRONTEND_URL`** - Frontend domain for CORS (e.g., https://your-portfolio.com)
- **`CHAT_RATE_LIMIT`** - Max chat requests per window per IP (optional, default `20`)
- **`CHAT_RATE_WINDOW_MS`** - Rate-limit window in milliseconds (optional, default `60000`)
- **`JSON_BODY_LIMIT`** - Max request body size (optional, default `16kb`)
- **`AI_SYSTEM_PROMPT`** - Full system prompt (required for the real assistant; keep it out of git)
- **`AI_CONTEXT`** - Optional extra context appended to the active prompt

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

The chat endpoint validates and bounds input, limits requests per IP, and never forwards
upstream provider errors to the browser.

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
   GROQ_MODEL=openai/gpt-oss-120b
   FRONTEND_URL=https://your-frontend-domain.com
   AI_SYSTEM_PROMPT=<paste the full prompt here>
   ```
   
   `AI_SYSTEM_PROMPT` is not committed to the repository, so personal details stay private.
   Paste the full prompt value into the Render dashboard.
**Note**: Render automatically sets the `PORT` environment variable, so you don't need to set it manually.

### Other Platforms

The server can also be deployed to:
- Railway
- Heroku  
- AWS ECS
- Google Cloud Run

**Note**: The `.env` file is only for local development. In production, set environment variables through your deployment platform's dashboard.
