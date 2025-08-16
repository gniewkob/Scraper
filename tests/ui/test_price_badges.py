import re
import os
import subprocess
from pathlib import Path


def render_app() -> str:
    frontend_dir = Path(__file__).resolve().parents[2] / "frontend"
    script = (
        "import React from 'react';"
        "import ReactDOMServer from 'react-dom/server';"
        "import App from './src/App.tsx';"
        "const offers=[{price:10,price_bucket:'super_okazja',is_historical_low:true},{price:25,price_bucket:'okazja',is_historical_low:false},{price:40,price_bucket:'normalna',is_historical_low:false}];"
        "console.log(ReactDOMServer.renderToString(React.createElement(App,{offers})));"
    )
    result = subprocess.run(
        ["npx", "--yes", "tsx", "-e", script],
        capture_output=True,
        text=True,
        check=True,
        cwd=frontend_dir,
        env={**os.environ, "VITE_API_URL": ""},
    )
    return result.stdout.strip()


def test_price_badges_labels():
    html = render_app()
    # Extract inner HTML of the first <ul> and then capture text nodes (robust to attribute changes)
    ul_match = re.search(r"<ul>(.*?)</ul>", html, re.S)
    assert ul_match is not None, "No <ul> found in rendered output"
    inner = ul_match.group(1)
    labels = [s.strip() for s in re.findall(r">([^<]+)<", inner) if s.strip()]
    assert labels == ['🔥', '💰', '😐']
