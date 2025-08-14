#!/bin/bash

# Kolory dla lepszej czytelności
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Konfiguracja
BACKEND_PORT=38273
FRONTEND_PORT=61973
PROJECT_DIR="/usr/home/vetternkraft/apps/python/scraper_workspace"
BACKEND_LOG="$PROJECT_DIR/backend.log"
FRONTEND_LOG="$PROJECT_DIR/frontend.log"
PID_DIR="$PROJECT_DIR/.pids"

# Tworzenie katalogu na PID-y jeśli nie istnieje
mkdir -p "$PID_DIR"

# Funkcja do sprawdzania czy proces działa
check_process() {
    local pid_file=$1
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p "$pid" > /dev/null 2>&1; then
            return 0
        fi
    fi
    return 1
}

# Funkcja do zabijania procesu
kill_process() {
    local pid_file=$1
    local name=$2
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p "$pid" > /dev/null 2>&1; then
            echo -e "${YELLOW}Zatrzymywanie $name (PID: $pid)...${NC}"
            kill "$pid" 2>/dev/null
            sleep 2
            
            # Jeśli nadal działa, użyj SIGKILL
            if ps -p "$pid" > /dev/null 2>&1; then
                echo -e "${YELLOW}Wymuszanie zatrzymania $name...${NC}"
                kill -9 "$pid" 2>/dev/null
            fi
            rm -f "$pid_file"
            echo -e "${GREEN}$name zatrzymany${NC}"
        else
            echo -e "${YELLOW}$name nie działa (stary PID: $pid)${NC}"
            rm -f "$pid_file"
        fi
    else
        echo -e "${YELLOW}$name nie jest uruchomiony${NC}"
    fi
}

# Funkcja startująca backend
start_backend() {
    if check_process "$PID_DIR/backend.pid"; then
        echo -e "${YELLOW}Backend już działa${NC}"
        return
    fi
    
    echo -e "${GREEN}Uruchamianie backend na porcie $BACKEND_PORT...${NC}"
    cd "$PROJECT_DIR"
    
    # Ładowanie zmiennych środowiskowych
    export $(cat .env | grep -v '^#' | xargs)
    
    # Uruchomienie uvicorn w tle
    nohup uvicorn backend.main:app \
        --host 0.0.0.0 \
        --port $BACKEND_PORT \
        > "$BACKEND_LOG" 2>&1 &
    
    local pid=$!
    echo $pid > "$PID_DIR/backend.pid"
    
    # Czekanie na uruchomienie
    sleep 3
    
    # Sprawdzenie czy działa
    if curl -s "http://127.0.0.1:$BACKEND_PORT/health" > /dev/null; then
        echo -e "${GREEN}Backend uruchomiony pomyślnie (PID: $pid)${NC}"
        echo -e "Logi: $BACKEND_LOG"
    else
        echo -e "${RED}Backend nie odpowiada - sprawdź logi: $BACKEND_LOG${NC}"
        tail -20 "$BACKEND_LOG"
    fi
}

# Funkcja startująca frontend
start_frontend() {
    if check_process "$PID_DIR/frontend.pid"; then
        echo -e "${YELLOW}Frontend już działa${NC}"
        return
    fi
    
    echo -e "${GREEN}Uruchamianie frontend na porcie $FRONTEND_PORT...${NC}"
    cd "$PROJECT_DIR"
    
    # Upewnienie się że .env wskazuje na właściwy backend
    echo "VITE_API_URL=http://127.0.0.1:$BACKEND_PORT" > .env
    
    # Uruchomienie Vite w tle
    nohup npm run dev -- --port $FRONTEND_PORT --hostname 0.0.0.0 \
        > "$FRONTEND_LOG" 2>&1 &
    
    local pid=$!
    echo $pid > "$PID_DIR/frontend.pid"
    
    # Czekanie na uruchomienie
    sleep 3
    
    # Sprawdzenie czy działa
    if curl -s "http://127.0.0.1:$FRONTEND_PORT" > /dev/null; then
        echo -e "${GREEN}Frontend uruchomiony pomyślnie (PID: $pid)${NC}"
        echo -e "Dostępny pod: http://127.0.0.1:$FRONTEND_PORT lub http://smart.bodora.pl:$FRONTEND_PORT"
        echo -e "Logi: $FRONTEND_LOG"
    else
        echo -e "${RED}Frontend nie odpowiada - sprawdź logi: $FRONTEND_LOG${NC}"
        tail -20 "$FRONTEND_LOG"
    fi
}

# Funkcja zatrzymująca backend
stop_backend() {
    kill_process "$PID_DIR/backend.pid" "Backend"
}

# Funkcja zatrzymująca frontend
stop_frontend() {
    kill_process "$PID_DIR/frontend.pid" "Frontend"
}

