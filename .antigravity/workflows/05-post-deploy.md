# 05-post-deploy.md: Rules for Post-Deployment Validation

## 1. Link & Asset Crawling
- Run a validator script to crawl the live URL and verify:
  - No broken internal or external links (HTTP 404).
  - All assets (images, scripts, styles) load successfully (HTTP 200).
  - Proper heading hierarchy and SEO metadata.

## 2. Health & Performance Monitoring
- Verify port health via remote probes.
- Measure PageSpeed scores and core web vitals.
- Audit security headers (HSTS, CSP, X-Frame-Options).

## 3. Live Sanity Checks
- Execute a suite of "smoke tests" against the production environment using real user personas.
- Validate that the deployment matches the expected version tag.
