import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Resource } from '../types';

export interface AIRecommendation {
  purpose: string;
  needs: string;
  time: string;
  priority: string;
  matchedResourceIds: string[];
}

export const generateRecommendations = async (
  query: string, 
  resources: Resource[]
): Promise<AIRecommendation | null> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('VITE_GEMINI_API_KEY is not set in .env.local');
    return null;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Map resources to a simplified format for the prompt
    const inventory = resources.map(r => ({
      id: r.id,
      name: r.name,
      category: r.category,
      description: r.description
    }));

    const prompt = `
      You are an expert equipment coordinator for a university resource sharing platform.
      A student has made the following request: "${query}"
      
      Here is our current inventory of available items:
      ${JSON.stringify(inventory, null, 2)}
      
      Based on their request, determine what they are trying to achieve and what equipment they actually need.
      Then, find the best matching items from the inventory to fulfill those needs.
      
      Return your response STRICTLY as a JSON object with the following schema:
      {
        "purpose": "A short 2-3 word summary of what they are doing (e.g. 'Content Creation' or 'Camping Trip')",
        "needs": "A short list of the generic equipment types they need (e.g. 'Camera, Tripod, Lighting')",
        "time": "Flexible",
        "priority": "Functionality & Quality",
        "matchedResourceIds": ["id1", "id2"] // Array of the string IDs from the inventory that best match their needs. Max 4 items.
      }
      
      Do NOT include markdown blocks (like \`\`\`json). Return ONLY the raw JSON object.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Attempt to parse the raw text as JSON (stripping markdown if the model included it by mistake)
    const cleanedText = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText) as AIRecommendation;
    
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return null;
  }
};
