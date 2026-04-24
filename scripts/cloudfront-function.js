// CloudFront Function — deploy this in AWS CloudFront > Functions
// Event type: viewer-request
// Attach to the distribution's Default (*) behavior
//
// Routing logic:
//   /                   → /landing/index.html  (landing page SPA)
//   /landing/*          → pass through          (landing assets)
//   /lms/*              → pass through          (LMS assets)
//   /api/*              → pass through          (backend proxy)
//   anything else       → /lms/index.html       (LMS SPA fallback)

function handler(event) {
  var uri = event.request.uri;

  // Pass through already-prefixed paths and API
  if (uri.startsWith('/landing/') || uri.startsWith('/lms/') || uri.startsWith('/api/')) {
    return event.request;
  }

  // Root → landing page
  if (uri === '/' || uri === '') {
    event.request.uri = '/landing/index.html';
    return event.request;
  }

  // Files with an extension → pass through (favicon, robots.txt, etc.)
  if (/\.[a-zA-Z0-9]+$/.test(uri)) {
    return event.request;
  }

  // All SPA routes (/login, /dashboard, /admin/*, etc.) → LMS SPA
  event.request.uri = '/lms/index.html';
  return event.request;
}
