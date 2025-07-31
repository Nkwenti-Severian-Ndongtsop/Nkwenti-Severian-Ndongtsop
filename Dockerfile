# Frontend Dockerfile for Vite React app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

ENV VITE_AI_SERVER_URL=


# Production image
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY public/env.js /usr/share/nginx/html/env.js
COPY set-env.sh /set-env.sh
RUN chmod +x /set-env.sh
EXPOSE 80
CMD ["/set-env.sh"] 