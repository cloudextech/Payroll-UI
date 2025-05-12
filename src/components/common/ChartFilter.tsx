import React from 'react';

interface ChartFilterProps {
  viewType: 'daily' | 'weekly' | 'monthly';
  onViewChange: (type: 'daily' | 'weekly' | 'monthly') => void;
}

export function ChartFilter({ viewType, onViewChange }: ChartFilterProps) {
  return (
    <div className="flex rounded-lg overflow-hidden glass-card">
      <button
        onClick={() => onViewChange('daily')}
        className={`px-3 py-1.5 text-sm transition-colors ${
          viewType === 'daily'
            ? 'bg-purple-600 text-white'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        Daily
      </button>
      <button
        onClick={() => onViewChange('weekly')}
        className={`px-3 py-1.5 text-sm transition-colors ${
          viewType === 'weekly'
            ? 'bg-purple-600 text-white'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        Weekly
      </button>
      <button
        onClick={() => onViewChange('monthly')}
        className={`px-3 py-1.5 text-sm transition-colors ${
          viewType === 'monthly'
            ? 'bg-purple-600 text-white'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        Monthly
      </button>
    </div>
  );
}