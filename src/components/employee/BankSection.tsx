import React from 'react';
import { Building } from 'lucide-react';
import { EditableField } from './EditableField';

interface BankSectionProps {
  data: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    branch: string;
    routingNumber: string;
    swiftCode: string;
  };
  onUpdate: (section: string, field: string, value: string) => void;
}

export function BankSection({ data, onUpdate }: BankSectionProps) {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <Building className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2" />
        Bank Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <EditableField
          label="Account Name"
          value={data.accountName}
          onSave={(value) => onUpdate('bank', 'accountName', value)}
        />
        <EditableField
          label="Account Number"
          value={data.accountNumber}
          onSave={(value) => onUpdate('bank', 'accountNumber', value)}
        />
        <EditableField
          label="Bank Name"
          value={data.bankName}
          onSave={(value) => onUpdate('bank', 'bankName', value)}
        />
        <EditableField
          label="Branch"
          value={data.branch}
          onSave={(value) => onUpdate('bank', 'branch', value)}
        />
        <EditableField
          label="Routing Number"
          value={data.routingNumber}
          onSave={(value) => onUpdate('bank', 'routingNumber', value)}
        />
        <EditableField
          label="SWIFT Code"
          value={data.swiftCode}
          onSave={(value) => onUpdate('bank', 'swiftCode', value)}
        />
      </div>
    </div>
  );
}