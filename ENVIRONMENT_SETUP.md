# Environment Configuration for JeevanSetu

## Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Google Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/jeevansetu

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# JWT Secret for authentication (generate a secure random string)
JWT_SECRET=your_jwt_secret_here

# Emergency Services API (optional)
EMERGENCY_API_KEY=your_emergency_api_key_here
EMERGENCY_API_URL=https://api.emergency-services.com

# Pharmacy API (optional)
PHARMACY_API_KEY=your_pharmacy_api_key_here
PHARMACY_API_URL=https://api.pharmacy-stock.com

# Logging
LOG_LEVEL=info
```

## Frontend Environment Variables

Create a `.env.local` file in the root directory with:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# App Configuration
NEXT_PUBLIC_APP_NAME=JeevanSetu
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## Getting API Keys

### Google Gemini AI API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and add it to your environment variables

### MongoDB Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Create a database named `jeevansetu`
3. Update the MONGODB_URI in your .env file

## Security Notes

- Never commit `.env` files to version control
- Use strong, unique values for JWT_SECRET
- Regularly rotate API keys
- Use environment-specific configurations for production
