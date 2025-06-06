#!/bin/bash

# Function to display messages with color
function echo_info {
  echo -e "\033[1;34m$1\033[0m"
}

function echo_success {
  echo -e "\033[1;32m$1\033[0m"
}

function echo_error {
  echo -e "\033[1;31m$1\033[0m"
}

# Navigate to the project directory
cd "$(dirname "$0")"

echo_info "🚀 Setting up DecentSocial platform..."

# Create .env files if they don't exist
if [ ! -f "./backend/.env" ]; then
  echo_info "📝 Creating backend .env file..."
  cat > ./backend/.env << EOF
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=decentralized_social
DB_SYNC=true

# API Configuration
PORT=3001
FRONTEND_URL=http://localhost:3000
EOF
  echo_success "✅ Backend .env file created"
fi

if [ ! -f "./frontend/.env.local" ]; then
  echo_info "📝 Creating frontend .env.local file..."
  cat > ./frontend/.env.local << EOF
# Application URLs
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Web3 Configuration
NEXT_PUBLIC_CHAIN_ID=1
NEXT_PUBLIC_NETWORK=mainnet
EOF
  echo_success "✅ Frontend .env.local file created"
fi

# Install dependencies for backend
echo_info "📦 Installing backend dependencies..."
cd ./backend
npm install
if [ $? -ne 0 ]; then
  echo_error "❌ Failed to install backend dependencies"
  exit 1
fi
echo_success "✅ Backend dependencies installed"

# Install dependencies for frontend
echo_info "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
  echo_error "❌ Failed to install frontend dependencies"
  exit 1
fi
echo_success "✅ Frontend dependencies installed"

cd ..

# Show next steps
echo_success "
🎉 Setup completed successfully!

To start the application:

1. Start the PostgreSQL database:
   - Make sure PostgreSQL is installed and running
   - Create a database named 'decentralized_social'
   
2. Start the backend:
   cd backend
   npm run start:dev

3. Start the frontend in another terminal:
   cd frontend
   npm run dev

4. Open http://localhost:3000 in your browser

Alternatively, use Docker Compose:
   docker-compose up
"
