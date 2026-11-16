#!/usr/bin/env python3
"""TRACE Video Factory: source-led, audio-first portrait mathematical micro-lessons.

No cloud calls in validate/demo. Gemini runs only in explicit --mode gemini;
public deployment is intentionally a separate, reviewed workflow.
"""
import argparse
import base64
import hashlib
import json
import math
import os
from pathlib import Path
import re
import shutil
import struct
import subprocess
import sys
import time
import urllib.error
import urllib.request
import wave

SCENES = {"intro", "sequence", "outer-pair", "inner-pair", "middle", "formula", "apply", "practice", "answer",
          "gp-intro", "gp-pattern", "gp-name", "gp-double", "gp-align", "gp-cancel", "gp-rule", "gp-practice", "gp-answer"}
GP_ORDER = ["gp-intro","gp-pattern","gp-name","gp-double","gp-align","gp-cancel","gp-rule","gp-practice","gp-answer"]
ROOT = Path(__file__).resolve().parents[2]
PALETTE = {"bg":"#FAF8F5", "ink":"#172337", "sub":"#5B6776", "maroon":"#80324A", "gold":"#C5A371", "surface":"#FFFFFF", "line":"#E8E2DA", "soft":"#F1ECE6"}
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'


def run(command, *, input_bytes=None):
    res = subprocess.run(command, input=input_bytes, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode:
        raise RuntimeError(f"Command failed: {command[0]}: {res.stderr.decode(errors='replace')[-2200:]}")
    return res.stdout


def sha256(path):
    h = hashlib.sha256()
    with open(path, 'rb') as stream:
        for data in iter(lambda: stream.read(1024*1024), b''):
            h.update(data)
    return h.hexdigest()


def lesson_path(name):
    if not re.fullmatch(r'[a-z0-9][a-z0-9-]{2,70}', name):
        raise ValueError('Unsafe lesson ID')
    return ROOT / 'site' / 'video-factory' / 'lessons' / (name + '.json')


def validate_lesson(spec):
    if spec.get('schemaVersion') != 1 or not isinstance(spec.get('id'), str):
        raise ValueError('Unsupported lesson format')
    if not re.fullmatch(r'[a-z0-9][a-z0-9-]{2,70}', spec['id']):
        raise ValueError('Invalid lesson ID')
    if spec.get('class') not in (9, 10, 11, 12) or spec.get('language') != 'en':
        raise ValueError('Only reviewed English class 9–12 templates supported in this pilot')
    beats = spec.get('beats')
    if not isinstance(beats, list) or not 2 <= len(beats) <= 30:
        raise ValueError('Expect between 2 and 30 scene beats')
    names = set()
    for beat in beats:
        name = beat.get('id', '')
        if not re.fullmatch(r'[a-z][a-z0-9-]{1,32}', name) or name in names:
            raise ValueError('Duplicate or invalid beat ID')
        names.add(name)
        if beat.get('scene') not in SCENES:
            raise ValueError('Unsupported scene template: ' + str(beat.get('scene')))
        words = beat.get('narration')
        if not isinstance(words, str) or not (20 <= len(words) <= 900):
            raise ValueError('Each beat needs a short, reviewed spoken script')
        if not isinstance(beat.get('holdAfter'), (int, float)) or not .4 <= beat['holdAfter'] <= 8:
            raise ValueError('holdAfter out of safe range')
    scenes = [b['scene'] for b in beats]
    if 'answer' in scenes and ('practice' not in scenes or scenes.index('answer') <= scenes.index('practice')):
        raise ValueError('Practice answer must be in a separate later scene')
    visual=spec.get('visual',{})
    if visual.get('template')=='ap-sum-pairs-v1':
        for key in ('exampleTerms','practiceTerms'):
            terms=visual.get(key)
            if not isinstance(terms,list) or len(terms)!=5 or any(type(x) is not int or x<1 or x>99 for x in terms):
                raise ValueError('Visual requires five positive integer terms')
            delta=terms[1]-terms[0]
            if not delta or any(terms[i+1]-terms[i]!=delta for i in range(4)):
                raise ValueError('Terms must be an exact arithmetic progression')
            if 5*(terms[0]+terms[-1])!=2*sum(terms):
                raise ValueError('Displayed sum formula fails exact integer arithmetic')
        if scenes != ['intro','sequence','outer-pair','inner-pair','middle','formula','apply','practice','answer']:
            raise ValueError('A.P. pairing scene order changed unexpectedly')
    elif visual.get('template')=='gp-sum-cancel-v1':
        if spec.get('id')!='g10-ch2-gp-sum' or scenes!=GP_ORDER:
            raise ValueError('G.P. requires its nine verified cancellation scenes in order')
        for key,ratio in [('exampleTerms',2),('practiceTerms',3)]:
            terms=visual.get(key)
            if not isinstance(terms,list) or len(terms)!=4 or any(type(x) is not int for x in terms):
                raise ValueError('G.P. requires four integer terms')
            if terms != [ratio**i for i in range(4)]:
                raise ValueError('G.P. term alignment and ratio must match exact validated values')
            if sum(terms)!=(ratio**4-1)//(ratio-1):
                raise ValueError('G.P. sum and cancellation disagree')
        if '40' in ' '.join(b['narration'] for b in beats[:-1]):
            raise ValueError('G.P. practice answer is revealed before the last scene')
        if 'pause' not in beats[-2]['narration'].lower():
            raise ValueError('G.P. practice must allow a real pause before answer')
        # No arbitrary textbook question is transcribed. This is original Triggle practice.
    else:
        raise ValueError('Unsupported visual template')
    return spec


def load_lesson(name):
    return validate_lesson(json.loads(lesson_path(name).read_text(encoding='utf8')))


def probe(path):
    return json.loads(run(['ffprobe','-v','error','-show_entries','format=duration,size:stream=codec_type,codec_name,width,height','-of','json',str(path)]))


def duration(path):
    return float(probe(path)['format']['duration'])


def demo_audio(path, *, seconds=2.5):
    # Explicitly NOT narration; prevents accidentally treating a synthetic video as publishable.
    rate, samples = 24000, int(24000*seconds)
    path.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(path),'wb') as wf:
        wf.setnchannels(1); wf.setsampwidth(2); wf.setframerate(rate)
        # Short quiet chime and then silence to expose sync problems without generating cost.
        for offset in range(0,samples,2400):
            frames=[]
            for i in range(offset,min(offset+2400,samples)):
                value = int(700*math.sin(2*math.pi*330*i/rate)) if i<3600 else 0
                frames.append(struct.pack('<h',value))
            wf.writeframes(b''.join(frames))


