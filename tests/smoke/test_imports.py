import subprocess

def test_imports():
    subprocess.run(
        ["python", "-c", "import scraper;import scraper.cli.scrape_all"],
        check=True,
    )
