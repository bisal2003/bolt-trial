import React from 'react';
import { X, Home, Users, ShoppingBag, User, Leaf, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import useAppStore from '../../store/appStore';
import { getTranslation } from '../../utils/translations';

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, selectedLanguage } = useAppStore();
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
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-gray-900">
              {getTranslation(selectedLanguage, 'plantix')}
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                      ${isActive(item.href)
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {getTranslation(selectedLanguage, item.name)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick Actions */}
        <div className="mt-8 px-4">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {getTranslation(selectedLanguage, 'quickActions')}
          </h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                to="/crop-health"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900"
              >
                <MessageCircle className="mr-3 h-4 w-4" />
                {getTranslation(selectedLanguage, 'diagnosePlant')}
              </Link>
            </li>
            <li>
              <Link
                to="/voice-input"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900"
              >
                <MessageCircle className="mr-3 h-4 w-4" />
                {getTranslation(selectedLanguage, 'askQuestion')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;