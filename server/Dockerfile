FROM node:20-alpine

WORKDIR /app

# Install dependencies first so this layer is cached unless package files change
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

# Run as the built-in non-root user
USER node

EXPOSE 8000

CMD ["node", "server.mjs"]
