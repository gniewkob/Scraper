# Load Tests

This directory contains a basic [Locust](https://locust.io/) scenario that exercises the
`GET /api/products` and `POST /api/alerts/register` endpoints in parallel.

## Running

```
locust -f loadtests/locustfile.py --headless -u 10 -r 10 -t 10s --host http://localhost:8000
```

Adjust the host to point at a running instance of the application.

## Results

See [results.md](results.md) for a sample run.
