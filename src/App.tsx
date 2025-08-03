import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Admin from './pages/Admin';
import About from './pages/About';
import { DetectionResult } from './types';
import { initializeDatabase } from './utils/database';

function App() {
  const [detectionHistory, setDetectionHistory] = useState<DetectionResult[]>([]);

  useEffect(() => {
    initializeDatabase();
    const stored = localStorage.getItem('cyberShieldHistory');
    if (stored) {
      setDetectionHistory(JSON.parse(stored));
    }
  }, []);

  const addDetectionResult = (result: DetectionResult) => {
    const newHistory = [...detectionHistory, result];
    setDetectionHistory(newHistory);
    localStorage.setItem('cyberShieldHistory', JSON.stringify(newHistory));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={<Home onDetectionResult={addDetectionResult} />} 
            />
            <Route 
              path="/admin" 
              element={<Admin detectionHistory={detectionHistory} />} 
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;