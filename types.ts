export interface ScenarioCard {
  scenario?: string;
  setup?: string;
  options?: string[];
}

export interface Theme {
  name: string;
  value: string;
  emoji: string;
}

export type ModelType = 'gemini' | 'openai';
