#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Base directory
BASE_DIR="/Users/suraj/Documents/Office Internal Project/backend"

# Function to display menu
show_menu() {
    clear
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}    Backend Services Manager${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
    echo -e "${YELLOW}0)${NC} Initialize Database (First Time Setup)"
    echo -e "${GREEN}1)${NC} Start All Services (Development Mode)"
    echo -e "${GREEN}2)${NC} Stop All Services (Development Mode)"
    echo -e "${GREEN}3)${NC} Start with Docker Compose (Production Mode)"
    echo -e "${GREEN}4)${NC} Stop Docker Compose"
    echo -e "${GREEN}5)${NC} View Docker Logs"
    echo -e "${GREEN}6)${NC} Rebuild and Start Docker Services"
    echo -e "${GREEN}7)${NC} Check Services Status"
    echo -e "${RED}8)${NC} Exit"
    echo ""
    echo -e "${YELLOW}Enter your choice [0-8]:${NC} "
}

# Function to initialize database
init_database() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}    Database Initialization${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""

    # Check if MongoDB is running
    echo -e "${BLUE}Checking MongoDB...${NC}"
    if pgrep -x "mongod" > /dev/null; then
        echo -e "${GREEN}✓ MongoDB is running${NC}"
    else
        echo -e "${RED}✗ MongoDB is NOT running!${NC}"
        echo -e "${YELLOW}Please start MongoDB first:${NC}"
        echo -e "${YELLOW}  brew services start mongodb-community${NC}"
        echo ""
        read -p "Press Enter to exit..."
        return
    fi

    echo ""
    echo -e "${YELLOW}This will create:${NC}"
    echo -e "  • Superadmin Role with full permissions"
    echo -e "  • 3 Demo Users (sumit, support, tanshi)"
    echo ""
    echo -e "${YELLOW}Continue? (y/n):${NC} "
    read -r confirm

    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        echo -e "${RED}Initialization cancelled.${NC}"
        echo ""
        read -p "Press Enter to continue..."
        return
    fi

    echo ""
    echo -e "${GREEN}Running initialization script...${NC}"
    echo ""

    cd "$BASE_DIR"
    npm run init

    echo ""
    read -p "Press Enter to continue..."
}

# Function to start development services
start_dev_services() {
    echo -e "${GREEN}Starting services in development mode...${NC}"
    echo ""
    
    # Check if MongoDB is running
    echo -e "${BLUE}Checking MongoDB...${NC}"
    if pgrep -x "mongod" > /dev/null; then
        echo -e "${GREEN}✓ MongoDB is already running${NC}"
    else
        echo -e "${YELLOW}⚠ MongoDB is not running. Please start MongoDB first.${NC}"
        echo -e "${YELLOW}  Run: brew services start mongodb-community${NC}"
        echo ""
        read -p "Press Enter to continue anyway..."
    fi
    
    echo ""
    echo -e "${BLUE}Starting General Service...${NC}"
    cd "$BASE_DIR/general-service"
    npm run start:dev > "$BASE_DIR/logs/general-service.log" 2>&1 &
    echo $! > "$BASE_DIR/pids/general-service.pid"
    echo -e "${GREEN}✓ General Service started (PID: $(cat $BASE_DIR/pids/general-service.pid))${NC}"
    
    sleep 2
    
    echo -e "${BLUE}Starting Finance Service...${NC}"
    cd "$BASE_DIR/finance-service"
    npm run start:dev > "$BASE_DIR/logs/finance-service.log" 2>&1 &
    echo $! > "$BASE_DIR/pids/finance-service.pid"
    echo -e "${GREEN}✓ Finance Service started (PID: $(cat $BASE_DIR/pids/finance-service.pid))${NC}"
    
    sleep 2
    
    echo -e "${BLUE}Starting API Gateway...${NC}"
    cd "$BASE_DIR/api-gateway"
    npm run start:dev > "$BASE_DIR/logs/api-gateway.log" 2>&1 &
    echo $! > "$BASE_DIR/pids/api-gateway.pid"
    echo -e "${GREEN}✓ API Gateway started (PID: $(cat $BASE_DIR/pids/api-gateway.pid))${NC}"
    
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}All services started successfully!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "${BLUE}API Gateway:${NC}      http://localhost:9000"
    echo -e "${BLUE}General Service:${NC}  http://localhost:9001"
    echo -e "${BLUE}Finance Service:${NC}  http://localhost:9002"
    echo ""
    echo -e "${YELLOW}Logs are available in: $BASE_DIR/logs/${NC}"
    echo ""
}

