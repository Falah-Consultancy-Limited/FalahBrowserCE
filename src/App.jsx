import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LanternCentral from './components/LanternCentral';
import './styles/globals.css';
import './styles/LanternCentral.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0d0d10',
          color: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h1 style={{ color: '#c9983c' }}>Something went wrong</h1>
          <p style={{ color: '#a1a1aa' }}>{this.state.error?.toString()}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#c9983c',
              color: '#0d0d10',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#0d0d10' : '#ffffff';
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

const NotFound = () => (
  <div style={{
    minHeight: '100vh',
    backgroundColor: '#0d0d10',
    color: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '16px'
  }}>
    <h1 style={{ fontSize: '72px', margin: 0 }}>404</h1>
    <p style={{ color: '#a1a1aa' }}>Page not found</p>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LanternCentral />} />
            <Route path="/discover" element={<LanternCentral />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;