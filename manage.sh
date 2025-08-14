#!/bin/bash

# Kolory dla lepszej czytelności
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Ścieżki
WORKSPACE_DIR="/usr/home/vetternkraft/apps/python/scraper_workspace"
BACKEND_LOG="$WORKSPACE_DIR/backend.log"
FRONTEND_LOG="$WORKSPACE_DIR/frontend_server.log"
BACKEND_PID_FILE="$WORKSPACE_DIR/backend.pid"
FRONTEND_PID_FILE="$WORKSPACE_DIR/frontend.pid"

# Porty
BACKEND_PORT=38273
FRONTEND_PORT=61973

# Funkcja do sprawdzania czy proces działa
is_running() {
    if [ -f "$1" ]; then
        pid=$(cat "$1")
        if ps -p "$pid" > /dev/null 2>&1; then
            return 0
        else
            rm -f "$1"
            return 1
        fi
    fi
    return 1
}

# Funkcja do sprawdzania portu
check_port() {
    netstat -an | grep -q ":$1.*LISTEN"
    return $?
}

# Start backend
start_backend() {
    echo -e "${YELLOW}Starting backend API server...${NC}"
    
    if is_running "$BACKEND_PID_FILE"; then
        echo -e "${YELLOW}Backend is already running (PID: $(cat $BACKEND_PID_FILE))${NC}"
        return 0
    fi
    
    # Sprawdź czy port jest zajęty
    if check_port $BACKEND_PORT; then
        echo -e "${RED}Port $BACKEND_PORT is already in use!${NC}"
        echo "Trying to kill process using port $BACKEND_PORT..."
        pid=$(sockstat -l | grep ":$BACKEND_PORT" | awk '{print $3}')
        if [ ! -z "$pid" ]; then
            kill -9 $pid 2>/dev/null
            sleep 2
        fi
    fi
    
    cd "$WORKSPACE_DIR"
    nohup python -m uvicorn backend.main:app --host 127.0.0.1 --port $BACKEND_PORT > "$BACKEND_LOG" 2>&1 &
    echo $! > "$BACKEND_PID_FILE"
    
    sleep 3
    
    if is_running "$BACKEND_PID_FILE"; then
        echo -e "${GREEN}✓ Backend started successfully (PID: $(cat $BACKEND_PID_FILE))${NC}"
        echo -e "   URL: http://127.0.0.1:$BACKEND_PORT"
    else
        echo -e "${RED}✗ Failed to start backend${NC}"
        return 1
    fi
}

# Start frontend
start_frontend() {
    echo -e "${YELLOW}Starting frontend server...${NC}"
    
    if is_running "$FRONTEND_PID_FILE"; then
        echo -e "${YELLOW}Frontend is already running (PID: $(cat $FRONTEND_PID_FILE))${NC}"
        return 0
    fi
    
    # Sprawdź czy port jest zajęty
    if check_port $FRONTEND_PORT; then
        echo -e "${RED}Port $FRONTEND_PORT is already in use!${NC}"
        echo "Trying to kill process using port $FRONTEND_PORT..."
        pid=$(sockstat -l | grep ":$FRONTEND_PORT" | awk '{print $3}')
        if [ ! -z "$pid" ]; then
            kill -9 $pid 2>/dev/null
            sleep 2
        fi
    fi
    
    # Sprawdź czy frontend jest zbudowany
    if [ ! -d "$WORKSPACE_DIR/frontend/dist" ]; then
        echo -e "${YELLOW}Frontend not built. Building...${NC}"
        cd "$WORKSPACE_DIR/frontend"
        npm run build
        if [ $? -ne 0 ]; then
            echo -e "${RED}✗ Failed to build frontend${NC}"
            return 1
        fi
    fi
    
    cd "$WORKSPACE_DIR"
    nohup python frontend_server.py > "$FRONTEND_LOG" 2>&1 &
    echo $! > "$FRONTEND_PID_FILE"
    
    sleep 3
    
    if is_running "$FRONTEND_PID_FILE"; then
        echo -e "${GREEN}✓ Frontend started successfully (PID: $(cat $FRONTEND_PID_FILE))${NC}"
        echo -e "   URL: http://127.0.0.1:$FRONTEND_PORT"
    else
        echo -e "${RED}✗ Failed to start frontend${NC}"
        return 1
    fi
}

# Stop backend
stop_backend() {
    echo -e "${YELLOW}Stopping backend...${NC}"
    
    if is_running "$BACKEND_PID_FILE"; then
        pid=$(cat "$BACKEND_PID_FILE")
        kill $pid 2>/dev/null
        sleep 2
        
        # Force kill if still running
        if ps -p $pid > /dev/null 2>&1; then
            kill -9 $pid 2>/dev/null
        fi
        
        rm -f "$BACKEND_PID_FILE"
        echo -e "${GREEN}✓ Backend stopped${NC}"
    else
        echo -e "${YELLOW}Backend is not running${NC}"
    fi
    
    # Dodatkowo zabij procesy na porcie
    pid=$(sockstat -l | grep ":$BACKEND_PORT" | awk '{print $3}')
    if [ ! -z "$pid" ]; then
        kill -9 $pid 2>/dev/null
    fi
}

