FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install backend dependencies (including dev for build)
RUN npm install --legacy-peer-deps

# Copy client package files and install
COPY client/package*.json ./client/
RUN cd client && npm install --legacy-peer-deps

# Copy source files
COPY . .

# Create directories
RUN mkdir -p ./public ./data

# Build backend
RUN npm run build:tsc

# Build frontend
RUN cd client && npm run build && mv ./build/* ../public/

# Clean up source files and dev dependencies
RUN rm -rf src/ ./client \
    && npm prune --omit=dev

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "build/server.js"]
