import OpenAI from 'openai';
import type { ScenarioCard } from '../types';
import { getSimplePrompt, getComplexPrompt } from './prompts';

const simpleResponseSchema = {
    type: "object",
    properties: {
        scenarios: {
            type: "array",
            description: "An array of best-case scenarios.",
            items: {
                type: "object",
                properties: {
                    scenario: {
                        type: "string",
                        description: "A single, positive, interesting, and feel-good scenario. It should be a direct statement.",
                    },
                },
                required: ["scenario"],
                additionalProperties: false,
            },
        },
    },
    required: ["scenarios"],
    additionalProperties: false,
} as const;

const complexResponseSchema = {
    type: "object",
    properties: {
        scenarios: {
            type: "array",
            description: "An array of complex best-case scenarios.",
            items: {
                type: "object",
                properties: {
                    setup: {
                        type: "string",
                        description: "The setup or context for the scenario.",
                    },
                    options: {
                        type: "array",
                        description: "An array of exactly 3 positive, feel-good choices for the scenario.",
                        items: {
                            type: "string",
                        },
                    },
                },
                required: ["setup", "options"],
                additionalProperties: false,
            },
        },
    },
    required: ["scenarios"],
    additionalProperties: false,
} as const;

export const generateScenarios = async (themeKey: string, count: number, customText?: string): Promise<ScenarioCard[]> => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: 'https://llm-gateway.dev.remitly.com',
        dangerouslyAllowBrowser: true // Required for client-side usage
    });

    const themeName = (customText && customText.trim().length > 0)
        ? customText.trim()
        : themeKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const isComplex = themeKey === 'complex_conundrums';


    const prompt = isComplex ? getComplexPrompt(count, themeName) : getSimplePrompt(count, themeName);
    const schema = isComplex ? complexResponseSchema : simpleResponseSchema;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful creative assistant." },
                { role: "user", content: prompt }
            ],
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "scenarios_response",
                    schema: schema,
                    strict: true
                }
            },
            temperature: 0.9,
        });

        const content = response.choices[0].message.content;
        if (!content) {
            throw new Error("No content received from OpenAI");
        }

        const parsed = JSON.parse(content) as { scenarios: ScenarioCard[] };

        if (!parsed.scenarios || !Array.isArray(parsed.scenarios)) {
            throw new Error("Invalid response format from API. Expected a 'scenarios' array.");
        }

        return parsed.scenarios;
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        throw new Error("Failed to generate scenarios from the OpenAI API.");
    }
};
