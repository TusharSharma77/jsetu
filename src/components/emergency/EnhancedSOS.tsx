'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Phone, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Ambulance,
  Hospital,
  Shield,
  CheckCircle,
  XCircle,
  Loader2,
  MessageCircle
} from 'lucide-react';
import { emergencyApi, EmergencyRequest } from '@/lib/api';
import { sampleEmergencyContacts } from '@/data/sampleData';

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  type: 'ambulance' | 'hospital' | 'police' | 'fire' | 'general';
  location?: string;
  distance?: number;
}

interface EmergencyRequest {
  id: string;
  type: 'medical' | 'accident' | 'fire' | 'police' | 'other';
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  description: string;
  timestamp: Date;
  status: 'pending' | 'dispatched' | 'arrived' | 'completed';
  response?: {
    requestId: string;
    status: string;
    estimatedArrival: string;
    contactNumber: string;
    message: string;
  };
}

const EnhancedSOS: React.FC = () => {
  const { t } = useTranslation();
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{latitude: number, longitude: number, address: string} | null>(null);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [activeEmergency, setActiveEmergency] = useState<EmergencyRequest | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize emergency contacts
  useEffect(() => {
    const mockContacts: EmergencyContact[] = [
      { id: '1', name: 'Emergency Ambulance', number: '108', type: 'ambulance', location: 'District Hospital', distance: 5.2 },
      { id: '2', name: 'Police Emergency', number: '100', type: 'police', location: 'Police Station', distance: 2.1 },
      { id: '3', name: 'Fire Department', number: '101', type: 'fire', location: 'Fire Station', distance: 3.8 },
      { id: '4', name: 'Nearest Hospital', number: '+91-9876543210', type: 'hospital', location: 'Rural Health Center', distance: 1.5 },
    ];
    setEmergencyContacts(mockContacts);
    getCurrentLocation();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && isEmergencyMode) {
      // Auto-trigger emergency after countdown
      triggerEmergency();
    }
    return () => clearInterval(interval);
  }, [countdown, isEmergencyMode]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Mock address - in real app, use reverse geocoding
          setCurrentLocation({
            latitude,
            longitude,
            address: 'Rural Village, District, State'
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to mock location
          setCurrentLocation({
            latitude: 28.6139,
            longitude: 77.2090,
            address: 'Rural Village, District, State'
          });
        }
      );
    }
  };

  const startEmergencyCountdown = () => {
    setIsEmergencyMode(true);
    setCountdown(5); // 5 second countdown
    setSuccessMessage('');
    setErrorMessage('');
  };

  const cancelEmergency = () => {
    setIsEmergencyMode(false);
    setCountdown(0);
  };

  const triggerEmergency = async () => {
    if (!currentLocation) {
      setErrorMessage('Location not available. Please enable location services.');
      setIsEmergencyMode(false);
      setCountdown(0);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const emergencyRequest: EmergencyRequest = {
        type: 'medical',
        location: currentLocation,
        description: 'Emergency SOS activated by user',
        userId: 'current_user' // In real app, get from auth context
      };

      const response = await emergencyApi.sendRequest(emergencyRequest);

      if (response.success) {
        const emergency: EmergencyRequest = {
          id: response.data.requestId,
          type: 'medical',
          location: currentLocation,
          description: 'Emergency SOS activated',
          timestamp: new Date(),
          status: 'dispatched',
          response: response.data
        };

        setActiveEmergency(emergency);
        setSuccessMessage('Emergency services have been notified and are on their way!');
        
        // Simulate status updates
        setTimeout(() => {
          setActiveEmergency(prev => prev ? { ...prev, status: 'arrived' } : null);
        }, 10000);
      } else {
        setErrorMessage('Failed to send emergency request. Please try again or call directly.');
      }
    } catch (error) {
      console.error('Emergency request failed:', error);
      setErrorMessage('Network error. Please call emergency services directly.');
    } finally {
      setIsLoading(false);
      setIsEmergencyMode(false);
      setCountdown(0);
    }
  };

  const callEmergencyNumber = async (contact: EmergencyContact) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // In a real app, this would initiate a phone call
      // For demo purposes, we'll simulate the call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Open phone dialer
      window.open(`tel:${contact.number}`, '_self');
      
      setSuccessMessage(`Calling ${contact.name}...`);
    } catch (error) {
      setErrorMessage('Failed to initiate call. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'dispatched': return 'text-blue-600 bg-blue-100 dark:bg-blue-900';
      case 'arrived': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'completed': return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'dispatched': return <Ambulance className="w-4 h-4" />;
      case 'arrived': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <Shield className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('emergency.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Quick access to emergency services and medical help
          </p>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <p className="text-green-800 dark:text-green-200">{successMessage}</p>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
            <div className="flex items-center">
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
              <p className="text-red-800 dark:text-red-200">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Emergency Countdown */}
        {isEmergencyMode && (
          <div className="fixed inset-0 bg-red-600 bg-opacity-90 flex items-center justify-center z-50">
            <div className="text-center text-white">
              <AlertTriangle className="w-16 h-16 mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold mb-2">EMERGENCY SOS</h2>
              <p className="text-lg mb-4">Emergency services will be contacted in:</p>
              <div className="text-6xl font-bold mb-6">{countdown}</div>
              <button
                onClick={cancelEmergency}
                className="px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Cancel Emergency
              </button>
            </div>
          </div>
        )}

        {/* Main SOS Button */}
        <div className="text-center mb-8">
          <button
            onClick={startEmergencyCountdown}
            disabled={isLoading}
            className="w-32 h-32 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="w-12 h-12 animate-spin" />
            ) : (
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
                <span className="text-lg font-bold">SOS</span>
              </div>
            )}
          </button>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Press and hold for 5 seconds to activate emergency services
          </p>
        </div>

        {/* Active Emergency Status */}
        {activeEmergency && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Active Emergency
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(activeEmergency.status)}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Emergency #{activeEmergency.id}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activeEmergency.location.address}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(activeEmergency.status)}`}>
                {activeEmergency.status.toUpperCase()}
              </span>
            </div>
            
            {activeEmergency.response && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Emergency Response Details:
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-1">
                  <strong>Status:</strong> {activeEmergency.response.status}
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-1">
                  <strong>Estimated Arrival:</strong> {activeEmergency.response.estimatedArrival}
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-1">
                  <strong>Contact:</strong> {activeEmergency.response.contactNumber}
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {activeEmergency.response.message}
                </p>
              </div>
            )}
            
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <p>Started: {activeEmergency.timestamp.toLocaleString()}</p>
              <p>Type: {activeEmergency.type}</p>
            </div>
          </div>
        )}

        {/* Emergency Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {emergencyContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {contact.type === 'ambulance' && <Ambulance className="w-6 h-6 text-red-600" />}
                  {contact.type === 'hospital' && <Hospital className="w-6 h-6 text-blue-600" />}
                  {contact.type === 'police' && <Shield className="w-6 h-6 text-blue-600" />}
                  {contact.type === 'fire' && <AlertTriangle className="w-6 h-6 text-orange-600" />}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {contact.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {contact.number}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => callEmergencyNumber(contact)}
                  disabled={isLoading}
                  className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:bg-green-400 transition-colors"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />}
                </button>
              </div>
              
              {contact.location && (
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{contact.location}</span>
                  {contact.distance && (
                    <span>({contact.distance} km away)</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 text-center border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Ambulance className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {t('emergency.callAmbulance')}
              </div>
            </button>
            <button className="p-4 text-center border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Hospital className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {t('emergency.nearestHospital')}
              </div>
            </button>
            <button className="p-4 text-center border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Police
              </div>
            </button>
            <button className="p-4 text-center border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <MessageCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Chat Support
              </div>
            </button>
          </div>
        </div>

        {/* Location Info */}
        {currentLocation && (
          <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-200">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Current Location:</span>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              {currentLocation.address}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedSOS;