# Stop frontend
stop_frontend() {
    echo -e "${YELLOW}Stopping frontend...${NC}"
    
    if is_running "$FRONTEND_PID_FILE"; then
        pid=$(cat "$FRONTEND_PID_FILE")
        kill $pid 2>/dev/null
        sleep 2
        
        # Force kill if still running
        if ps -p $pid > /dev/null 2>&1; then
            kill -9 $pid 2>/dev/null
        fi
        
        rm -f "$FRONTEND_PID_FILE"
        echo -e "${GREEN}✓ Frontend stopped${NC}"
    else
        echo -e "${YELLOW}Frontend is not running${NC}"
    fi
    
    # Dodatkowo zabij procesy na porcie
    pid=$(sockstat -l | grep ":$FRONTEND_PORT" | awk '{print $3}')
    if [ ! -z "$pid" ]; then
        kill -9 $pid 2>/dev/null
    fi
}

# Status
status() {
    echo -e "${YELLOW}╔══════════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║        🌿 SERVICE STATUS 🌿          ║${NC}"
    echo -e "${YELLOW}╚══════════════════════════════════════╝${NC}"
    echo ""
    
    # Backend status
    if is_running "$BACKEND_PID_FILE"; then
        pid=$(cat "$BACKEND_PID_FILE")
        echo -e "${GREEN}✓ Backend (uvicorn):${NC} Running"
        echo -e "   PID: $pid"
        echo -e "   URL: http://127.0.0.1:$BACKEND_PORT"
        if check_port $BACKEND_PORT; then
            echo -e "   Port $BACKEND_PORT: ${GREEN}LISTENING${NC}"
        else
            echo -e "   Port $BACKEND_PORT: ${RED}NOT LISTENING${NC}"
        fi
    else
        echo -e "${RED}✗ Backend (uvicorn):${NC} Stopped"
        if check_port $BACKEND_PORT; then
            echo -e "   ${YELLOW}Warning: Port $BACKEND_PORT is in use by another process${NC}"
        fi
    fi
    
    echo ""
    
    # Frontend status
    if is_running "$FRONTEND_PID_FILE"; then
        pid=$(cat "$FRONTEND_PID_FILE")
        echo -e "${GREEN}✓ Frontend (uvicorn):${NC} Running"
        echo -e "   PID: $pid"
        echo -e "   URL: http://127.0.0.1:$FRONTEND_PORT"
        if check_port $FRONTEND_PORT; then
            echo -e "   Port $FRONTEND_PORT: ${GREEN}LISTENING${NC}"
        else
            echo -e "   Port $FRONTEND_PORT: ${RED}NOT LISTENING${NC}"
        fi
    else
        echo -e "${RED}✗ Frontend (uvicorn):${NC} Stopped"
        if check_port $FRONTEND_PORT; then
            echo -e "   ${YELLOW}Warning: Port $FRONTEND_PORT is in use by another process${NC}"
        fi
    fi
    
    echo ""
    echo -e "${YELLOW}────────────────────────────────────────${NC}"
    echo -e "${YELLOW}Port Usage Details:${NC}"
    echo ""
    echo "Backend port ($BACKEND_PORT):"
    sockstat -l | grep ":$BACKEND_PORT" || echo "  Not in use"
    echo ""
    echo "Frontend port ($FRONTEND_PORT):"
    sockstat -l | grep ":$FRONTEND_PORT" || echo "  Not in use"
}

# Logs
logs() {
    case "$1" in
        backend)
            echo -e "${YELLOW}╔══════════════════════════════════════╗${NC}"
            echo -e "${YELLOW}║      BACKEND LOGS (last 50)         ║${NC}"
            echo -e "${YELLOW}╚══════════════════════════════════════╝${NC}"
            tail -50 "$BACKEND_LOG"
            ;;
        frontend)
            echo -e "${YELLOW}╔══════════════════════════════════════╗${NC}"
            echo -e "${YELLOW}║     FRONTEND LOGS (last 50)         ║${NC}"
            echo -e "${YELLOW}╚══════════════════════════════════════╝${NC}"
            tail -50 "$FRONTEND_LOG"
            ;;
        *)
            echo -e "${YELLOW}╔══════════════════════════════════════╗${NC}"
            echo -e "${YELLOW}║      BACKEND LOGS (last 20)         ║${NC}"
            echo -e "${YELLOW}╚══════════════════════════════════════╝${NC}"
            tail -20 "$BACKEND_LOG"
            echo ""
            echo -e "${YELLOW}╔══════════════════════════════════════╗${NC}"
            echo -e "${YELLOW}║     FRONTEND LOGS (last 20)         ║${NC}"
            echo -e "${YELLOW}╚══════════════════════════════════════╝${NC}"
            tail -20 "$FRONTEND_LOG"
            ;;
    esac
}

