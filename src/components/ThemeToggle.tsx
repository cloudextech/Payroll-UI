import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl transition-colors hover:bg-gray-800/50 dark:hover:bg-gray-800/50 hover:bg-gray-200/50 group"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-10 h-6 flex items-center rounded-full bg-gray-200 dark:bg-gray-800 transition-colors">
        <div
          className={`absolute left-0.5 w-5 h-5 rounded-full bg-purple-500 transform transition-transform duration-300 ease-spring ${
            theme === 'dark' ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
        <Sun className="absolute left-0.5 h-5 w-5 text-gray-100 transition-opacity duration-300 ease-spring" style={{ opacity: theme === 'light' ? 1 : 0 }} />
        <Moon className="absolute right-0.5 h-5 w-5 text-gray-100 transition-opacity duration-300 ease-spring" style={{ opacity: theme === 'dark' ? 1 : 0 }} />
      </div>
    </button>
  );
}