LAST_GEMINI_REQUEST_AT = 0.0

def gemini_error_status(exc):
    """Return only safe HTTP code/status, never API key or provider response body."""
    if not isinstance(exc, urllib.error.HTTPError):
        return type(exc).__name__
    code = exc.code
    status = 'UNKNOWN'
    try:
        parsed=json.loads(exc.read().decode('utf8'))
        candidate=str(parsed.get('error',{}).get('status','UNKNOWN'))
        if re.fullmatch(r'[A-Z_]{2,60}',candidate):
            status=candidate
    except (ValueError,UnicodeDecodeError,AttributeError):
        pass
    return f'HTTP {code} {status}'


def gemini_audio(text, path, model, voice, api_key):
    global LAST_GEMINI_REQUEST_AT
    prompt = ("Synthesize exactly the following spoken lesson passage. "
              "Warm, calm, natural teacher voice with gentle Indian English pronunciation. "
              "Unhurried but not unnaturally stretched. No background music. "
              "Do not read instructions. Spoken passage:\n" + text)
    payload = {"contents":[{"parts":[{"text":prompt}]}],
      "generationConfig":{"responseModalities":["AUDIO"],
        "speechConfig":{"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":voice}}}}}
    url = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent'
    raw = json.dumps(payload).encode('utf8')
    last_status = None
    max_attempts = 4
    for attempt in range(max_attempts):
        # Preview models have relatively tight RPM quotas. Space out distinct
        # requests without slowing down audio previously restored from cache.
        remaining = 10.0 - (time.monotonic() - LAST_GEMINI_REQUEST_AT)
        if remaining > 0:
            time.sleep(remaining)
        LAST_GEMINI_REQUEST_AT=time.monotonic()
        try:
            request = urllib.request.Request(url, raw, headers={'Content-Type':'application/json','x-goog-api-key':api_key}, method='POST')
            with urllib.request.urlopen(request, timeout=160) as response:
                result = json.load(response)
            parts = result['candidates'][0]['content']['parts']
            audio = next((p['inlineData'] for p in parts if 'inlineData' in p), None)
            if not audio: raise RuntimeError('TTS returned no audio data')
            data = base64.b64decode(audio['data'], validate=True)
            mime = audio.get('mimeType', 'audio/L16').lower()
            if len(data) < 2400: raise RuntimeError('Generated audio unexpectedly short')
            if data[:4] == b'RIFF':
                path.write_bytes(data)
            elif 'l16' in mime or 'pcm' in mime:
                with wave.open(str(path),'wb') as wf:
                    wf.setnchannels(1);wf.setsampwidth(2);wf.setframerate(24000);wf.writeframes(data)
            else:
                raise RuntimeError('Unsupported TTS audio format: ' + mime)
            if duration(path) < .5: raise RuntimeError('TTS segment unexpectedly short')
            return
        except (urllib.error.HTTPError, urllib.error.URLError, ValueError, KeyError, RuntimeError) as exc:
            last_status = gemini_error_status(exc)
            code = getattr(exc,'code',None)
            if isinstance(exc, urllib.error.HTTPError) and code not in (429,500,502,503,504):
                raise RuntimeError(f'Gemini TTS non-retryable {last_status}; check your API project settings') from None
            print(f'TRACE narration attempt {attempt+1}/{max_attempts} failed: {last_status}',flush=True)
            if attempt < max_attempts - 1:
                # Bounded exponential-ish delay; do not hammer a rate-limited API.
                backoff=(8,22,45)[attempt]
                if isinstance(exc, urllib.error.HTTPError):
                    retry_after=exc.headers.get('Retry-After','')
                    if retry_after.isdigit(): backoff=max(backoff,min(90,int(retry_after)))
                print(f'Retrying only the unfinished narration beat after {backoff}s',flush=True)
                time.sleep(backoff)
    raise RuntimeError(f'Gemini TTS stopped after {max_attempts} attempts ({last_status}); check AI Studio quotas/billing and rerun with unchanged cache_revision to resume generated beats')


