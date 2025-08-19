import subprocess
import sys


def test_imports():
    subprocess.run(
        [
            sys.executable,
            "-c",
            "import scraper\nimport scraper.cli.scrape_all",
        ],
        check=True,
    )
