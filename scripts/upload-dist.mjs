import { readdir, readFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { join, relative, sep, extname, posix } from 'node:path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

function loadEnvFile(path) {
  if (!existsSync(path)) return;

  const content = readFileSync(path, 'utf-8');
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const eq = line.indexOf('=');
    if (eq <= 0) continue;

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile('.env');
loadEnvFile('.env.production');

const BUILD_DIR = process.env.BUILD_DIR || 'dist';
const BUCKET = process.env.AWS_S3_BUCKET;
const PREFIX = (process.env.AWS_S3_PREFIX || '').replace(/^\/?|\/?$/g, '');
const REGION = process.env.AWS_REGION || 'us-east-1';
const ENDPOINT = process.env.AWS_S3_ENDPOINT;

if (!BUCKET) {
  throw new Error('Missing AWS_S3_BUCKET. Set it in shell or .env.production');
}

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
  if (!existsSync(BUILD_DIR)) {
    throw new Error(`Build folder not found: ${BUILD_DIR}. Run: npm run build`);
  }

  const files = await walk(BUILD_DIR);
  if (!files.length) throw new Error(`No files found in ${BUILD_DIR}. Run: npm run build`);

  const hasIndex = files.some((file) => key(file) === (PREFIX ? `${PREFIX}/index.html` : 'index.html'));
  if (!hasIndex) {
    throw new Error('index.html was not found in build output. Ensure you built the Vite app correctly.');
  }

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
  console.log(`  Uploaded to s3://${BUCKET}/${PREFIX || ''}`);
  console.log('  Root file: index.html');
  console.log('  Note: configure SPA fallback (403/404 -> /index.html) in CloudFront or S3 website hosting.');
}

main().catch(err => { console.error(err.message); process.exit(1); });
