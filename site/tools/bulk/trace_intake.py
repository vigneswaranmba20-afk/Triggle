#!/usr/bin/env python3
"""TRACE v0: read-only reconciliation of Triggle WIP ZIPs and PR evidence.

No GitHub writes, model calls, student-facing records, or completion claims.
"""
import argparse
import csv
import hashlib
import json
import re
import zipfile
from collections import Counter, defaultdict
from pathlib import Path

ID_PATTERN = re.compile(r'^g(?P<grade>\d+)-ch0*(?P<chapter>\d+)-ex(?P<exercise>\d+(?:\.\d+)?)-q(?P<question>\d+)(?:-(?P<part>[a-z0-9]+))?$', re.I)
LABEL_PATTERN = re.compile(r'Exercise\s+(\d+(?:\.\d+)?)\s*[·:-]?\s*Q\s*(\d+)(?:\s*\(([a-z0-9]+)\))?', re.I)


def identity(record_id):
    match = ID_PATTERN.fullmatch(record_id)
    if not match:
        return None
    r = match.groupdict()
    return 'g%s/ch%s/ex%s/q%s/%s' % (int(r['grade']), int(r['chapter']), r['exercise'], int(r['question']), (r['part'] or '-').lower())


def published_identity(record):
    # An older-edition label is a POSSIBLE overlap, never independent 2025 verification.
    chapter = str(record.get('chapter', '')).strip()
    label = record.get('label', {})
    label = label.get('en', '') if isinstance(label, dict) else str(label)
    m = LABEL_PATTERN.search(label)
    if not (chapter.isdigit() and m):
        return None
    return 'g10/ch%s/ex%s/q%s/%s' % (int(chapter), m[1], int(m[2]), (m[3] or '-').lower())


def zip_records(path):
    with zipfile.ZipFile(path) as z:
        bad = z.testzip()
        if bad:
            raise ValueError('Corrupt archive member: ' + bad)
        files = [n for n in z.namelist() if re.search(r'chapter-\d+/questions\.json$', n)]
        if len(files) != 1:
            raise ValueError('Expected exactly one chapter questions.json in ' + str(path))
        data = json.loads(z.read(files[0]))
        records = data if isinstance(data, list) else data.get('questions', [])
        if not isinstance(records, list):
            raise ValueError('Invalid questions list in ' + str(path))
        progress = json.loads(z.read('PROGRESS.json'))
        manifest = json.loads(z.read('SOURCE_MANIFEST.json'))
        return records, progress, manifest, hashlib.sha256(path.read_bytes()).hexdigest()


