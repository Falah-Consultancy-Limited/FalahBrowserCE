FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive \
    DISPLAY=:99 \
    SCREEN_WIDTH=1280 \
    SCREEN_HEIGHT=800 \
    SCREEN_DEPTH=24 \
    NODE_ENV=production \
    BACKEND_URL=http://falah-backend:8000

# ── System dependencies ──────────────────────────────────────────
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl wget ca-certificates gnupg \
    # X11 virtual display + window manager
    xvfb x11vnc openbox \
    # noVNC (web VNC client) + websockify proxy
    novnc websockify \
    # Electron / Chromium runtime libraries
    libgtk-3-0 libnotify4 libnss3 libxss1 libxtst6 \
    libatspi2.0-0 libdrm2 libgbm1 libasound2 \
    libx11-xcb1 libxcb-dri3-0 libxcomposite1 libxcursor1 \
    libxdamage1 libxfixes3 libxi6 libxrandr2 libxrender1 \
    libx11-6 libxext6 libxkbcommon0 \
    # D-Bus (Electron tray + notifications)
    dbus dbus-x11 \
    # Fonts — noto covers Arabic, emoji, and Latin
    fonts-noto-core fonts-noto-color-emoji \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# ── Node.js 18 ───────────────────────────────────────────────────
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# ── App dependencies (cached layer) ─────────────────────────────
WORKDIR /app
COPY desktop/package.json desktop/package-lock.json ./
RUN npm install --legacy-peer-deps

# ── Source code ──────────────────────────────────────────────────
COPY desktop/ ./

# Build React/Vite frontend into dist/
RUN npx vite build

# ── noVNC custom landing page ─────────────────────────────────────
COPY docker/desktop/index.html /usr/share/novnc/index.html

# ── Startup ──────────────────────────────────────────────────────
COPY docker/desktop/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 5900 6080

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:6080/ || exit 1

CMD ["/start.sh"]
