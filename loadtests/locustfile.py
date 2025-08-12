from locust import HttpUser, task, between
from gevent import spawn, joinall

class APIUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def products_and_alert(self):
        """Fetch products and register an alert in parallel."""
        joinall([
            spawn(self.client.get, "/api/products"),
            spawn(
                self.client.post,
                "/api/alerts/register",
                json={"product_id": 1, "email": "test@example.com"},
            ),
        ])
