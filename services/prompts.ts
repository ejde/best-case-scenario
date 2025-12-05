/**
 * Shared prompt templates for scenario generation.
 * Edit these prompts to change behavior across all AI models.
 */

export const getSimplePrompt = (count: number, themeName: string): string => `
You are a creative assistant for a game called "Best-Case Scenario."
Your task is to generate exactly ${count} unique, clever, and thematically rich positive scenarios based on the theme: "${themeName}".
Each scenario must be a **single sentence** that describes a **specific**, **interesting**, and **surprisingly favorable** outcome.

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
Examples of the style:
    - "Ride a dragon you can barely control"
    - "Use high-tech gear that you can barely control"
    - “Attend a harvest fair — accidentally win the pie contest just by showing up”
    - “Get lost on a hike — find a hidden hot spring resort”
    - “Everyone suddenly starts thinking you are the funniest person”

Now, generate the scenarios.
`;

export const getComplexPrompt = (count: number, themeName: string): string => `
You are a creative assistant for a game called "Best-Case Scenario".
Your task is to generate exactly ${count} unique, complex, positive scenarios based on the theme of "${themeName}".

Each scenario must have two parts:
1. A "setup": A brief description of a realistic situation or opportunity.
2. A list of exactly 3 "options": These should all be favorable, but distinct, resolutions to the setup. Each option should appeal to a different kind of personality or value (e.g., adventure vs. comfort, creativity vs. financial gain, social connection vs. personal achievement). The goal is to make the choice interesting and revealing about the person choosing, sparking conversation. The tone should be lighthearted, optimistic, and suitable for a fun team-building activity.

Key requirements:
- Each option should appeal to a different kind of personality or value (e.g., adventure vs. stability, creativity vs. financial gain, social connection vs. personal growth)
- ALL three options should be equally attractive - create real dilemmas where the choice reveals something meaningful about priorities
- The goal is to make the choice interesting and revealing about the person choosing, sparking meaningful conversation
- The tone should be thoughtful, optimistic, and suitable for a team-building activity

Example of the style:
{
  "setup": "You receive three job offers, all with competitive salaries but very different cultures and opportunities.",
  "options": [
    "A fast-growing startup where you'd have significant autonomy and equity, but longer hours and higher risk of failure",
    "An established Fortune 500 company with excellent benefits, work-life balance, and job security, but slower advancement",
    "A mid-size company where you'd lead a new strategic initiative with moderate risk, creative freedom, and direct executive visibility"
  ]
}

Another example:
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
