import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import { initSDK } from './runanywhere';

// Temporary placeholder components for other routes
const Placeholder = ({ title }) => <div className="p-8 text-center text-xl font-bold">{title} Page Coming Soon</div>;

export default function App() {
  // Initialize AI SDK when the app loads
  useEffect(() => {
    initSDK().then(() => console.log("RunAnywhere AI SDK Initialized!"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fitness" element={<Placeholder title="Fitness" />} />
        <Route path="/diet" element={<Placeholder title="Diet" />} />
        <Route path="/medical" element={<Placeholder title="Medical" />} />
        <Route path="/ai-coach" element={<Placeholder title="AI Coach" />} />
      </Routes>
      <BottomNav />
    </div>
  );
}