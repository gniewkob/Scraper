import subprocess
from pathlib import Path


def render_app() -> str:
    frontend_dir = Path(__file__).resolve().parents[2] / "frontend"
    script = (
        "import React from 'react';"
        "globalThis.React = React;"
        "import ReactDOMServer from 'react-dom/server';"
        "import App from './src/App.tsx';"
        "console.log(ReactDOMServer.renderToString(React.createElement(App)));"
    )
    result = subprocess.run(
        ["npx", "--yes", "tsx", "-e", script],
        capture_output=True,
        text=True,
        check=True,
        cwd=frontend_dir,
    )
    return result.stdout.strip()


def test_no_map():
    html = render_app()
    assert 'id="map"' not in html
    snapshot_file = Path(__file__).with_suffix('.snap')
    if snapshot_file.exists():
        assert html == snapshot_file.read_text()
    else:
        snapshot_file.write_text(html)
