import { NextResponse } from 'next/server';
import { generateGeneralContent, generateTestAnalysis } from '@/lib/services/ai-service';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if ('prompt' in body) {
      // Handle general prompts using existing logic
      const text = await generateGeneralContent(body.prompt);
      return NextResponse.json({ response: text });
    } else {
      // Handle test analysis using the service
      const { userProfile, testResults } = body;
      const analysis = await generateTestAnalysis({ userProfile, testResults });
      return NextResponse.json(analysis);
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}