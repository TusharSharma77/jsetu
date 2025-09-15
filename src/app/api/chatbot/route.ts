// API route for chatbot functionality

import { NextRequest, NextResponse } from 'next/server';
import { geminiChatbot } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, language = 'en', type = 'chat' } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    let response;

    switch (type) {
      case 'chat':
        response = await geminiChatbot.chat(message, language);
        break;
      case 'symptoms':
        response = await geminiChatbot.analyzeSymptoms(message, language);
        break;
      case 'awareness':
        response = await geminiChatbot.getHealthAwareness(message, language);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid request type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const chatHistory = geminiChatbot.getChatHistory();
    
    return NextResponse.json({
      success: true,
      data: chatHistory
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    geminiChatbot.clearChatHistory();
    
    return NextResponse.json({
      success: true,
      message: 'Chat history cleared'
    });
  } catch (error) {
    console.error('Clear chat history error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

