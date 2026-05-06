# SETUP.md - Developer Guide

## Prerequisites

- Node.js 16+ (recommended Node 18 LTS)
- npm 7+
- Git

## Installation

```bash
# Clone the repository
git clone https://github.com/falahbrowser/falah-browser.git
cd falah-browser

# Install dependencies
npm install
```

## Environment Variables

Create `.env.development` and `.env.production` files:

### .env.development
```
REACT_APP_ENV=development
REACT_APP_VERSION=0.1.0
```

### .env.production
```
REACT_APP_ENV=production
REACT_APP_VERSION=0.1.0
```

### .electronrc
```
ELECTRON_ENABLE_LOGGING=true
```

## Running the App

### Development Mode
```bash
npm start
```
This starts both the React dev server and Electron app concurrently.

### Production Build
```bash
# Build for current platform
npm run build

# Build for specific platforms
npm run build:mac    # macOS
npm run build:win    # Windows
npm run build:linux  # Linux
```

## Project Structure

```
src/
├── components/          # React components
│   ├── LanternCentral.jsx   # Main hub component
│   ├── ChatWidget.jsx       # Group card component
│   ├── GroupCard.jsx        # Discover section card
│   └── SpiritualAnchor.jsx  # Prayer times, verse, streak
├── styles/             # CSS files
│   ├── LanternCentral.css   # Main component styles
│   └── globals.css          # Global styles and resets
├── utils/              # Utilities
│   ├── mockData.js          # Mock groups, verses, prayer times
│   └── constants.js         # App constants and colors
├── App.jsx             # Root component with routing
└── index.js            # Entry point
```

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- --testPathPattern=LanternCentral
```

## Debugging

### React DevTools
Install React DevTools browser extension for component debugging.

### Electron DevTools
In development mode, DevTools open automatically with Electron.

### Common Issues

**Port 3000 already in use:**
```bash
# Kill process using port 3000
npx kill-port 3000
```

**Electron fails to start:**
- Ensure all dependencies installed: `npm install`
- Check Node version compatibility
- Delete `node_modules` and reinstall

## Building for Distribution

### macOS
```bash
npm run build:mac
```
Output: `dist/Falah-Browser-0.1.0.dmg`

### Windows
```bash
npm run build:win
```
Output: `dist/Falah-Browser-0.1.0-Setup.exe`

### Linux
```bash
npm run build:linux
```
Output: `dist/falah-browser-0.1.0.AppImage`

## Code Style

- Use Prettier for formatting: `npx prettier --write .`
- Follow existing code conventions
- Use functional components with hooks
- CSS-in-JS style objects for component styling

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.