import { GoogleGenerativeAI } from '@google/generative-ai';
import { createTestAnalysisPrompt } from '../prompts/test-analysis-prompt';
import type { UserProfileForAnalysis, TestResults, AIResponse } from '@/types/test-analysis';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Add this function for general content generation
export async function generateGeneralContent(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate content');
  }
}

export async function generateTestAnalysis({ 
  userProfile, 
  testResults 
}: {
  userProfile: UserProfileForAnalysis;
  testResults: TestResults;
}): Promise<AIResponse> {
  try {
    const prompt = createTestAnalysisPrompt(userProfile, testResults);
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    const parsedResponse = JSON.parse(response);
    
    if (!parsedResponse.analysis || !parsedResponse.advice) {
      throw new Error('Invalid AI response structure');
    }

    return {
      analysis: parsedResponse.analysis,
      advice: parsedResponse.advice
    };
  } catch (error) {
    console.error('Test Analysis Generation Error:', error);
    throw new Error('Failed to generate test analysis');
  }
}