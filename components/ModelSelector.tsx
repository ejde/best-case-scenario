import React from 'react';
import type { ModelType } from '../types';

interface ModelSelectorProps {
    selectedModel: ModelType;
    onModelChange: (model: ModelType) => void;
    disabled?: boolean;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
    selectedModel,
    onModelChange,
    disabled
}) => {
    return (
        <div className="absolute top-4 right-4 z-20">
            <div className="relative inline-block text-left">
                <select
                    value={selectedModel}
                    onChange={(e) => onModelChange(e.target.value as ModelType)}
                    disabled={disabled}
                    className="block w-full pl-3 pr-8 py-1.5 text-xs sm:text-sm border-none focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-sm hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors cursor-pointer text-slate-600 dark:text-slate-400 font-medium"
                >
                    <option value="gemini">✨ Gemini</option>
                    <option value="openai">🤖 OpenAI</option>
                </select>
            </div>
        </div>
    );
};
