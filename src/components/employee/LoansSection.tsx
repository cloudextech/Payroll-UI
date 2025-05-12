import React, { useState } from 'react';
import {
  Receipt,
  Plus,
  PauseCircle,
  PlayCircle,
  Calendar,
  DollarSign,
  Clock,
  AlertCircle,
  ChevronDown,
  Save,
  XCircle,
  Trash2,
  Edit2,
  Eye,
  X,
  Building2,
  CalendarDays,
  Briefcase,
  GraduationCap,
  Award,
  BadgeCheck,
  Star,
  DoorOpen,
  FileWarning
} from 'lucide-react';

interface Loan {
  id: string;
  type: string;
  amount: string;
  startDate: string;
  endDate: string;
  monthlyPayment: string;
  remainingAmount: string;
  status: 'Active' | 'Paused';
  pausedFrom?: string;
  description?: string;
}

interface LoansSectionProps {
  data: Loan[];
  onUpdate: (section: string, field: string, value: any) => void;
  formatCurrency: (value: string) => string;
}

export function LoansSection({ data = [], onUpdate, formatCurrency }: LoansSectionProps) {
  const [showNewLoanForm, setShowNewLoanForm] = useState(false);
  const [pausingLoanIndex, setPausingLoanIndex] = useState<number | null>(null);

  const handleLoanStatusToggle = (index: number) => {
    if (!Array.isArray(data)) return;

    if (data[index].status === 'Active') {
      setPausingLoanIndex(index);
    } else {
      const newLoans = [...data];
      newLoans[index] = {
        ...newLoans[index],
        status: 'Active',
        pausedFrom: undefined
      };
      onUpdate('loans', 'add', newLoans);
    }
  };

  const handleLoanPauseConfirm = (month: string) => {
    if (pausingLoanIndex === null || !Array.isArray(data)) return;

    const newLoans = [...data];
    newLoans[pausingLoanIndex] = {
      ...newLoans[pausingLoanIndex],
      status: 'Paused',
      pausedFrom: month
    };
    onUpdate('loans', 'add', newLoans);
    setPausingLoanIndex(null);
  };

  const handleAddNewLoan = (loan: Loan) => {
    const newLoans = Array.isArray(data) ? [...data, loan] : [loan];
    onUpdate('loans', 'add', newLoans);
    setShowNewLoanForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/10 rounded-xl">
            <Receipt className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Loans</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage employee loan records</p>
          </div>
        </div>
        <button
          onClick={() => setShowNewLoanForm(true)}
          className="px-4 py-2 bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Loan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.isArray(data) && data.map((loan, index) => (
          <div key={loan.id} className="glass-card rounded-xl p-6 relative">
            {pausingLoanIndex === index && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl">
                {/* Pause Modal Content */}
              </div>
            )}

            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{loan.type}</h4>
                {loan.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{loan.description}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleLoanStatusToggle(index)}
                  className={`p-2 rounded-lg transition-colors ${
                    loan.status === 'Active'
                      ? 'text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/10'
                      : 'text-green-600 dark:text-green-400 hover:bg-green-500/10'
                  }`}
                  title={loan.status === 'Active' ? 'Pause Loan' : 'Resume Loan'}
                >
                  {loan.status === 'Active' ? (
                    <PauseCircle className="h-5 w-5" />
                  ) : (
                    <PlayCircle className="h-5 w-5" />
                  )}
                </button>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  loan.status === 'Active'
                    ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                    : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                }`}>
                  {loan.status}
                  {loan.pausedFrom && ` (from ${loan.pausedFrom})`}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Total Amount</span>
                  </div>
                  <div className="text-xl font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(loan.amount)}
                  </div>
                </div>
                <div className="glass-card rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <Clock className="h-4 w-4" />
                    <span>Monthly Payment</span>
                  </div>
                  <div className="text-xl font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(loan.monthlyPayment)}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Repayment Progress</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {((Number(loan.amount) - Number(loan.remainingAmount)) / Number(loan.amount) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${((Number(loan.amount) - Number(loan.remainingAmount)) / Number(loan.amount) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Remaining Amount</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {formatCurrency(loan.remainingAmount)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Duration</span>
                  </div>
                  <div className="text-gray-900 dark:text-white">
                    {new Date(loan.startDate).toLocaleDateString()} - {new Date(loan.endDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>Remaining Time</span>
                  </div>
                  <div className="text-gray-900 dark:text-white">
                    {Math.max(0, 
                      (new Date(loan.endDate).getFullYear() - new Date().getFullYear()) * 12 + 
                      (new Date(loan.endDate).getMonth() - new Date().getMonth())
                    )} months left
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}