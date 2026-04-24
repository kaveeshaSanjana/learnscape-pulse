import { readdir, stat, readFile } from 'node:fs/promises';
import { basename, join, relative, sep, extname, posix } from 'node:path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const APP_BUILD_DIR = process.env.APP_BUILD_DIR || 'dist';
const LANDING_BUILD_DIR = process.env.LANDING_BUILD_DIR || 'landing/dist';
const DEFAULT_BUCKET = process.env.AWS_S3_BUCKET;
const APP_BUCKET = process.env.APP_S3_BUCKET || DEFAULT_BUCKET;
const LANDING_BUCKET = process.env.LANDING_S3_BUCKET || DEFAULT_BUCKET;
const APP_PREFIX = (process.env.APP_PREFIX || '').replace(/^\/?|\/?$/g, '');
const LANDING_PREFIX = (process.env.LANDING_PREFIX || '').replace(/^\/?|\/?$/g, '');
const REGION = process.env.AWS_REGION || 'us-east-1';
const ENDPOINT = process.env.AWS_S3_ENDPOINT;

if (!DEFAULT_BUCKET && !APP_BUCKET && !LANDING_BUCKET) {
  throw new Error('Missing AWS_S3_BUCKET, APP_S3_BUCKET, or LANDING_S3_BUCKET environment variable');
}

const s3 = new S3Client({
  region: REGION,
  endpoint: ENDPOINT || undefined,
  forcePathStyle: Boolean(ENDPOINT),
});

const CONTENT_TYPE_MAP = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.map': 'application/octet-stream',
};

function getContentType(filePath) {
  return CONTENT_TYPE_MAP[extname(filePath).toLowerCase()] || 'application/octet-stream';
}

async function walkDir(directory) {
  const results = [];
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      results.push(...await walkDir(absolutePath));
    } else if (entry.isFile()) {
      results.push(absolutePath);
    }
  }
  return results;
}

function toS3Key(prefix, filePath, baseDir) {
  const relativePath = relative(baseDir, filePath).split(sep).join(posix.sep);
  if (!prefix) return relativePath;
  return `${prefix}/${relativePath}`.replace(/\/+/g, '/');
}

async function uploadFile(bucket, prefix, baseDir, filePath) {
  const key = toS3Key(prefix, filePath, baseDir);
  const contentType = getContentType(filePath);
  const body = await readFile(filePath);

  await s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  }));
  console.log(`Uploaded ${bucket}/${key}`);
}

async function uploadDirectory(bucket, prefix, buildDir) {
  if (!bucket) return;
  const files = await walkDir(buildDir);
  if (!files.length) {
    throw new Error(`No files found in ${buildDir}`);
  }

  console.log(`Uploading ${buildDir} → s3://${bucket}/${prefix || ''}`);
  for (const file of files) {
    await uploadFile(bucket, prefix, buildDir, file);
  }
}

async function main() {
  if (APP_BUCKET) {
    await uploadDirectory(APP_BUCKET, APP_PREFIX, APP_BUILD_DIR);
  }
  if (LANDING_BUCKET) {
    await uploadDirectory(LANDING_BUCKET, LANDING_PREFIX, LANDING_BUILD_DIR);
  }
}

main().catch((error) => {
  console.error('Upload failed:', error);
  process.exit(1);
});
