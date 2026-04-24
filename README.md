# ThilinaDhananjaya LMS Frontend

Production React + TypeScript + Vite frontend.

## Run Local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Build output is created in dist.

## Upload Dist To S3

The upload script now reads AWS settings from shell variables and from .env /.env.production.

Required:
- AWS_S3_BUCKET

Optional:
- AWS_REGION (default: us-east-1)
- AWS_S3_PREFIX
- AWS_S3_ENDPOINT
- BUILD_DIR (default: dist)

Example .env.production:

```env
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1
AWS_S3_PREFIX=
```

Upload:

```bash
npm run upload
```

Build and upload together:

```bash
npm run deploy
```

## Make The Site Open Correctly After Upload

Upload alone is not enough. Hosting must serve index.html to browsers.

For CloudFront + S3:
- Default Root Object: index.html
- Custom error response: 403 -> /index.html (HTTP 200)
- Custom error response: 404 -> /index.html (HTTP 200)
- Ensure CloudFront has read access to bucket (OAC/OAI + bucket policy)

For S3 Static Website Hosting:
- Enable static website hosting
- Index document: index.html
- Error document: index.html
- Bucket/object read access must allow the website endpoint to read files

## Base Path

Default base path is /.

If deploying under a subpath, set:

```env
VITE_BASE_PATH=/your-subpath/
```
