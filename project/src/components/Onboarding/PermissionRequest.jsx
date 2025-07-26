import React from 'react';
import { Bell, MapPin } from 'lucide-react';
import useAppStore from '../../store/appStore';
import { getTranslation } from '../../utils/translations';

const permissions = {
  notifications: {
    titleKey: 'allowNotifications',
    descriptionKey: 'notificationDesc',
    icon: Bell,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  location: {
    titleKey: 'allowLocation',
    descriptionKey: 'locationDesc',
    icon: MapPin,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
};

const PermissionRequest = ({ type, onNext, onSkip }) => {
  const { selectedLanguage } = useAppStore();
  const permission = permissions[type];
  const Icon = permission.icon;

  const handleAllow = async () => {
    try {
      if (type === 'notifications') {
        // Request browser notification permission
        if ('Notification' in window) {
          const permission = await Notification.requestPermission();
          console.log('Notification permission:', permission);
        }
      } else if (type === 'location') {
        // Request browser geolocation permission
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log('Location permission granted:', position);
            },
            (error) => {
              console.log('Location permission denied:', error);
            }
          );
        }
      }
      onNext();
    } catch (error) {
      console.error('Permission request error:', error);
      onNext(); // Continue anyway
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className={`
          w-40 h-40 ${permission.bgColor} rounded-full flex items-center justify-center mx-auto mb-8
        `}>
          <Icon className={`h-20 w-20 ${permission.color}`} />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {getTranslation(selectedLanguage, permission.titleKey)}
        </h1>
        
        <p className="text-lg text-gray-600 mb-12 leading-relaxed px-4">
          {getTranslation(selectedLanguage, permission.descriptionKey)}
        </p>

        <div className="flex justify-between items-center">
          <button
            onClick={onSkip}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
          >
            {getTranslation(selectedLanguage, 'skip')}
          </button>
          
          <button
            onClick={handleAllow}
            className="btn-primary px-8 py-3"
          >
            {getTranslation(selectedLanguage, 'allow')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionRequest;