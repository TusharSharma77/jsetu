import React, { useState } from 'react';
import { Search, MapPin, Clock, Phone, Star, Filter, Pill, Heart } from 'lucide-react';
import { sampleMedicines, samplePharmacies } from '@/data/sampleData';

const MedicineAvailability: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Medicines', icon: Pill },
    { id: 'antibiotics', name: 'Antibiotics', icon: Heart },
    { id: 'pain-relief', name: 'Pain Relief', icon: Heart },
    { id: 'vitamins', name: 'Vitamins', icon: Heart },
    { id: 'diabetes', name: 'Diabetes', icon: Heart },
    { id: 'blood-pressure', name: 'Blood Pressure', icon: Heart },
    { id: 'cold-flu', name: 'Cold & Flu', icon: Heart },
    { id: 'skin-care', name: 'Skin Care', icon: Heart }
  ];

  const filteredMedicines = sampleMedicines.filter(medicine => 
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || medicine.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Medicine Availability</h1>
          <p className="text-gray-600 dark:text-gray-300">Find medicines and check real-time stock at nearby pharmacies</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-6 w-6 mx-auto mb-1" />
                  <span className="text-xs font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Medicines Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Available Medicines ({filteredMedicines.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicines.map((medicine) => (
              <div key={medicine.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{medicine.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{medicine.category}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    medicine.stock === 'In Stock' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}>
                    {medicine.stock}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Price:</strong> ₹{medicine.price}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Dosage:</strong> {medicine.dosage}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Manufacturer:</strong> {medicine.manufacturer}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Available at:</h4>
                  <div className="space-y-2">
                    {medicine.availableAt.slice(0, 2).map((pharmacy) => (
                      <div key={pharmacy.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-gray-600 dark:text-gray-300">{pharmacy.name}</span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400">{pharmacy.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Find Nearby Pharmacies
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Pharmacies */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Nearby Pharmacies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samplePharmacies.map((pharmacy) => (
              <div key={pharmacy.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{pharmacy.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{pharmacy.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{pharmacy.distance}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    pharmacy.isOpen 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}>
                    {pharmacy.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{pharmacy.address}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{pharmacy.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{pharmacy.hours}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                    Call
                  </button>
                  <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineAvailability;


