import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAppStore from './store/appStore';

// Components
import SplashScreen from './components/SplashScreen';
import OnboardingFlow from './components/Onboarding/OnboardingFlow';
import Layout from './components/Layout/Layout';

// Pages
import Home from './pages/Home';
import VoiceInput from './pages/VoiceInput';
import CropHealth from './pages/CropHealth';
import MarketPrices from './pages/MarketPrices';
import CropCalendar from './pages/CropCalendar';
import GovernmentSchemes from './pages/GovernmentSchemes';
import PlaceholderScreen from './pages/PlaceholderScreen';

function App() {
  const { loading, currentScreen, onboardingCompleted } = useAppStore();

  // Show splash screen while loading
  if (loading) {
    return <SplashScreen />;
  }

  // Show onboarding if not completed
  if (currentScreen === 'onboarding' || !onboardingCompleted) {
    return <OnboardingFlow />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="voice-input" element={<VoiceInput />} />
          <Route path="crop-health" element={<CropHealth />} />
          <Route path="market" element={<MarketPrices />} />
          <Route path="crop-calendar" element={<CropCalendar />} />
          <Route path="government-schemes" element={<GovernmentSchemes />} />
          <Route path="community" element={<PlaceholderScreen title="Community" />} />
          <Route path="profile" element={<PlaceholderScreen title="Profile" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;