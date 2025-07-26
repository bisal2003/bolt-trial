import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import useAppStore from '../../store/appStore';
import { getTranslation } from '../../utils/translations';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'hi', name: 'हिंदी (Hindi)' },
];

const LanguageSelection = ({ onNext }) => {
  const { selectedLanguage, setLanguage } = useAppStore();
  const [tempLanguage, setTempLanguage] = useState(selectedLanguage);

  const handleAccept = () => {
    setLanguage(tempLanguage);
    onNext();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Leaf className="h-16 w-16 text-primary-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {getTranslation(tempLanguage, 'selectLanguage')}
          </h1>
        </div>

        <div className="space-y-3 mb-8">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => setTempLanguage(language.name)}
              className={`
                w-full flex items-center p-4 rounded-lg border-2 transition-all duration-200
                ${tempLanguage === language.name
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className={`
                w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center
                ${tempLanguage === language.name
                  ? 'border-primary-500'
                  : 'border-gray-300'
                }
              `}>
                {tempLanguage === language.name && (
                  <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />
                )}
              </div>
              <span className={`
                text-left font-medium
                ${tempLanguage === language.name
                  ? 'text-primary-700'
                  : 'text-gray-700'
                }
              `}>
                {language.name}
              </span>
            </button>
          ))}
        </div>

        <div className="text-center mb-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            {getTranslation(tempLanguage, 'termsText')}{' '}
            <span className="text-primary-600 underline cursor-pointer">
              {getTranslation(tempLanguage, 'termsOfUse')}
            </span>{' '}
            {getTranslation(tempLanguage, 'and')}{' '}
            <span className="text-primary-600 underline cursor-pointer">
              {getTranslation(tempLanguage, 'privacyPolicy')}
            </span>
          </p>
        </div>

        <button
          onClick={handleAccept}
          className="w-full btn-primary py-4 text-lg font-semibold"
        >
          {getTranslation(tempLanguage, 'accept')}
        </button>
      </div>
    </div>
  );
};

export default LanguageSelection;