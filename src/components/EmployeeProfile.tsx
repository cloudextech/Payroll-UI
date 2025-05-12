import React, { useState } from 'react';
import {
  X,
  User,
  Building,
  Wallet,
  Receipt,
  Clock,
  Mail
} from 'lucide-react';
import { PersonalSection } from './employee/PersonalSection';
import { BankSection } from './employee/BankSection';
import { SalarySection } from './employee/SalarySection';
import { LoansSection } from './employee/LoansSection';
import { AttendanceSection } from './employee/AttendanceSection';
import { LettersSection } from './employee/LettersSection';

interface EmployeeProfileProps {
  employee: any;
  onClose: () => void;
}

export function EmployeeProfile({ employee, onClose }: EmployeeProfileProps) {
  const [activeTab, setActiveTab] = useState('personal');
  const [employeeData, setEmployeeData] = useState({
    personal: {
      dateOfBirth: '1990-05-15',
      nationality: 'United States',
      maritalStatus: 'Single',
      gender: 'Female',
      bloodGroup: 'O+',
      emergencyContact: {
        name: 'John Anderson',
        relation: 'Father',
        phone: '+1 (555) 987-6543',
      },
      education: [
        {
          degree: 'Bachelor of Science in Computer Science',
          institution: 'Stanford University',
          year: '2012',
        },
        {
          degree: 'Master of Science in Software Engineering',
          institution: 'MIT',
          year: '2014',
        },
      ],
    },
    bank: {
      accountName: 'Sarah Anderson',
      accountNumber: '**** **** **** 4567',
      bankName: 'Chase Bank',
      branch: 'San Francisco Main',
      routingNumber: '******123',
      swiftCode: 'CHASUS33',
    },
    salary: {
      basic: '90000',
      houseRent: '18000',
      medical: '6000',
      transport: '3600',
      meal: '2400',
      total: '120000',
      deductions: {
        tax: '24000',
        insurance: '3600',
        pension: '6000',
      },
    },
    loans: [
      {
        id: '1',
        type: 'Personal Loan',
        amount: '25000',
        startDate: '2023-06-01',
        endDate: '2025-06-01',
        monthlyPayment: '1150',
        remainingAmount: '18400',
        status: 'Active',
      },
      {
        id: '2',
        type: 'Education Loan',
        amount: '15000',
        startDate: '2022-01-15',
        endDate: '2024-01-15',
        monthlyPayment: '680',
        remainingAmount: '5440',
        status: 'Active',
      },
    ],
  });

  const handleFieldUpdate = (section: string, field: string, value: any) => {
    setEmployeeData(prev => ({
      ...prev,
      [section]: typeof value === 'object'
        ? { ...prev[section], [field]: value }
        : { ...prev[section], [field]: value }
    }));
  };

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(Number(value));
  };

  const tabs = [
    { id: 'personal', label: 'Personal', icon: <User className="h-4 w-4" /> },
    { id: 'bank', label: 'Bank Details', icon: <Building className="h-4 w-4" /> },
    { id: 'salary', label: 'Salary', icon: <Wallet className="h-4 w-4" /> },
    { id: 'attendance', label: 'Attendance', icon: <Clock className="h-4 w-4" /> },
    { id: 'loans', label: 'Loans', icon: <Receipt className="h-4 w-4" /> },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 xs:p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-[1200px] h-[90vh] shadow-2xl relative flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700/50 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-10">
          <div className="flex items-center space-x-4">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-12 sm:w-16 h-12 sm:h-16 rounded-full object-cover ring-2 ring-purple-500/30"
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{employee.name}</h2>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">{employee.role} • {employee.department}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm sticky top-[72px] sm:top-[88px] z-10">
          <div className="flex space-x-1 p-4 overflow-x-auto custom-scrollbar-x">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {tab.icon}
                <span className="text-sm sm:text-base">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar bg-gray-50 dark:bg-gray-900">
          {activeTab === 'personal' && (
            <PersonalSection
              data={employeeData.personal}
              onUpdate={handleFieldUpdate}
            />
          )}

          {activeTab === 'bank' && (
            <BankSection
              data={employeeData.bank}
              onUpdate={handleFieldUpdate}
            />
          )}

          {activeTab === 'salary' && (
            <SalarySection
              data={employeeData.salary}
              onUpdate={handleFieldUpdate}
              formatCurrency={formatCurrency}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceSection employeeId={employee.id} />
          )}

          {activeTab === 'loans' && (
            <LoansSection
              data={employeeData.loans}
              onUpdate={handleFieldUpdate}
              formatCurrency={formatCurrency}
            />
          )}

          {activeTab === 'letters' && (
            <LettersSection />
          )}
        </div>
      </div>
    </div>
  );
}