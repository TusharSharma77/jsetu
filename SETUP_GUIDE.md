# JeevanSetu - Complete Setup Guide

This guide will help you set up the enhanced JeevanSetu telemedicine platform with all the new features.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (local or cloud)
- Google Gemini API key

### 1. Frontend Setup

```bash
# Navigate to the project directory
cd JeevanSetu

# Install dependencies (already done)
npm install

# Create environment file
cp .env.example .env.local
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Create environment file
cp config.example.js config.js
```

### 3. Environment Configuration

#### Frontend (.env.local)
```env
# Google Gemini API Configuration
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
API_URL=http://localhost:3001

# WebRTC Configuration
NEXT_PUBLIC_WEBRTC_STUN_SERVER=stun:stun.l.google.com:19302

# Emergency Services API
NEXT_PUBLIC_EMERGENCY_API_URL=https://api.emergency-services.com
EMERGENCY_API_KEY=your_emergency_api_key_here

# Pharmacy API
NEXT_PUBLIC_PHARMACY_API_URL=https://api.pharmacy-stock.com
PHARMACY_API_KEY=your_pharmacy_api_key_here
```

#### Backend (config.js)
```javascript
module.exports = {
  port: 3001,
  nodeEnv: 'development',
  geminiApiKey: 'your_gemini_api_key_here',
  mongodbUri: 'mongodb://localhost:27017/jeevansetu',
  emergencyApiKey: 'your_emergency_api_key_here',
  emergencyApiUrl: 'https://api.emergency-services.com',
  pharmacyApiKey: 'your_pharmacy_api_key_here',
  pharmacyApiUrl: 'https://api.pharmacy-stock.com',
  jwtSecret: 'your_jwt_secret_here',
  corsOrigin: 'http://localhost:3000'
};
```

## 🔧 Google Gemini API Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key to both frontend and backend environment files
4. The chatbot will automatically use this key for AI responses

## 🗄️ Database Setup

### MongoDB Local Setup
```bash
# Install MongoDB (if not already installed)
# Windows: Download from https://www.mongodb.com/try/download/community
# macOS: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB service
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Create database
mongosh
use jeevansetu
```

### MongoDB Cloud Setup (Alternative)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `mongodbUri` in backend config

## 🚀 Running the Application

### Development Mode

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
# Server will start on http://localhost:3001
```

#### Terminal 2 - Frontend Application
```bash
cd JeevanSetu
npm run dev
# Application will start on http://localhost:3000
```

### Production Mode

#### Build and Start Backend
```bash
cd backend
npm start
```

#### Build and Start Frontend
```bash
cd JeevanSetu
npm run build
npm start
```

## 📱 Features Overview

### 1. Enhanced Landing Page
- Hero section with call-to-action buttons
- Feature showcase with icons and descriptions
- Patient testimonials with ratings
- Health alerts and awareness campaigns
- Contact information and support

### 2. Role-Based Dashboards

#### Admin Dashboard
- Comprehensive analytics with charts
- Consultation trends and statistics
- Medicine stock monitoring
- AI usage analytics
- Outbreak pattern detection
- System health metrics

#### Patient Dashboard
- Quick access to all services
- Recent consultation history
- Health metrics and trends
- Upcoming appointments
- Emergency contacts
- Health alerts

### 3. AI-Powered Chatbot
- Google Gemini API integration
- Multilingual support (English, Hindi, Punjabi)
- Symptom analysis with confidence scoring
- Outbreak alert generation
- Voice input support
- Secure API endpoints

### 4. Enhanced Telemedicine
- WebRTC video/audio integration
- Screen sharing capabilities
- In-call chat functionality
- Call duration tracking
- Connection status monitoring
- Fullscreen mode

### 5. Emergency/SOS System
- Quick emergency activation with countdown
- Backend API integration
- Real-time status updates
- Location-based services
- Emergency contact management
- Success/error feedback

### 6. Multilingual Support
- Complete i18n implementation
- Language selector with flags
- Localized UI components
- Voice assistance in multiple languages
- Persistent language preferences

### 7. Health Awareness
- Seasonal disease alerts
- Vaccination drive notifications
- Health camp announcements
- Preventive care reminders
- Outbreak prevention alerts

## 🔧 API Endpoints

### Backend API Routes
- `POST /api/chatbot` - Chatbot functionality
- `POST /api/outbreak-alert` - Outbreak detection
- `POST /api/emergency` - Emergency services
- `GET /api/medicine-stock` - Medicine availability
- `GET /api/health-alerts` - Health alerts
- `GET /api/analytics` - Dashboard analytics
- `GET /api/health` - Health check

### Frontend API Client
- `chatbotApi.sendMessage()` - Send chatbot message
- `emergencyApi.sendRequest()` - Send emergency request
- `medicineApi.getStock()` - Get medicine stock
- `outbreakApi.generateAlert()` - Generate outbreak alert
- `healthApi.getAlerts()` - Get health alerts
- `analyticsApi.getData()` - Get analytics data

## 🎯 User Roles

### Admin Role
- Access to comprehensive analytics dashboard
- System monitoring and management
- Outbreak pattern analysis
- User activity tracking

### Doctor Role
- Video consultation capabilities
- Patient record access
- AI symptom analysis tools
- Emergency response coordination

### Patient Role
- Symptom checking with AI
- Medicine availability search
- Emergency SOS access
- Health awareness notifications

## 🌐 Multilingual Support

The platform supports three languages:
- **English** (en) - Default
- **Hindi** (hi) - हिन्दी
- **Punjabi** (pa) - ਪੰਜਾਬੀ

Language preferences are stored in localStorage and persist across sessions.

## 📊 Sample Data

The application includes comprehensive sample data for:
- Doctors and consultations
- Medicines and pharmacies
- AI queries and responses
- Blockchain health records
- Emergency contacts
- Health alerts and awareness
- Patient testimonials

## 🔒 Security Features

- API key management with environment variables
- Role-based access control
- Secure WebRTC connections
- Input validation and sanitization
- Error handling and logging
- CORS configuration

## 🚨 Emergency Features

- 5-second countdown before emergency activation
- Automatic location detection
- Emergency contact integration
- Real-time status updates
- Integration with local services
- Success/error feedback

## 📱 Mobile Responsiveness

All components are fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Low-bandwidth connections

## 🔮 Future Enhancements

Potential areas for further development:
- Blockchain integration for health records
- IoT device integration for health monitoring
- Advanced AI models for disease prediction
- Telemedicine payment integration
- Offline mode for rural areas
- Voice-to-text in local languages

## 🐛 Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify the Google Gemini API key is correct
   - Check if the key has proper permissions
   - Ensure the key is added to both frontend and backend

2. **Database Connection Failed**
   - Verify MongoDB is running
   - Check the connection string
   - Ensure the database exists

3. **CORS Errors**
   - Check the CORS configuration in backend
   - Verify the frontend URL is allowed
   - Ensure both servers are running

4. **WebRTC Issues**
   - Check browser permissions for camera/microphone
   - Verify STUN server configuration
   - Test on HTTPS in production

### Debug Mode

Enable debug logging by setting:
```env
LOG_LEVEL=debug
```

## 📞 Support

For technical support or feature requests:
- Create an issue in the project repository
- Contact the development team
- Check the documentation

## 📄 License

This project is licensed under the MIT License.

---

**Note**: This is a demonstration version with mock data. For production deployment, integrate with real APIs and databases as needed.
