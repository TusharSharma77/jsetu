// Google Gemini API integration for JeevanSetu chatbot

import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '@/config/env';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(config.geminiApiKey);

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language?: string;
}

export interface SymptomAnalysis {
  possibleConditions: Array<{
    condition: string;
    confidence: number;
    severity: 'low' | 'moderate' | 'high' | 'critical';
    description: string;
  }>;
  recommendations: string[];
  urgency: 'low' | 'moderate' | 'high' | 'critical';
  nextSteps: string[];
}

export interface OutbreakAlert {
  disease: string;
  region: string;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  symptoms: string[];
  preventiveMeasures: string[];
  affectedAreas: string[];
}

class GeminiChatbot {
  private model: any;
  private chatHistory: ChatMessage[] = [];

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  /**
   * Analyze symptoms and provide medical insights
   */
  async analyzeSymptoms(symptoms: string, language: string = 'en'): Promise<SymptomAnalysis> {
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
      const result = await this.model.generateContent(prompt);
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

  /**
   * Generate outbreak alerts based on symptom patterns
   */
  async generateOutbreakAlert(symptoms: string[], region: string): Promise<OutbreakAlert | null> {
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
      const result = await this.model.generateContent(prompt);
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

  /**
   * Chat with the AI assistant
   */
  async chat(message: string, language: string = 'en'): Promise<string> {
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

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Add to chat history
      this.chatHistory.push(
        { role: 'user', content: message, timestamp: new Date(), language },
        { role: 'assistant', content: text, timestamp: new Date(), language }
      );
      
      return text;
    } catch (error) {
      console.error('Error in chat:', error);
      throw new Error('Failed to process chat message');
    }
  }

  /**
   * Get health awareness information
   */
  async getHealthAwareness(topic: string, language: string = 'en'): Promise<string> {
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

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error getting health awareness:', error);
      throw new Error('Failed to get health awareness information');
    }
  }

  /**
   * Get chat history
   */
  getChatHistory(): ChatMessage[] {
    return this.chatHistory;
  }

  /**
   * Clear chat history
   */
  clearChatHistory(): void {
    this.chatHistory = [];
  }
}

// Export singleton instance
export const geminiChatbot = new GeminiChatbot();

// Export types and functions
export { GeminiChatbot };

