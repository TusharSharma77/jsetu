'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Video, 
  Pill, 
  FileText, 
  Phone, 
  Bell, 
  Clock,
  Calendar,
  MapPin,
  Star,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Heart,
  Stethoscope,
  Shield
} from 'lucide-react';
import { sampleConsultations, sampleHealthAlerts, sampleEmergencyContacts } from '@/data/sampleData';

const PatientDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'consultations' | 'medicines' | 'records'>('overview');

  // Mock patient data
  const patientData = {
    name: 'Rajesh Kumar',
    age: 45,
    location: 'Village A',
    lastConsultation: new Date('2024-01-15'),
    upcomingAppointments: 1,
    healthScore: 85,
    emergencyContacts: 3
  };

  const quickActions = [
    {
      icon: Video,
      title: 'Book Consultation',
      description: 'Schedule a video call with a doctor',
      color: 'bg-blue-500',
      link: '/consult',
      urgent: false
    },
    {
      icon: Brain,
      title: 'Check Symptoms',
      description: 'AI-powered symptom analysis',
      color: 'bg-purple-500',
      link: '/symptoms',
      urgent: false
    },
    {
      icon: Pill,
      title: 'Find Medicines',
      description: 'Check medicine availability nearby',
      color: 'bg-green-500',
      link: '/medicines',
      urgent: false
    },
    {
      icon: Phone,
      title: 'Emergency SOS',
      description: 'Quick access to emergency services',
      color: 'bg-red-500',
      link: '#',
      urgent: true
    }
  ];

  const healthMetrics = [
    {
      title: 'Health Score',
      value: '85%',
      trend: '+5%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Consultations This Month',
      value: '3',
      trend: '+1',
      icon: Video,
      color: 'text-blue-600'
    },
    {
      title: 'Medicines Tracked',
      value: '5',
      trend: '0',
      icon: Pill,
      color: 'text-green-600'
    },
    {
      title: 'Health Records',
      value: '12',
      trend: '+2',
      icon: FileText,
      color: 'text-indigo-600'
    }
  ];

  const recentActivity = [
    {
      type: 'consultation',
      title: 'Video consultation with Dr. Priya Sharma',
      time: '2 hours ago',
      status: 'completed',
      icon: Video,
      color: 'text-green-600'
    },
    {
      type: 'medicine',
      title: 'Paracetamol 500mg found at Rural Health Center',
      time: '1 day ago',
      status: 'available',
      icon: Pill,
      color: 'text-blue-600'
    },
    {
      type: 'alert',
      title: 'Dengue prevention alert for your area',
      time: '2 days ago',
      status: 'active',
      icon: Bell,
      color: 'text-orange-600'
    },
    {
      type: 'record',
      title: 'Health record updated with latest consultation',
      time: '3 days ago',
      status: 'synced',
      icon: FileText,
      color: 'text-indigo-600'
    }
  ];

  const upcomingAppointments = sampleConsultations.filter(cons => cons.status === 'scheduled');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {patientData.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Here's your health overview and quick access to services
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Last consultation</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {patientData.lastConsultation.toLocaleDateString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthMetrics.map((metric, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{metric.value}</p>
                  <div className="flex items-center text-sm mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">{metric.trend}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all ${
                  action.urgent ? 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700' : 'bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${action.color}`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className={`font-semibold ${action.urgent ? 'text-red-900 dark:text-red-100' : 'text-gray-900 dark:text-white'}`}>
                      {action.title}
                    </h3>
                    <p className={`text-sm ${action.urgent ? 'text-red-700 dark:text-red-300' : 'text-gray-600 dark:text-gray-300'}`}>
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className={`p-2 rounded-full bg-white dark:bg-gray-600`}>
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      activity.status === 'available' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      activity.status === 'active' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Appointments</h3>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-3">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{appointment.doctorName}</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {appointment.date.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{appointment.symptoms}</p>
                      <div className="flex items-center mt-2">
                        <Clock className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {appointment.date.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400">No upcoming appointments</p>
                  <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Book Consultation
                  </button>
                </div>
              )}
            </div>

            {/* Health Alerts */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Alerts</h3>
              <div className="space-y-3">
                {sampleHealthAlerts.slice(0, 2).map((alert) => (
                  <div key={alert.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Bell className="w-4 h-4 text-orange-600" />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        alert.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{alert.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{alert.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Emergency Contacts</h3>
              <div className="space-y-3">
                {sampleEmergencyContacts.slice(0, 2).map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">{contact.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{contact.phone}</p>
                    </div>
                    <button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
