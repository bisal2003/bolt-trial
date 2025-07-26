import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';
import useAppStore from '../store/appStore';
import { getTranslation } from '../utils/translations';
import { callGeminiAPI } from '../utils/gemini';
import LoadingSpinner from '../components/Common/LoadingSpinner';

      {/* Loading State */}
      {isLoading && (
        <div className="card text-center mb-8">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600">Fetching market insights...</p>
        </div>
      )}