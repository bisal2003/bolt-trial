import React, { useState } from 'react';
import useAppStore from '../../store/appStore';
import { getTranslation } from '../../utils/translations';

const crops = [
  { id: 'tomato', nameKey: 'tomato', emoji: '🍅' },
  { id: 'wheat', nameKey: 'wheat', emoji: '🌾' },
  { id: 'rice', nameKey: 'rice', emoji: '🍚' },
  { id: 'onion', nameKey: 'onion', emoji: '🧅' },
  { id: 'potato', nameKey: 'potato', emoji: '🥔' },
  { id: 'corn', nameKey: 'corn', emoji: '🌽' },
  { id: 'cotton', nameKey: 'cotton', emoji: '☁️' },
  { id: 'sugarcane', nameKey: 'sugarcane', emoji: '🎋' },
  { id: 'banana', nameKey: 'banana', emoji: '🍌' },
  { id: 'mango', nameKey: 'mango', emoji: '🥭' },
  { id: 'apple', nameKey: 'apple', emoji: '🍎' },
  { id: 'grape', nameKey: 'grape', emoji: '🍇' },
];

const CropSelection = ({ onNext }) => {
  const { selectedLanguage, setCrops } = useAppStore();
  const [selectedCrops, setSelectedCrops] = useState([]);
  const maxCrops = 8;

  const toggleCrop = (cropId) => {
    setSelectedCrops(prev => {
      if (prev.includes(cropId)) {
        return prev.filter(id => id !== cropId);
      } else if (prev.length < maxCrops) {
        return [...prev, cropId];
      }
      return prev;
    });
  };

  const handleNext = () => {
    setCrops(selectedCrops);
    onNext();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {getTranslation(selectedLanguage, 'selectCrops')}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {getTranslation(selectedLanguage, 'selectCropsDesc')}
          </p>
          <div className="text-xl font-semibold text-primary-600">
            {selectedCrops.length}/{maxCrops}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {crops.map((crop) => (
            <button
              key={crop.id}
              onClick={() => toggleCrop(crop.id)}
              className={`
                relative aspect-square p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105
                ${selectedCrops.includes(crop.id)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-3xl mb-2">{crop.emoji}</span>
                <span className={`
                  text-sm font-medium text-center
                  ${selectedCrops.includes(crop.id)
                    ? 'text-primary-700'
                    : 'text-gray-700'
                  }
                `}>
                  {getTranslation(selectedLanguage, crop.nameKey)}
                </span>
              </div>
              
              {selectedCrops.includes(crop.id) && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleNext}
            disabled={selectedCrops.length === 0}
            className={`
              px-12 py-4 rounded-lg font-semibold text-lg transition-colors duration-200
              ${selectedCrops.length > 0
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

export default CropSelection;