# 04-devops.md: Rules for Infrastructure Readiness and Deployment

## 1. Network & Port Management
- Check host port availability before deployment to prevent `address already in use` errors.
- Ensure all services communicate via internal Docker networks, exposing only the Gateway port.

## 2. Deployment Configurations
- Maintain production-ready `docker-compose.yml` with:
  - Resource limits (CPU/Memory).
  - Health checks for all services.
  - Restart policies.
- Deployment targets: Portainer (Stacks), Netlify (Frontend), Cloudflare (DNS/SSL).

## 3. CI/CD Pipeline
- Automated builds for all microservices.
- Automatic deployment to staging/production on merge to `main`.
- Webhook notifications for deployment status (Slack/Email).
