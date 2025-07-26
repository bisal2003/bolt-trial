import React from 'react';
import { Stethoscope, Package, Users } from 'lucide-react';
import useAppStore from '../../store/appStore';
import { getTranslation } from '../../utils/translations';

const features = [
  {
    id: 1,
    titleKey: 'instantDiseaseDetection',
    descriptionKey: 'diseaseDetectionDesc',
    icon: Stethoscope,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    id: 2,
    titleKey: 'greatProductDeals',
    descriptionKey: 'productDealsDesc',
    icon: Package,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
  {
    id: 3,
    titleKey: 'supportiveCommunity',
    descriptionKey: 'communityDesc',
    icon: Users,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
];

const FeatureWalkthrough = ({ currentStep, onNext, onSkip }) => {
  const { selectedLanguage } = useAppStore();
  const feature = features[currentStep - 2]; // Adjust for 0-based indexing (steps 2-4)
  const Icon = feature.icon;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className={`
          w-40 h-40 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-8
        `}>
          <Icon className={`h-20 w-20 ${feature.color}`} />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {getTranslation(selectedLanguage, feature.titleKey)}
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed px-4">
          {getTranslation(selectedLanguage, feature.descriptionKey)}
        </p>
        
        {/* Pagination dots */}
        <div className="flex justify-center space-x-2 mb-12">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`
                h-2 rounded-full transition-all duration-300
                ${index === currentStep - 2
                  ? 'w-8 bg-primary-500'
                  : 'w-2 bg-gray-300'
                }
              `}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onSkip}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
          >
            {getTranslation(selectedLanguage, 'skip')}
          </button>
          
          <button
            onClick={onNext}
            className="btn-primary px-8 py-3"
          >
            {getTranslation(selectedLanguage, 'next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureWalkthrough;