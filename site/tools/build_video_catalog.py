#!/usr/bin/env python3
"""Build Triggle video availability using the real MP4s in the deployment.
Call AFTER the GitHub workflow copies repository-root videos/ into site/videos/.
No API keys, dependencies, video conversion, or automatic videos.
"""
from pathlib import Path
import json,sys

def main(root):
 manifest=root/'data/video-lessons.json'
 catalog=json.loads(manifest.read_text(encoding='utf-8'))
 plan=json.loads((root/'data/video-production-plan.json').read_text(encoding='utf-8'))
 existing=catalog.get('lessons',[])
 found=[]
 for record in plan['plans']:
  path=record['video']
  if not path.startswith('./videos/') or '..' in path or not path.endswith('.mp4'):
   raise ValueError('Unsafe video path: '+path)
  video=root/path[2:]
  if not video.is_file() or video.stat().st_size < 2048:
   continue # Missing videos are not listed as ready: there is no student button.
  with video.open('rb') as f: header=f.read(12)
  if len(header)<12 or header[4:8]!=b'ftyp':
   print('Skipping non-MP4 file: '+video.name)
   continue
  out={key:record[key] for key in ('questionId','class','chapter','exercise','title','video','language','downloadAllowed')}
  out.update(id='uploaded-'+record['questionId'],status='ready')
  poster=root/'videos'/ (video.stem+'.webp')
  if poster.is_file():out['poster']='./videos/'+poster.name
  found.append(out)
 ids={x['questionId'] for x in found}
 # A new narrated MP4 supersedes the old visual-only pilot for the same question.
 catalog['lessons']=found+[x for x in existing if x.get('questionId') not in ids]
 manifest.write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print('Triggle: '+str(len(found))+' uploaded MP4(s) linked; '+str(len(catalog['lessons']))+' available video(s).')

if __name__=='__main__':main(Path(sys.argv[1] if len(sys.argv)>1 else '.').resolve())
