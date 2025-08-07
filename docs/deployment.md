# Deployment and Scaling Guide

This document describes how to deploy the backend API and the scraper worker
as independent services that communicate through a shared database and Celery
broker.  The examples use Kubernetes but the same approach works for any
orchestrator.

## MyDevil bare repository deployment

For simple deployments on a MyDevil server the project is deployed by pushing
to a bare Git repository that checks out the code and restarts the containers.

1. SSH into the server and create the bare repository with a `post-receive`
   hook:

   ```bash
   mkdir -p ~/app.git
   cd ~/app.git
   git init --bare
   cat > hooks/post-receive <<'EOF'
   #!/bin/sh
   git --work-tree=/path/to/app checkout -f
   cd /path/to/app
   docker compose pull
   docker compose up -d
   EOF
   chmod +x hooks/post-receive
   ```

2. Add an SSH key with access to this repository in the GitHub project and set
   the `DEPLOY_REPO` secret to the repository's SSH URL
   (for example, `user@server:~/app.git`).

3. The deployment workflow pushes to this bare repository. The `post-receive`
   hook automatically checks out the latest code and runs `docker compose pull`
   followed by `docker compose up -d` to update the running containers.

## Prerequisites

- A PostgreSQL instance reachable by both services.  Cloud offerings such as
  **AWS RDS** work well.  Set the connection string via `DB_URL`, e.g.:
  ```bash
  DB_URL=postgresql://user:pass@your-rds-instance:5432/pharmacy
  ```
- A message broker for Celery.  Redis is used in the examples below and can be
  provided by services like AWS ElastiCache.

## Kubernetes example

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: your-registry/backend:latest
        env:
        - name: DB_URL
          value: postgresql://user:pass@db:5432/pharmacy
        - name: CELERY_BROKER_URL
          value: redis://redis:6379/0
        ports:
        - containerPort: 8000
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: scraper
spec:
  replicas: 1
  selector:
    matchLabels:
      app: scraper
  template:
    metadata:
      labels:
        app: scraper
    spec:
      containers:
      - name: scraper
        image: your-registry/scraper:latest
        env:
        - name: DB_URL
          value: postgresql://user:pass@db:5432/pharmacy
        - name: CELERY_BROKER_URL
          value: redis://redis:6379/0
```

Create a `Service` for the backend to expose the API:

```
apiVersion: v1
kind: Service
metadata:
  name: backend
spec:
  selector:
    app: backend
  ports:
  - port: 80
    targetPort: 8000
    protocol: TCP
```

Scale the deployments independently depending on load:

```bash
kubectl scale deployment backend --replicas=4
kubectl scale deployment scraper --replicas=3
```

The scraper deployments run the Celery worker defined in
`scraper/worker.py` and process tasks enqueued by the backend or any
other producer.
