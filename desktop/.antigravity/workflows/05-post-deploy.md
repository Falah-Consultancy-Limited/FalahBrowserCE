# Phase 05: Post-Deploy - Verification & Monitoring

## Objective
To verify the health of the live deployment and ensure a zero-broken-link experience.

## Core Rules
1. **Link Crawling**: Execute scripts to crawl the application to verify all internal routes and external links.
2. **Asset Loading**: Verify that all images (lantern icon, assets) load correctly from the distribution bundle.
3. **Port Health**: Confirm that the local FastAPI sidecar is reachable and responding to classification requests.
4. **Performance Monitoring**: Check startup time and memory usage metrics.
5. **User Feedback Loop**: Implement local logging for user-reported spiritual guidance inaccuracies.

## Deliverables
- Post-Deployment Validation Script Results
- Link Integrity Report
- Health Check Dashboards (Local)