# Function to stop development services
stop_dev_services() {
    echo -e "${RED}Stopping all development services...${NC}"
    echo ""
    
    if [ -f "$BASE_DIR/pids/api-gateway.pid" ]; then
        PID=$(cat "$BASE_DIR/pids/api-gateway.pid")
        if kill -0 $PID 2>/dev/null; then
            kill $PID
            echo -e "${GREEN}✓ API Gateway stopped (PID: $PID)${NC}"
        fi
        rm "$BASE_DIR/pids/api-gateway.pid"
    fi
    
    if [ -f "$BASE_DIR/pids/finance-service.pid" ]; then
        PID=$(cat "$BASE_DIR/pids/finance-service.pid")
        if kill -0 $PID 2>/dev/null; then
            kill $PID
            echo -e "${GREEN}✓ Finance Service stopped (PID: $PID)${NC}"
        fi
        rm "$BASE_DIR/pids/finance-service.pid"
    fi
    
    if [ -f "$BASE_DIR/pids/general-service.pid" ]; then
        PID=$(cat "$BASE_DIR/pids/general-service.pid")
        if kill -0 $PID 2>/dev/null; then
            kill $PID
            echo -e "${GREEN}✓ General Service stopped (PID: $PID)${NC}"
        fi
        rm "$BASE_DIR/pids/general-service.pid"
    fi
    
    # Kill any remaining node processes on those ports
    lsof -ti:9000 | xargs kill -9 2>/dev/null
    lsof -ti:9001 | xargs kill -9 2>/dev/null
    lsof -ti:9002 | xargs kill -9 2>/dev/null
    
    echo ""
    echo -e "${GREEN}All services stopped.${NC}"
    echo ""
}

# Function to start docker services
start_docker_services() {
    echo -e "${GREEN}Starting services with Docker Compose...${NC}"
    cd "$BASE_DIR"
    docker-compose up -d
    echo ""
    echo -e "${GREEN}Docker services started!${NC}"
    echo ""
    docker-compose ps
    echo ""
}

# Function to stop docker services
stop_docker_services() {
    echo -e "${RED}Stopping Docker Compose services...${NC}"
    cd "$BASE_DIR"
    docker-compose down
    echo ""
    echo -e "${GREEN}Docker services stopped.${NC}"
    echo ""
}

# Function to view docker logs
view_docker_logs() {
    echo -e "${BLUE}Showing Docker logs (Press Ctrl+C to exit)...${NC}"
    cd "$BASE_DIR"
    docker-compose logs -f
}

# Function to rebuild docker services
rebuild_docker_services() {
    echo -e "${YELLOW}Rebuilding and starting Docker services...${NC}"
    cd "$BASE_DIR"
    docker-compose up -d --build
    echo ""
    echo -e "${GREEN}Docker services rebuilt and started!${NC}"
    echo ""
    docker-compose ps
    echo ""
}

# Function to check services status
check_status() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}    Services Status${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
    
    echo -e "${YELLOW}Development Services:${NC}"
    echo ""
    
    # Check API Gateway
    if [ -f "$BASE_DIR/pids/api-gateway.pid" ]; then
        PID=$(cat "$BASE_DIR/pids/api-gateway.pid")
        if kill -0 $PID 2>/dev/null; then
            echo -e "${GREEN}✓ API Gateway (Port 9000) - Running (PID: $PID)${NC}"
        else
            echo -e "${RED}✗ API Gateway (Port 9000) - Stopped${NC}"
        fi
    else
        echo -e "${RED}✗ API Gateway (Port 9000) - Stopped${NC}"
    fi
    
    # Check General Service
    if [ -f "$BASE_DIR/pids/general-service.pid" ]; then
        PID=$(cat "$BASE_DIR/pids/general-service.pid")
        if kill -0 $PID 2>/dev/null; then
            echo -e "${GREEN}✓ General Service (Port 9001) - Running (PID: $PID)${NC}"
        else
            echo -e "${RED}✗ General Service (Port 9001) - Stopped${NC}"
        fi
    else
        echo -e "${RED}✗ General Service (Port 9001) - Stopped${NC}"
    fi
    
    # Check Finance Service
    if [ -f "$BASE_DIR/pids/finance-service.pid" ]; then
        PID=$(cat "$BASE_DIR/pids/finance-service.pid")
        if kill -0 $PID 2>/dev/null; then
            echo -e "${GREEN}✓ Finance Service (Port 9002) - Running (PID: $PID)${NC}"
        else
            echo -e "${RED}✗ Finance Service (Port 9002) - Stopped${NC}"
        fi
    else
        echo -e "${RED}✗ Finance Service (Port 9002) - Stopped${NC}"
    fi
    
    echo ""
    echo -e "${YELLOW}Docker Services:${NC}"
    echo ""
    cd "$BASE_DIR"
    if command -v docker-compose &> /dev/null; then
        docker-compose ps
    else
        echo -e "${RED}Docker Compose not installed${NC}"
    fi
    
    echo ""
}

# Create necessary directories
mkdir -p "$BASE_DIR/pids"
mkdir -p "$BASE_DIR/logs"

# Main loop
while true; do
    show_menu
    read -r choice
    
    case $choice in
        0)
            init_database
            ;;
        1)
            start_dev_services
            read -p "Press Enter to continue..."
            ;;
        2)
            stop_dev_services
            read -p "Press Enter to continue..."
            ;;
        3)
            start_docker_services
            read -p "Press Enter to continue..."
            ;;
        4)
            stop_docker_services
            read -p "Press Enter to continue..."
            ;;
        5)
            view_docker_logs
            ;;
        6)
            rebuild_docker_services
            read -p "Press Enter to continue..."
            ;;
        7)
            check_status
            read -p "Press Enter to continue..."
            ;;
        8)
            echo -e "${GREEN}Goodbye!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option. Please try again.${NC}"
            sleep 2
            ;;
    esac
done
