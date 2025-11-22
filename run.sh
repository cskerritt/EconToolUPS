#!/bin/bash
# Run script for But-For Damages Analyzer

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}=========================================${NC}"
echo -e "${GREEN}But-For Damages Analyzer${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Virtual environment not found. Running setup..."
    ./setup.sh
fi

# Activate virtual environment
source venv/bin/activate

# Set environment variables
export FLASK_ENV=development
export FLASK_APP=backend/app.py
export PORT=5001

# Start the server
echo -e "${GREEN}Starting server...${NC}"
echo ""
echo "Application will be available at:"
echo -e "${BLUE}http://localhost:5001${NC}"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd backend
python3 app.py
