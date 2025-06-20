import React, { useState } from 'react';
import {
  Bot, Send, Mic, MicOff, Volume2, Brain
} from 'lucide-react';

const AIHealthAssistant = ({ userRole, patientData }) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I'm your AI Health Assistant. I can help ${
        userRole === 'doctor'
          ? 'analyze patient data, suggest treatment protocols, and provide clinical insights'
          : "answer questions about your loved one's condition, explain medical terms, and provide care guidance"
      }.`,
      timestamp: new Date().toLocaleTimeString(),
      confidence: 95
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const quickSuggestions =
    userRole === 'doctor'
      ? [
          'Analyze current vital signs',
          'Suggest medication adjustments',
          'Risk assessment for complications',
          'Discharge planning recommendations'
        ]
      : [
          'Explain current condition',
          'What should I expect?',
          'How can I help during recovery?',
          'When will they feel better?'
        ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputMessage, userRole),
        timestamp: new Date().toLocaleTimeString(),
        confidence: Math.floor(Math.random() * 20) + 80,
        suggestions: generateSuggestions(inputMessage, userRole)
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (input, role) => {
    const lowerInput = input.toLowerCase();

    if (role === 'doctor') {
      if (lowerInput.includes('vital')) {
        return 'Based on the current vital signs, the patient shows stable cardiovascular function with HR 75 bpm (normal range)...';
      }
      if (lowerInput.includes('medication')) {
        return 'Current medication regimen appears appropriate. Consider adjusting pain management...';
      }
      return 'I’ve analyzed the available patient data. The treatment plan seems appropriate...';
    } else {
      if (lowerInput.includes('condition')) {
        return 'Your loved one is currently in stable condition...';
      }
      if (lowerInput.includes('expect')) {
        return 'Recovery typically progresses in stages. Expect gradual improvement...';
      }
      return 'I understand your concerns. The care team is closely monitoring the situation...';
    }
  };

  const generateSuggestions = (input, role) => {
    if (role === 'doctor') {
      return ['Review lab results', 'Check medication interactions', 'Assess discharge readiness'];
    } else {
      return ['Ask about visiting hours', 'Learn about care instructions', 'Understand the recovery timeline'];
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Future voice recognition logic
  };

  const speakMessage = (content) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Brain className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Health Assistant</h3>
            <p className="text-sm text-gray-600">
              {userRole === 'doctor' ? 'Clinical Decision Support' : 'Patient Care Guidance'}
            </p>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">AI Active</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : message.type === 'ai'
                  ? 'bg-purple-100 text-purple-900'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'ai' && <Bot className="h-4 w-4 mt-1 flex-shrink-0" />}
                <div className="flex-1">
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-75">{message.timestamp}</span>
                    {message.type === 'ai' && (
                      <div className="flex items-center space-x-2">
                        {message.confidence && (
                          <span className="text-xs opacity-75">{message.confidence}% confident</span>
                        )}
                        <button
                          onClick={() => speakMessage(message.content)}
                          className="p-1 hover:bg-purple-200 rounded transition-colors"
                        >
                          <Volume2 className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                  {message.suggestions && (
                    <div className="mt-2 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => setInputMessage(suggestion)}
                          className="block w-full text-left text-xs bg-white/50 hover:bg-white/80 px-2 py-1 rounded transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-purple-100 text-purple-900 px-4 py-3 rounded-lg max-w-xs">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-600 mb-2">Quick suggestions:</p>
        <div className="flex flex-wrap gap-2">
          {quickSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(suggestion)}
              className="px-3 py-1 bg-white text-gray-700 text-xs rounded-full hover:bg-purple-100 hover:text-purple-700 transition-colors border border-gray-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about patient care..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleVoiceInput}
            className={`p-2 rounded-lg transition-colors ${
              isListening
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIHealthAssistant;
