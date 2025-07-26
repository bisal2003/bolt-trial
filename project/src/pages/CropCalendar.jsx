import React, { useState } from 'react';
import { Calendar, Droplets, Sun, Thermometer, AlertTriangle } from 'lucide-react';
import useAppStore from '../store/appStore';
import { getTranslation } from '../utils/translations';

const CropCalendar = () => {
  const { selectedLanguage, selectedCrops } = useAppStore();
  const [selectedCrop, setSelectedCrop] = useState(selectedCrops[0] || 'tomato');
  const [currentWeek, setCurrentWeek] = useState(1);
  const [weatherData] = useState({
    temperature: 28,
    humidity: 65,
    rainfall: 12,
    condition: 'Partly Cloudy'
  });

  const cropCalendarData = {
    tomato: {
      totalWeeks: 16,
      phases: [
        { phase: 'Seed Preparation', weeks: [1, 2], color: '#8B5CF6' },
        { phase: 'Sowing', weeks: [3, 4], color: '#22C55E' },
        { phase: 'Germination', weeks: [5, 6], color: '#3B82F6' },
        { phase: 'Vegetative Growth', weeks: [7, 8, 9, 10], color: '#F59E0B' },
        { phase: 'Flowering', weeks: [11, 12], color: '#EC4899' },
        { phase: 'Fruit Development', weeks: [13, 14], color: '#EF4444' },
        { phase: 'Harvest', weeks: [15, 16], color: '#10B981' }
      ],
      weeklyTasks: {
        1: ['Prepare seedbed', 'Select quality seeds', 'Check soil pH'],
        2: ['Treat seeds with fungicide', 'Prepare nursery area'],
        3: ['Sow seeds in nursery', 'Water gently', 'Provide shade'],
        4: ['Monitor germination', 'Remove weak seedlings'],
        5: ['Transplant seedlings', 'Apply base fertilizer'],
        6: ['Water regularly', 'Check for pests'],
        7: ['Apply first dose of fertilizer', 'Stake plants'],
        8: ['Prune suckers', 'Monitor for diseases'],
        9: ['Apply second fertilizer dose', 'Check irrigation'],
        10: ['Monitor growth', 'Apply pesticide if needed'],
        11: ['Support flowering', 'Reduce nitrogen'],
        12: ['Hand pollination if needed', 'Monitor fruit set'],
        13: ['Support heavy branches', 'Regular watering'],
        14: ['Monitor fruit development', 'Check for fruit flies'],
        15: ['Harvest ripe fruits', 'Check market prices'],
        16: ['Complete harvest', 'Prepare for next crop']
      }
    }
  };

  const getCurrentPhase = () => {
    const data = cropCalendarData[selectedCrop];
    if (!data) return null;
    
    return data.phases.find(phase => 
      phase.weeks.includes(currentWeek)
    );
  };

  const getWeeklyTasks = () => {
    const data = cropCalendarData[selectedCrop];
    return data?.weeklyTasks[currentWeek] || [];
  };

  const getWeatherRecommendation = () => {
    const currentPhase = getCurrentPhase();
    if (!currentPhase) return '';

    if (weatherData.rainfall > 20 && currentPhase.phase === 'Flowering') {
      return 'High rainfall may affect pollination. Consider protective measures.';
    }
    if (weatherData.temperature > 35 && currentPhase.phase === 'Fruit Development') {
      return 'High temperature may cause fruit cracking. Increase irrigation.';
    }
    return 'Weather conditions are favorable for current growth phase.';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getTranslation(selectedLanguage, 'cropCalendar')}
        </h1>
        <p className="text-gray-600">
          Track your crop's growth phases and get weekly farming tasks
        </p>
      </div>

      {/* Crop Selection */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {getTranslation(selectedLanguage, 'selectedCrop')}
        </label>
        <div className="card bg-green-50 border-green-200 inline-block">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🍅</span>
            <span className="text-lg font-semibold text-green-700 capitalize">
              {selectedCrop}
            </span>
          </div>
        </div>
      </div>

      {/* Current Phase */}
      {getCurrentPhase() && (
        <div className="card mb-8" style={{ backgroundColor: `${getCurrentPhase().color}10` }}>
          <div className="flex items-center mb-3">
            <div 
              className="w-4 h-4 rounded-full mr-3"
              style={{ backgroundColor: getCurrentPhase().color }}
            ></div>
            <h2 className="text-xl font-bold text-gray-900">
              {getCurrentPhase().phase}
            </h2>
          </div>
          <p className="text-gray-600">
            Week {currentWeek} of {cropCalendarData[selectedCrop].totalWeeks}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Weather Card */}
        <div className="card bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {getTranslation(selectedLanguage, 'currentWeather')}
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <Thermometer className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900">{weatherData.temperature}°C</div>
              <div className="text-sm text-gray-600">Temperature</div>
            </div>
            <div className="text-center">
              <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900">{weatherData.humidity}%</div>
              <div className="text-sm text-gray-600">Humidity</div>
            </div>
            <div className="text-center">
              <Sun className="h-6 w-6 text-amber-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900">{weatherData.rainfall}mm</div>
              <div className="text-sm text-gray-600">Rainfall</div>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 text-sm">
              {getWeatherRecommendation()}
            </p>
          </div>
        </div>

        {/* Weekly Tasks */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {getTranslation(selectedLanguage, 'weeklyTasks')}
          </h3>
          <div className="space-y-3">
            {getWeeklyTasks().map((task, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">{task}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Navigation */}
      <div className="card mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {getTranslation(selectedLanguage, 'cropTimeline')}
        </h3>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {Array.from({ length: cropCalendarData[selectedCrop]?.totalWeeks || 16 }, (_, i) => i + 1).map((week) => (
            <button
              key={week}
              onClick={() => setCurrentWeek(week)}
              className={`
                flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                ${week === currentWeek
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {week}
            </button>
          ))}
        </div>
      </div>

      {/* Phase Legend */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {getTranslation(selectedLanguage, 'growthPhases')}
        </h3>
        <div className="space-y-3">
          {cropCalendarData[selectedCrop]?.phases.map((phase, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-3"
                style={{ backgroundColor: phase.color }}
              ></div>
              <span className="font-medium text-gray-900 mr-3">{phase.phase}</span>
              <span className="text-sm text-gray-600">
                Weeks {phase.weeks.join(', ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CropCalendar;