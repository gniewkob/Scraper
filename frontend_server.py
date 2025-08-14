import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn
from pathlib import Path
import httpx
import asyncio

app = FastAPI()

# Get the directory where this script is located
BASE_DIR = Path(__file__).resolve().parent
FRONTEND_BUILD_DIR = BASE_DIR / "frontend" / "dist"

# Backend API URL
BACKEND_URL = "http://127.0.0.1:38273"

# Proxy to backend API
@app.api_route("/api-backend/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"])
async def proxy_to_backend(path: str, request: Request):
    """Proxy requests to the backend API"""
    async with httpx.AsyncClient() as client:
        # Build the backend URL
        url = f"{BACKEND_URL}/{path}"
        
        # Get query parameters
        query_params = dict(request.query_params)
        
        # Get request body if present
        body = None
        if request.method in ["POST", "PUT", "PATCH"]:
            try:
                body = await request.body()
            except:
                pass
        
        # Forward the request to the backend
        try:
            response = await client.request(
                method=request.method,
                url=url,
                params=query_params,
                content=body,
                headers={
                    "Content-Type": request.headers.get("Content-Type", "application/json")
                }
            )
            
            # Return the response from the backend
            return response.json() if response.headers.get("content-type", "").startswith("application/json") else response.text
        except httpx.ConnectError:
            raise HTTPException(status_code=503, detail="Backend service unavailable")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

# Serve static files from the build directory
if FRONTEND_BUILD_DIR.exists():
    app.mount("/assets", StaticFiles(directory=str(FRONTEND_BUILD_DIR / "assets")), name="assets")
    
    # Catch-all route to serve index.html for client-side routing
    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        # Check if the requested path is for an asset or API
        if full_path.startswith("assets/") or full_path.startswith("api-backend/"):
            raise HTTPException(status_code=404, detail="Not found")
        
        # Always return index.html for non-asset paths
        index_path = FRONTEND_BUILD_DIR / "index.html"
        if index_path.exists():
            return FileResponse(str(index_path))
        else:
            raise HTTPException(status_code=404, detail="Frontend not built")
else:
    @app.get("/")
    async def root():
        return {"error": "Frontend build directory not found. Please build the frontend first."}

if __name__ == "__main__":
    print(f"Starting frontend server with backend proxy...")
    print(f"Serving frontend from: {FRONTEND_BUILD_DIR}")
    print(f"Proxying API requests to: {BACKEND_URL}")
    uvicorn.run(app, host="127.0.0.1", port=61973)
