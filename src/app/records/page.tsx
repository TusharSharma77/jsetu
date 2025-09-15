'use client'
import React, { useState } from 'react';
import { Search, Download, Upload, Eye, Trash2, FileText, Calendar, User, Shield, Clock, CheckCircle } from 'lucide-react';
import { sampleHealthRecordsForPage } from '@/data/sampleData';

const RecordsOffline: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Records', icon: FileText },
    { id: 'consultations', name: 'Consultations', icon: User },
    { id: 'lab-reports', name: 'Lab Reports', icon: FileText },
    { id: 'prescriptions', name: 'Prescriptions', icon: FileText },
    { id: 'medical-history', name: 'Medical History', icon: Calendar },
    { id: 'vaccinations', name: 'Vaccinations', icon: Shield }
  ];

  const filteredRecords = sampleHealthRecordsForPage.filter(record => 
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || record.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Health Records</h1>
              <p className="text-gray-600 dark:text-gray-300">Secure blockchain-based health records management</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                <CheckCircle className="h-4 w-4 mr-1" />
                Blockchain Synced
              </div>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patient records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center transition-colors">
                <Upload className="h-4 w-4 mr-2" />
                Sync All
              </button>
              <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg border transition-all flex items-center ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Records Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Health Records ({filteredRecords.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map((record) => (
              <div key={record.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{record.patientName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{record.category}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.status === 'Synced' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {record.status}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{record.size}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span>Date: {record.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span>Doctor: {record.doctorName}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Shield className="h-4 w-4 text-gray-400 mr-2" />
                    <span>Hash: {record.blockchainHash.slice(0, 16)}...</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span>Last updated: {record.lastUpdated}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </button>
                  <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                  <button className="px-3 py-2 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Storage Usage */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Storage Usage</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span>Blockchain Storage</span>
                <span>62% used</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full">
                <div className="h-3 bg-blue-600 rounded-full transition-all duration-500" style={{ width: '62%' }} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1.9 GB</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Free Space</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">3.1 GB</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Used</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">5.0 GB</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordsOffline;