
import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (prompt: string, history: { role: 'user' | 'assistant', content: string }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = history.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));
  
  contents.push({
    role: 'user',
    parts: [{ text: prompt }]
  });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', 
      contents: contents as any,
      config: {
        systemInstruction: `You are the LFES Terminal Intelligence, a professional trading co-pilot.
        Provide technical analysis, explain market mechanics, and assist with platform navigation.
        Be concise, authoritative, and data-focused. Use markdown for lists and bolding.
        Current Environment: Demo/Mock mode (No real funds involved).`,
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 16384 } 
      },
    });

    return response.text || "Terminal sync stable. Awaiting next command.";
  } catch (error: any) {
    console.error("AI Intelligence Error:", error);
    // Handle the specific thinking budget error or key errors gracefully
    if (error.message?.includes('Budget 0')) {
      return "Critical: Model configuration mismatch. Please ensure thinking budget is enabled.";
    }
    throw new Error("Local terminal failed to sync with cloud intelligence.");
  }
};