def extract(zip_paths, draft_entries=None, published_entries=None):
    draft_entries = draft_entries or []
    published_entries = published_entries or []
    drafts = defaultdict(list)
    for d in draft_entries:
        key = identity(d.get('id', '')) or d.get('key')
        if key:
            drafts[key].append({'pr': d.get('pr'), 'state': d.get('state', 'draft')})
    published = defaultdict(list)
    for p in published_entries:
        key = published_identity(p) or identity(p.get('id', ''))
        if key:
            published[key].append({'id': p.get('id'), 'kind': p.get('kind'), 'reference': p.get('reference')})

    rows = []
    archives = []
    for path in sorted(map(Path, zip_paths)):
        questions, progress, manifest, sha = zip_records(path)
        archives.append({'name': path.name, 'sha256': sha, 'rows': len(questions),
                         'release_ready': progress.get('release_ready'), 'status': progress.get('status')})
        for q in questions:
            qid = q.get('id', '')
            key = identity(qid)
            if not key:
                raise ValueError('Unparseable question ID: ' + str(qid))
            qa = q.get('english_question') or q.get('english') or q.get('english_text')
            ta = q.get('tamil_question') or q.get('tamil') or q.get('tamil_text')
            working = q.get('steps') or q.get('quick_solution') or q.get('working')
            fig = bool(q.get('figure_required'))
            prior = bool(q.get('note', '').lower().startswith('carried forward'))
            risks = []
            if not qa: risks.append('no_structured_english_question')
            if not ta: risks.append('no_structured_tamil_question')
            if not working: risks.append('no_structured_steps_check_markdown')
            if fig: risks.append('figure_visual_check_required')
            if q.get('tamil_editorial_review') == 'pending': risks.append('tamil_review_pending')
            if not (q.get('source_english') or q.get('english_pdf_page')): risks.append('source_page_schema_review')
            if not (q.get('source_tamil') or q.get('tamil_pdf_page')): risks.append('source_page_schema_review_ta')
            rows.append({'key': key, 'id': qid, 'archive': path.name, 'source_sha256': sha,
                         'reported_status': q.get('status', ''), 'carried_forward': prior,
                         'draft_prs': sorted({str(d['pr']) for d in drafts.get(key, []) if d.get('pr')}),
                         'possible_legacy_live_ids': sorted({str(p['id']) for p in published.get(key, []) if p.get('id')}),
                         'risk_flags': sorted(set(risks)), 'source_verified_claimed': True,
                         'independent_external_review': False, 'student_live_verified': False})

    counts = Counter(r['key'] for r in rows)
    for r in rows:
        if counts[r['key']] > 1:
            r['risk_flags'].append('duplicate_across_staging_zips')
    unique = len(counts)
    overlaps = sum(bool(r['draft_prs']) for r in rows)
    return {
        'schema_version': 1, 'type': 'TRACE_READ_ONLY_INTAKE',
        'scope': 'provided staging ZIPs and optional PR/live snapshots, NOT full textbook denominator',
        'archives': archives,
        'summary': {'archive_records': len(rows), 'unique_staging_ids': unique,
                    'records_overlapping_supplied_drafts': overlaps,
                    'records_with_possible_legacy_live_label': sum(bool(r['possible_legacy_live_ids']) for r in rows),
                    'items_without_structured_working': sum('no_structured_steps_check_markdown' in r['risk_flags'] for r in rows),
                    'chapter_complete': False, 'new_release_count': 0},
        'records': rows,
    }


def write_report(result, output):
    output.mkdir(parents=True, exist_ok=True)
    (output / 'trace_intake.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    with (output / 'trace_intake.csv').open('w', encoding='utf-8', newline='') as f:
        fields = ['key', 'id', 'archive', 'reported_status', 'carried_forward', 'draft_prs',
                  'possible_legacy_live_ids', 'risk_flags', 'student_live_verified']
        writer = csv.DictWriter(f, fieldnames=fields, extrasaction='ignore')
        writer.writeheader()
        for row in result['records']:
            writer.writerow({**row, 'draft_prs': '|'.join(row['draft_prs']),
                             'possible_legacy_live_ids': '|'.join(row['possible_legacy_live_ids']),
                             'risk_flags': '|'.join(row['risk_flags'])})


def load_json(path):
    if not path: return []
    data = json.loads(Path(path).read_text(encoding='utf-8'))
    if isinstance(data, list): return data
    if isinstance(data, dict) and isinstance(data.get('items'), list): return data['items']
    raise ValueError('Expected JSON array or {items:[...]}')


def main():
    a = argparse.ArgumentParser(description=__doc__)
    a.add_argument('--zip-dir', required=True, type=Path)
    a.add_argument('--drafts', type=Path, help='Optional curated PR evidence JSON; never considered approved')
    a.add_argument('--published', type=Path, help='Optional published snapshot JSON; labels are only possible matches')
    a.add_argument('--output', required=True, type=Path)
    args = a.parse_args()
    paths = sorted(args.zip_dir.glob('G10_W*_WIP.zip'))
    if not paths: raise SystemExit('No matching staging ZIPs; refusing empty report')
    result = extract(paths, load_json(args.drafts), load_json(args.published))
    write_report(result, args.output)
    print(json.dumps(result['summary'], indent=2))

if __name__ == '__main__':
    main()