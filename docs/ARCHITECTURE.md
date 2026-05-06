# ARCHITECTURE.md - System Design

## Overview

Falah Browser is a desktop application built with React and Electron. It aggregates Islamic community platforms (Telegram, Discord, WhatsApp) into a unified interface.

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Electron Shell                    │
│  ┌───────────────────────────────────────────────┐  │
│  │              React Application                │  │
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │         LanternCentral (Hub)            │  │  │
│  │  │  ┌───────────┐ ┌──────────────────┐   │  │  │
│  │  │  │ Spiritual │ │   Tab Navigation  │   │  │  │
│  │  │  │  Anchor   │ │  [Inbox|Discover] │   │  │  │
│  │  │  └───────────┘ └──────────────────┘   │  │  │
│  │  │                                          │  │  │
│  │  │  ┌─────────────────────────────────┐    │  │  │
│  │  │  │     Inbox Tab (Default)         │    │  │  │
│  │  │  │  ┌─────────────────────────┐    │    │  │  │
│  │  │  │  │     ChatWidget (x10)     │    │    │  │  │
│  │  │  │  │  - Telegram groups      │    │    │  │  │
│  │  │  │  │  - Discord servers     │    │    │  │  │
│  │  │  │  │  - WhatsApp groups     │    │    │  │  │
│  │  │  │  └─────────────────────────┘    │    │  │  │
│  │  │  └─────────────────────────────────┘    │  │  │
│  │  │                                          │  │  │
│  │  │  ┌─────────────────────────────────┐    │  │  │
│  │  │  │    Discover Tab                  │    │  │  │
│  │  │  │  ┌─────────────────────────┐    │    │  │  │
│  │  │  │  │    GroupCard (x10)      │    │    │  │  │
│  │  │  │  └─────────────────────────┘    │    │  │  │
│  │  │  └─────────────────────────────────┘    │  │  │
│  │  └─────────────────────────────────────────┘    │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── ErrorBoundary
├── ThemeProvider
└── Router
    └── LanternCentral (Main Hub)
        ├── Header (Logo, User Menu)
        ├── SpiritualAnchor
        │   ├── Prayer Time Display
        │   ├── Daily Verse (Arabic + English)
        │   └── Dua Streak Counter
        ├── Tab Navigation (Inbox / Discover)
        ├── Inbox View
        │   └── ChatWidget (repeated for each group)
        │       ├── Group Name + Platform Badge
        │       ├── Last Message Preview
        │       ├── Unread Count Badge
        │       └── Action Buttons (Open, Preview)
        ├── Discover View
        │   └── GroupCard (repeated for each group)
        │       ├── Group Name
        │       ├── Description
        │       ├── Member Count
        │       └── Join Button
        └── Footer
```

## Data Flow

### State Management

Currently uses React's built-in state management:
- `useState` for local component state
- Props for parent-child communication
- No global state management (Redux, Context) yet

### Mock Data (Current Phase)

- `src/utils/mockData.js` contains:
  - `MOCK_GROUPS` - 10 sample groups across platforms
  - `MOCK_VERSES` - 10 Quranic verses (Arabic + English)
  - `PRAYER_TIMES` - Hardcoded prayer times
  - `DISCOVER_GROUPS` - Groups for discover tab

### Future Data Flow (Phase 2+)

```
External APIs → Services → State Management → Components
     ↓              ↓             ↓              ↓
Telegram API → TelegramService → Global Store → ChatWidget
Discord API  → DiscordService → Global Store → ChatWidget
WhatsApp API → WhatsAppService→ Global Store → ChatWidget
```

## Design System

### Institutional Noir

- **Background**: `#0d0d10` (matte black)
- **Surface**: `#1a1a24` (elevated surface)
- **Gold**: `#c9983c` (accents, active states)
- **Jade**: `#10b981` (action buttons, success states)
- **Text Primary**: `#f5f5f5` (main text)
- **Text Secondary**: `#a1a1aa` (muted text)
- **Border**: `#2a2a3a` (subtle borders)

### Typography

- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, etc.)
- **Heading**: 24px, weight 700
- **Body**: 14px, weight 400
- **Small**: 12px, weight 400

### Spacing

- **Base Unit**: 4px
- **Padding**: 12px, 16px, 20px, 24px
- **Gap**: 8px, 12px, 16px
- **Border Radius**: 6px, 8px, 12px

## Widget Framework (Future)

Falah Browser uses a widget-based architecture for extensibility:

```javascript
// Widget Interface
interface Widget {
  id: string;
  name: string;
  icon: string;
  component: React.Component;
  platforms: ['telegram', 'discord', 'whatsapp'];
  isEnabled: boolean;
}

// Widget Registry
const widgets = [
  { id: 'chat', name: 'Chat Widget', component: ChatWidget, ... },
  { id: 'learning', name: 'Learning Widget', component: LearningWidget, ... },
  { id: 'matrimony', name: 'Matrimony Widget', component: MatrimonyWidget, ... },
  { id: 'shop', name: 'Shop Widget', component: ShopWidget, ... }
];
```

## Electron Integration

### Main Process (`public/electron/main.js`)

- Creates BrowserWindow
- Loads React app (dev server or build)
- Sets up application menu
- Handles IPC communication

### Preload Script (`public/electron/preload.js`)

- Exposes safe Electron API to renderer
- Context bridge for security
- IPC methods for app version, paths

### IPC Channels

- `app-get-version` - Get app version
- `app-get-path` - Get system paths
- Future: `telegram-login`, `discord-login`, etc.

## Build & Packaging

### React Build

- Uses Create React App (react-scripts)
- Output: `build/` folder
- Static files served by Electron

### Electron Builder

- Packages app for macOS, Windows, Linux
- Configuration in `package.json` under `"build"` key
- Output: `dist/` folder

### CI/CD Pipeline

```
GitHub Tag (v0.1.0)
       ↓
GitHub Actions Workflow
       ↓
Build Matrix (macOS, Windows, Linux)
       ↓
Run Tests → Build React → Package Electron → Create Release
       ↓
Upload Binaries to GitHub Release
```

## Security Considerations

1. **Context Isolation**: Enabled in Electron (preload script)
2. **Node Integration**: Disabled in renderer
3. **Content Security Policy**: To be added in Phase 2
4. **API Keys**: Stored in environment variables, never in code
5. **External Links**: Opened via `shell.openExternal()` (not loaded in Electron)

## Performance

- **Code Splitting**: Future enhancement (React.lazy)
- **Memoization**: Use React.memo for expensive components
- **Virtualization**: For long lists (react-window) in future
- **Image Optimization**: Lazy loading for group avatars

## Future Enhancements

### Phase 2 (v0.2.0) - Learning Widget
- YouTube API integration
- Video recommendations
- Watch history
- Teacher verification

### Phase 3 (v0.3.0) - Matrimony Widget
- Profile creation
- Match suggestions
- Messaging system
- Verification badges

### Phase 4 (v0.4.0) - Shop Widget
- Etsy/Shopify integration
- Halal product badges
- Unified cart (Falah Pay™)
- Order tracking

## File Structure

```
src/
├── components/
│   ├── LanternCentral.jsx    # Main hub (parent)
│   ├── ChatWidget.jsx        # Group card in inbox
│   ├── GroupCard.jsx         # Card in discover
│   └── SpiritualAnchor.jsx   # Prayer/verse/streak
├── styles/
│   ├── LanternCentral.css    # Component styles
│   └── globals.css           # Global styles
├── utils/
│   ├── mockData.js           # Test data
│   └── constants.js         # App constants
├── App.jsx                   # Root with routing
└── index.js                  # Entry point

public/
├── electron/
│   ├── main.js               # Electron main process
│   └── preload.js            # Preload script
└── index.html                # HTML template

tests/                        # Test files (moved to src/__tests__/)
├── LanternCentral.test.jsx
├── ChatWidget.test.jsx
└── App.test.jsx
```

---

This architecture supports the evolutionary growth from MVP to full-featured Islamic internet browser.