
import React from 'react';
import { Card } from './Card';
import type { ScenarioCard } from '../types';

interface CardGridProps {
  cards: ScenarioCard[];
}

export const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
  if (cards.length === 1) {
    return (
      <div className="mt-8 flex justify-center [perspective:1000px]">
        <div className="w-full md:w-2/3 lg:w-1/2">
          <Card key={0} card={cards[0]} index={0} />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 [perspective:1000px]">
      {cards.map((card, index) => (
        <Card key={index} card={card} index={index} />
      ))}
    </div>
  );
};