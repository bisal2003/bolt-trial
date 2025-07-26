import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';
import useAppStore from '../store/appStore';
import { getTranslation } from '../utils/translations';
import { callGeminiAPI } from '../utils/gemini';

const crops = [
  { id: 'tomato', nameKey: 'tomato', emoji: '🍅' },
  { id: 'wheat', nameKey: 'wheat', emoji: '🌾' },
  { id: 'rice', nameKey: 'rice', emoji: '🍚' },
  { id: 'onion', nameKey: 'onion', emoji: '🧅' },
  { id: 'potato', nameKey: 'potato', emoji: '🥔' },
  { id: 'corn', nameKey: 'corn', emoji: '🌽' },
];

const MarketPrices = () => {
  const { selectedLanguage } = useAppStore();
  const [selectedCrop, setSelectedCrop] = useState(crops[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [priceData, setPriceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [marketInsights, setMarketInsights] = useState('');

  useEffect(() => {
    fetchMarketData();
  }, [selectedCrop]);

  const fetchMarketData = async () => {
    try {
      setIsLoading(true);
      
      // Simulate market data
      const mockPriceData = {
        currentPrice: Math.floor(Math.random() * 50) + 20,
        change: (Math.random() - 0.5) * 20,
        unit: 'kg',
        lastUpdated: new Date().toLocaleTimeString(),
      };
      
      setPriceData(mockPriceData);
      
      // Get AI insights
      const prompt = `Provide market analysis and selling recommendations for ${selectedCrop.id} with current price trends.`;
      const insights = await callGeminiAPI(prompt);
      setMarketInsights(insights);
    } catch (error) {
      console.error('Failed to fetch market data:', error);
      setMarketInsights('Unable to fetch market insights at the moment.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectCrop = (crop) => {
    setSelectedCrop(crop);
    setShowDropdown(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getTranslation(selectedLanguage, 'marketPrices')}
        </h1>
        <p className="text-gray-600">
          Get real-time market prices and AI-powered selling recommendations
        </p>
      </div>

      {/* Crop Selector */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {getTranslation(selectedLanguage, 'selectCrop')}
        </label>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full md:w-64 flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <div className="flex items-center">
              <span className="text-xl mr-3">{selectedCrop.emoji}</span>
              <span className="font-medium">
                {getTranslation(selectedLanguage, selectedCrop.nameKey)}
              </span>
            </div>
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </button>
          
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 md:w-64">
              {crops.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => selectCrop(crop)}
                  className="w-full flex items-center px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                >
                  <span className="text-xl mr-3">{crop.emoji}</span>
                  <span>{getTranslation(selectedLanguage, crop.nameKey)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Price Display */}
      {priceData && (
        <div className="card mb-8">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {getTranslation(selectedLanguage, selectedCrop.nameKey)}
            </h2>
            <div className={`
              flex items-center px-3 py-1 rounded-full text-sm font-medium
              ${priceData.change >= 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
              }
            `}>
              {priceData.change >= 0 ? 
                <TrendingUp className="h-4 w-4 mr-1" /> : 
                <TrendingDown className="h-4 w-4 mr-1" />
              }
              {priceData.change >= 0 ? '+' : ''}{priceData.change.toFixed(1)}%
            </div>
          </div>
          
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              ₹{priceData.currentPrice}/{priceData.unit}
            </div>
            <p className="text-gray-600">
              {getTranslation(selectedLanguage, 'lastUpdated')}: {priceData.lastUpdated}
            </p>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            ₹{(priceData?.currentPrice || 0) - 5}
          </div>
          <div className="text-sm text-gray-600">
            {getTranslation(selectedLanguage, 'yesterday')}
          </div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            ₹{(priceData?.currentPrice || 0) + 3}
          </div>
          <div className="text-sm text-gray-600">
            {getTranslation(selectedLanguage, 'weekHigh')}
          </div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            ₹{(priceData?.currentPrice || 0) - 8}
          </div>
          <div className="text-sm text-gray-600">
            {getTranslation(selectedLanguage, 'weekLow')}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="card text-center mb-8">
          <div className="loading-dots mx-auto mb-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text-gray-600">Fetching market insights...</p>
        </div>
      )}

      {/* AI Market Insights */}
      {marketInsights && !isLoading && (
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {getTranslation(selectedLanguage, 'aiMarketInsights')}
          </h3>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {marketInsights}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPrices;