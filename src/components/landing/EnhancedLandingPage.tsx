'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Video, 
  Pill, 
  Brain, 
  Shield, 
  Globe, 
  Phone, 
  Bell,
  Star,
  ArrowRight,
  CheckCircle,
  Users,
  MapPin,
  Clock,
  Heart,
  Stethoscope,
  Zap,
  Award,
  MessageCircle,
  LogIn
} from 'lucide-react';
import LanguageSelector from '@/components/language/LanguageSelector';
import { sampleTestimonials, sampleHealthAlerts } from '@/data/sampleData';

const EnhancedLandingPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const features = [
    {
      icon: Video,
      title: 'Video Consultations',
      description: 'Connect with qualified doctors through secure video calls in your preferred language',
      highlight: 'Multilingual Support',
      link: '/consult',
      color: 'bg-blue-500'
    },
    {
      icon: Pill,
      title: 'Medicine Availability',
      description: 'Real-time updates on medicine stock at local pharmacies near you',
      highlight: 'Local Pharmacy Network',
      link: '/medicines',
      color: 'bg-green-500'
    },
    {
      icon: Brain,
      title: 'AI Symptom Checker',
      description: 'Get instant preliminary health assessment powered by AI technology',
      highlight: 'AI-Powered',
      link: '/symptoms',
      color: 'bg-purple-500'
    },
    {
      icon: Shield,
      title: 'Blockchain Health Records',
      description: 'Secure, encrypted health records accessible even offline in rural areas',
      highlight: 'Works Offline',
      link: '/records',
      color: 'bg-indigo-500'
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Full support for English, Hindi, and Punjabi with voice assistance',
      highlight: 'Voice Enabled',
      link: '#',
      color: 'bg-orange-500'
    },
    {
      icon: Phone,
      title: 'Emergency SOS',
      description: 'Quick access to emergency services with one-tap ambulance and hospital calls',
      highlight: '24x7 Emergency',
      link: '#',
      color: 'bg-red-500'
    },
    {
      icon: Bell,
      title: 'Health Awareness',
      description: 'Stay informed about seasonal diseases, vaccination drives, and health camps',
      highlight: 'Proactive Alerts',
      link: '/health-awareness',
      color: 'bg-yellow-500'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Patients Served' },
    { number: '500+', label: 'Doctors Available' },
    { number: '50+', label: 'Villages Covered' },
    { number: '99.9%', label: 'Uptime' }
  ];

  const benefits = [
    'Access to qualified doctors in rural areas',
    'Multilingual support for better communication',
    'AI-powered symptom analysis',
    'Real-time medicine availability',
    'Secure blockchain health records',
    '24x7 emergency services',
    'Health awareness and prevention',
    'Offline functionality for remote areas'
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">JeevanSetu</h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector variant="compact" />
              <a href="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </a>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Bringing Healthcare to Your
              <span className="text-blue-600"> Doorstep</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              JeevanSetu connects rural communities with quality healthcare through telemedicine, 
              AI-powered diagnostics, and multilingual support. Your health, our priority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold flex items-center justify-center">
                <Video className="w-5 h-5 mr-2" />
                Start Consultation
              </button>
              <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors text-lg font-semibold flex items-center justify-center">
                <Brain className="w-5 h-5 mr-2" />
                Check Symptoms
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From telemedicine consultations to AI-powered diagnostics, we provide 
              all the tools you need for better health in rural areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                    {feature.highlight}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose JeevanSetu?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                We understand the unique challenges of rural healthcare and have built 
                solutions specifically for remote communities.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <div className="text-center">
                <Stethoscope className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="mb-6">
                  Join thousands of patients who trust JeevanSetu for their healthcare needs.
                </p>
                <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                  Start Your Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Patients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real stories from real people in rural communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.patientName}
                    </h4>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.rating}/5
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {testimonial.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {testimonial.date.toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Alerts Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Informed
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Important health alerts and awareness campaigns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleHealthAlerts.slice(0, 3).map((alert, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <Bell className="w-6 h-6 text-blue-600" />
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    alert.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {alert.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {alert.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-1" />
                    {alert.location}
                  </div>
                  {alert.actionRequired && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      {alert.actionText}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of patients who have already experienced the benefits of 
            accessible, quality healthcare through JeevanSetu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold flex items-center justify-center">
              <Zap className="w-5 h-5 mr-2" />
              Get Started Now
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors text-lg font-semibold flex items-center justify-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">JeevanSetu</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Bringing quality healthcare to rural communities through technology and innovation.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/consult" className="hover:text-white transition-colors">Video Consultations</a></li>
                <li><a href="/symptoms" className="hover:text-white transition-colors">AI Symptom Checker</a></li>
                <li><a href="/medicines" className="hover:text-white transition-colors">Medicine Availability</a></li>
                <li><a href="/records" className="hover:text-white transition-colors">Health Records</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Emergency Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Feedback</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 support@jeevansetu.com</p>
                <p>📞 +91-9876543210</p>
                <p>📍 Rural Health Center, Village A</p>
                <p>🕒 24x7 Emergency Support</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JeevanSetu. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedLandingPage;
