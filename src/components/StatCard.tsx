import React from 'react';
import { GripHorizontal } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: React.ReactNode;
}

export function StatCard({ title, value, change, positive = false, icon }: StatCardProps) {
  return (
    <div className="glass-card card-hover rounded-xl p-6 group relative">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 dark:text-gray-400 mb-2">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          <span className={`text-sm ${positive ? 'text-green-500' : 'text-red-500'}`}>
            {change}
          </span>
        </div>
        <div className={`p-3 rounded-xl ${positive ? 'bg-green-100 dark:bg-green-900/20' : 'bg-purple-100 dark:bg-purple-900/20'}`}>
          {icon}
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2">
        <GripHorizontal className="h-4 w-4 text-gray-500" />
      </div>
    </div>
  );
}