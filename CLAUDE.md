# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Best-Case Scenario" is a React + TypeScript game that generates fun, positive, and whimsical scenarios using AI. Users select a theme and number of cards, and the app calls Gemini or OpenAI to generate best-case scenarios.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start development server (port 3000)
npm run build     # Build for production
npm run preview   # Preview production build
```

## Environment Variables

Create a `.env` file with:
- `GEMINI_API_KEY` - for Gemini model
- `OPENAI_API_KEY` - for OpenAI model

API keys are injected into the client bundle via Vite's `define` config in `vite.config.ts`.

## Architecture

- **App.tsx** - Main application component managing state (cards, loading, theme selection, model selection)
- **components/** - React UI components (Card, CardGrid, ControlPanel, ModelSelector, Loader, ApiKeyModal)
- **services/geminiService.ts** - Gemini API integration using @google/genai SDK
- **services/openaiService.ts** - OpenAI API integration using openai SDK
- **services/prompts.ts** - Shared prompt templates used by both AI services
- **constants.ts** - Theme definitions and card count options
- **types.ts** - TypeScript interfaces (ScenarioCard, Theme, ModelType)

## AI Service Pattern

Both `geminiService.ts` and `openaiService.ts` export the same `generateScenarios(themeKey, count, customText?)` function. The main App component selects between them based on `selectedModel` state. They share:
- Response schemas (simple: single scenario string; complex: setup + 3 options)
- Prompt templates from `services/prompts.ts`

## Adding New Themes

Edit `constants.ts` to add new themes. The `value` field becomes the theme key used in prompts.

## Adding New AI Models

Create a new service file following the pattern in `geminiService.ts` or `openaiService.ts`, export a `generateScenarios` function, and add the model option to `types.ts` (ModelType).
