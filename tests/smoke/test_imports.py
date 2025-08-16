import subprocess
import sys


def test_imports():
    subprocess.run(
        [sys.executable, "-c", "import scraper;import scraper.cli.scrape_all"],
        check=True,
    )
