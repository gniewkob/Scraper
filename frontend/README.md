# Frontend

React + TypeScript + Vite interface for the price dashboard.

## Environment

API requests use the `VITE_API_URL` variable as a prefix. When not set, requests fall back to relative paths.

## Development

```bash
VITE_API_URL=http://localhost:8000 npm --prefix frontend run dev
```

## Build

Pass the API host when building to bake it into the bundle:

```bash
VITE_API_URL=https://api.example.com npm --prefix frontend run build
```

The compiled assets are generated in `backend/static/`.

