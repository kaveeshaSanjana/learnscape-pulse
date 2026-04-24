import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep, extname, posix } from 'node:path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const BUILD_DIR = process.env.BUILD_DIR || 'dist';
const BUCKET    = process.env.AWS_S3_BUCKET;
const PREFIX    = (process.env.AWS_S3_PREFIX || '').replace(/^\/?|\/?$/g, '');
const REGION    = process.env.AWS_REGION || 'us-east-1';
const ENDPOINT  = process.env.AWS_S3_ENDPOINT;

if (!BUCKET) throw new Error('Missing AWS_S3_BUCKET environment variable');

const s3 = new S3Client({
  region: REGION,
  endpoint: ENDPOINT || undefined,
  forcePathStyle: Boolean(ENDPOINT),
});

const MIME = {
  '.html':  'text/html; charset=utf-8',
  '.js':    'application/javascript; charset=utf-8',
  '.css':   'text/css; charset=utf-8',
  '.json':  'application/json; charset=utf-8',
  '.svg':   'image/svg+xml',
  '.png':   'image/png',
  '.jpg':   'image/jpeg',
  '.jpeg':  'image/jpeg',
  '.gif':   'image/gif',
  '.webp':  'image/webp',
  '.avif':  'image/avif',
  '.ico':   'image/x-icon',
  '.woff':  'font/woff',
  '.woff2': 'font/woff2',
  '.ttf':   'font/ttf',
  '.eot':   'application/vnd.ms-fontobject',
  '.otf':   'font/otf',
  '.map':   'application/octet-stream',
};

function mime(file) {
  return MIME[extname(file).toLowerCase()] || 'application/octet-stream';
}

function cache(file) {
  return extname(file).toLowerCase() === '.html'
    ? 'no-cache, no-store, must-revalidate'
    : 'public, max-age=31536000, immutable';
}

function key(file) {
  const rel = relative(BUILD_DIR, file).split(sep).join(posix.sep);
  return PREFIX ? `${PREFIX}/${rel}`.replace(/\/+/g, '/') : rel;
}

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const abs = join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(abs));
    else if (e.isFile()) out.push(abs);
  }
  return out;
}

async function main() {
  const files = await walk(BUILD_DIR);
  if (!files.length) throw new Error(`No files found in ${BUILD_DIR}. Run: npm run build`);

  console.log(`Uploading ${BUILD_DIR}/ → s3://${BUCKET}/${PREFIX || ''}\n`);

  for (const file of files) {
    const k = key(file);
    await s3.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: k,
      Body: await readFile(file),
      ContentType: mime(file),
      CacheControl: cache(file),
    }));
    console.log(`  ✓ ${k}`);
  }

  console.log('\nDone.');
  console.log('  /        → index.html  (landing)');
  console.log('  /login   → app.html    (LMS SPA)');
}

main().catch(err => { console.error(err.message); process.exit(1); });