def segment_audio(beat, lesson, audio_root, mode, existing_dir, api_key):
    model=lesson.get('voice',{}).get('model','gemini-3.1-flash-tts-preview')
    voice=lesson.get('voice',{}).get('name','Kore')
    digest=hashlib.sha256(json.dumps([model,voice,beat['narration']],ensure_ascii=False).encode()).hexdigest()[:20]
    dest = audio_root/(beat['id']+'-'+digest+'.wav')
    if mode == 'demo':
        if not dest.exists(): demo_audio(dest)
    elif mode == 'existing':
        source=Path(existing_dir)/ (beat['id']+'.wav')
        if not source.is_file(): raise RuntimeError('Missing reviewed audio: '+str(source))
        shutil.copyfile(source,dest)
    elif mode == 'gemini':
        if not dest.exists():
            if not api_key: raise RuntimeError('GEMINI_API_KEY is required for gemini mode; never print it')
            gemini_audio(beat['narration'],dest,model,voice,api_key)
    else: raise ValueError('Unsupported narration mode')
    if duration(dest)<.5 or duration(dest)>95: raise ValueError('Narration beat duration outside safe range')
    return dest


def artwork(spec, beat, fraction, index, total, w, h, demo):
    if spec.get('visual',{}).get('template')=='gp-sum-cancel-v1':
        from trace_gp_artwork import artwork as gp_artwork
        return gp_artwork(spec,beat,fraction,index,total,w,h,demo)
    from PIL import Image, ImageDraw, ImageFont
    im=Image.new('RGB',(w,h),PALETTE['bg'])
    d=ImageDraw.Draw(im)
    k=w/720
    def px(z): return round(z*k)
    def font(s,bold=False): return ImageFont.truetype(BOLD if bold else FONT,max(10,px(s)))
    def rect(box,fill,r=18,outline=None,width=1):
        d.rounded_rectangle(tuple(px(q) for q in box),radius=px(r),fill=fill,outline=outline,width=max(1,px(width)))
    def txt(x,y,t,size=31,color='ink',bold=False,anchor=None):
        d.text((px(x),px(y)),t,font=font(size,bold),fill=PALETTE.get(color,color),anchor=anchor)
    def centered(y,t,size=42,color='ink',bold=False): txt(360,y,t,size,color,bold,anchor='mt')
    # Editorial layout, no scroll controls, mobile-first portrait.
    rect((28,28,692,1252),'#FFFFFF',22,PALETTE['line'],2)
    rect((60,76,112,84),PALETTE['maroon'],5)
    txt(128,61,'TRIGGLE',34,'ink',True)
    txt(565,71,'CLASS '+str(spec['class']),17,'sub',True)
    txt(60,135,spec['visual'].get('unit','ARITHMETIC PROGRESSIONS'),17,'maroon',True)
    d.line([(px(60),px(184)),(px(660),px(184))],fill=PALETTE['line'],width=max(1,px(2)))
    heading={
        'intro':('Can a pattern','save us time?'),
        'sequence':('Look at the','five terms'),
        'outer-pair':('Start from','the two ends'),
        'inner-pair':('Move inward.','Same total.'),
        'middle':('One number','remains'),
        'formula':('The shortcut','we discovered'),
        'apply':('Apply the','sum formula'),
        'practice':('Your turn.','Think first.'),
        'answer':('Now check','your thinking')}
    first,second=heading[beat['scene']]
    txt(58,209,first,48,'ink',True);txt(58,275,second,48,'ink',True)
    # Progress-driven visual states. Scene boundaries are actual audio segment lengths.
    reveal = max(0,min(1,(fraction-.06)/.25))
    scene=beat['scene']
    example=spec['visual']['exampleTerms']
    practice=spec['visual']['practiceTerms']
    terms=example if scene not in ('practice','answer') else practice
    boxes=[(62+i*123,463,166+i*123,573) for i in range(5)]
    if scene!='intro':
        for i,(box,value) in enumerate(zip(boxes,terms)):
            active=i<max(1,math.ceil(reveal*5))
            important=(scene=='outer-pair' and i in (0,4) or scene=='inner-pair' and i in (1,3) or scene=='middle' and i==2 or scene=='answer' and i in (0,4))
            fill=PALETTE['maroon'] if important else (PALETTE['soft'] if active else '#F9F7F3')
            rect(box,fill,17,PALETTE['line'])
            txt((box[0]+box[2])/2,box[1]+55,str(value),48,'#FFFFFF' if important else 'ink',True,'mm')
        if scene in ('outer-pair','inner-pair','middle','answer'):
            pairs={'outer-pair':[(0,4)],'inner-pair':[(1,3)],'middle':[(2,2)],'answer':[(0,4)]}[scene]
            for i,j in pairs:
                if i!=j:
                    d.arc([px(boxes[i][0]+52),px(582),px(boxes[j][2]-52),px(704)],180,360,fill=PALETTE['gold'],width=max(3,px(7)))
    if scene=='intro':
        centered(463,' + '.join(str(x) for x in example),48,'maroon',True)
        centered(557,'A simpler way to add',28,'sub')
        centered(610,'is hiding in plain sight.',28,'sub')
    elif scene=='sequence':
        centered(668,'Same difference: '+str(example[1]-example[0]),36,'maroon',True)
        centered(760,f'First = {example[0]}      Last = {example[-1]}',26,'sub')
    elif scene=='outer-pair':
        centered(738,f'{example[0]} + {example[-1]} = {example[0]+example[-1]}',49,'maroon',True)
        centered(825,'Pair the outside terms.',27,'sub')
    elif scene=='inner-pair':
        centered(738,f'{example[1]} + {example[-2]} = {example[1]+example[-2]}',49,'maroon',True)
        centered(825,'Two pairs. Same sum.',27,'sub')
    elif scene=='middle':
        centered(744,f'{example[0]+example[-1]} + {example[1]+example[-2]} + {example[2]}',40,'ink',True)
        centered(822,f'= {sum(example)}',62,'maroon',True)
    elif scene=='formula':
        txt(145,613,'Sₙ =',51,'maroon',True)
        txt(369,599,'n',37,'maroon',True,'mm')
        d.line([(px(341),px(636)),(px(397),px(636))],fill=PALETTE['maroon'],width=max(2,px(3)))
        txt(369,661,'2',37,'maroon',True,'mm')
        txt(417,613,'(a + l)',44,'maroon',True)
        centered(716,'n: number of terms',24,'sub')
        centered(762,'a: first term   l: last term',24,'sub')
    elif scene=='apply':
        centered(668,f'5 / 2 ({example[0]} + {example[-1]})',43,'ink',True)
        centered(748,f'= 5 / 2 × {example[0]+example[-1]} = {sum(example)}',38,'maroon',True)
    elif scene=='practice':
        centered(670,' + '.join(str(x) for x in practice),32,'ink',True)
        rect((124,751,596,838),PALETTE['soft'],20)
        centered(786,'Pause and try it yourself',25,'maroon',True)
        # Deliberately NEVER display the answer during this scene.
    elif scene=='answer':
        centered(662,f'5 / 2 × ({practice[0]} + {practice[-1]})',38,'ink',True)
        centered(742,f'= {sum(practice)}',60,'maroon',True)
    d.line([(px(60),px(1092)),(px(660),px(1092))],fill=PALETTE['line'],width=max(1,px(2)))
    txt(60,1114,'WATCH  ·  UNDERSTAND  ·  TRY',17,'sub',True)
    rect((60,1186,660,1196),PALETTE['soft'],6)
    rect((60,1186,60+(600*(index+fraction)/total),1196),PALETTE['maroon'],6)
    txt(60,1210,f'{index+1:02} / {total:02}',15,'sub',True)
    if demo:
        rect((100,975,620,1040),'#FBE7E6',14)
        centered(1001,'TECHNICAL DEMO  ·  NO NARRATION',20,'maroon',True)
    return im


