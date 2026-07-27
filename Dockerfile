FROM node:22

WORKDIR /app

# Copy package files
COPY package.json ./

# Install root dependencies and sirv-cli for static serving
RUN npm install -g sirv-cli && npm install

# Copy all source code
COPY . .

# Install workspace dependencies
RUN npm install --workspace=apps/docs

# Build the documentation
RUN npm run build --workspace=apps/docs

# Expose port
EXPOSE 3000

# Start static server
CMD ["sirv", "dist", "--port", "3000", "--host", "0.0.0.0", "--cors"]