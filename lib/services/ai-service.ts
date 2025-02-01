import { GoogleGenerativeAI } from '@google/generative-ai';
import type { GenerateAnalysisInput } from '@/types/tests/test-analysis';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

interface AIResponse {
  analysis: string;
  advice: string;
}

export async function generateTestAnalysis({
  userProfile,
  testResults
}: Omit<GenerateAnalysisInput, 'testAttemptId'>): Promise<AIResponse> {
  try {
    const prompt = `
    As an AI test analyzer, provide a personalized analysis and advice based on the following test results:

    User Profile:
    ${userProfile.gender ? `Gender: ${userProfile.gender}` : ''}
    ${userProfile.dateOfBirth ? `Age: ${userProfile.dateOfBirth}` : ''}
    ${userProfile.relationshipStatus ? `Relationship Status: ${userProfile.relationshipStatus}` : ''}
    ${userProfile.countryOfOrigin ? `Country: ${userProfile.countryOfOrigin}` : ''}

    Test Results:
    Overall Score: ${testResults.percentageScore}%
    
    Category Scores:
    ${testResults.categoryScores.map(score => 
      `- ${score.category.name}: ${score.percentage}% (${score.scaledScore}/${score.maxScale})
       ${score.category.description ? `  Description: ${score.category.description}` : ''}`
    ).join('\n')}

    Please provide:
    1. A comprehensive analysis of the test results
    2. Specific advice based on the scores and user profile
    
    Focus on the highest scoring categories and provide constructive feedback.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const sections = text.split('Advice:');
    
    return {
      analysis: sections[0].replace('Analysis:', '').trim(),
      advice: sections[1]?.trim() || 'No specific advice generated.'
    };
  } catch (error) {
    console.error('Gemini Analysis Generation Error:', error);
    throw new Error('Failed to generate analysis');
  }
}

// Add this for general prompts
export async function generateGeneralContent(prompt: string): Promise<string> {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}