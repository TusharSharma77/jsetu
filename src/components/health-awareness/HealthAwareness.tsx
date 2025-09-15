'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Bell, 
  Calendar, 
  MapPin, 
  Users, 
  AlertTriangle,
  Heart,
  Shield,
  Activity,
  Clock,
  CheckCircle
} from 'lucide-react';

interface HealthAlert {
  id: string;
  title: string;
  description: string;
  type: 'vaccination' | 'disease' | 'camp' | 'general';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  date: Date;
  location: string;
  targetAudience: string[];
  actionRequired: boolean;
  actionText?: string;
  actionUrl?: string;
}

interface VaccinationDrive {
  id: string;
  vaccine: string;
  targetAge: string;
  date: Date;
  location: string;
  availableSlots: number;
  totalSlots: number;
  description: string;
}

interface HealthCamp {
  id: string;
  name: string;
  type: 'general' | 'specialized' | 'emergency';
  date: Date;
  location: string;
  services: string[];
  doctors: string[];
  registrationRequired: boolean;
  maxParticipants: number;
  currentParticipants: number;
}

const HealthAwareness: React.FC = () => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState<HealthAlert[]>([]);
  const [vaccinationDrives, setVaccinationDrives] = useState<VaccinationDrive[]>([]);
  const [healthCamps, setHealthCamps] = useState<HealthCamp[]>([]);
  const [selectedTab, setSelectedTab] = useState<'alerts' | 'vaccinations' | 'camps'>('alerts');

  // Mock data
  useEffect(() => {
    const mockAlerts: HealthAlert[] = [
      {
        id: '1',
        title: 'Dengue Prevention Campaign',
        description: 'High risk of dengue fever in your area. Take preventive measures and report symptoms immediately.',
        type: 'disease',
        severity: 'high',
        date: new Date(),
        location: 'Rural District A',
        targetAudience: ['all'],
        actionRequired: true,
        actionText: 'Learn Prevention Tips',
        actionUrl: '/prevention/dengue'
      },
      {
        id: '2',
        title: 'COVID-19 Booster Vaccination',
        description: 'COVID-19 booster shots available for eligible population. Book your appointment now.',
        type: 'vaccination',
        severity: 'moderate',
        date: new Date(),
        location: 'District Hospital',
        targetAudience: ['adults', 'seniors'],
        actionRequired: true,
        actionText: 'Book Appointment',
        actionUrl: '/vaccination/covid-booster'
      },
      {
        id: '3',
        title: 'Free Health Checkup Camp',
        description: 'Free health checkup camp organized by local health department. All are welcome.',
        type: 'camp',
        severity: 'low',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        location: 'Community Center',
        targetAudience: ['all'],
        actionRequired: true,
        actionText: 'Register Now',
        actionUrl: '/camps/health-checkup'
      }
    ];

    const mockVaccinationDrives: VaccinationDrive[] = [
      {
        id: '1',
        vaccine: 'COVID-19 Booster',
        targetAge: '18+ years',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        location: 'District Hospital',
        availableSlots: 45,
        totalSlots: 100,
        description: 'COVID-19 booster vaccination drive for eligible population'
      },
      {
        id: '2',
        vaccine: 'Hepatitis B',
        targetAge: 'All ages',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        location: 'Rural Health Center',
        availableSlots: 78,
        totalSlots: 100,
        description: 'Hepatitis B vaccination drive for all age groups'
      },
      {
        id: '3',
        vaccine: 'Measles & Rubella',
        targetAge: '9 months - 15 years',
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        location: 'Primary Health Center',
        availableSlots: 23,
        totalSlots: 50,
        description: 'Measles and Rubella vaccination for children'
      }
    ];

    const mockHealthCamps: HealthCamp[] = [
      {
        id: '1',
        name: 'General Health Checkup',
        type: 'general',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        location: 'Community Center',
        services: ['Blood Pressure', 'Blood Sugar', 'BMI Check', 'General Consultation'],
        doctors: ['Dr. Priya Sharma', 'Dr. Amit Singh'],
        registrationRequired: true,
        maxParticipants: 100,
        currentParticipants: 67
      },
      {
        id: '2',
        name: 'Eye Care Camp',
        type: 'specialized',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        location: 'District Hospital',
        services: ['Eye Examination', 'Vision Test', 'Glaucoma Screening', 'Cataract Check'],
        doctors: ['Dr. Neha Gupta', 'Dr. Rajesh Kumar'],
        registrationRequired: true,
        maxParticipants: 50,
        currentParticipants: 23
      },
      {
        id: '3',
        name: 'Emergency Medical Camp',
        type: 'emergency',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        location: 'Village Square',
        services: ['Emergency Care', 'First Aid', 'Medication Distribution', 'Health Education'],
        doctors: ['Dr. Emergency Team'],
        registrationRequired: false,
        maxParticipants: 200,
        currentParticipants: 0
      }
    ];

    setAlerts(mockAlerts);
    setVaccinationDrives(mockVaccinationDrives);
    setHealthCamps(mockHealthCamps);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 'high': return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200';
      case 'moderate': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'low': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      default: return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vaccination': return <Shield className="w-5 h-5" />;
      case 'disease': return <AlertTriangle className="w-5 h-5" />;
      case 'camp': return <Users className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vaccination': return 'text-blue-600';
      case 'disease': return 'text-red-600';
      case 'camp': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Health Awareness & Alerts
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Stay informed about health campaigns, vaccination drives, and medical camps in your area
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
            {[
              { id: 'alerts', label: 'Health Alerts', icon: Bell },
              { id: 'vaccinations', label: 'Vaccination Drives', icon: Shield },
              { id: 'camps', label: 'Health Camps', icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {selectedTab === 'alerts' && (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getTypeColor(alert.type)}`}>
                      {getTypeIcon(alert.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {alert.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {alert.description}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{alert.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{alert.location}</span>
                    </div>
                  </div>
                  
                  {alert.actionRequired && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      {alert.actionText}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'vaccinations' && (
          <div className="space-y-4">
            {vaccinationDrives.map((drive) => (
              <div key={drive.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {drive.vaccine}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {drive.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Target Age: {drive.targetAge}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {drive.availableSlots} / {drive.totalSlots} slots available
                    </div>
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(drive.availableSlots / drive.totalSlots) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{drive.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{drive.location}</span>
                    </div>
                  </div>
                  
                  <button 
                    className={`px-4 py-2 rounded-md transition-colors ${
                      drive.availableSlots > 0
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                    disabled={drive.availableSlots === 0}
                  >
                    {drive.availableSlots > 0 ? 'Book Slot' : 'Fully Booked'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'camps' && (
          <div className="space-y-4">
            {healthCamps.map((camp) => (
              <div key={camp.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      camp.type === 'emergency' ? 'bg-red-100 dark:bg-red-900 text-red-600' :
                      camp.type === 'specialized' ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' :
                      'bg-green-100 dark:bg-green-900 text-green-600'
                    }`}>
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {camp.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {camp.type.charAt(0).toUpperCase() + camp.type.slice(1)} Health Camp
                      </p>
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Services:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {camp.services.map((service, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {camp.currentParticipants} / {camp.maxParticipants} participants
                    </div>
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(camp.currentParticipants / camp.maxParticipants) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Doctors:</p>
                  <div className="flex flex-wrap gap-1">
                    {camp.doctors.map((doctor, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
                        {doctor}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{camp.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{camp.location}</span>
                    </div>
                    {camp.registrationRequired && (
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Registration Required</span>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    className={`px-4 py-2 rounded-md transition-colors ${
                      camp.currentParticipants < camp.maxParticipants
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                    disabled={camp.currentParticipants >= camp.maxParticipants}
                  >
                    {camp.registrationRequired 
                      ? (camp.currentParticipants < camp.maxParticipants ? 'Register' : 'Fully Booked')
                      : 'Join Camp'
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthAwareness;


