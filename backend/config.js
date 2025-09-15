// JeevanSetu Backend Configuration
// Copy this file to config.js and update with your actual values

module.exports = {
  // Server Configuration
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Google Gemini AI Configuration
  geminiApiKey: process.env.GEMINI_API_KEY || 'your_gemini_api_key_here',

  // MongoDB Configuration
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/jeevansetu',

  // Emergency Services API
  emergencyApiKey: process.env.EMERGENCY_API_KEY || 'your_emergency_api_key_here',
  emergencyApiUrl: process.env.EMERGENCY_API_URL || 'https://api.emergency-services.com',

  // Pharmacy API
  pharmacyApiKey: process.env.PHARMACY_API_KEY || 'your_pharmacy_api_key_here',
  pharmacyApiUrl: process.env.PHARMACY_API_URL || 'https://api.pharmacy-stock.com',

  // JWT Secret for authentication
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_here',

  // Rate Limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,

  // CORS Configuration
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info'
};
