import re
import subprocess
from pathlib import Path


def render_app() -> str:
    frontend_dir = Path(__file__).resolve().parents[2] / "frontend"
    script = (
        "import React from 'react';"
        "globalThis.React = React;"
        "import ReactDOMServer from 'react-dom/server';"
        "import App from './src/App.tsx';"
        "const offers=[{price:10,price_bucket:'super_okazja',is_historical_low:true},{price:25,price_bucket:'okazja',is_historical_low:false}];"
        "let idx=0;"
        "React.useState=(init)=>{"
        " if(idx===2){idx++;return [offers,()=>{}];}"
        " if(idx===3){idx++;return [[],()=>{}];}"
        " if(idx===6){idx++;return [offers.length,()=>{}];}"
        " idx++;return [init,()=>{}];"
        "};"
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


def test_price_badges_labels():
    html = render_app()
    labels = re.findall(r'data-testid="price-badge">([^<]+)<', html)
    assert labels == ['🔥', '💰']
