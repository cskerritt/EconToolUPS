#!/bin/bash
# Setup script for But-For Damages Analyzer

echo "========================================="
echo "But-For Damages Analyzer - Setup"
echo "========================================="
echo ""

# Check Python version
echo "Checking Python version..."
python3 --version

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo ""
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo ""
echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo ""
echo "Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo ""
echo "Installing dependencies..."
pip install -r requirements.txt

# Create data directory
echo ""
echo "Creating data directory..."
mkdir -p data

# Initialize database
echo ""
echo "Initializing database..."
cd backend
python3 -c "
from app import create_app
from models import db

app = create_app('development')
with app.app_context():
    db.create_all()
    print('Database initialized successfully!')
"
cd ..

echo ""
echo "========================================="
echo "Setup complete!"
echo "========================================="
echo ""
echo "To start the application, run:"
echo "  ./run.sh"
echo ""
