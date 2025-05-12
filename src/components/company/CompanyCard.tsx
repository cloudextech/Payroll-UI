import React from 'react';
import { MapPin, Users, ArrowRight } from 'lucide-react';

interface CompanyCardProps {
  company: {
    id: string;
    name: string;
    logo: string;
    location: string;
    employees: number;
    description: string;
  };
  onClick: (id: string) => void;
}

export function CompanyCard({ company, onClick }: CompanyCardProps) {
  return (
    <div 
      onClick={() => onClick(company.id)}
      className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer group"
    >
      <div className="h-40 sm:h-48 lg:h-40 xl:h-48 bg-gradient-to-r from-purple-600/90 to-blue-600/90 relative">
        <img 
          src={company.logo} 
          alt={company.name}
          className="w-full h-full object-cover mix-blend-overlay opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white">{company.name}</h3>
        </div>
      </div>
      
      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex flex-col space-y-2 sm:space-y-3">
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm sm:text-base">{company.location}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <Users className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm sm:text-base">{company.employees.toLocaleString()} Employees</span>
          </div>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base line-clamp-2">{company.description}</p>
        
        <div className="flex justify-end pt-2">
          <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
            <span className="text-sm sm:text-base">View Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}