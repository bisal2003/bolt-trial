import React from 'react';
import { Menu, Bell, Globe } from 'lucide-react';
import useAppStore from '../../store/appStore';
import { getTranslation } from '../../utils/translations';

const Header = () => {
  const { setSidebarOpen, selectedLanguage, user } = useAppStore();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 lg:pl-64">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="ml-4 lg:ml-0">
            <h1 className="text-lg font-semibold text-gray-900">
              {getTranslation(selectedLanguage, 'appTitle')}
            </h1>
            <p className="text-sm text-gray-500">
              {getTranslation(selectedLanguage, 'appSubtitle')}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Globe className="h-4 w-4" />
            <span>{selectedLanguage}</span>
          </div>

          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full">
            <Bell className="h-5 w-5" />
          </button>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Farmer</p>
              <p className="text-xs text-gray-500">
                ID: {user?.uid?.substring(0, 8) || 'Anonymous'}
              </p>
            </div>
            <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-600">F</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;