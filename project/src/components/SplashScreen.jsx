import React, { useEffect } from 'react';
import { Leaf } from 'lucide-react';
import useAppStore from '../store/appStore';
import { getTranslation } from '../utils/translations';

const SplashScreen = () => {
  const { selectedLanguage, initializeApp } = useAppStore();

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8 animate-pulse-slow">
          <Leaf className="h-20 w-20 text-primary-500 mx-auto" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
          {getTranslation(selectedLanguage, 'appTitle')}
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 animate-fade-in">
          {getTranslation(selectedLanguage, 'appSubtitle')}
        </p>
        
        <div className="loading-dots mx-auto">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;