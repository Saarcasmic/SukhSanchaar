#!/bin/bash

# SukhSanchaar Backend Setup Script
echo "🚀 Setting up SukhSanchaar Backend API..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created. Please update it with your actual values."
else
    echo "✅ .env file already exists"
fi

# Create dist directory for build
mkdir -p dist

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update the .env file with your actual Supabase and Razorpay credentials"
echo "2. Set up your Supabase database with the provided SQL schema"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "📚 Check README.md for detailed setup instructions and API documentation"
echo ""
echo "Happy coding! 🚀"
