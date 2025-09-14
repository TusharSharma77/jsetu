'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/globalContext/store';
import { UserRole } from '@/types/auth';
import { AdminDashboardData, DashboardStats } from '@/types/dashboard';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Users, 
  Stethoscope, 
  Pill, 
  Brain, 
  Shield, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  MapPin,
  Phone
} from 'lucide-react';

// Mock data for demonstration
const mockDashboardData: AdminDashboardData = {
  stats: {
    telemedicine: {
      activeConsultations: 24,
      totalConsultations: 1247,
      completedConsultations: 1223,
      averageConsultationTime: 18.5,
      patientSatisfaction: 4.7
    },
    medicine: {
      totalPharmacies: 156,
      lowStockMedicines: 23,
      outOfStockMedicines: 7,
      averageStockLevel: 78.5
    },
    ai: {
      totalSymptomChecks: 3421,
      accuracyRate: 87.3,
      outbreakAlerts: 3,
      predictionsGenerated: 1247
    },
    blockchain: {
      totalRecords: 8947,
      syncedRecords: 8923,
      pendingRecords: 24,
      lastSyncTime: new Date()
    },
    emergency: {
      totalSOSCalls: 89,
      activeEmergencies: 2,
      averageResponseTime: 4.2,
      resolvedEmergencies: 87
    }
  },
  consultationTrends: {
    period: 'daily',
    data: [
      { date: '2024-01-01', value: 45 },
      { date: '2024-01-02', value: 52 },
      { date: '2024-01-03', value: 38 },
      { date: '2024-01-04', value: 61 },
      { date: '2024-01-05', value: 48 },
      { date: '2024-01-06', value: 55 },
      { date: '2024-01-07', value: 42 }
    ],
    totalConsultations: 341,
    growthRate: 12.5
  },
  medicineStockTrends: [
    { medicine: 'Paracetamol 500mg', pharmacy: 'Rural Health Center', currentStock: 45, maxStock: 100, stockPercentage: 45, lastUpdated: new Date(), trend: 'decreasing' },
    { medicine: 'Amoxicillin 250mg', pharmacy: 'Village Medical Store', currentStock: 78, maxStock: 100, stockPercentage: 78, lastUpdated: new Date(), trend: 'stable' },
    { medicine: 'Insulin Glargine', pharmacy: 'District Hospital', currentStock: 12, maxStock: 50, stockPercentage: 24, lastUpdated: new Date(), trend: 'decreasing' }
  ],
  outbreakPatterns: [
    {
      disease: 'Dengue Fever',
      region: 'Rural District A',
      cases: 23,
      severity: 'moderate',
      prediction: {
        confidence: 85,
        expectedCases: 45,
        timeframe: 'Next 2 weeks'
      },
      recommendations: ['Increase mosquito control measures', 'Distribute preventive information', 'Prepare medical supplies']
    }
  ],
  recentActivity: [
    { id: '1', type: 'consultation', description: 'New video consultation started', user: 'Dr. Priya Sharma', timestamp: new Date(), severity: 'info' },
    { id: '2', type: 'emergency', description: 'SOS call received from Village B', user: 'Emergency System', timestamp: new Date(), severity: 'warning' },
    { id: '3', type: 'ai_prediction', description: 'Outbreak alert generated', user: 'AI System', timestamp: new Date(), severity: 'error' }
  ]
};

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<AdminDashboardData>(mockDashboardData);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [loading, setLoading] = useState(false);

  // Get user role from Redux store
  const userRole = useSelector((state: RootState) => state.auth.userData?.role as UserRole);

  // Check if user has admin access
  if (userRole !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-300">You don't have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down';
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, change, trend, icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          {change && (
            <div className={`flex items-center text-sm mt-2 ${
              trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span className="font-medium">{change}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const ActivityLogItem: React.FC<{ activity: any }> = ({ activity }) => {
    const getSeverityColor = (severity: string) => {
      switch (severity) {
        case 'error': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900';
        case 'warning': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900';
        case 'success': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900';
        default: return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900';
      }
    };

    return (
      <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className={`w-2 h-2 rounded-full ${getSeverityColor(activity.severity).split(' ')[0]}`} />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.description}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{activity.user} • {activity.timestamp.toLocaleTimeString()}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Comprehensive overview of JeevanSetu platform analytics</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <button
                onClick={() => setLoading(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Active Consultations"
            value={dashboardData.stats.telemedicine.activeConsultations}
            change="+8%"
            trend="up"
            icon={<Stethoscope className="w-6 h-6 text-blue-600" />}
            color="bg-blue-100 dark:bg-blue-900"
          />
          <StatCard
            title="Medicine Stock"
            value={`${dashboardData.stats.medicine.averageStockLevel}%`}
            change="-2%"
            trend="down"
            icon={<Pill className="w-6 h-6 text-green-600" />}
            color="bg-green-100 dark:bg-green-900"
          />
          <StatCard
            title="AI Predictions"
            value={dashboardData.stats.ai.totalSymptomChecks}
            change="+15%"
            trend="up"
            icon={<Brain className="w-6 h-6 text-purple-600" />}
            color="bg-purple-100 dark:bg-purple-900"
          />
          <StatCard
            title="Blockchain Records"
            value={dashboardData.stats.blockchain.totalRecords}
            change="+3%"
            trend="up"
            icon={<Shield className="w-6 h-6 text-indigo-600" />}
            color="bg-indigo-100 dark:bg-indigo-900"
          />
          <StatCard
            title="Emergency Calls"
            value={dashboardData.stats.emergency.totalSOSCalls}
            change="+5%"
            trend="up"
            icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
            color="bg-red-100 dark:bg-red-900"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Consultation Trends */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Consultation Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dashboardData.consultationTrends.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Medicine Stock Levels */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Medicine Stock Levels</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.medicineStockTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="medicine" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stockPercentage" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Outbreak Patterns and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Outbreak Patterns */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Outbreak Patterns</h3>
            <div className="space-y-4">
              {dashboardData.outbreakPatterns.map((pattern, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{pattern.disease}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      pattern.severity === 'critical' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                      pattern.severity === 'high' ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200' :
                      pattern.severity === 'moderate' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                      'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    }`}>
                      {pattern.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {pattern.region} • {pattern.cases} cases
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Prediction: {pattern.prediction.expectedCases} cases in {pattern.prediction.timeframe} 
                    ({pattern.prediction.confidence}% confidence)
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {dashboardData.recentActivity.map((activity) => (
                <ActivityLogItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
