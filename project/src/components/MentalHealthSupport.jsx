import React, { useState } from 'react';
import {
  Heart,
  Brain,
  MessageCircle,
  Phone,
  Video,
  Calendar,
  BookOpen,
  Headphones,
  Users,
  Star,
  Play,
  Pause,
  Volume2,
  Clock
} from 'lucide-react';

const MentalHealthSupport = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('resources');
  const [selectedResource, setSelectedResource] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const resources = [
    {
      id: '1',
      title: 'Coping with Medical Anxiety',
      type: 'article',
      duration: '5 min read',
      description: 'Learn effective strategies to manage anxiety during medical situations and hospital visits.',
      category: 'anxiety',
      rating: 4.8
    },
    {
      id: '2',
      title: 'Guided Meditation for Stress Relief',
      type: 'audio',
      duration: '10 min',
      description: 'A calming guided meditation to help reduce stress and promote relaxation.',
      category: 'stress',
      rating: 4.9
    },
    {
      id: '3',
      title: 'Understanding Grief in Healthcare',
      type: 'video',
      duration: '15 min',
      description: 'Professional guidance on processing grief and loss in medical contexts.',
      category: 'grief',
      rating: 4.7
    },
    {
      id: '4',
      title: 'Breathing Exercises for Panic',
      type: 'exercise',
      duration: '3 min',
      description: 'Quick breathing techniques to manage panic attacks and acute anxiety.',
      category: 'anxiety',
      rating: 4.6
    }
  ];

  const counselors = [
    {
      id: '1',
      name: 'Dr. Emily Chen',
      specialization: 'Medical Trauma & Anxiety',
      rating: 4.9,
      availability: 'available',
      languages: ['English', 'Mandarin']
    },
    {
      id: '2',
      name: 'Dr. Michael Rodriguez',
      specialization: 'Grief & Loss Counseling',
      rating: 4.8,
      availability: 'busy',
      languages: ['English', 'Spanish']
    },
    {
      id: '3',
      name: 'Dr. Sarah Williams',
      specialization: 'Family Support & Communication',
      rating: 4.7,
      availability: 'available',
      languages: ['English', 'French']
    }
  ];

  const crisisResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      description: '24/7 crisis support and suicide prevention'
    },
    {
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      description: 'Free, 24/7 crisis support via text'
    },
    {
      name: 'SAMHSA National Helpline',
      phone: '1-800-662-4357',
      description: 'Treatment referral and information service'
    }
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'anxiety': return 'text-blue-600 bg-blue-100';
      case 'depression': return 'text-purple-600 bg-purple-100';
      case 'stress': return 'text-green-600 bg-green-100';
      case 'grief': return 'text-gray-600 bg-gray-100';
      case 'general': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return BookOpen;
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'exercise': return Heart;
      default: return BookOpen;
    }
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'resources':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res) => {
              const Icon = getTypeIcon(res.type);
              return (
                <div key={res.id} className="p-4 bg-white shadow rounded-xl space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getCategoryColor(res.category)}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{res.title}</h4>
                      <p className="text-sm text-gray-500">{res.duration}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{res.description}</p>
                  <div className="flex space-x-1">{renderStars(res.rating)}</div>
                </div>
              );
            })}
          </div>
        );
      case 'counselors':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {counselors.map((counselor) => (
              <div key={counselor.id} className="p-4 bg-white shadow rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold">{counselor.name}</h4>
                    <p className="text-sm text-gray-500">{counselor.specialization}</p>
                    <p className="text-xs text-gray-400">
                      Languages: {counselor.languages.join(', ')}
                    </p>
                  </div>
                  <div
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${getAvailabilityColor(
                      counselor.availability
                    )}`}
                  >
                    {counselor.availability.toUpperCase()}
                  </div>
                </div>
                <div className="flex space-x-1">{renderStars(counselor.rating)}</div>
              </div>
            ))}
          </div>
        );
      case 'crisis':
        return (
          <div className="space-y-4">
            {crisisResources.map((res, idx) => (
              <div
                key={idx}
                className="bg-white shadow rounded-lg p-4 border border-red-100 space-y-1"
              >
                <h4 className="text-md font-semibold text-red-600">{res.name}</h4>
                <p className="text-sm text-gray-600">{res.description}</p>
                <p className="text-sm font-medium text-gray-800">📞 {res.phone}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'resources'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('resources')}
        >
          Support Resources
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'counselors'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('counselors')}
        >
          Counselors
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'crisis'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('crisis')}
        >
          Crisis Hotlines
        </button>
      </div>

      <div>{renderTabContent()}</div>
    </div>
  );
};

export default MentalHealthSupport;
