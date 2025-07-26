import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, ShoppingBag, User, MessageCircle } from 'lucide-react';
import useAppStore from '../../store/appStore';
import { getTranslation } from '../../utils/translations';

const MobileNavigation = () => {
  const { selectedLanguage } = useAppStore();
  const location = useLocation();

  const navigation = [
    { name: 'home', href: '/', icon: Home },
    { name: 'community', href: '/community', icon: Users },
    { name: 'market', href: '/market', icon: ShoppingBag },
    { name: 'profile', href: '/profile', icon: User },
  ];

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-50">
      <div className="grid grid-cols-4 h-16">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex flex-col items-center justify-center space-y-1 transition-colors duration-200
                ${isActive(item.href)
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">
                {getTranslation(selectedLanguage, item.name)}
              </span>
            </Link>
          );
        })}
      </div>
      
      {/* Floating Action Button for Voice Input */}
      <Link
        to="/voice-input"
        className="absolute -top-6 right-4 w-12 h-12 bg-primary-500 hover:bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default MobileNavigation;