"""Apply only Cloudflare-specific public metadata to an already verified release."""
import hashlib
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlsplit
from xml.etree import ElementTree as ET

LEGACY = "https://vigneswaranmba20-afk.github.io/Triggle/site/"
PRIMARY = "https://samacheermaths.in/site/"

def adapt(root):
    site = root / "site"
    html_path = site / "index.html"
    manifest_path = site / "manifest.webmanifest"
    sitemap_path = site / "sitemap.xml"
    worker_path = site / "service-worker.js"
    html = html_path.read_text(encoding="utf-8")
    worker = worker_path.read_text(encoding="utf-8")
    sitemap = sitemap_path.read_text(encoding="utf-8")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    head, sep, body = html.partition("</head>")
    assert sep and f'<link rel="canonical" href="{LEGACY}index.html">' in head
    assert manifest["id"] == "/Triggle/site/index.html"
    assert manifest["scope"] == "./" and manifest["start_url"] == "./index.html"
    stamp = re.search(r'data-student-release="([0-9a-f]{16})"', head)
    assert stamp, "Missing release cache version"
    old = stamp.group(1)
    assert worker.count(f'"version":"{old}"') == 1, "Worker/cache stamp mismatch"
    head = head.replace(LEGACY + "index.html", PRIMARY).replace(LEGACY, PRIMARY)
    assert LEGACY not in head
    assert f'<link rel="canonical" href="{PRIMARY}">' in head
    assert f'hreflang="ta" href="{PRIMARY}?lang=ta"' in head
    manifest.update(id="/site/", start_url="./")
    manifest_text = json.dumps(manifest, ensure_ascii=False, indent=2) + "\n"
    sitemap = sitemap.replace(LEGACY + "index.html", PRIMARY)
    tree = ET.fromstring(sitemap)
    urls = [node.text for node in tree.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
    assert len(urls) == 40 and len(set(urls)) == 40, "Unexpected sitemap coverage"
    assert all(urlsplit(u).scheme == "https" and urlsplit(u).netloc == "samacheermaths.in"
               and urlsplit(u).path == "/site/" for u in urls)
    assert sum("lang=ta" in u for u in urls) == 20
    assert sum("class=9" in u for u in urls) == 20
    assert sum("class=10" in u for u in urls) == 18
    # The published worker must acquire a new cache even if only identity changed.
    new = hashlib.sha256((head + manifest_text + sitemap + old).encode()).hexdigest()[:16]
    assert new != old
    head = head.replace(f'data-student-release="{old}"', f'data-student-release="{new}"', 1)
    worker = worker.replace(f'"version":"{old}"', f'"version":"{new}"', 1)
    html_path.write_text(head + sep + body, encoding="utf-8")
    manifest_path.write_text(manifest_text, encoding="utf-8")
    sitemap_path.write_text(sitemap, encoding="utf-8")
    worker_path.write_text(worker, encoding="utf-8")
    print("PASS Cloudflare canonical, language alternates, 40 sitemap URLs, PWA scope/identity and synchronized cache revision")

if __name__ == "__main__":
    adapt(Path(sys.argv[1]))
