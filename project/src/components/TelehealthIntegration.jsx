import React, { useState } from 'react';
import {
  Smartphone, Watch, Activity, Wifi, WifiOff, Battery, Bluetooth, Heart, Thermometer,
  Droplets, Wind, AlertTriangle, CheckCircle, FolderSync as Sync, Settings
} from 'lucide-react';

const TelehealthIntegration = ({ userRole }) => {
  const [devices, setDevices] = useState([
    {
      id: '1',
      name: 'Apple Watch Series 9',
      type: 'smartwatch',
      status: 'connected',
      battery: 85,
      lastSync: '2 minutes ago',
      data: {
        heartRate: 72,
        steps: 8420,
        calories: 1850,
        sleepHours: 7.5
      }
    },
    {
      id: '2',
      name: 'iPhone Health App',
      type: 'phone',
      status: 'connected',
      battery: 92,
      lastSync: '1 minute ago',
      data: {
        bloodPressure: { systolic: 118, diastolic: 78 },
        weight: 165,
        medications: ['Taken', 'Pending', 'Taken']
      }
    },
    {
      id: '3',
      name: 'Pulse Oximeter',
      type: 'sensor',
      status: 'syncing',
      battery: 67,
      lastSync: '5 minutes ago',
      data: {
        oxygenSaturation: 97,
        pulseRate: 74
      }
    },
    {
      id: '4',
      name: 'Smart Thermometer',
      type: 'sensor',
      status: 'disconnected',
      battery: 23,
      lastSync: '2 hours ago',
      data: {
        temperature: 98.4
      }
    }
  ]);

  const [selectedDevice, setSelectedDevice] = useState(devices[0]);
  const [showSettings, setShowSettings] = useState(false);

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'smartwatch': return Watch;
      case 'phone': return Smartphone;
      case 'sensor': return Activity;
      case 'monitor': return Heart;
      default: return Activity;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100';
      case 'disconnected': return 'text-red-600 bg-red-100';
      case 'syncing': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getBatteryColor = (battery) => {
    if (battery > 50) return 'text-green-600';
    if (battery > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const syncDevice = (deviceId) => {
    setDevices(prev => prev.map(device =>
      device.id === deviceId
        ? { ...device, status: 'syncing', lastSync: 'Syncing...' }
        : device
    ));

    setTimeout(() => {
      setDevices(prev => prev.map(device =>
        device.id === deviceId
          ? { ...device, status: 'connected', lastSync: 'Just now' }
          : device
      ));
    }, 3000);
  };

  const renderDeviceData = (device) => {
    if (device.type === 'smartwatch') {
      return (
        <div className="grid grid-cols-2 gap-4">
          {/* Render smartwatch data */}
        </div>
      );
    } else if (device.type === 'phone') {
      return (
        <div className="space-y-4">
          {/* Render phone data */}
        </div>
      );
    } else if (device.type === 'sensor') {
      if (device.name.includes('Oximeter')) {
        return (
          <div className="bg-blue-50 p-3 rounded-lg">
            {/* Oximeter data */}
          </div>
        );
      } else {
        return (
          <div className="bg-orange-50 p-3 rounded-lg">
            {/* Thermometer data */}
          </div>
        );
      }
    }
    return <div>No data available</div>;
  };

  return (
    <div className="space-y-6">
      {/* UI rendering omitted for brevity. Paste full return if needed. */}
    </div>
  );
};

export default TelehealthIntegration;
