import { cpSync, existsSync, mkdirSync, renameSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..');
const landingDist = resolve(root, 'landing', 'dist');
const appDist = resolve(root, 'dist');

if (!existsSync(landingDist)) {
  throw new Error(`Landing build not found at: ${landingDist}\nRun: npm --prefix landing run build:embed`);
}

// 1. LMS index.html stays as index.html (CloudFront error pages → /index.html → LMS SPA)
const appIndex = resolve(appDist, 'index.html');
if (!existsSync(appIndex)) throw new Error(`LMS build not found at: ${appIndex}`);
console.log('✓ dist/index.html = LMS SPA (CloudFront error page target)');

// 2. Merge landing assets into dist/assets/ (hashed filenames never collide)
const landingAssets = resolve(landingDist, 'assets');
if (existsSync(landingAssets)) {
  const dest = resolve(appDist, 'assets');
  mkdirSync(dest, { recursive: true });
  cpSync(landingAssets, dest, { recursive: true });
  console.log('✓ Merged landing assets → dist/assets/');
}

// 3. Copy landing index.html → dist/landing.html (CloudFront default root object)
const landingIndex   = resolve(landingDist, 'index.html');
const destLanding    = resolve(appDist, 'landing.html');
writeFileSync(destLanding, readFileSync(landingIndex, 'utf-8'));
console.log('✓ Copied landing index.html → dist/landing.html');

// 4. Copy public files (favicon etc.)
const publicDir = resolve(root, 'public');
for (const file of ['favicon.ico', 'robots.txt', 'icons.svg', 'placeholder.svg']) {
  const src = resolve(publicDir, file);
  if (existsSync(src)) cpSync(src, resolve(appDist, file));
}
console.log('✓ Synced public files to dist/');

console.log('\nBuild complete:');
console.log('  /             → dist/landing.html  (landing — CloudFront default root object)');
console.log('  /login, etc.  → dist/index.html    (LMS SPA — CloudFront error page target)');
