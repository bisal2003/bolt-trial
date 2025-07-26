import React from 'react';
import useAppStore from '../store/appStore';
import { getTranslation } from '../utils/translations';

const PlaceholderScreen = ({ title }) => {
  const { selectedLanguage } = useAppStore();
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-8xl mb-8">🚧</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {getTranslation(selectedLanguage, 'comingSoon')}
        </h2>
        <p className="text-lg text-gray-600 max-w-md">
          {getTranslation(selectedLanguage, 'featureUnderDevelopment')}
        </p>
      </div>
    </div>
  );
};

export default PlaceholderScreen;