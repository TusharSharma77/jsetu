'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@/globalContext/authSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Heart, 
  Stethoscope, 
  ArrowRight,
  Shield,
  Users,
  Clock,
  Star
} from 'lucide-react';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDoctorLogin = () => {
    router.push('/login/doctor');
  };

  const handlePatientLogin = () => {
    router.push('/login/patient');
  };

  const handleQuickLogin = () => {
    dispatch(login({ status: true }));
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">JeevanSetu</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-6">
              <Heart className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to JeevanSetu
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your comprehensive healthcare platform connecting patients with doctors, 
              providing AI-powered health insights, and ensuring 24/7 medical support.
            </p>
          </div>

          {/* Quick Demo Access */}
          <div className="text-center mb-8">
            <Button
              onClick={handleQuickLogin}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-lg rounded-lg shadow-lg"
            >
              🚀 Quick Demo Access
            </Button>
            <p className="text-sm text-gray-600 mt-2">
              Skip login and explore the platform with demo data
            </p>
          </div>

          {/* Login Options */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Doctor Login Card */}
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Stethoscope className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  Doctor Portal
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Professional healthcare providers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Secure patient consultations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Patient record management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Appointment scheduling</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">AI diagnostic assistance</span>
                  </div>
                </div>
                
                <Button
                  onClick={handleDoctorLogin}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg group"
                >
                  Access Doctor Portal
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Patient Login Card */}
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  Patient Portal
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Healthcare for everyone
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">24/7 health access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Book consultations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Secure health records</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">AI health insights</span>
                  </div>
                </div>
                
                <Button
                  onClick={handlePatientLogin}
                  className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg group"
                >
                  Access Patient Portal
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;