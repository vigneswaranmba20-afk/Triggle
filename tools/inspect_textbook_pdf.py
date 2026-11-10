#!/usr/bin/env python3
"""Render selected original PDF pages privately; never marks visual review complete."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--pdf', type=Path, required=True)
    p.add_argument('--sha256', required=True)
    p.add_argument('--pages', required=True, help='One-based PDF pages, comma-separated')
    p.add_argument('--output', type=Path, required=True, help='Private directory outside the repository')
    p.add_argument('--drive-id', required=True)
    args = p.parse_args()
    repo = Path(__file__).resolve().parents[1]
    output = args.output.resolve()
    if output == repo or repo in output.parents:
        p.error('Keep copyrighted PDF pages outside the repository')
    digest = hashlib.sha256(args.pdf.read_bytes()).hexdigest()
    if not re.fullmatch(r'[a-f0-9]{64}', args.sha256) or digest != args.sha256:
        p.error('PDF SHA-256 mismatch; no pages rendered')
    if not re.fullmatch(r'[1-9][0-9]*(,[1-9][0-9]*)*', args.pages):
        p.error('Expected comma-separated positive PDF page numbers')
    info = subprocess.check_output(['pdfinfo', str(args.pdf.resolve())], text=True)
    total = int(re.search(r'^Pages:\s+(\d+)$', info, re.M)[1])
    pages = list(dict.fromkeys(map(int, args.pages.split(','))))
    if any(page > total for page in pages):
        p.error('PDF page outside document bounds; no pages rendered')
    # Refuse replacement of previous evidence.
    output.mkdir(parents=True, exist_ok=False)
    evidence = []
    for page in pages:
        prefix = output / f'pdf-{page}'
        subprocess.run(['pdftoppm', '-f', str(page), '-l', str(page), '-r', '144',
                        '-singlefile', '-png', str(args.pdf.resolve()), str(prefix)], check=True)
        image = prefix.with_suffix('.png')
        evidence.append({'pdfPage': page, 'printedPage': None, 'image': image.name,
                         'sha256': hashlib.sha256(image.read_bytes()).hexdigest(),
                         'visualChecked': False})
    receipt = {'schemaVersion': 1, 'driveId': args.drive_id, 'fileName': args.pdf.name,
               'sha256': digest, 'pdfPages': total, 'pages': evidence,
               'note': 'Rendering is not source verification. Open each image; record imprint, printed page and review separately.'}
    (output / 'receipt.json').write_text(json.dumps(receipt, indent=2) + '\n')
    print(json.dumps(receipt, indent=2))


if __name__ == '__main__':
    main()
