#!/usr/bin/env python3
"""Review-gated TRACE media release helpers; no network or GitHub credentials."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys
from urllib.parse import urlsplit

ROOT=Path(__file__).resolve().parents[2]
ALLOWED={'g10-ch2-ap-sum':ROOT/'site/data/g10-ch2-concepts.js'}

def digest(path):
    h=hashlib.sha256()
    with open(path,'rb') as stream:
        for piece in iter(lambda:stream.read(1024*1024),b''):h.update(piece)
    return h.hexdigest()

def verify(result_file,expected_sha,lesson):
    record=json.loads(Path(result_file).read_text())
    if record.get('factoryVersion')!=1 or record.get('lessonId')!=lesson:
        raise ValueError('Incorrect factory artifact or lesson ID')
    if record.get('mode') not in ('gemini','existing') or record.get('publishable') is not True:
        raise ValueError('Only full-length narrated, reviewable lessons may publish')
    if record.get('width')!=720 or record.get('height')!=1280 or record.get('fps',0)<12:
        raise ValueError('Only full-size reviewed portrait video may publish')
    if lesson not in ALLOWED: raise ValueError('Lesson has no reviewed release adapter')
    name=record.get('videoFile','')
    if not re.fullmatch(r'[a-z0-9-]+-(?:gemini|existing)\.mp4',name):
        raise ValueError('Unsafe output filename')
    path=Path(result_file).parent/name
    if not path.is_file(): raise ValueError('Video missing from review artifact')
    current=digest(path)
    if not re.fullmatch(r'[0-9a-f]{64}',expected_sha) or current!=expected_sha or record.get('sha256')!=current:
        raise ValueError('Review SHA-256 does not match exact MP4 bytes')
    details=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration:stream=codec_type,codec_name,width,height','-of','json',str(path)]))
    streams=details['streams']
    if not any(s['codec_type']=='video' and s['codec_name']=='h264' and s['width']==720 and s['height']==1280 for s in streams):
        raise ValueError('Reviewed MP4 is not H264 portrait')
    if not any(s['codec_type']=='audio' and s['codec_name']=='aac' for s in streams):
        raise ValueError('Reviewed MP4 lacks AAC')
    seconds=float(details['format']['duration'])
    if abs(seconds-float(record['durationSeconds']))>.6 or seconds<10 or seconds>600:
        raise ValueError('Duration mismatch')
    spec=json.loads((ROOT/'site/video-factory/lessons'/f'{lesson}.json').read_text())
    planned=[b['id'] for b in spec['beats']]
    actual=[b['beat'] for b in record['beats']]
    if planned!=actual: raise ValueError('Incomplete or reordered reviewed beats')
    if record['beats'][-2]['scene']!='practice' or record['beats'][-1]['scene']!='answer':
        raise ValueError('Practice must precede answer reveal')
    return record,path

def register(lesson, url, seconds):
    if lesson not in ALLOWED: raise ValueError('No release adapter for this lesson')
    target=urlsplit(url)
    if target.scheme!='https' or not target.netloc or target.username or target.password or target.query or target.fragment or not target.path.endswith('.mp4'):
        raise ValueError('Expected a public direct HTTPS MP4 URL')
    if not 10<=seconds<=600: raise ValueError('Unexpected video duration')
    file=ALLOWED[lesson]; old=file.read_text(encoding='utf8')
    pattern=r'("id":\s*"g10-ch2-ap-sum",\s*\n\s*"video":\s*)\{[^}]*\}'
    newvideo=json.dumps({'src':url,'language':'en','durationSeconds':round(seconds,2)},ensure_ascii=False)
    updated,n=re.subn(pattern,lambda m:m.group(1)+newvideo,old)
    if n!=1:raise ValueError('Cannot uniquely find reviewed target concept, refusing to modify app')
    file.write_text(updated,encoding='utf8')
    print('Updated only existing video reference for '+lesson)

def main():
    p=argparse.ArgumentParser()
    p.add_argument('action',choices=['verify','register'])
    p.add_argument('--result',default='build/trace-video/release/result.json')
    p.add_argument('--sha',default='')
    p.add_argument('--lesson',required=True)
    p.add_argument('--url',default='')
    p.add_argument('--duration',type=float,default=0)
    args=p.parse_args()
    if args.action=='verify':
        rec,filename=verify(args.result,args.sha,args.lesson)
        print('PASS owner-approved media exact SHA256:',filename.name,rec['durationSeconds'])
    else:register(args.lesson,args.url,args.duration)

if __name__=='__main__':
    try:main()
    except (ValueError,KeyError,TypeError,FileNotFoundError,subprocess.CalledProcessError) as exc:
        print('TRACE RELEASE BLOCKED: '+str(exc),file=sys.stderr);sys.exit(1)
