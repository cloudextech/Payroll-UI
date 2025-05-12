import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyCard } from '../components/company/CompanyCard';

interface CompanyData {
  id: string;
  name: string;
  logo: string;
  location: string;
  employees: number;
  description: string;
}

export function Company() {
  const navigate = useNavigate();
  const [companies] = React.useState<CompanyData[]>([
    {
      id: '1',
      name: 'TechNova Solutions',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=300&fit=crop&crop=entropy',
      location: 'Chennai,TN',
      employees: 1250,
      description: 'Leading provider of enterprise software solutions and IT consulting services.',
    },
  ]);

  const handleCompanyClick = (companyId: string) => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Companies</h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Manage your organization's companies and subsidiaries</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {companies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onClick={handleCompanyClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}