# Build frontend
build() {
    echo -e "${YELLOW}Building frontend for production...${NC}"
    cd "$WORKSPACE_DIR/frontend"
    npm run build
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Frontend built successfully${NC}"
        echo -e "   Build output: $WORKSPACE_DIR/frontend/dist"
    else
        echo -e "${RED}✗ Build failed${NC}"
        return 1
    fi
}

# Clean logs and pid files
clean() {
    echo -e "${YELLOW}Cleaning logs and pid files...${NC}"
    rm -f "$BACKEND_LOG" "$FRONTEND_LOG" "$BACKEND_PID_FILE" "$FRONTEND_PID_FILE"
    echo -e "${GREEN}✓ Cleaned${NC}"
}

# Main menu
case "$1" in
    start)
        if [ "$2" = "backend" ]; then
            start_backend
        elif [ "$2" = "frontend" ]; then
            start_frontend
        else
            echo -e "${YELLOW}╔══════════════════════════════════════╗${NC}"
            echo -e "${YELLOW}║   🚀 STARTING ALL SERVICES 🚀       ║${NC}"
            echo -e "${YELLOW}╚══════════════════════════════════════╝${NC}"
            echo ""
            start_backend
            echo ""
            start_frontend
            echo ""
            echo -e "${GREEN}╔══════════════════════════════════════╗${NC}"
            echo -e "${GREEN}║    ✅ ALL SERVICES STARTED ✅       ║${NC}"
            echo -e "${GREEN}╚══════════════════════════════════════╝${NC}"
            echo ""
            echo -e "🌿 Backend API: http://127.0.0.1:$BACKEND_PORT"
            echo -e "🌿 Frontend: http://127.0.0.1:$FRONTEND_PORT"
        fi
        ;;
    stop)
        if [ "$2" = "backend" ]; then
            stop_backend
        elif [ "$2" = "frontend" ]; then
            stop_frontend
        else
            echo -e "${YELLOW}╔══════════════════════════════════════╗${NC}"
            echo -e "${YELLOW}║   🛑 STOPPING ALL SERVICES 🛑       ║${NC}"
            echo -e "${YELLOW}╚══════════════════════════════════════╝${NC}"
            echo ""
            stop_backend
            stop_frontend
            echo ""
            echo -e "${GREEN}╔══════════════════════════════════════╗${NC}"
            echo -e "${GREEN}║    ✅ ALL SERVICES STOPPED ✅       ║${NC}"
            echo -e "${GREEN}╚══════════════════════════════════════╝${NC}"
        fi
        ;;
    restart)
        if [ "$2" = "backend" ]; then
            stop_backend
            sleep 2
            start_backend
        elif [ "$2" = "frontend" ]; then
            stop_frontend
            sleep 2
            start_frontend
        else
            echo -e "${YELLOW}╔══════════════════════════════════════╗${NC}"
            echo -e "${YELLOW}║   🔄 RESTARTING ALL SERVICES 🔄     ║${NC}"
            echo -e "${YELLOW}╚══════════════════════════════════════╝${NC}"
            echo ""
            stop_backend
            stop_frontend
            sleep 2
            start_backend
            echo ""
            start_frontend
            echo ""
            echo -e "${GREEN}╔══════════════════════════════════════╗${NC}"
            echo -e "${GREEN}║   ✅ ALL SERVICES RESTARTED ✅      ║${NC}"
            echo -e "${GREEN}╚══════════════════════════════════════╝${NC}"
        fi
        ;;
    status)
        status
        ;;
    logs)
        logs "$2"
        ;;
    build)
        build
        ;;
    clean)
        clean
        ;;
    help|--help|-h)
        echo -e "${YELLOW}╔══════════════════════════════════════════════════════╗${NC}"
        echo -e "${YELLOW}║     🌿 Cannabis Price Comparison Manager 🌿         ║${NC}"
        echo -e "${YELLOW}╚══════════════════════════════════════════════════════╝${NC}"
        echo ""
        echo "Usage: $0 {start|stop|restart|status|logs|build|clean|help} [service]"
        echo ""
        echo "Commands:"
        echo "  start [backend|frontend]  - Start service(s) with uvicorn"
        echo "  stop [backend|frontend]   - Stop service(s)"
        echo "  restart [backend|frontend]- Restart service(s)"
        echo "  status                    - Show status of all services"
        echo "  logs [backend|frontend]   - Show logs (default: both)"
        echo "  build                     - Build frontend for production"
        echo "  clean                     - Remove logs and pid files"
        echo "  help                      - Show this help message"
        echo ""
        echo "Services:"
        echo "  Backend:  FastAPI/uvicorn on port $BACKEND_PORT"
        echo "  Frontend: FastAPI/uvicorn on port $FRONTEND_PORT"
        echo ""
        echo "Examples:"
        echo "  $0 start              # Start all services"
        echo "  $0 start backend      # Start only backend"
        echo "  $0 logs frontend      # Show frontend logs"
        echo "  $0 status             # Check status of all services"
        echo ""
        echo "Note: Both backend and frontend are served with uvicorn (Python)"
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|logs|build|clean|help} [service]"
        echo "Run '$0 help' for more information"
        exit 1
        ;;
esac
