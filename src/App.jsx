import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GamificationProvider } from './context/GamificationContext';
import LandingPage from './pages/LandingPage';
import TrainingModule from './pages/TrainingModule';
import GamificationMap from './pages/GamificationMap';
import OlympiadInfo from './pages/OlympiadInfo';
import Navigation from './components/Navigation';

function App() {
  return (
    <GamificationProvider>
      <Router>
        <div className="app-container">
          <Navigation />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/train" element={<TrainingModule />} />
            <Route path="/map" element={<GamificationMap />} />
            <Route path="/info" element={<OlympiadInfo />} />
          </Routes>
        </div>
      </Router>
    </GamificationProvider>
  );
}

export default App;
