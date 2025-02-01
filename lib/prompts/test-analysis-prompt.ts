// lib/prompts/test-analysis-prompt.ts
import type { UserProfileForAnalysis, TestResults } from '@/types/test-analysis';

export function createTestAnalysisPrompt(
  userProfile: UserProfileForAnalysis,
  testResults: TestResults
): string {
  return `
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
1. A detailed analysis focusing on the highest-scoring options
2. Personalized career advice based on these results

Format your response as JSON with the following structure:
{
  "analysis": "Your detailed analysis here",
  "advice": "Your specific career advice here"
}`;
}