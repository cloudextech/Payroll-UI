import React from 'react';

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

export function NavItem({ icon, text, active = false, onClick }: NavItemProps) {
  return (
    <button 
      className={`w-full flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300
                ${active 
                  ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-500/20' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}