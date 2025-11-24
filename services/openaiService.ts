import OpenAI from 'openai';
import type { ScenarioCard } from '../types';

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

    const simplePrompt = `
    You are a creative assistant for a game called "Best-Case Scenario."
    Your task is to generate exactly ${count} unique, clever, and thematically rich positive scenarios based on the theme: "${themeName}".
    Each scenario must be a **single sentence** that describes a **specific**, **delightful**, and **surprisingly favorable** outcome. Scenarios should feel like part of the same imagined world — consistent in tone and context — as if they belong in the same “daydream.”
    Tone:
    - Lightly absurd but grounded in reality
    - Whimsically lucky or “unbelievably well-timed”
    - Avoid overused clichés or generic “feel-good” lines
    Instructions:
    - Keep each scenario under 25 words
    - Use active phrasing, like “Go apple picking — discover a new variety named after you”
    - Vary structure slightly for rhythm, but keep them punchy
    - Make the scenarios feel like things you could almost imagine happening — if you had a truly magical week
    - Do not repeat settings or types of luck too closely
    Here are examples of the style:
    - "Ride a dragon you can barely control"
    - "Use high-tech gear that you can barely control"
    - “Attend a harvest fair — accidentally win the pie contest just by showing up”
    - “Get lost on a hike — find a hidden hot spring resort”
    - “Everyone suddenly starts thinking you are the funniest person”
    Now, generate the scenarios.
  `;

    const complexPrompt = `
    You are a creative assistant for a game called "Best-Case Scenario".
    Your task is to generate exactly ${count} unique, complex, positive scenarios based on the theme of "${themeName}".
    Each scenario must have two parts:
    1. A "setup": A brief description of a situation.
    2. A list of exactly 3 "options": These should all be favorable, but distinct, resolutions to the setup. Each option should appeal to a different kind of personality or value (e.g., adventure vs. comfort, creativity vs. financial gain, social connection vs. personal achievement). The goal is to make the choice interesting and revealing about the person choosing, sparking conversation. The tone should be lighthearted, optimistic, and suitable for a fun team-building activity.

    Here is an example of the style I'm looking for:
    {
      "setup": "You find a dusty old lamp in an antique shop. You rub it, and a friendly, but low-key, genie appears. They offer you one of three permanent, personal enhancements.",
      "options": [
        "The ability to have the perfect, witty comeback for any situation, but only after a 5-second delay.",
        "The skill to instantly master any musical instrument you pick up, but you can only play songs from the 1990s.",
        "The power to always find the best parking spot, no matter how crowded the lot is."
      ]
    }
    Now, generate the scenarios.
  `;

    const prompt = isComplex ? complexPrompt : simplePrompt;
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
