# Use official Node.js image as the build stage
FROM node:20-alpine as builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production image, copy built assets from builder
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["node", "dist/main"]