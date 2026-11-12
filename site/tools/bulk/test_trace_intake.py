import io, json, tempfile, unittest, zipfile
from pathlib import Path
from trace_intake import identity, extract, published_identity

class TraceIntakeTests(unittest.TestCase):
    def test_grade_is_not_silently_relabelled(self):
        r = {'classNum': 12, 'chapter': '1', 'label': {'en': 'Exercise 1.1 · Q2(ii)'}}
        self.assertEqual(published_identity(r), 'g12/ch1/ex1.1/q2/ii')
        with self.assertRaises(ValueError):
            published_identity({**r, 'classNum': 8})

    def test_unsafe_and_duplicate_archive_members_rejected(self):
        import warnings
        for names in [('chapter-01/questions.json', '../escape'), ('PROGRESS.json', 'PROGRESS.json')]:
            with self.subTest(names=names), tempfile.TemporaryDirectory() as d:
                p = Path(d) / 'bad.zip'
                with warnings.catch_warnings():
                    warnings.simplefilter('ignore', UserWarning)
                    with zipfile.ZipFile(p, 'w') as z:
                        for name in names: z.writestr(name, '{}')
                with self.assertRaises(ValueError): extract([p])

    def test_zip_size_limit_precedes_decompression(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / 'large.zip'
            with zipfile.ZipFile(p, 'w', compression=zipfile.ZIP_DEFLATED) as z:
                z.writestr('large.json', ' ' * (4 * 1024 * 1024 + 1))
            with self.assertRaisesRegex(ValueError, 'limit'): extract([p])
    def test_canonical_ids(self):
        self.assertEqual(identity('g10-ch01-ex1.2-q1-i'), 'g10/ch1/ex1.2/q1/i')
        self.assertEqual(identity('g10-ch08-ex8.1-q4'), 'g10/ch8/ex8.1/q4/-')
        self.assertIsNone(identity('bad-id'))
    def test_published_label_is_only_possible_match(self):
        self.assertEqual(published_identity({'chapter':'6','label':{'en':'Exercise 6.1 · Q2(ii)'}}), 'g10/ch6/ex6.1/q2/ii')
    def test_reconcile_without_promoting(self):
        with tempfile.TemporaryDirectory() as d:
            path=Path(d)/'G10_W1_test_WIP.zip'
            with zipfile.ZipFile(path,'w') as z:
                z.writestr('chapter-01/questions.json', json.dumps([{'id':'g10-ch01-ex1.2-q1-i','english':'A?','tamil':'B?', 'quick_solution':['x'], 'status':'claimed'}]))
                z.writestr('PROGRESS.json',json.dumps({'release_ready':False}))
                z.writestr('SOURCE_MANIFEST.json','{}')
            r=extract([path],[{'id':'g10-ch01-ex1.2-q1-i','pr':114}])
            self.assertEqual(r['summary']['records_overlapping_supplied_drafts'],1)
            self.assertFalse(r['records'][0]['student_live_verified'])
            self.assertFalse(r['records'][0]['source_checked'])
            self.assertFalse(r['records'][0]['source_verified_claimed'])
            self.assertFalse(r['summary']['chapter_complete'])
    def test_corrupt_zip_fails(self):
        with tempfile.TemporaryDirectory() as d:
            p=Path(d)/'G10_W1_test_WIP.zip';p.write_bytes(b'corrupt')
            with self.assertRaises(zipfile.BadZipFile): extract([p])

if __name__ == '__main__': unittest.main()
