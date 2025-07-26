import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react';
import useAppStore from '../../store/appStore';
import { getTranslation } from '../../utils/translations';

const WeatherWidget = ({ compact = false }) => {
  const { selectedLanguage } = useAppStore();
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    forecast: [
      { day: 'Today', temp: '28°C', condition: 'cloudy' },
      { day: 'Tomorrow', temp: '30°C', condition: 'sunny' },
      { day: 'Wed', temp: '26°C', condition: 'rainy' },
    ]
  });

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'rainy': return <CloudRain className="h-6 w-6 text-blue-500" />;
      case 'cloudy': 
      default: return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">Today's Weather</h3>
            <p className="text-sm text-gray-600">{weatherData.condition}</p>
          </div>
          {getWeatherIcon(weatherData.condition)}
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-2">
          {weatherData.temperature}°C
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <Droplets className="h-4 w-4 text-blue-500 mr-1" />
            <span>{weatherData.humidity}%</span>
          </div>
          <div className="flex items-center">
            <Wind className="h-4 w-4 text-gray-500 mr-1" />
            <span>{weatherData.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Weather Forecast
      </h3>
      
      {/* Current Weather */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-3xl font-bold text-gray-900">
            {weatherData.temperature}°C
          </div>
          <p className="text-gray-600">{weatherData.condition}</p>
        </div>
        {getWeatherIcon(weatherData.condition)}
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <Droplets className="h-5 w-5 text-blue-500 mr-2" />
          <div>
            <div className="font-medium">{weatherData.humidity}%</div>
            <div className="text-sm text-gray-600">Humidity</div>
          </div>
        </div>
        <div className="flex items-center">
          <Wind className="h-5 w-5 text-gray-500 mr-2" />
          <div>
            <div className="font-medium">{weatherData.windSpeed} km/h</div>
            <div className="text-sm text-gray-600">Wind Speed</div>
          </div>
        </div>
      </div>

      {/* 3-Day Forecast */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">3-Day Forecast</h4>
        {weatherData.forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{day.day}</span>
            <div className="flex items-center space-x-2">
              {getWeatherIcon(day.condition)}
              <span className="text-sm font-medium">{day.temp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;