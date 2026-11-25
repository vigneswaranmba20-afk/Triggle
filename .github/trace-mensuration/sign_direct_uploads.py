"""Use the existing R2 connection to sign create-only PUTs for approved bytes."""
import json
import os
from pathlib import Path
import re
import sys

import boto3
from botocore.config import Config

from register_mensuration import ORIGIN, release_records

account = os.environ.get("R2_ACCOUNT_ID", "")
bucket = os.environ.get("R2_BUCKET", "")
origin = os.environ.get("R2_PUBLIC_BASE_URL", "").rstrip("/")
if not re.fullmatch(r"[a-f0-9]{32}", account) or bucket != "triggle-lessons" or origin != ORIGIN:
    raise SystemExit("The configured R2 bindings do not match Triggle's confirmed lesson bucket.")
if not all(os.environ.get(name) for name in ("AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY")):
    raise SystemExit("The existing R2 write credentials are unavailable to this job.")

client = boto3.client("s3", endpoint_url=f"https://{account}.r2.cloudflarestorage.com",
                      region_name="auto", config=Config(signature_version="s3v4", s3={"addressing_style":"path"}))
rows = release_records(json.loads(Path(sys.argv[1]).read_text()))
upload = []
for lesson, row in rows.items():
    if not re.fullmatch(r"[A-Za-z0-9+/]{22}==", row["contentMd5"]):
        raise SystemExit("The transfer did not specify an exact object checksum.")
    headers = {"Content-Type":"video/mp4", "Content-Length":str(row["bytes"]),
               "Cache-Control":"public,max-age=31536000,immutable", "If-None-Match":"*",
               "Content-MD5":row["contentMd5"]}
    url = client.generate_presigned_url("put_object", Params={
        "Bucket":bucket, "Key":f"trace-videos/{lesson}/{row['sha256']}.mp4",
        "ContentType":headers["Content-Type"], "ContentLength":row["bytes"],
        "CacheControl":headers["Cache-Control"], "IfNoneMatch":headers["If-None-Match"],
        "ContentMD5":headers["Content-MD5"],
    }, ExpiresIn=900, HttpMethod="PUT")
    upload.append({"id":lesson, "url":url, "headers":headers})
Path(sys.argv[2]).write_text(json.dumps(upload)+"\n")
