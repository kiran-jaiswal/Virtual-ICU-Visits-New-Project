import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Phone, 
  Heart, 
  Clock, 
  CheckCircle, 
  X, 
  Play, 
  RotateCcw 
} from 'lucide-react';

const EmergencyProtocols = ({ userRole }) => {
  const [activeProtocol, setActiveProtocol] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showContacts, setShowContacts] = useState(false);

  const emergencyContacts = [
    { id: '1', name: 'Emergency Services', role: 'Emergency Response', phone: '911', priority: 'emergency' },
    { id: '2', name: 'Dr. Sarah Johnson', role: 'Attending Physician', phone: '(555) 123-4567', priority: 'primary' },
    { id: '3', name: 'ICU Nursing Station', role: 'Nursing Team', phone: '(555) 123-4568', priority: 'primary' },
    { id: '4', name: 'Hospital Security', role: 'Security Team', phone: '(555) 123-4569', priority: 'secondary' }
  ];

  const protocols = [
    {
      id: '1',
      title: 'Cardiac Emergency',
      description: 'Immediate response for cardiac arrest or severe cardiac events',
      estimatedTime: '2-5 minutes',
      severity: 'critical',
      steps: [
        'Call 911 immediately',
        'Check for responsiveness and breathing',
        'Begin CPR if no pulse detected',
        'Use AED if available',
        'Continue CPR until help arrives',
        'Document time and actions taken'
      ]
    },
    {
      id: '2',
      title: 'Respiratory Distress',
      description: 'Protocol for severe breathing difficulties or respiratory failure',
      estimatedTime: '1-3 minutes',
      severity: 'critical',
      steps: [
        'Assess airway and breathing',
        'Position patient upright if conscious',
        'Administer oxygen if available',
        'Call medical team immediately',
        'Monitor vital signs continuously',
        'Prepare for intubation if needed'
      ]
    },
    {
      id: '3',
      title: 'Severe Bleeding',
      description: 'Emergency response for significant blood loss',
      estimatedTime: '2-4 minutes',
      severity: 'urgent',
      steps: [
        'Apply direct pressure to wound',
        'Elevate injured area if possible',
        'Use pressure bandage',
        'Call for medical assistance',
        'Monitor for signs of shock',
        'Prepare for blood transfusion'
      ]
    },
    {
      id: '4',
      title: 'Allergic Reaction',
      description: 'Response protocol for severe allergic reactions',
      estimatedTime: '1-2 minutes',
      severity: 'urgent',
      steps: [
        'Identify and remove allergen',
        'Administer epinephrine if available',
        'Call medical team',
        'Monitor airway and breathing',
        'Prepare antihistamines',
        'Document reaction details'
      ]
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'urgent': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'emergency': return 'text-red-600 bg-red-100';
      case 'primary': return 'text-blue-600 bg-blue-100';
      case 'secondary': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const startProtocol = (protocol) => {
    setActiveProtocol(protocol);
    setCurrentStep(0);
    setElapsedTime(0);
    setIsTimerRunning(true);
  };

  const nextStep = () => {
    if (activeProtocol && currentStep < activeProtocol.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetProtocol = () => {
    setActiveProtocol(null);
    setCurrentStep(0);
    setElapsedTime(0);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const callEmergency = (phone) => {
    if (phone === '911') {
      alert('Emergency services would be contacted immediately');
    } else {
      window.open(`tel:${phone}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Emergency Protocols</h2>
              <p className="text-gray-600 mt-1">
                {userRole === 'doctor'
                  ? 'Quick access to emergency response procedures'
                  : 'Emergency contacts and basic response guidelines'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowContacts(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>Emergency Contacts</span>
          </button>
        </div>
      </div>

      {/* Emergency Contact Modal */}
      {showContacts && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Emergency Contacts</h3>
                <button
                  onClick={() => setShowContacts(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {emergencyContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getPriorityColor(contact.priority)}`}>
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => callEmergency(contact.phone)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Call
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* More JSX continues as needed for protocol view */}
    </div>
  );
};

export default EmergencyProtocols;
