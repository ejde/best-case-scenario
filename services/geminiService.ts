import { GoogleGenAI, Type } from '@google/genai';
import type { ScenarioCard } from '../types';
import { getSimplePrompt, getComplexPrompt } from './prompts';

const simpleResponseSchema = {
  type: Type.OBJECT,
  properties: {
    scenarios: {
      type: Type.ARRAY,
      description: "An array of best-case scenarios.",
      items: {
        type: Type.OBJECT,
        properties: {
          scenario: {
            type: Type.STRING,
            description: "A single, positive, interesting, and feel-good scenario. It should be a direct statement.",
          },
        },
        required: ["scenario"],
      },
    },
  },
  required: ["scenarios"],
};

const complexResponseSchema = {
  type: Type.OBJECT,
  properties: {
    scenarios: {
      type: Type.ARRAY,
      description: "An array of complex best-case scenarios.",
      items: {
        type: Type.OBJECT,
        properties: {
          setup: {
            type: Type.STRING,
            description: "The setup or context for the scenario.",
          },
          options: {
            type: Type.ARRAY,
            description: "An array of exactly 3 positive, feel-good choices for the scenario.",
            items: {
              type: Type.STRING,
            },
          },
        },
        required: ["setup", "options"],
      },
    },
  },
  required: ["scenarios"],
};


export const generateScenarios = async (themeKey: string, count: number, customText?: string): Promise<ScenarioCard[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // If a custom text is provided, prefer that as the theme shown in prompts.
  // Otherwise, convert the theme key (e.g., `workplace_wins`) to a human-friendly title.
  const themeName = (customText && customText.trim().length > 0)
    ? customText.trim()
    : themeKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const isComplex = themeKey === 'complex_conundrums';


  const prompt = isComplex ? getComplexPrompt(count, themeName) : getSimplePrompt(count, themeName);
  const schema = isComplex ? complexResponseSchema : simpleResponseSchema;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.9,
      },
    });

    const jsonString = response.text.trim();
    const parsed = JSON.parse(jsonString) as { scenarios: ScenarioCard[] };

    if (!parsed.scenarios || !Array.isArray(parsed.scenarios)) {
      throw new Error("Invalid response format from API. Expected a 'scenarios' array.");
    }

    return parsed.scenarios;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate scenarios from the Gemini API.");
  }
};