#!/bin/bash
set -e

DISPLAY_NUM=99
DISPLAY=:${DISPLAY_NUM}
export DISPLAY

echo "🏮 Falah Browser — Container startup"

# ── 1. D-Bus session ─────────────────────────────────────────────
export DBUS_SESSION_BUS_ADDRESS=$(dbus-launch --sh-syntax | grep DBUS_SESSION_BUS_ADDRESS | cut -d= -f2- | tr -d \')
echo "✓ D-Bus ready"

# ── 2. Virtual framebuffer ───────────────────────────────────────
rm -f /tmp/.X${DISPLAY_NUM}-lock /tmp/.X11-unix/X${DISPLAY_NUM} 2>/dev/null || true
Xvfb :${DISPLAY_NUM} -screen 0 ${SCREEN_WIDTH}x${SCREEN_HEIGHT}x${SCREEN_DEPTH} \
    -ac +extension GLX +render -noreset &
XVFB_PID=$!
echo "✓ Xvfb PID=$XVFB_PID on :${DISPLAY_NUM}"
sleep 2

# ── 3. Window manager ────────────────────────────────────────────
openbox --display :${DISPLAY_NUM} &
echo "✓ Openbox started"
sleep 1

# ── 4. Electron ──────────────────────────────────────────────────
echo "🚀 Launching Electron…"
DISPLAY=:${DISPLAY_NUM} node_modules/.bin/electron . \
    --no-sandbox \
    --disable-gpu \
    --disable-dev-shm-usage \
    --disable-setuid-sandbox \
    --no-first-run &
ELECTRON_PID=$!
echo "✓ Electron PID=$ELECTRON_PID"
sleep 4

# ── 5. VNC server ────────────────────────────────────────────────
VNC_PORT=5900
if [ -n "$VNC_PASSWORD" ]; then
    mkdir -p /root/.vnc
    x11vnc -storepasswd "$VNC_PASSWORD" /root/.vnc/passwd
    x11vnc -display :${DISPLAY_NUM} \
        -rfbauth /root/.vnc/passwd \
        -rfbport ${VNC_PORT} \
        -forever -shared -bg \
        -o /var/log/x11vnc.log
else
    x11vnc -display :${DISPLAY_NUM} \
        -nopw -rfbport ${VNC_PORT} \
        -forever -shared -bg \
        -o /var/log/x11vnc.log
fi
echo "✓ x11vnc on port ${VNC_PORT}"
sleep 1

# ── 6. noVNC (WebSocket → VNC proxy) ─────────────────────────────
NOVNC_PORT=6080
websockify --web /usr/share/novnc \
    --heartbeat=30 \
    0.0.0.0:${NOVNC_PORT} \
    localhost:${VNC_PORT} &
NOVNC_PID=$!
echo "✓ noVNC/websockify PID=$NOVNC_PID on port ${NOVNC_PORT}"

echo ""
echo "════════════════════════════════════════════"
echo "  🏮 Falah Browser is ready"
echo "  Open → http://\$(hostname -I | awk '{print \$1}'):${NOVNC_PORT}/vnc.html"
echo "════════════════════════════════════════════"

# Keep alive — restart Electron if it crashes
while true; do
    if ! kill -0 $ELECTRON_PID 2>/dev/null; then
        echo "⚠ Electron exited — restarting…"
        DISPLAY=:${DISPLAY_NUM} node_modules/.bin/electron . \
            --no-sandbox --disable-gpu \
            --disable-dev-shm-usage --no-first-run &
        ELECTRON_PID=$!
    fi
    sleep 10
done
