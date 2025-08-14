# Frontend Dockerfile for Vite React app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Production image
FROM nginx:alpine

# Production image

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]