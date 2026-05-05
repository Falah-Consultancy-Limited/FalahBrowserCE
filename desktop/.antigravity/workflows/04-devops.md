# Phase 04: DevOps - Infrastructure & Deployment

## Objective
To ensure infrastructure readiness and seamless deployment across multiple platforms.

## Core Rules
1. **Environment Readiness**: Check port availability (8000 for FastAPI, 5173 for Vite) and network configurations.
2. **Infrastructure as Code**: Define deployment configurations for Portainer (Stacks), Netlify, or Cloudflare.
3. **CI/CD**: Automate builds via GitHub Actions. Every push to `main` must trigger a build and test run.
4. **Binary Bundling**: Configure `electron-builder` for multi-platform distribution (dmg, exe, AppImage).
5. **Local Sidecar**: Ensure the Python environment is correctly bundled or detected on host machines.

## Deliverables
- Deployment YAMLs (Portainer/Docker)
- GitHub Actions Workflows
- Production-Ready Binaries
