"""Verify Triggle's local video manifest and exact pilot mathematical answer."""
from pathlib import Path
import json, math, re, subprocess, sys
root=Path(__file__).resolve().parent.parent
manifest=json.loads((root/'data/video-lessons.json').read_text(encoding='utf-8'))
assert manifest['schemaVersion']==1
ids=set()
for grade in (9,10,11,12):
 s=(root/f'data/class-{grade}.js').read_text(encoding='utf-8')
 m=re.search(r'window\.TRIGGLE_CLASSES\['+str(grade)+r'\]\s*=\s*(\{.*?\});?\s*$',s,re.S)
 assert m,grade
 data=json.loads(m.group(1))
 ids.update(item['id'] for item in data['items'])
assert len(ids)==105, f'expected 105 existing question IDs; got {len(ids)}'
seen=set()
for r in manifest['lessons']:
 assert r['questionId'] in ids,r['questionId']
 assert r['questionId'] not in seen,'duplicate lesson for question '+r['questionId']
 seen.add(r['questionId'])
 assert r['status'] in ['ready','preview','planned','unavailable']
 if r.get('provider') == 'google-drive':
  # Sharing/preview access was verified with Google Drive's own metadata before publishing.
  # CI must never attempt to download owner-owned assets or publish unverified private links.
  assert r['status']=='ready',r
  assert re.fullmatch(r'[A-Za-z0-9_-]{15,160}',r.get('fileId','')),r
  assert r['language']=='en',r
  assert r['questionId']=='c12-4-4-1-2',r
  assert 169 < float(r['durationSeconds']) < 172,r
  assert 'video' not in r or not r['video'], 'Drive page must not be used as native MP4'
  print('Published reviewed Google Drive video:',r['id'],r['questionId'],r['fileId'])
 elif r['status'] in ('ready','preview'):
  assert r['video'].startswith('./videos/')
  v=root/r['video'][2:];assert v.is_file() and v.stat().st_size>1000,v
  assert (root/r['poster'][2:]).is_file()
  p=subprocess.run(['ffprobe','-v','error','-show_entries','stream=codec_name,width,height,pix_fmt,codec_type','-show_entries','format=duration,size','-of','json',str(v)],capture_output=True,text=True,check=True)
  j=json.loads(p.stdout);assert abs(float(j['format']['duration'])-r['durationSeconds'])<.6,j
  assert any(x['codec_name']=='h264' and x['pix_fmt']=='yuv420p' for x in j['streams']),j
  print(r['id'],len(j['streams']),'stream(s)',j['format']['duration'],'seconds',j['format']['size'],'bytes')
solutions=[]
for k in range(-7,8):
 x=-math.pi/2+2*math.pi*k
 if -3*math.pi-1e-10<=x<=3*math.pi+1e-10:
  assert abs(math.sin(x)+1)<1e-10
  solutions.append(k)
assert solutions==[-1,0,1],solutions
assert set(['index.html','playground.html','assets/visual-lessons.js','data/video-lessons.json']).issubset({str(p.relative_to(root)) for p in root.rglob('*') if p.is_file()})
print('Verified',len(ids),'preserved lesson IDs; sine solutions k=',solutions,'; manifest/media valid.')
