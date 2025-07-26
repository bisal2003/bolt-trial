import React, { useState } from 'react';
import { Flower, Home, Wheat } from 'lucide-react';
import useAppStore from '../../store/appStore';
import { getTranslation } from '../../utils/translations';

const farmingTypes = [
  {
    id: 'pots',
    titleKey: 'growInPots',
    descriptionKey: 'potsDesc',
    icon: Flower,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
  },
  {
    id: 'garden',
    titleKey: 'growInGarden',
    descriptionKey: 'gardenDesc',
    icon: Home,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    id: 'fields',
    titleKey: 'growInFields',
    descriptionKey: 'fieldsDesc',
    icon: Wheat,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
];

const FarmingTypeSelection = ({ onNext, onSkip }) => {
  const { selectedLanguage, setFarmingType } = useAppStore();
  const [selectedType, setSelectedType] = useState('');

  const handleNext = () => {
    if (selectedType) {
      setFarmingType(selectedType);
    }
    onNext();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {getTranslation(selectedLanguage, 'chooseFarmingType')}
          </h1>
          <p className="text-lg text-gray-600">
            {getTranslation(selectedLanguage, 'farmingTypeDesc')}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {farmingTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`
                  w-full flex items-center p-6 rounded-xl border-2 transition-all duration-200 text-left
                  ${selectedType === type.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className={`
                  w-16 h-16 ${type.bgColor} rounded-full flex items-center justify-center mr-4
                `}>
                  <Icon className={`h-8 w-8 ${type.color}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`
                      text-lg font-semibold
                      ${selectedType === type.id ? 'text-primary-700' : 'text-gray-900'}
                    `}>
                      {getTranslation(selectedLanguage, type.titleKey)}
                    </h3>
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${selectedType === type.id
                        ? 'border-primary-500'
                        : 'border-gray-300'
                      }
                    `}>
                      {selectedType === type.id && (
                        <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {getTranslation(selectedLanguage, type.descriptionKey)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onSkip}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
          >
            {getTranslation(selectedLanguage, 'skip')}
          </button>
          
          <button
            onClick={handleNext}
            disabled={!selectedType}
            className={`
              px-8 py-3 rounded-lg font-semibold transition-colors duration-200
              ${selectedType
                ? 'bg-primary-500 hover:bg-primary-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {getTranslation(selectedLanguage, 'next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmingTypeSelection;