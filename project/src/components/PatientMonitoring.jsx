import React, { useState, useEffect } from 'react';
import { Activity, Heart, Thermometer, Droplets, Wind, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

/**
 * @typedef {Object} VitalSigns
 * @property {number} heartRate
 * @property {{ systolic: number, diastolic: number }} bloodPressure
 * @property {number} temperature
 * @property {number} oxygenSaturation
 * @property {number} respiratoryRate
 * @property {string} timestamp
 */

/**
 * @typedef {Object} Alert
 * @property {string} id
 * @property {'critical'|'warning'|'info'} type
 * @property {string} message
 * @property {string} timestamp
 * @property {boolean} acknowledged
 */

/**
 * @typedef {Object} Patient
 * @property {string} id
 * @property {string} name
 * @property {string} room
 * @property {string} condition
 * @property {'Critical'|'Stable'|'Improving'} status
 * @property {VitalSigns[]} vitals
 * @property {Alert[]} alerts
 */

const PatientMonitoring = () => {
  /** @type {[Patient[], Function]} */
  const [patients] = useState([
    {
      id: '1',
      name: 'Robert Johnson',
      room: 'ICU-101',
      condition: 'Post-operative complications',
      status: 'Critical',
      vitals: [
        {
          heartRate: 85,
          bloodPressure: { systolic: 120, diastolic: 80 },
          temperature: 98.6,
          oxygenSaturation: 95,
          respiratoryRate: 16,
          timestamp: new Date().toISOString()
        }
      ],
      alerts: [
        {
          id: '1',
          type: 'warning',
          message: 'Heart rate elevated above normal range',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          acknowledged: false
        }
      ]
    },
    {
      id: '2',
      name: 'Emma Davis',
      room: 'ICU-102',
      condition: 'Respiratory failure',
      status: 'Stable',
      vitals: [
        {
          heartRate: 72,
          bloodPressure: { systolic: 110, diastolic: 70 },
          temperature: 99.1,
          oxygenSaturation: 98,
          respiratoryRate: 14,
          timestamp: new Date().toISOString()
        }
      ],
      alerts: []
    }
  ]);

  const [selectedPatient, setSelectedPatient] = useState(patients[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newVitals = {
        heartRate: 70 + Math.floor(Math.random() * 30),
        bloodPressure: {
          systolic: 110 + Math.floor(Math.random() * 20),
          diastolic: 70 + Math.floor(Math.random() * 15)
        },
        temperature: 98 + Math.random() * 2,
        oxygenSaturation: 95 + Math.floor(Math.random() * 5),
        respiratoryRate: 12 + Math.floor(Math.random() * 8),
        timestamp: new Date().toISOString()
      };

      setSelectedPatient(prev => ({
        ...prev,
        vitals: [...prev.vitals.slice(-9), newVitals]
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getVitalStatus = (vital, value) => {
    const ranges = {
      heartRate: { normal: [60, 100], warning: [50, 120] },
      systolic: { normal: [90, 140], warning: [80, 160] },
      diastolic: { normal: [60, 90], warning: [50, 100] },
      temperature: { normal: [97, 99], warning: [96, 101] },
      oxygenSaturation: { normal: [95, 100], warning: [90, 100] },
      respiratoryRate: { normal: [12, 20], warning: [10, 25] }
    };

    const range = ranges[vital];
    if (!range) return 'normal';

    if (value >= range.normal[0] && value <= range.normal[1]) return 'normal';
    if (value >= range.warning[0] && value <= range.warning[1]) return 'warning';
    return 'critical';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const currentVitals = selectedPatient.vitals[selectedPatient.vitals.length - 1];

  return (
    <div className="space-y-6">
      {/* Component JSX as in original... */}
      {/* You can paste the rest of your JSX UI structure here. */}
    </div>
  );
};

export default PatientMonitoring;
