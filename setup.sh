#!/bin/bash

# ==========================================
# MISSION BOARD - QUICK SETUP SCRIPT
# ==========================================
# This script helps you set up the mission board quickly
# Run: chmod +x setup.sh && ./setup.sh
# ==========================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}"
echo "╔═══════════════════════════════════════════════╗"
echo "║                                               ║"
echo "║        🎮 NEON RUNNER MISSION BOARD 🎮        ║"
echo "║            Quick Setup Script                 ║"
echo "║                                               ║"
echo "╚═══════════════════════════════════════════════╝"
echo -e "${NC}"

# Check Node.js
echo -e "${YELLOW}Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm found: $(npm --version)${NC}"

# Install dependencies
echo ""
echo -e "${YELLOW}Installing dependencies...${NC}"
if [ -f "package.json" ]; then
    npm install
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${RED}❌ package.json not found. Are you in the mission-board directory?${NC}"
    exit 1
fi

# Check for .env.local
echo ""
echo -e "${YELLOW}Checking environment configuration...${NC}"
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local not found${NC}"
    
    if [ -f ".env.local.example" ]; then
        echo -e "${CYAN}Creating .env.local from example...${NC}"
        cp .env.local.example .env.local
        echo -e "${GREEN}✓ .env.local created${NC}"
    fi
    
    echo ""
    echo -e "${RED}⚠️  IMPORTANT: You need to configure Supabase!${NC}"
    echo ""
    echo "Please follow these steps:"
    echo "1. Go to https://supabase.com and create a project"
    echo "2. Get your Project URL and anon key from Settings > API"
    echo "3. Edit .env.local and add your credentials"
    echo "4. Run the database setup SQL (see SUPABASE_SETUP.md)"
    echo ""
    
    read -p "Press Enter to open .env.local for editing (Ctrl+C to skip)..."
    ${EDITOR:-nano} .env.local || true
else
    echo -e "${GREEN}✓ .env.local exists${NC}"
    
    # Check if it's configured
    if grep -q "your-supabase-url" .env.local; then
        echo -e "${YELLOW}⚠️  .env.local appears to be unconfigured${NC}"
        echo "Please add your Supabase credentials to .env.local"
        read -p "Edit now? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            ${EDITOR:-nano} .env.local
        fi
    else
        echo -e "${GREEN}✓ .env.local appears configured${NC}"
    fi
fi

# Offer to show documentation
echo ""
echo -e "${CYAN}Documentation files available:${NC}"
echo "  📖 README.md - Complete documentation"
echo "  🗄️  SUPABASE_SETUP.md - Database setup guide"
echo "  🎓 WORKSHOP_GUIDE.md - Workshop day checklist"
echo "  👥 student-guide.html - Student reference (open in browser)"
echo "  📁 PROJECT_STRUCTURE.md - File structure overview"
echo ""

read -p "View Supabase setup guide now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v less &> /dev/null; then
        less SUPABASE_SETUP.md
    else
        cat SUPABASE_SETUP.md
    fi
fi

# Summary
echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║              Setup Status                     ║${NC}"
echo -e "${CYAN}╔═══════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}✓ Dependencies installed${NC}"

if [ -f ".env.local" ]; then
    if grep -q "your-supabase-url" .env.local; then
        echo -e "${YELLOW}⚠ Supabase needs configuration${NC}"
    else
        echo -e "${GREEN}✓ Environment configured${NC}"
    fi
else
    echo -e "${RED}✗ Environment needs setup${NC}"
fi

echo ""
echo -e "${CYAN}Next steps:${NC}"
echo "1. ${YELLOW}Set up Supabase:${NC} Follow SUPABASE_SETUP.md"
echo "2. ${YELLOW}Configure .env.local:${NC} Add your Supabase credentials"
echo "3. ${YELLOW}Start dev server:${NC} npm run dev"
echo "4. ${YELLOW}Open browser:${NC} http://localhost:3000"
echo ""

read -p "Start development server now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${GREEN}Starting development server...${NC}"
    echo -e "${CYAN}Press Ctrl+C to stop${NC}"
    echo ""
    npm run dev
else
    echo ""
    echo -e "${GREEN}Setup complete!${NC}"
    echo "Run ${CYAN}npm run dev${NC} when you're ready to start"
    echo ""
fi
