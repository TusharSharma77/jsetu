// API route for outbreak alert generation

import { NextRequest, NextResponse } from 'next/server';
import { geminiChatbot } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symptoms, region } = body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json(
        { error: 'Symptoms array is required' },
        { status: 400 }
      );
    }

    if (!region) {
      return NextResponse.json(
        { error: 'Region is required' },
        { status: 400 }
      );
    }

    const alert = await geminiChatbot.generateOutbreakAlert(symptoms, region);

    if (!alert) {
      return NextResponse.json({
        success: true,
        data: null,
        message: 'No outbreak pattern detected'
      });
    }

    return NextResponse.json({
      success: true,
      data: alert,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Outbreak alert API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