def render_beat(spec,beat,audio,filename,index,total,w,h,fps,mode):
    seconds=duration(audio)+float(beat['holdAfter'])
    frames=max(1,math.ceil(seconds*fps))
    command=['ffmpeg','-y','-hide_banner','-loglevel','error','-f','rawvideo','-pixel_format','rgb24',
        '-video_size',f'{w}x{h}','-framerate',str(fps),'-i','pipe:0', '-i',str(audio),
        '-af','apad','-t',f'{frames/fps:.6f}', '-c:v','libx264','-preset','veryfast','-crf','23',
        '-pix_fmt','yuv420p','-c:a','aac','-b:a','112k','-ar','48000','-movflags','+faststart',str(filename)]
    process=subprocess.Popen(command,stdin=subprocess.PIPE,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
    try:
        for i in range(frames):
            frame=artwork(spec,beat,i/max(1,frames-1),index,total,w,h,mode=='demo')
            process.stdin.write(frame.tobytes())
    except BrokenPipeError:
        raise RuntimeError('FFmpeg closed renderer unexpectedly')
    finally:
        if process.stdin: process.stdin.close()
    message=process.stderr.read().decode(errors='replace')
    if process.wait(): raise RuntimeError('FFmpeg failed: '+message[-2000:])
    return frames/fps


def verify_video(filename,w,h):
    details=probe(filename)
    streams=details.get('streams',[])
    if not any(s['codec_type']=='video' and s['codec_name']=='h264' and s.get('width')==w and s.get('height')==h for s in streams):
        raise RuntimeError('Video must be H.264 at requested portrait resolution')
    if not any(s['codec_type']=='audio' and s['codec_name']=='aac' for s in streams):
        raise RuntimeError('Video must contain AAC audio')
    if duration(filename)<1: raise RuntimeError('Invalid video duration')
    return details


def render(args):
    spec=load_lesson(args.lesson)
    if args.width%2 or args.height%2 or not 320<=args.width<=1080 or args.height*9!=args.width*16:
        raise ValueError('Output must be even-numbered, 9:16 portrait, width 320–1080')
    if not 6<=args.fps<=30: raise ValueError('Frame rate must be 6–30')
    if args.mode=='existing' and not args.existing_dir: raise ValueError('--existing-dir required')
    if args.mode=='gemini' and not os.environ.get('GEMINI_API_KEY'): raise RuntimeError('Configure GEMINI_API_KEY as a GitHub Actions secret')
    beats=spec['beats'][:args.limit_beats] if args.limit_beats else spec['beats']
    out=Path(args.output).resolve()
    out.mkdir(parents=True,exist_ok=True)
    cache=Path(args.cache).resolve()
    cache.mkdir(parents=True,exist_ok=True)
    stages=out/'segments';stages.mkdir(exist_ok=True)
    records=[]
    segments=[]
    for i,beat in enumerate(beats):
        audio=segment_audio(beat,spec,cache,args.mode,args.existing_dir,os.environ.get('GEMINI_API_KEY'))
        target=stages/(f'{i:02d}-{beat["id"]}.mp4')
        sec=render_beat(spec,beat,audio,target,i,len(beats),args.width,args.height,args.fps,args.mode)
        segments.append(target)
        records.append({'beat':beat['id'],'scene':beat['scene'],'narrationSeconds':round(duration(audio),3),
           'visualSeconds':round(sec,3),'audioSha256':sha256(audio)})
        print(f'PASS beat {i+1}/{len(beats)} {beat["id"]}: voice={duration(audio):.2f}s, scene={sec:.2f}s',flush=True)
    playlist=out/'concat.txt'
    playlist.write_text(''.join(f"file '{p.resolve()}'\n" for p in segments))
    video=out/(spec['id']+'-'+args.mode+'.mp4')
    run(['ffmpeg','-y','-hide_banner','-loglevel','error','-f','concat','-safe','0','-i',str(playlist),'-c','copy','-movflags','+faststart',str(video)])
    details=verify_video(video,args.width,args.height)
    result={'factoryVersion':1,'lessonId':spec['id'],'mode':args.mode,'language':spec['language'],
        'reviewRequired':True,'publishable':args.mode in ('gemini','existing') and len(beats)==len(spec['beats']),
        'videoFile':video.name,'sha256':sha256(video),'durationSeconds':round(float(details['format']['duration']),3),
        'width':args.width,'height':args.height,'fps':args.fps,'beats':records}
    (out/'result.json').write_text(json.dumps(result,indent=2)+'\n')
    print('PASS media check:',result['videoFile'],result['durationSeconds'],'seconds sha256',result['sha256'])
    if args.mode=='demo':print('DEMO ONLY: synthetic audio. Cannot be published.',flush=True)
    return result


def self_test(lesson):
    x=load_lesson(lesson)
    gp=x.get('visual',{}).get('template')=='gp-sum-cancel-v1'
    assert x['beats'][0]['scene']==('gp-intro' if gp else 'intro')
    assert x['beats'][-1]['scene']==('gp-answer' if gp else 'answer')
    assert x['beats'][-2]['scene']==('gp-practice' if gp else 'practice')
    bad=json.loads(json.dumps(x));bad['beats'][-1]['scene']='gp-practice' if gp else 'practice'
    try:validate_lesson(bad)
    except ValueError:pass
    else:raise AssertionError('Lost exercise order guard')
    print('PASS template validation, exact progression arithmetic and practice-answer sequencing:',lesson)


def main():
    p=argparse.ArgumentParser(description='TRACE audio-first lesson video factory')
    p.add_argument('action',choices=['validate','self-test','render'])
    p.add_argument('--lesson',default='g10-ch2-ap-sum')
    p.add_argument('--mode',choices=['demo','gemini','existing'],default='demo')
    p.add_argument('--existing-dir')
    p.add_argument('--cache',default='build/trace-video/voice-cache')
    p.add_argument('--output',default='build/trace-video/preview')
    p.add_argument('--width',type=int,default=720)
    p.add_argument('--height',type=int,default=1280)
    p.add_argument('--fps',type=int,default=12)
    p.add_argument('--limit-beats',type=int,default=0)
    args=p.parse_args()
    if args.action=='self-test':self_test(args.lesson)
    elif args.action=='validate':validate_lesson(load_lesson(args.lesson));print('PASS lesson:',args.lesson)
    else:render(args)

if __name__=='__main__':
    try:main()
    except (ValueError,RuntimeError,KeyError,AssertionError) as error:
        print('TRACE VIDEO FACTORY ERROR:',str(error),file=sys.stderr);sys.exit(1)
