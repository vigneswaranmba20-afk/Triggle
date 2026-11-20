#!/usr/bin/env python3
"""Offline tests of Fola Gemini 3.8 voice config. No cloud calls."""
import base64
import importlib.util
from pathlib import Path
import unittest

ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('trace_video_factory',ROOT/'site/tools/trace_video_factory.py')
factory=importlib.util.module_from_spec(spec)
spec.loader.exec_module(factory)

class TestFola(unittest.TestCase):
    def test_two_narrated_lessons(self):
        for name in ('g10-ch2-ap-sum','g10-ch2-gp-sum'):
            lesson=factory.load_lesson(name)
            self.assertEqual(lesson['voice']['name'],'Fola')
            self.assertEqual(lesson['voice']['model'],'gemini-3.8-flash-tts')
            self.assertIn('Friendly',lesson['voice']['style'])
            self.assertEqual(len(lesson['beats']),9)

    def test_interactions_payload_never_reads_stage_directions(self):
        speech='Here we have five terms. Five divided by two gives two point five.'
        style='Friendly warm patient teacher'
        url,payload=factory._tts_request(speech,'gemini-3.8-flash-tts','Fola',style)
        self.assertEqual(url,'https://generativelanguage.googleapis.com/v1beta/interactions')
        self.assertEqual(payload['input'][0]['content'][0]['text'],speech)
        self.assertEqual(payload['input'][0]['content'][0]['annotations'][0]['style'],style)
        self.assertEqual(payload['generation_config']['speech_config'][0]['voice'],'Fola')
        self.assertEqual(payload['response_format']['mime_type'],'audio/wav')

    def test_output_audio_extraction_and_missing_audio_guard(self):
        audio=b'RIFF'+b'x'*3000
        result={'status':'completed','steps':[{'type':'model_output','content':[{'type':'audio','data':base64.b64encode(audio).decode(),'mime_type':'audio/wav'}]}]}
        part=factory._tts_audio_payload(result,'gemini-3.8-flash-tts')
        self.assertEqual(base64.b64decode(part['data']),audio)
        with self.assertRaises(RuntimeError):
            factory._tts_audio_payload({'status':'completed','steps':[]},'gemini-3.8-flash-tts')

if __name__=='__main__': unittest.main()
