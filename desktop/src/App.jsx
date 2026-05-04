import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import BrowserShell from './components/BrowserShell';
import LanternHome from './components/LanternHome';
import Settings from './components/Settings';
import ReflectionMode from './components/ReflectionMode';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrowserShell />} />
        <Route path="/lantern" element={<LanternHome />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reflection" element={<ReflectionMode />} />
      </Routes>
    </Router>
  );
}

export default App;
