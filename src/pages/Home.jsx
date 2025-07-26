import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  MessageCircle, 
  TrendingUp, 
  Building2, 
  Calendar, 
  Plus,
  ArrowRight
} from 'lucide-react';
import useAppStore from '../store/appStore';
import { getTranslation } from '../utils/translations';
import WeatherWidget from '../components/Common/WeatherWidget';
import CropHealthCard from '../components/Common/CropHealthCard';

const Home = () => {
  const { selectedLanguage, selectedCrops, user } = useAppStore();

  const quickActions = [
    {
      title: 'cropHealth',
      icon: Camera,
      to: '/crop-health',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      primary: true
    },
    {
      title: 'marketPrices',
      icon: TrendingUp,
      to: '/market-prices',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      title: 'weatherForecast',
      icon: Building2,
      to: '/weather',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      title: 'farmingCalendar',
      icon: Calendar,
      to: '/calendar',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Welcome back, Farmer! 👋
        </h1>
        <p className="text-gray-600">
          {getTranslation(selectedLanguage, 'welcomeMessage')}
        </p>
      </div>

      {/* Your Crops Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {getTranslation(selectedLanguage, 'yourCrops')}
        </h2>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {selectedCrops.slice(0, 5).map((cropId, index) => (
            <div key={cropId} className="flex-shrink-0 text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">🌱</span>
              </div>
              <p className="text-sm text-gray-600 capitalize">{cropId}</p>
            </div>
          ))}
          <button className="flex-shrink-0 w-16 h-16 border-2 border-dashed border-primary-300 rounded-full flex items-center justify-center text-primary-500 hover:border-primary-500 hover:bg-primary-50 transition-colors">
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {getTranslation(selectedLanguage, 'quickActions')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                to={action.to}
                className={`
                  ${action.primary ? 'sm:col-span-2 lg:col-span-3' : ''}
                  ${action.color} ${action.hoverColor} text-white p-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg
                `}
              >
                <div className={`flex items-center ${action.primary ? 'justify-center' : ''}`}>
                  <Icon className={`${action.primary ? 'h-8 w-8 mr-3' : 'h-6 w-6 mr-3'}`} />
                  <span className={`font-semibold ${action.primary ? 'text-lg' : ''}`}>
                    {getTranslation(selectedLanguage, action.title)}
                  </span>
                  {!action.primary && <ArrowRight className="h-4 w-4 ml-auto" />}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weather Card */}
        <WeatherWidget compact />

        {/* Crop Health Status */}
        <CropHealthCard />
      </div>

      {/* Manage Fields Section */}
      <div className="mb-8">
        <div className="card text-center">
          <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🚜</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {getTranslation(selectedLanguage, 'startPrecisionFarming')}
          </h3>
          <p className="text-gray-600 mb-6">
            {getTranslation(selectedLanguage, 'precisionFarmingDesc')}
          </p>
          <button className="btn-primary">
            {getTranslation(selectedLanguage, 'manageFields')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;