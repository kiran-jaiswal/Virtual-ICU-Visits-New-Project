/* Converted FamilyDashboard.tsx to JSX */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Heart, 
  Video, 
  Calendar, 
  Clock, 
  Bell, 
  Settings, 
  LogOut, 
  User, 
  Phone,
  MessageSquare,
  Activity,
  FileText,
  Camera,
  Mic,
  MicOff,
  Plus,
  Brain,
  Smartphone,
  AlertTriangle,
  Shield
} from 'lucide-react';
import AppointmentScheduler from './AppointmentScheduler';
import AppointmentList from './AppointmentList';
import MedicalRecords from './MedicalRecords';
import AIHealthAssistant from './AIHealthAssistant';
import TelehealthIntegration from './TelehealthIntegration';
import EmergencyProtocols from './EmergencyProtocols';
import MentalHealthSupport from './MentalHealthSupport';

const FamilyDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAppointmentScheduler, setShowAppointmentScheduler] = useState(false);

  const patientInfo = {
    name: 'Robert Johnson',
    age: 67,
    condition: 'Post-operative complications',
    room: 'ICU-101',
    admissionDate: '2024-01-15',
    doctor: 'Dr. Sarah Johnson',
    status: 'Stable'
  };

  const visits = [
    { id: '1', date: '2024-01-20', time: '14:30', duration: '25 min', status: 'completed', doctor: 'Dr. Sarah Johnson' },
    { id: '2', date: '2024-01-21', time: '10:00', duration: '30 min', status: 'scheduled', doctor: 'Dr. Sarah Johnson' },
    { id: '3', date: '2024-01-19', time: '16:00', duration: '20 min', status: 'completed', doctor: 'Dr. Sarah Johnson' }
  ];

  const [appointments, setAppointments] = useState([
    {
      id: '1',
      patientName: 'Robert Johnson',
      doctorName: 'Dr. Sarah Johnson',
      date: '2024-01-21',
      time: '10:00',
      duration: 30,
      type: 'video',
      status: 'scheduled',
      priority: 'high',
      notes: 'Family consultation for post-operative care',
      familyMembers: ['John Smith', 'Mary Johnson']
    },
    {
      id: '2',
      patientName: 'Robert Johnson',
      doctorName: 'Dr. Sarah Johnson',
      date: '2024-01-20',
      time: '14:30',
      duration: 25,
      type: 'video',
      status: 'completed',
      priority: 'medium',
      notes: 'Weekly check-in',
      familyMembers: ['John Smith']
    }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const startVideoCall = () => {
    navigate('/video-call/patient-1');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'Stable': return 'text-yellow-600 bg-yellow-100';
      case 'Improving': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getVisitStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleScheduleAppointment = (appointmentData) => {
    const newAppointment = {
      ...appointmentData,
      id: Date.now().toString()
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const handleEditAppointment = (appointment) => {
    console.log('Edit appointment:', appointment);
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  const handleJoinAppointment = (id) => {
    navigate(`/video-call/${id}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appointments':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
              <button
                onClick={() => setShowAppointmentScheduler(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Request Appointment</span>
              </button>
            </div>
            <AppointmentList
              appointments={appointments}
              userRole="family"
              onEdit={handleEditAppointment}
              onDelete={handleDeleteAppointment}
              onJoin={handleJoinAppointment}
            />
          </div>
        );
      case 'records':
        return <MedicalRecords userRole="family" />;
      case 'ai-assistant':
        return <AIHealthAssistant userRole="family" />;
      case 'telehealth':
        return <TelehealthIntegration userRole="family" />;
      case 'emergency':
        return <EmergencyProtocols userRole="family" />;
      case 'mental-health':
        return <MentalHealthSupport userRole="family" />;
      default:
        return <div className="text-gray-600">Overview coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-semibold text-gray-800">Virtual ICU</span>
          </Link>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-600 hidden sm:block">Welcome, <span className="font-semibold">{user?.name}</span></p>
            <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-6 overflow-x-auto">
            {["overview", "appointments", "records", "communication", "ai-assistant", "telehealth", "emergency", "mental-health"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderTabContent()}
      </main>

      {showAppointmentScheduler && (
        <AppointmentScheduler
          userRole="family"
          onClose={() => setShowAppointmentScheduler(false)}
          onSchedule={handleScheduleAppointment}
        />
      )}
    </div>
  );
};

export default FamilyDashboard;
