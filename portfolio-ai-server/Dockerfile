# Backend Dockerfile for portfolio-ai-server
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

ENV PORT=
ENV GROQ_API_KEY=
ENV AI_SYSTEM_PROMPT=
ENV FRONTEND_URL=

EXPOSE 3001

CMD ["node", "server.js"] 