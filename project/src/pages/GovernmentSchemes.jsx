import React, { useState } from 'react';
import { Search, Building2, CheckCircle, Clock, FileText, ExternalLink } from 'lucide-react';
import useAppStore from '../store/appStore';
import { getTranslation } from '../utils/translations';

const GovernmentSchemes = () => {
  const { selectedLanguage } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Schemes', icon: Building2 },
    { id: 'subsidy', label: 'Subsidies', icon: CheckCircle },
    { id: 'insurance', label: 'Insurance', icon: FileText },
    { id: 'loan', label: 'Loans', icon: Clock },
  ];

  const schemes = [
    {
      id: 1,
      name: 'PM-KISAN Samman Nidhi',
      category: 'subsidy',
      amount: '₹6,000/year',
      eligibility: 'Small & marginal farmers',
      status: 'eligible',
      description: 'Direct income support to farmer families',
      documents: ['Aadhaar Card', 'Bank Account', 'Land Records'],
      deadline: 'March 31, 2024'
    },
    {
      id: 2,
      name: 'Pradhan Mantri Fasal Bima Yojana',
      category: 'insurance',
      amount: 'Up to ₹2 lakh coverage',
      eligibility: 'All farmers',
      status: 'applied',
      description: 'Crop insurance against natural calamities',
      documents: ['Aadhaar Card', 'Bank Account', 'Land Records', 'Sowing Certificate'],
      deadline: 'Within 7 days of sowing'
    },
    {
      id: 3,
      name: 'Kisan Credit Card',
      category: 'loan',
      amount: 'Up to ₹3 lakh',
      eligibility: 'Farmers with land records',
      status: 'not_applied',
      description: 'Credit facility for agricultural needs',
      documents: ['Aadhaar Card', 'PAN Card', 'Land Records', 'Income Certificate'],
      deadline: 'No deadline'
    },
    {
      id: 4,
      name: 'Soil Health Card Scheme',
      category: 'subsidy',
      amount: 'Free soil testing',
      eligibility: 'All farmers',
      status: 'eligible',
      description: 'Free soil testing and nutrient recommendations',
      documents: ['Aadhaar Card', 'Land Records'],
      deadline: 'Ongoing'
    }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'eligible': return 'bg-green-100 text-green-800';
      case 'applied': return 'bg-amber-100 text-amber-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'not_applied': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'eligible': return 'Eligible';
      case 'applied': return 'Applied';
      case 'approved': return 'Approved';
      case 'not_applied': return 'Not Applied';
      default: return status;
    }
  };

  const handleApplyScheme = (scheme) => {
    alert(`Application guide for ${scheme.name}:\n\nDocuments required: ${scheme.documents.join(', ')}\n\nDeadline: ${scheme.deadline}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getTranslation(selectedLanguage, 'governmentSchemes')}
        </h1>
        <p className="text-gray-600">
          Discover and apply for government schemes and subsidies for farmers
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search schemes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Schemes List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Available Schemes ({filteredSchemes.length})
        </h2>
        
        <div className="space-y-6">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {scheme.name}
                  </h3>
                  <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    {scheme.amount}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(scheme.status)}`}>
                  {getStatusText(scheme.status)}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{scheme.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Eligibility: </span>
                  <span className="text-gray-600">{scheme.eligibility}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Deadline: </span>
                  <span className="text-gray-600">{scheme.deadline}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {scheme.status === 'eligible' || scheme.status === 'not_applied' ? (
                  <button 
                    onClick={() => handleApplyScheme(scheme)}
                    className="btn-primary flex items-center"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Apply Now
                  </button>
                ) : (
                  <button className="flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors">
                    <Clock className="h-4 w-4 mr-2" />
                    Track Application
                  </button>
                )}
                
                <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="card bg-green-50 border-green-200">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Need Help?
        </h3>
        <p className="text-green-700 mb-4">
          Contact our support team for assistance with government schemes and applications.
        </p>
        <button className="btn-primary">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default GovernmentSchemes;