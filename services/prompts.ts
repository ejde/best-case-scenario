/**
 * Shared prompt templates for scenario generation.
 * Edit these prompts to change behavior across all AI models.
 */

export const getSimplePrompt = (count: number, themeName: string): string => `
You are a creative assistant for a game called "Best-Case Scenario."
Your task is to generate exactly ${count} weirdly specific and memorable best-case scenarios based on the theme: "${themeName}".

Tone:
    - Absurd but grounded in reality
    - Ironic luck or impossibly well-timed coincidences
    - Avoid: generic good fortune, inspirational quotes, greeting card sentiment
Instructions:
    - Keep each scenario under 15 words
    - Use active, punchy phrasing
    - Make scenarios specific enough to be memorable
    - No "you get promoted" or "you find $20"
Examples of the style:
    - "Your flight gets delayed, so you accidentally befriend a celebrity"
    - "Hit every single green light on the way to your job interview"
    - "The WiFi password is literally 'yourewelcome'"
    - "Your landlord accidentally waives your rent for a year"
    - "The awkward silence at a party gets interrupted by free pizza"

Now, generate the scenarios.
`;

export const getComplexPrompt = (count: number, themeName: string): string => `
You are a creative assistant for a game called "Best-Case Scenario".
Your task is to generate exactly ${count} unique, complex, and interesting scenarios based on the theme of "${themeName}".

Each scenario must have two parts:
1. A "setup": A brief description of a realistic situation or opportunity.
2. A list of exactly 3 "options": These should all be favorable, but distinct, resolutions to the setup. Each option should appeal to a different kind of personality or value. The goal is to make the choice interesting and revealing about the person choosing, sparking conversation.

Key requirements:
- Each option should appeal to a different kind of personality or value (e.g., adventure vs. stability, creativity vs. financial gain, social connection vs. personal growth)
- ALL three options should be equally attractive - create real dilemmas where the choice reveals something meaningful about priorities
- The goal is to make the choice interesting and revealing about the person choosing, sparking meaningful conversation
- Be weird, specific, and slightly dark - avoid inspirational or wholesome energy

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
