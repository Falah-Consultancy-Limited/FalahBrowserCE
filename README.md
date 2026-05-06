# Falah Browser 🏮

**The Islamic Internet, Unified.**

Chat Widget MVP: Aggregate Telegram, Discord, and WhatsApp communities into a 
unified inbox inside a desktop browser. One login. No context switching. Just Islam, integrated.

## Features

✨ **Unified Inbox**
- All your Telegram groups, Discord servers, and WhatsApp communities in one place
- Unread counts aggregated across platforms
- See last message preview from each community

✨ **Spiritual Anchor**
- Prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha)
- Daily Quranic verse (Arabic + English translation)
- Dua streak counter

✨ **Discover Communities**
- Browse 50+ curated Islamic communities
- Join directly from the browser
- Community stats (member count, activity level)

✨ **Dark Theme**
- Institutional Noir design (matte blacks, gold accents)
- Easy on the eyes for long browsing sessions
- Fully responsive (desktop, tablet, mobile)

## Installation

### Download & Install (Recommended)

1. Go to [Releases](https://github.com/falahbrowser/falah-browser/releases)
2. Download the latest version:
   - **macOS**: `Falah-Browser-x.x.x.dmg`
   - **Windows**: `Falah-Browser-x.x.x-Setup.exe`
   - **Linux**: `falah-browser-x.x.x.AppImage`
3. Install and launch

### Build from Source

**Requirements:**
- Node.js 16+
- npm 7+

**Steps:**

```bash
# Clone repository
git clone https://github.com/falahbrowser/falah-browser.git
cd falah-browser

# Install dependencies
npm install

# Start development server
npm start

# Build production version
npm run build:mac    # macOS
npm run build:win    # Windows
npm run build:linux  # Linux
```

## Usage

1. **Open Falah Browser**
   - Desktop app or web version (future)

2. **View Your Communities**
   - Inbox tab shows all connected Telegram/Discord/WhatsApp groups
   - Click "Open in [Platform]" to chat
   - Click "Preview" to read messages in-browser (future)

3. **Discover New Communities**
   - Click "Discover" tab
   - Browse curated Islamic communities
   - Click "Join Group" to add to your inbox

4. **Check Prayer Times**
   - Prayer times update in real-time
   - Get notification reminders (future)

## Development

### Project Structure

```
falah-browser/
├── src/
│   ├── components/      # React components
│   ├── styles/          # CSS files
│   ├── utils/           # Helper functions
│   ├── App.jsx
│   └── index.js
├── public/
│   ├── electron/        # Electron main process
│   └── index.html
├── tests/               # Jest test files
├── docs/                # Documentation
├── .github/
│   └── workflows/       # GitHub Actions
└── package.json
```

### Available Scripts

- `npm start` - Start development server + Electron app
- `npm test` - Run test suite
- `npm run build` - Build production binaries
- `npm run build:mac` - Build macOS .dmg
- `npm run build:win` - Build Windows .exe
- `npm run build:linux` - Build Linux AppImage

### Contributing

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

## Roadmap

### Phase 1 (Current - v0.1.0)
- ✅ Chat Widget (Telegram, Discord, WhatsApp)
- ✅ Spiritual Anchor (prayer times, daily verse)
- ✅ Discover communities
- ⏳ Desktop app (macOS, Windows, Linux)

### Phase 2 (v0.2.0)
- 🔄 Learning Widget (YouTube, Vimeo, Skillshare)
- 🔄 Teacher verification system
- 🔄 Karma points for learning

### Phase 3 (v0.3.0)
- 🔄 Matrimony Widget (Muzz, Muzmatch integration)
- 🔄 Profile verification
- 🔄 Reputation system

### Phase 4 (v0.4.0)
- 🔄 Shop Widget (Etsy, Shopify integration)
- 🔄 Halal verification badges
- 🔄 Unified checkout (Falah Pay™)

## Technical Stack

- **Frontend**: React 19, CSS3
- **Desktop**: Electron 31
- **Packaging**: Electron Builder
- **Testing**: Jest, React Testing Library
- **Version Control**: Git, GitHub
- **CI/CD**: GitHub Actions

## Privacy & Security

- No tracking or telemetry
- All data stored locally on your device
- Open source (audit our code)
- Community verified groups
- No accounts required (yet)

## Support

- 📧 Email: support@falahbrowser.com
- 💬 Telegram: https://t.me/FalahBrowserOfficial
- 🐛 Issues: GitHub Issues
- 💡 Feature Requests: GitHub Discussions

## License

MIT License - See [LICENSE](./LICENSE) file for details

## Credits

Built with ❤️ by the Falah Community

- Founder: Jauhari Che Wan (Falah Consultancy)
- Contributors: [See CONTRIBUTORS.md](./docs/CONTRIBUTORS.md)

---

**فَلَاح** — Success through community 🏮