import React from 'react';
import { Plus } from 'lucide-react';

interface CompanyHeaderProps {
  onCreateClick: () => void;
}

export function CompanyHeader({ onCreateClick }: CompanyHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Companies</h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Manage your organization's companies and subsidiaries</p>
      </div>
      <button
        onClick={onCreateClick}
        className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition-colors w-full sm:w-auto"
      >
        <Plus className="h-5 w-5" />
        <span>Create Company</span>
      </button>
    </div>
  );
}