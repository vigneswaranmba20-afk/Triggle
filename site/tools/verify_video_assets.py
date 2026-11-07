"""Verify Triggle's local video manifest and exact pilot mathematical answer."""
from pathlib import Path
import hashlib, json, math, re, shutil, subprocess, sys
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
 elif r.get('provider') == 'cloudflare-r2':
  # R2 is fetched only by browsers, not GitHub Actions. Never publish credentials here.
  from urllib.parse import urlsplit
  u=urlsplit(r['video'])
  assert r['status']=='ready' and u.scheme=='https' and u.hostname and u.path.endswith('.mp4'),r
  assert not (u.username or u.password or u.query or u.fragment or u.port),r
  assert r['downloadAllowed'] is False,'R2 browser downloads must not be promised'
  assert (root/r['poster'][2:]).is_file(),r
  if r.get('webm'):
   # Retain the exact original same-site WebM until a reviewed R2 WebM is uploaded.
   assert r['webm'].startswith('./videos/') and r['webm'].endswith('.webm'),r
   backup=root/r['webm'][2:]
   assert backup.is_file() and backup.stat().st_size>1000000,backup
   header=backup.open('rb').read(8192)
   assert header.startswith(bytes.fromhex('1a45dfa3')),'WebM missing EBML header'
   assert b'V_VP9' in header and b'A_OPUS' in header,'Expected VP9/Opus fallback'
  # Keep the exact owner-reviewed original MP4 in GitHub during the R2 pilot.
  source=root/'videos/triggle-class12-ex4-1-q1-ii.mp4'
  assert source.stat().st_size==4932846,source
  assert hashlib.sha256(source.read_bytes()).hexdigest()=='bf0965d5657838b83fb9926a8ac0358517f90aa1a4e4e8e3f99aaae80e4430fe'
  print('Validated R2 manifest URL and retained reviewed local MP4/WebM fallback for:',r['questionId'])
 elif r['status'] in ('ready','preview'):
  assert r['video'].startswith('./videos/')
  v=root/r['video'][2:];assert v.is_file() and v.stat().st_size>1000,v
  assert (root/r['poster'][2:]).is_file()
  if r.get('webm'):
   assert r['webm'].startswith('./videos/') and r['webm'].endswith('.webm'),r
   fallback=root/r['webm'][2:]
   assert fallback.is_file() and fallback.stat().st_size>1000000,fallback
   # EBML header and unambiguous VP9/Opus codec IDs: works without ffprobe.
   header=fallback.open('rb').read(8192)
   assert header.startswith(bytes.fromhex('1a45dfa3')),'WebM missing EBML header'
   assert b'V_VP9' in header and b'A_OPUS' in header,'Expected video VP9 and audio Opus tracks'
   if shutil.which('ffprobe'):
    probe=subprocess.run(['ffprobe','-v','error','-show_entries','stream=codec_name','-show_entries','format=duration','-of','json',str(fallback)],capture_output=True,text=True,check=True)
    details=json.loads(probe.stdout)
    codecs={track['codec_name'] for track in details['streams']}
    assert {'vp9','opus'}<=codecs,details
    assert abs(float(details['format']['duration'])-r['durationSeconds'])<.6,details
   print('Verified WebM VP9/Opus fallback:',fallback,fallback.stat().st_size,'bytes')
  # Exact, owner-reviewed reference checksum survives environments without ffprobe.
  if r['questionId']=='c12-4-4-1-2':
   assert v.stat().st_size==4932846,('Unexpected Class 12 video size',v.stat().st_size)
   fingerprint=hashlib.sha256(v.read_bytes()).hexdigest()
   assert fingerprint=='bf0965d5657838b83fb9926a8ac0358517f90aa1a4e4e8e3f99aaae80e4430fe','Class 12 video differs from reviewed MP4'
  if shutil.which('ffprobe'):
   p=subprocess.run(['ffprobe','-v','error','-show_entries','stream=codec_name,width,height,pix_fmt,codec_type','-show_entries','format=duration,size','-of','json',str(v)],capture_output=True,text=True,check=True)
   j=json.loads(p.stdout);assert abs(float(j['format']['duration'])-r['durationSeconds'])<.6,j
   assert any(x['codec_name']=='h264' and x['pix_fmt']=='yuv420p' for x in j['streams']),j
   print(r['id'],len(j['streams']),'stream(s)',j['format']['duration'],'seconds',j['format']['size'],'bytes')
  else:
   assert r['questionId']=='c12-4-4-1-2','ffprobe required to verify any future unreviewed video'
   print('Verified exact reviewed MP4 by SHA-256 and file size (ffprobe not installed):',r['id'])
solutions=[]
for k in range(-7,8):
 x=-math.pi/2+2*math.pi*k
 if -3*math.pi-1e-10<=x<=3*math.pi+1e-10:
  assert abs(math.sin(x)+1)<1e-10
  solutions.append(k)
assert solutions==[-1,0,1],solutions
assert set(['index.html','playground.html','assets/visual-lessons.js','data/video-lessons.json']).issubset({str(p.relative_to(root)) for p in root.rglob('*') if p.is_file()})
print('Verified',len(ids),'preserved lesson IDs; sine solutions k=',solutions,'; manifest/media valid.')
