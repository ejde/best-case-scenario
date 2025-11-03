import React from 'react';
import type { ScenarioCard } from '../types';

interface CardProps {
  card: ScenarioCard;
  index: number;
}

export const Card: React.FC<CardProps> = ({ card, index }) => {
  const { scenario, setup, options } = card;

  // Render complex card with setup and options
  if (setup && options) {
    return (
      <div 
        className="relative rounded-2xl shadow-xl flex flex-col p-1 min-h-[12rem] text-center transform-gpu transition-transform duration-300 hover:scale-105 bg-gradient-to-br from-purple-100 to-rose-200 dark:from-purple-900 dark:to-rose-900 animate-flip-in"
        style={{ animationDelay: `${index * 150}ms`, backfaceVisibility: 'hidden' }}
      >
        <div className="absolute inset-1 bg-white dark:bg-slate-800 rounded-xl flex flex-col p-6 w-full">
          <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200 text-center">
            {setup}
          </h3>
          <ul className="space-y-3 text-left flex-grow">
            {options.map((option, i) => (
              <li key={i} className="flex items-start">
                <span className="text-sky-500 font-bold mr-3 mt-1">✓</span>
                <span className="text-slate-700 dark:text-slate-300">{option}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // Render simple card with a single scenario
  return (
    <div 
      className="relative rounded-2xl shadow-xl flex items-center justify-center p-1 min-h-[12rem] text-center transform-gpu transition-transform duration-300 hover:scale-105 bg-gradient-to-br from-sky-100 to-indigo-200 dark:from-sky-900 dark:to-indigo-900 animate-flip-in"
      style={{ animationDelay: `${index * 150}ms`, backfaceVisibility: 'hidden' }}
    >
      <div className="absolute inset-1 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center p-6">
        <p className="text-xl font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
          {scenario}
        </p>
      </div>
    </div>
  );
};
