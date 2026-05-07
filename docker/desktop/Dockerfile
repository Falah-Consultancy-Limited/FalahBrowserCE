# ═══════════════════════════════════════════════
#  Stage 1 — Vite frontend build
# ═══════════════════════════════════════════════
FROM node:18-slim AS web-builder

ENV ELECTRON_SKIP_BINARY_DOWNLOAD=1

WORKDIR /build

# Install deps (cached separately from source)
COPY desktop/package.json ./
RUN npm install --legacy-peer-deps

# Copy only the files Vite needs to build
COPY desktop/index.html desktop/vite.config.js \
     desktop/postcss.config.cjs desktop/tailwind.config.cjs ./
COPY desktop/public ./public
COPY desktop/src ./src

# Build the React app → /build/dist/
RUN ./node_modules/.bin/vite build


# ═══════════════════════════════════════════════
#  Stage 2 — Electron + noVNC runtime
# ═══════════════════════════════════════════════
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive \
    DISPLAY=:99 \
    SCREEN_WIDTH=1280 \
    SCREEN_HEIGHT=800 \
    SCREEN_DEPTH=24 \
    NODE_ENV=production \
    BACKEND_URL=http://falah-backend:8000

# ── System deps ──────────────────────────────────────────────────
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl wget ca-certificates gnupg \
    xvfb x11vnc openbox \
    novnc websockify \
    libgtk-3-0 libnotify4 libnss3 libxss1 libxtst6 \
    libatspi2.0-0 libdrm2 libgbm1 libasound2 \
    libx11-xcb1 libxcb-dri3-0 libxcomposite1 libxcursor1 \
    libxdamage1 libxfixes3 libxi6 libxrandr2 libxrender1 \
    libx11-6 libxext6 libxkbcommon0 \
    dbus dbus-x11 \
    fonts-noto-core fonts-noto-color-emoji \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# ── Node.js 18 ───────────────────────────────────────────────────
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install only what Electron needs to run (skip devtools build)
COPY desktop/package.json ./
RUN npm install --legacy-peer-deps

# Copy pre-built frontend from stage 1
COPY --from=web-builder /build/dist ./dist

# Electron entry points
COPY desktop/main.cjs desktop/preload.cjs ./
COPY desktop/public ./public

# noVNC landing page
COPY docker/desktop/index.html /usr/share/novnc/index.html

# Startup script
COPY docker/desktop/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 5900 6080

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:6080/ || exit 1

CMD ["/start.sh"]
