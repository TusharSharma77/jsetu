// JeevanSetu Backend Server
// Express.js server with MongoDB integration for chatbot and API endpoints

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { MongoClient } = require('mongodb');




// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jeevansetu';
let db;

async function connectToDatabase() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// Initialize database connection
connectToDatabase();

// Chatbot API endpoint
app.post('/api/chatbot', async (req, res) => {
  try {
    const { message, language = 'en', type = 'chat', userId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    let response;

    switch (type) {
      case 'chat':
        response = await handleChatQuery(model, message, language);
        break;
      case 'symptoms':
        response = await handleSymptomAnalysis(model, message, language);
        break;
      case 'awareness':
        response = await handleHealthAwareness(model, message, language);
        break;
      default:
        return res.status(400).json({ error: 'Invalid request type' });
    }

    // Store query in database
    if (db) {
      await db.collection('chatbot_queries').insertOne({
        userId: userId || 'anonymous',
        message,
        language,
        type,
        response,
        timestamp: new Date()
      });
    }

    res.json({
      success: true,
      data: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Handle general chat queries
async function handleChatQuery(model, message, language) {
  const prompt = `
    You are a helpful medical AI assistant for rural healthcare in India. 
    You provide health information, symptom guidance, and medical advice in ${language}.
    
    User message: ${message}
    
    Guidelines:
    - Provide accurate, helpful medical information
    - Always recommend consulting a doctor for serious symptoms
    - Use simple language appropriate for rural populations
    - Consider limited medical resources in rural areas
    - Be culturally sensitive and respectful
    - If asked about specific medical conditions, provide general information but emphasize the need for professional medical consultation
    
    Respond in ${language}:
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// Handle symptom analysis
async function handleSymptomAnalysis(model, symptoms, language) {
  const prompt = `
    As a medical AI assistant for rural healthcare, analyze these symptoms and provide insights:
    
    Symptoms: ${symptoms}
    Language: ${language}
    
    Please provide:
    1. Possible conditions with confidence levels (0-100%)
    2. Severity assessment (low/moderate/high/critical)
    3. Recommendations for immediate care
    4. Urgency level
    5. Next steps
    
    Format your response as JSON with this structure:
    {
      "possibleConditions": [
        {
          "condition": "string",
          "confidence": number,
          "severity": "low|moderate|high|critical",
          "description": "string"
        }
      ],
      "recommendations": ["string"],
      "urgency": "low|moderate|high|critical",
      "nextSteps": ["string"]
    }
    
    Important: This is for rural areas with limited medical access. Prioritize practical, actionable advice.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON response
    const analysis = JSON.parse(text);
    return analysis;
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    throw new Error('Failed to analyze symptoms');
  }
}

// Handle health awareness queries
async function handleHealthAwareness(model, topic, language) {
  const prompt = `
    Provide health awareness information about ${topic} for rural populations in India.
    Language: ${language}
    
    Include:
    - What it is
    - Common symptoms
    - Prevention methods
    - When to seek medical help
    - Home remedies (if safe)
    
    Make it practical and easy to understand for people with limited medical knowledge.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// Outbreak alert endpoint
app.post('/api/outbreak-alert', async (req, res) => {
  try {
    const { symptoms, region, userId } = req.body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ error: 'Symptoms array is required' });
    }

    if (!region) {
      return res.status(400).json({ error: 'Region is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const alert = await generateOutbreakAlert(model, symptoms, region);

    // Store alert in database
    if (db && alert) {
      await db.collection('outbreak_alerts').insertOne({
        userId: userId || 'system',
        symptoms,
        region,
        alert,
        timestamp: new Date()
      });
    }

    res.json({
      success: true,
      data: alert,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Outbreak alert API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Generate outbreak alert
async function generateOutbreakAlert(model, symptoms, region) {
  const prompt = `
    Analyze these symptom patterns for potential disease outbreaks in rural areas:
    
    Symptoms: ${symptoms.join(', ')}
    Region: ${region}
    
    Check for patterns that might indicate:
    - Dengue fever
    - Malaria
    - Cholera
    - Typhoid
    - Seasonal flu
    - Other infectious diseases common in rural India
    
    If an outbreak pattern is detected, respond with JSON:
    {
      "disease": "string",
      "region": "string",
      "riskLevel": "low|moderate|high|critical",
      "symptoms": ["string"],
      "preventiveMeasures": ["string"],
      "affectedAreas": ["string"]
    }
    
    If no outbreak pattern is detected, respond with: null
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (text.trim() === 'null') {
      return null;
    }
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Error generating outbreak alert:', error);
    return null;
  }
}

// Emergency services endpoint
app.post('/api/emergency', async (req, res) => {
  try {
    const { type, location, userId, description } = req.body;

    if (!type || !location) {
      return res.status(400).json({ error: 'Type and location are required' });
    }

    // Store emergency request in database
    if (db) {
      await db.collection('emergency_requests').insertOne({
        userId: userId || 'anonymous',
        type,
        location,
        description,
        status: 'pending',
        timestamp: new Date()
      });
    }

    // Simulate emergency response
    const response = {
      requestId: Date.now().toString(),
      status: 'dispatched',
      estimatedArrival: '15 minutes',
      contactNumber: '+91-9876543210',
      message: 'Emergency services have been notified and are on their way.'
    };

    res.json({
      success: true,
      data: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Emergency API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Medicine stock endpoint
app.get('/api/medicine-stock', async (req, res) => {
  try {
    const { medicine, location } = req.query;

    // Mock medicine stock data
    const stockData = [
      {
        medicine: 'Paracetamol 500mg',
        pharmacy: 'Rural Health Center',
        available: true,
        quantity: 45,
        price: 2.50,
        distance: 2.5
      },
      {
        medicine: 'Amoxicillin 250mg',
        pharmacy: 'Village Medical Store',
        available: true,
        quantity: 23,
        price: 8.75,
        distance: 1.8
      }
    ];

    res.json({
      success: true,
      data: stockData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Medicine stock API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health alerts endpoint
app.get('/api/health-alerts', async (req, res) => {
  try {
    const { region } = req.query;

    // Mock health alerts data
    const alerts = [
      {
        id: '1',
        title: 'Dengue Prevention Campaign',
        description: 'High risk of dengue fever in your area. Take preventive measures.',
        type: 'disease',
        severity: 'high',
        date: new Date(),
        location: region || 'Rural District A',
        actionRequired: true
      }
    ];

    res.json({
      success: true,
      data: alerts,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Health alerts API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Analytics endpoint for admin dashboard
app.get('/api/analytics', async (req, res) => {
  try {
    const { timeframe = 'daily' } = req.query;

    // Mock analytics data
    const analytics = {
      consultations: {
        total: 1247,
        active: 24,
        completed: 1223,
        averageTime: 18.5
      },
      medicines: {
        totalPharmacies: 156,
        lowStock: 23,
        outOfStock: 7,
        averageStock: 78.5
      },
      ai: {
        totalQueries: 3421,
        accuracyRate: 87.3,
        outbreakAlerts: 3
      },
      emergency: {
        totalCalls: 89,
        activeEmergencies: 2,
        averageResponseTime: 4.2
      }
    };

    res.json({
      success: true,
      data: analytics,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Analytics API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`JeevanSetu backend server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});


module.exports = app;
