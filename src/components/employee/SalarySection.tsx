import React from 'react';
import { Wallet, Receipt } from 'lucide-react';
import { EditableField } from './EditableField';

interface SalarySectionProps {
  data: {
    basic: string;
    houseRent: string;
    medical: string;
    transport: string;
    meal: string;
    total: string;
    deductions: {
      tax: string;
      insurance: string;
      pension: string;
    };
  };
  onUpdate: (section: string, field: string, value: any) => void;
  formatCurrency: (value: string) => string;
}

export function SalarySection({ data, onUpdate, formatCurrency }: SalarySectionProps) {
  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Wallet className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2" />
          Earnings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <EditableField
            label="Basic Salary"
            value={formatCurrency(data.basic)}
            onSave={(value) => onUpdate('salary', 'basic', value.replace(/[^0-9]/g, ''))}
          />
          <EditableField
            label="House Rent"
            value={formatCurrency(data.houseRent)}
            onSave={(value) => onUpdate('salary', 'houseRent', value.replace(/[^0-9]/g, ''))}
          />
          <EditableField
            label="Medical"
            value={formatCurrency(data.medical)}
            onSave={(value) => onUpdate('salary', 'medical', value.replace(/[^0-9]/g, ''))}
          />
          <EditableField
            label="Transport"
            value={formatCurrency(data.transport)}
            onSave={(value) => onUpdate('salary', 'transport', value.replace(/[^0-9]/g, ''))}
          />
          <EditableField
            label="Meal"
            value={formatCurrency(data.meal)}
            onSave={(value) => onUpdate('salary', 'meal', value.replace(/[^0-9]/g, ''))}
          />
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Receipt className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2" />
          Deductions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <EditableField
            label="Tax"
            value={formatCurrency(data.deductions.tax)}
            onSave={(value) => onUpdate('salary', 'deductions', { ...data.deductions, tax: value.replace(/[^0-9]/g, '') })}
          />
          <EditableField
            label="Insurance"
            value={formatCurrency(data.deductions.insurance)}
            onSave={(value) => onUpdate('salary', 'deductions', { ...data.deductions, insurance: value.replace(/[^0-9]/g, '') })}
          />
          <EditableField
            label="Pension"
            value={formatCurrency(data.deductions.pension)}
            onSave={(value) => onUpdate('salary', 'deductions', { ...data.deductions, pension: value.replace(/[^0-9]/g, '') })}
          />
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400 font-medium">Total Salary</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(data.total)}
          </span>
        </div>
      </div>
    </div>
  );
}