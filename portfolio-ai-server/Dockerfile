# Backend Dockerfile for portfolio-ai-server
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3001

CMD ["node", "server.js"] 