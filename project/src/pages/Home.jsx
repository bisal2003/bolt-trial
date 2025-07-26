import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  MessageCircle, 
  TrendingUp, 
  Building2, 
  Calendar, 
  Plus,
  Cloud,
  CheckCircle
} from 'lucide-react';
import useAppStore from '../store/appStore';
import { getTranslation } from '../utils/translations';

const Home = () => {
  const { selectedLanguage, selectedCrops, user } = useAppStore();

  const quickActions = [
    {
      title: 'diagnosePlant',
      icon: Camera,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      to: '/crop-health',
      primary: true
    },
    {
      title: 'askQuestion',
      icon: MessageCircle,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      to: '/voice-input'
    },
    {
      title: 'marketPrices',
      icon: TrendingUp,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      to: '/market'
    },
    {
      title: 'govSchemes',
      icon: Building2,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      to: '/government-schemes'
    },
    {
      title: 'cropCalendar',
      icon: Calendar,
      color: 'bg-amber-500',
      hoverColor: 'hover:bg-amber-600',
      to: '/crop-calendar'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, Farmer! 👋
        </h1>
        <p className="text-gray-600">
          {getTranslation(selectedLanguage, 'userId')}: {user?.uid?.substring(0, 8) || 'Anonymous'}
        </p>
      </div>

      {/* Your Crops Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {getTranslation(selectedLanguage, 'yourCrops')}
        </h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                to={action.to}
                className={`
                  ${action.primary ? 'md:col-span-2 lg:col-span-3' : ''}
                  ${action.color} ${action.hoverColor} text-white p-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg
                `}
              >
                <div className={`flex items-center ${action.primary ? 'justify-center' : ''}`}>
                  <Icon className={`${action.primary ? 'h-8 w-8 mr-3' : 'h-6 w-6 mr-3'}`} />
                  <span className={`font-semibold ${action.primary ? 'text-lg' : ''}`}>
                    {getTranslation(selectedLanguage, action.title)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weather Card */}
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">Dimow, 20 Jul</h3>
              <p className="text-sm text-gray-600">Foggy</p>
            </div>
            <Cloud className="h-12 w-12 text-gray-400" />
          </div>
          <div className="mb-4">
            <div className="text-3xl font-bold text-gray-900">34°C</div>
            <div className="text-sm text-gray-600">25°C / 33°C</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-amber-800 text-sm font-medium">
              {getTranslation(selectedLanguage, 'sprayingUnfavorable')}
            </p>
          </div>
        </div>

        {/* Crop Health Status */}
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">
            {getTranslation(selectedLanguage, 'cropHealthStatus')}
          </h3>
          <div className="flex items-center mb-3">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span className="font-medium text-green-700">
              {getTranslation(selectedLanguage, 'overallHealthy')}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {getTranslation(selectedLanguage, 'lastCheckDesc')}
          </p>
          <Link
            to="/crop-health"
            className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
          >
            <Camera className="h-4 w-4 mr-2" />
            {getTranslation(selectedLanguage, 'checkNow')}
          </Link>
        </div>
      </div>

      {/* Manage Fields Section */}
      <div className="mt-8">
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

      {/* Floating Action Button */}
      <Link
        to="/voice-input"
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-500 hover:bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default Home;