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
    const rawResponse = result.response.text();
    
    try {
      // Clean the response string before parsing
      const cleanedResponse = rawResponse.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
      const parsedResponse = JSON.parse(cleanedResponse);
      
      if (!parsedResponse.analysis || !parsedResponse.advice) {
        throw new Error('Invalid AI response structure');
      }

      return {
        analysis: parsedResponse.analysis,
        advice: parsedResponse.advice
      };
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('Raw response:', rawResponse);
      throw new Error('Invalid AI response format');
    }
  } catch (error) {
    console.error('Test Analysis Generation Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to generate test analysis');
  }
}