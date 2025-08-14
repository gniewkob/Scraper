#!/usr/bin/env python3
import subprocess
import time
import sys
import os
import signal

def start_backend():
    """Start the backend API server"""
    print("Starting backend API server on port 38273...")
    backend_process = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "backend.main:app", "--host", "127.0.0.1", "--port", "38273"],
        cwd="/usr/home/vetternkraft/apps/python/scraper_workspace"
    )
    return backend_process

def start_frontend():
    """Start the frontend server"""
    print("Starting frontend server on port 61973...")
    frontend_process = subprocess.Popen(
        [sys.executable, "frontend_server.py"],
        cwd="/usr/home/vetternkraft/apps/python/scraper_workspace"
    )
    return frontend_process

def main():
    backend_process = None
    frontend_process = None
    
    try:
        # Start backend
        backend_process = start_backend()
        time.sleep(3)  # Give backend time to start
        
        # Start frontend
        frontend_process = start_frontend()
        
        print("\n✅ Both services are running!")
        print("   Backend API: http://127.0.0.1:38273")
        print("   Frontend: http://127.0.0.1:61973")
        print("\nPress Ctrl+C to stop both services...\n")
        
        # Wait for processes
        while True:
            # Check if processes are still running
            if backend_process and backend_process.poll() is not None:
                print("Backend process died, restarting...")
                backend_process = start_backend()
                time.sleep(3)
                
            if frontend_process and frontend_process.poll() is not None:
                print("Frontend process died, restarting...")
                frontend_process = start_frontend()
                
            time.sleep(5)
            
    except KeyboardInterrupt:
        print("\n\nShutting down services...")
        
        # Terminate processes gracefully
        if backend_process:
            backend_process.terminate()
            backend_process.wait()
            print("Backend stopped")
            
        if frontend_process:
            frontend_process.terminate()
            frontend_process.wait()
            print("Frontend stopped")
            
        print("All services stopped.")
        sys.exit(0)

if __name__ == "__main__":
    main()
