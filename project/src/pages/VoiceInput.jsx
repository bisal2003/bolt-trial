import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, MicOff, Copy, Volume2, Globe } from 'lucide-react';
import useAppStore from '../store/appStore';
import { getTranslation } from '../utils/translations';
import { callGeminiAPI } from '../utils/gemini';

const VoiceInput = () => {
  const { selectedLanguage } = useAppStore();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: getTranslation(selectedLanguage, 'welcomeMessage'),
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      setInputText(transcript);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText.trim();
    setInputText('');
    setIsLoading(true);

    // Add typing indicator
    const typingMessage = {
      id: Date.now() + 1,
      type: 'assistant',
      content: '',
      isTyping: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const aiResponse = await callGeminiAPI(currentInput);
      
      // Remove typing indicator and add actual response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isTyping);
        return [...filtered, {
          id: Date.now() + 2,
          type: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        }];
      });

      // Text-to-speech for the response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isTyping);
        return [...filtered, {
          id: Date.now() + 2,
          type: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
          isError: true
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputText(question);
  };

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
    // You could add a toast notification here
  };

  const handleSpeakMessage = (content) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      speechSynthesis.speak(utterance);
    }
  };

  const quickQuestions = [
    'What diseases affect tomato plants?',
    'Current market price of wheat',
    'Government schemes for farmers',
    'Best time to sow rice'
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="text-center flex-1">
            <h1 className="text-xl font-semibold text-gray-900">
              {getTranslation(selectedLanguage, 'aiAssistant')}
            </h1>
            <p className="text-sm text-green-600">
              {getTranslation(selectedLanguage, 'onlineStatus')}
            </p>
          </div>
          <button className="p-2 bg-primary-50 rounded-full">
            <Globe className="h-5 w-5 text-primary-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">
                    {message.type === 'user' ? '👨‍🌾' : '🤖'}
                  </span>
                </div>
                
                {/* Message bubble */}
                <div className={`
                  px-4 py-3 rounded-2xl
                  ${message.type === 'user'
                    ? 'bg-primary-500 text-white rounded-br-sm'
                    : message.isError
                    ? 'bg-red-50 text-red-700 border border-red-200 rounded-bl-sm'
                    : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm'
                  }
                `}>
                  {message.isTyping ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {getTranslation(selectedLanguage, 'aiTyping')}
                      </span>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      {message.type === 'assistant' && !message.isError && (
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => handleCopyMessage(message.content)}
                            className="p-1 text-gray-400 hover:text-gray-600 rounded"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleSpeakMessage(message.content)}
                            className="p-1 text-gray-400 hover:text-gray-600 rounded"
                          >
                            <Volume2 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {getTranslation(selectedLanguage, 'quickQuestions')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            {/* Voice button */}
            <button
              type="button"
              onClick={handleVoiceInput}
              disabled={isLoading}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center transition-colors
                ${isListening
                  ? 'bg-red-500 text-white'
                  : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                }
              `}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>

            {/* Text input */}
            <div className="flex-1">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={getTranslation(selectedLanguage, 'typeMessage')}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows="1"
                style={{ minHeight: '48px', maxHeight: '120px' }}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </div>

            {/* Send button */}
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center transition-colors
                ${inputText.trim() && !isLoading
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>

          {isListening && (
            <div className="flex items-center justify-center mt-3 p-2 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-red-700 font-medium">
                  {getTranslation(selectedLanguage, 'listening')}
                </span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default VoiceInput;