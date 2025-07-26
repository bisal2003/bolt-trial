import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import useAppStore from '../../store/appStore';
import { getTranslation } from '../../utils/translations';

const CropHealthCard = () => {
  const { selectedLanguage } = useAppStore();
  
  const healthStatus = {
    overall: 'healthy',
    lastCheck: '2 days ago',
    issues: 1,
    recommendations: 2
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'critical':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      default:
        return <Clock className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'healthy':
        return getTranslation(selectedLanguage, 'overallHealthy');
      case 'warning':
        return 'Needs Attention';
      case 'critical':
        return 'Critical Issues';
      default:
        return 'Unknown Status';
    }
  };

  return (
    <div className={`rounded-xl border p-6 ${getStatusColor(healthStatus.overall)}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">
          {getTranslation(selectedLanguage, 'cropHealthStatus')}
        </h3>
        {getStatusIcon(healthStatus.overall)}
      </div>
      
      <div className="flex items-center mb-3">
        <div className={`w-3 h-3 rounded-full mr-3 ${
          healthStatus.overall === 'healthy' ? 'bg-green-500' :
          healthStatus.overall === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
        }`}></div>
        <span className={`font-medium ${
          healthStatus.overall === 'healthy' ? 'text-green-700' :
          healthStatus.overall === 'warning' ? 'text-yellow-700' : 'text-red-700'
        }`}>
          {getStatusText(healthStatus.overall)}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        {getTranslation(selectedLanguage, 'lastCheckDesc')} {healthStatus.lastCheck}
      </p>

      {healthStatus.issues > 0 && (
        <div className="mb-4 p-3 bg-white rounded-lg border">
          <div className="text-sm">
            <span className="font-medium text-gray-900">{healthStatus.issues}</span>
            <span className="text-gray-600"> issues detected</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-900">{healthStatus.recommendations}</span>
            <span className="text-gray-600"> recommendations available</span>
          </div>
        </div>
      )}
      
      <Link
        to="/crop-health"
        className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors border border-gray-300 w-full justify-center"
      >
        <Camera className="h-4 w-4 mr-2" />
        {getTranslation(selectedLanguage, 'checkNow')}
      </Link>
    </div>
  );
};

export default CropHealthCard;