import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Heart, Video, Calendar, Users, Bell, Settings, LogOut, Activity, Clock, UserCheck,
  MessageSquare, Phone, Search, Filter, FileText, Stethoscope, Plus, Brain,
  Smartphone, AlertTriangle
} from 'lucide-react';
import AppointmentScheduler from './AppointmentScheduler';
import AppointmentList from './AppointmentList';
import PatientMonitoring from './PatientMonitoring';
import MedicalRecords from './MedicalRecords';
import AIHealthAssistant from './AIHealthAssistant';
import TelehealthIntegration from './TelehealthIntegration';
import EmergencyProtocols from './EmergencyProtocols';
import MentalHealthSupport from './MentalHealthSupport';

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAppointmentScheduler, setShowAppointmentScheduler] = useState(false);

  const patients = [
    {
      id: '1', name: 'Robert Johnson', age: 67, condition: 'Post-operative complications', severity: 'Critical',
      room: 'ICU-101', admissionDate: '2024-01-15', familyMembers: ['John Smith (Son)', 'Mary Johnson (Daughter)'],
      lastVisit: '2 hours ago', status: 'online'
    },
    {
      id: '2', name: 'Emma Davis', age: 45, condition: 'Respiratory failure', severity: 'Stable',
      room: 'ICU-102', admissionDate: '2024-01-18', familyMembers: ['Michael Davis (Husband)', 'Sarah Davis (Sister)'],
      lastVisit: '1 day ago', status: 'offline'
    },
    {
      id: '3', name: 'James Wilson', age: 72, condition: 'Cardiac arrest recovery', severity: 'Improving',
      room: 'ICU-103', admissionDate: '2024-01-10', familyMembers: ['Lisa Wilson (Wife)', 'Tom Wilson (Son)'],
      lastVisit: '4 hours ago', status: 'online'
    }
  ];

  const [appointments, setAppointments] = useState([
    {
      id: '1', patientName: 'Robert Johnson', doctorName: 'Dr. Sarah Johnson', date: '2024-01-21', time: '10:00',
      duration: 30, type: 'video', status: 'scheduled', priority: 'high', notes: 'Post-operative follow-up',
      familyMembers: ['John Smith', 'Mary Johnson']
    },
    {
      id: '2', patientName: 'Emma Davis', doctorName: 'Dr. Sarah Johnson', date: '2024-01-21', time: '14:30',
      duration: 45, type: 'consultation', status: 'scheduled', priority: 'medium', notes: 'Respiratory assessment',
      familyMembers: ['Michael Davis']
    }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const startVideoCall = (patientId) => {
    navigate(`/video-call/${patientId}`);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'Stable': return 'text-yellow-600 bg-yellow-100';
      case 'Improving': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScheduleAppointment = (appointmentData) => {
    const newAppointment = { ...appointmentData, id: Date.now().toString() };
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

  return (
    <div> {/* Truncated for brevity */} </div>
  );
};

export default DoctorDashboard;