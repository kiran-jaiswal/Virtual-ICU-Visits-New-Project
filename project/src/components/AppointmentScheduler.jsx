import React, { useState } from 'react';
import { Calendar, Clock, User, Video, Phone, MessageSquare, X, Check, AlertCircle } from 'lucide-react';

const AppointmentScheduler = ({ userRole, onClose, onSchedule }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: userRole === 'doctor' ? 'Dr. Sarah Johnson' : '',
    date: '',
    time: '',
    duration: 30,
    type: 'video',
    priority: 'medium',
    notes: '',
    familyMembers: ['']
  });

  const [errors, setErrors] = useState({});

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) newErrors.patientName = 'Patient name is required';
    if (!formData.doctorName.trim()) newErrors.doctorName = 'Doctor name is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';

    const selectedDate = new Date(formData.date + 'T' + formData.time);
    if (selectedDate <= new Date()) {
      newErrors.date = 'Please select a future date and time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const appointment = {
      ...formData,
      status: 'scheduled',
      familyMembers: formData.familyMembers.filter(member => member.trim() !== '')
    };

    onSchedule(appointment);
    onClose();
  };

  const addFamilyMember = () => {
    setFormData(prev => ({
      ...prev,
      familyMembers: [...prev.familyMembers, '']
    }));
  };

  const removeFamilyMember = (index) => {
    setFormData(prev => ({
      ...prev,
      familyMembers: prev.familyMembers.filter((_, i) => i !== index)
    }));
  };

  const updateFamilyMember = (index, value) => {
    setFormData(prev => ({
      ...prev,
      familyMembers: prev.familyMembers.map((member, i) => i === index ? value : member)
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Schedule Appointment</h2>
              <p className="text-gray-600 mt-1">Book a virtual visit with medical supervision</p>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* patient, doctor, date, time, type, priority, family members, notes */}
          {/* ... complete form implementation ... */}
          {/* Form structure omitted for brevity but same as in original code */}
        </form>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