# Funkcja pokazująca status
show_status() {
    echo -e "\n${YELLOW}=== STATUS APLIKACJI ===${NC}\n"
    
    # Backend status
    if check_process "$PID_DIR/backend.pid"; then
        local pid=$(cat "$PID_DIR/backend.pid")
        echo -e "${GREEN}✓ Backend${NC} działa (PID: $pid) na porcie $BACKEND_PORT"
        
        # Test API
        if curl -s "http://127.0.0.1:$BACKEND_PORT/health" > /dev/null; then
            echo -e "  API odpowiada: ${GREEN}OK${NC}"
        else
            echo -e "  API odpowiada: ${RED}BŁĄD${NC}"
        fi
    else
        echo -e "${RED}✗ Backend${NC} nie działa"
    fi
    
    # Frontend status
    if check_process "$PID_DIR/frontend.pid"; then
        local pid=$(cat "$PID_DIR/frontend.pid")
        echo -e "${GREEN}✓ Frontend${NC} działa (PID: $pid) na porcie $FRONTEND_PORT"
        echo -e "  URL: http://127.0.0.1:$FRONTEND_PORT"
        echo -e "  URL: http://smart.bodora.pl:$FRONTEND_PORT"
    else
        echo -e "${RED}✗ Frontend${NC} nie działa"
    fi
    
    echo ""
}

# Funkcja pokazująca logi
show_logs() {
    local service=$1
    local lines=${2:-50}
    
    case $service in
        backend)
            echo -e "${YELLOW}=== Ostatnie $lines linii logów Backend ===${NC}"
            tail -$lines "$BACKEND_LOG"
            ;;
        frontend)
            echo -e "${YELLOW}=== Ostatnie $lines linii logów Frontend ===${NC}"
            tail -$lines "$FRONTEND_LOG"
            ;;
        all)
            show_logs backend $lines
            echo ""
            show_logs frontend $lines
            ;;
        *)
            echo -e "${RED}Nieznany serwis: $service${NC}"
            echo "Użyj: backend, frontend lub all"
            ;;
    esac
}

# Funkcja restartująca serwis
restart_service() {
    local service=$1
    
    case $service in
        backend)
            stop_backend
            sleep 1
            start_backend
            ;;
        frontend)
            stop_frontend
            sleep 1
            start_frontend
            ;;
        all)
            stop_backend
            stop_frontend
            sleep 1
            start_backend
            start_frontend
            ;;
        *)
            echo -e "${RED}Nieznany serwis: $service${NC}"
            echo "Użyj: backend, frontend lub all"
            ;;
    esac
}

# Menu pomocy
show_help() {
    echo "Użycie: $0 [KOMENDA] [OPCJE]"
    echo ""
    echo "KOMENDY:"
    echo "  start [backend|frontend|all]  - Uruchamia serwisy (domyślnie: all)"
    echo "  stop [backend|frontend|all]   - Zatrzymuje serwisy (domyślnie: all)"
    echo "  restart [backend|frontend|all] - Restartuje serwisy (domyślnie: all)"
    echo "  status                         - Pokazuje status serwisów"
    echo "  logs [backend|frontend|all] [n] - Pokazuje ostatnie n linii logów (domyślnie: 50)"
    echo "  help                          - Pokazuje tę pomoc"
    echo ""
    echo "PRZYKŁADY:"
    echo "  $0 start              # Uruchamia backend i frontend"
    echo "  $0 stop backend       # Zatrzymuje tylko backend"
    echo "  $0 restart frontend   # Restartuje tylko frontend"
    echo "  $0 logs backend 100   # Pokazuje 100 ostatnich linii logów backendu"
    echo "  $0 status            # Pokazuje status wszystkich serwisów"
}

# Główna logika skryptu
case "$1" in
    start)
        service=${2:-all}
        case $service in
            backend)
                start_backend
                ;;
            frontend)
                start_frontend
                ;;
            all)
                start_backend
                start_frontend
                ;;
            *)
                echo -e "${RED}Nieznany serwis: $service${NC}"
                show_help
                ;;
        esac
        show_status
        ;;
        
    stop)
        service=${2:-all}
        case $service in
            backend)
                stop_backend
                ;;
            frontend)
                stop_frontend
                ;;
            all)
                stop_backend
                stop_frontend
                ;;
            *)
                echo -e "${RED}Nieznany serwis: $service${NC}"
                show_help
                ;;
        esac
        ;;
        
    restart)
        service=${2:-all}
        restart_service $service
        show_status
        ;;
        
    status)
        show_status
        ;;
        
    logs)
        service=${2:-all}
        lines=${3:-50}
        show_logs $service $lines
        ;;
        
    help|--help|-h)
        show_help
        ;;
        
    *)
        echo -e "${RED}Nieznana komenda: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac
