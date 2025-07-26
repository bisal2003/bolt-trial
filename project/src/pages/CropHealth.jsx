import React, { useState } from 'react';
import { Camera, Upload, Send, Mic, MicOff } from 'lucide-react';
import useAppStore from '../store/appStore';
import { getTranslation } from '../utils/translations';
import { callGeminiAPI } from '../utils/gemini';

const CropHealth = () => {
  const { selectedLanguage } = useAppStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showQuestionInput, setShowQuestionInput] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage({
          file,
          url: e.target.result,
          base64: e.target.result.split(',')[1]
        });
        // Auto-analyze after selecting image
        analyzeCrop(e.target.result.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeCrop = async (imageBase64 = null) => {
    try {
      setIsAnalyzing(true);
      setDiagnosis('');

      const imageToAnalyze = imageBase64 || selectedImage?.base64;
      if (!imageToAnalyze) {
        alert('No image selected for analysis.');
        return;
      }

      const prompt = userQuestion.trim() 
        ? `Analyze this crop image for diseases and health issues. User's specific question: "${userQuestion}"`
        : 'Analyze this crop image for diseases and health issues. Provide diagnosis and treatment recommendations.';

      const response = await callGeminiAPI(prompt, imageToAnalyze);
      setDiagnosis(response);
    } catch (error) {
      console.error('Analysis error:', error);
      setDiagnosis('Failed to analyze the image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleVoiceInput = async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserQuestion(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setDiagnosis('');
    setUserQuestion('');
    setShowQuestionInput(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getTranslation(selectedLanguage, 'identifyCropProblem')}
        </h1>
        <p className="text-gray-600">
          Upload an image of your crop to get AI-powered diagnosis and treatment recommendations.
        </p>
      </div>

      {/* Image Upload Area */}
      <div className="mb-8">
        <div className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-colors
          ${selectedImage ? 'border-primary-300 bg-primary-50' : 'border-gray-300 hover:border-gray-400'}
        `}>
          {selectedImage ? (
            <div className="space-y-4">
              <img
                src={selectedImage.url}
                alt="Selected crop"
                className="max-h-64 mx-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-gray-600">{selectedImage.file.name}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Camera className="h-16 w-16 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {getTranslation(selectedLanguage, 'noImageSelected')}
                </p>
                <p className="text-gray-600">
                  Click to upload or drag and drop an image
                </p>
              </div>
            </div>
          )}
          
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-4">
          <label className="btn-primary cursor-pointer inline-flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            {getTranslation(selectedLanguage, 'uploadImage')}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          
          {selectedImage && (
            <button
              onClick={resetAnalysis}
              className="btn-secondary"
            >
              {getTranslation(selectedLanguage, 'analyzeAnother')}
            </button>
          )}
        </div>
      </div>

      {/* Question Input Section */}
      {selectedImage && (
        <div className="mb-8 card bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Ask a Specific Question
          </h3>
          <p className="text-gray-600 mb-4">
            Optional: Ask about specific symptoms or concerns
          </p>
          
          {!showQuestionInput ? (
            <button
              onClick={() => setShowQuestionInput(true)}
              className="btn-primary"
            >
              Add Question
            </button>
          ) : (
            <div className="space-y-4">
              <textarea
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="Type your question about the plant problem..."
                className="input-field"
                rows="3"
              />
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleVoiceInput}
                  disabled={isListening}
                  className={`
                    flex items-center px-4 py-2 rounded-lg transition-colors
                    ${isListening
                      ? 'bg-red-500 text-white'
                      : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                    }
                  `}
                >
                  {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                  {isListening ? 'Listening...' : 'Voice Input'}
                </button>
                
                <button
                  onClick={() => {
                    setUserQuestion('');
                    setShowQuestionInput(false);
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Clear
                </button>
                
                {userQuestion.trim() && (
                  <button
                    onClick={() => analyzeCrop()}
                    className="btn-primary flex items-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Analyze with Question
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Analysis Section */}
      {isAnalyzing && (
        <div className="card text-center mb-8">
          <div className="loading-dots mx-auto mb-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {getTranslation(selectedLanguage, 'analyzingCrop')}
          </h3>
          <p className="text-gray-600">
            {userQuestion.trim() 
              ? 'Analyzing your crop and considering your specific question'
              : 'Our AI is examining the image for diseases and health issues'
            }
          </p>
        </div>
      )}

      {/* Diagnosis Results */}
      {diagnosis && !isAnalyzing && (
        <div className="card mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {getTranslation(selectedLanguage, 'diagnosisAndTreatment')}
          </h3>
          
          {userQuestion.trim() && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-blue-700 mb-1">
                Based on your question:
              </p>
              <p className="text-blue-800 italic">"{userQuestion}"</p>
            </div>
          )}
          
          <div className="bg-gray-50 border-l-4 border-primary-500 p-6 rounded-r-lg">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {diagnosis}
            </p>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!selectedImage && !isAnalyzing && (
        <div className="card bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {getTranslation(selectedLanguage, 'bestResults')}
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>{getTranslation(selectedLanguage, 'instruction1')}</li>
            <li>{getTranslation(selectedLanguage, 'instruction2')}</li>
            <li>{getTranslation(selectedLanguage, 'instruction3')}</li>
            <li>{getTranslation(selectedLanguage, 'instruction4')}</li>
            <li>{getTranslation(selectedLanguage, 'instruction5')}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CropHealth;