import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';

// Import all your real pages
import Home from './pages/Home';
import Fitness from './pages/Fitness';
import Diet from './pages/Diet';
import Medical from './pages/Medical';
import AICoach from './pages/AICoach';

import { initSDK } from './runanywhere';

export default function App() {
  // Initialize AI SDK when the app loads
  useEffect(() => {
    initSDK()
      .then(() => console.log("RunAnywhere AI SDK Initialized!"))
      .catch((err) => console.error("SDK Init Error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* The Routes determine which page shows based on the URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fitness" element={<Fitness />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/medical" element={<Medical />} />
        <Route path="/ai-coach" element={<AICoach />} />
      </Routes>
      
      {/* Bottom Navigation is outside Routes so it stays visible on every page */}
      <BottomNav />
    </div>
  );
}