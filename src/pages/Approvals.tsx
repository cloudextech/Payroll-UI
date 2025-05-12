import React, { useState } from 'react';
import {
  Clock,
  DollarSign,
  ArrowUp,
  Calendar,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Search,
  Filter,
  CheckSquare,
  Square,
  AlertCircle,
  Timer,
  Wallet,
  BadgeCheck
} from 'lucide-react';

interface ApprovalRequest {
  id: string;
  type: 'increment' | 'advance' | 'attendance' | 'salary' | 'leave';
  employeeId: string;
  employeeName: string;
  department: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  details: {
    currentAmount?: number;
    requestedAmount?: number;
    reason?: string;
    date?: string;
    time?: string;
    leaveType?: string;
    duration?: string;
    incrementType?: 'percentage' | 'fixed';
    incrementValue?: number;
    effectiveDate?: string;
  };
}

export function Approvals() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const [approvalRequests] = useState<ApprovalRequest[]>([
    {
      id: '1',
      type: 'increment',
      employeeId: 'EMP001',
      employeeName: 'Arjun Sharma',
      department: 'Engineering',
      requestDate: '2024-03-20',
      status: 'pending',
      details: {
        currentAmount: 50000,
        incrementType: 'percentage',
        incrementValue: 10,
        effectiveDate: '2024-04-01',
        reason: 'Annual performance review increment'
      }
    },
    {
      id: '2',
      type: 'advance',
      employeeId: 'EMP002',
      employeeName: 'Priya Patel',
      department: 'Sales',
      requestDate: '2024-03-19',
      status: 'pending',
      details: {
        requestedAmount: 25000,
        reason: 'Medical emergency'
      }
    },
    {
      id: '3',
      type: 'attendance',
      employeeId: 'EMP003',
      employeeName: 'Rajesh Kumar',
      department: 'Marketing',
      requestDate: '2024-03-18',
      status: 'pending',
      details: {
        date: '2024-03-18',
        time: '10:30 AM',
        reason: 'Traffic delay'
      }
    },
    {
      id: '4',
      type: 'salary',
      employeeId: 'EMP004',
      employeeName: 'Ananya Singh',
      department: 'Engineering',
      requestDate: '2024-03-17',
      status: 'pending',
      details: {
        currentAmount: 60000,
        requestedAmount: 65000,
        reason: 'Role change and additional responsibilities'
      }
    },
    {
      id: '5',
      type: 'leave',
      employeeId: 'EMP005',
      employeeName: 'Vikram Malhotra',
      department: 'HR',
      requestDate: '2024-03-16',
      status: 'pending',
      details: {
        leaveType: 'Sick Leave',
        duration: '3 days',
        reason: 'Medical procedure'
      }
    }
  ]);

  const categories = [
    { id: 'all', label: 'All Requests', icon: BadgeCheck },
    { id: 'increment', label: 'Increment', icon: ArrowUp },
    { id: 'advance', label: 'Advance Salary', icon: Wallet },
    { id: 'attendance', label: 'Attendance', icon: Timer },
    { id: 'salary', label: 'Salary Change', icon: DollarSign },
    { id: 'leave', label: 'Leave', icon: Calendar }
  ];

  const filteredRequests = approvalRequests.filter(request => {
    const matchesCategory = selectedCategory === 'all' || request.type === selectedCategory;
    const matchesSearch = 
      request.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(filteredRequests.map(request => request.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRequest = (requestId: string) => {
    setSelectedRequests(prev => {
      if (prev.includes(requestId)) {
        return prev.filter(id => id !== requestId);
      } else {
        return [...prev, requestId];
      }
    });
  };

  const handleBulkApprove = () => {
    // Handle bulk approval logic
    console.log('Approving requests:', selectedRequests);
  };

  const getRequestIcon = (type: ApprovalRequest['type']) => {
    switch (type) {
      case 'increment':
        return <ArrowUp className="h-5 w-5 text-green-500" />;
      case 'advance':
        return <Wallet className="h-5 w-5 text-blue-500" />;
      case 'attendance':
        return <Timer className="h-5 w-5 text-yellow-500" />;
      case 'salary':
        return <DollarSign className="h-5 w-5 text-purple-500" />;
      case 'leave':
        return <Calendar className="h-5 w-5 text-orange-500" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/10 rounded-xl">
              <BadgeCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Approvals</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Manage employee requests and approvals</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.label}</span>
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-600 dark:text-gray-400">
                  {category.id === 'all' 
                    ? approvalRequests.length
                    : approvalRequests.filter(r => r.type === category.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by employee name, ID, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-gray-800/50 rounded-lg pl-10 pr-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-purple-500/30 border border-gray-200 dark:border-gray-700"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800/50 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors border border-gray-200 dark:border-gray-700">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Requests List */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSelectAll}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  {selectAll ? (
                    <CheckSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <Square className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <span className="text-gray-600 dark:text-gray-400">
                  {selectedRequests.length} selected
                </span>
              </div>
              {selectedRequests.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleBulkApprove}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Approve Selected</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                    <XCircle className="h-4 w-4" />
                    <span>Reject Selected</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700/50">
            {filteredRequests.map(request => (
              <div key={request.id} className="p-4 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => handleSelectRequest(request.id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                  >
                    {selectedRequests.includes(request.id) ? (
                      <CheckSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-3">
                          {getRequestIcon(request.type)}
                          <h4 className="text-gray-900 dark:text-white font-medium">{request.employeeName}</h4>
                          <span className="text-gray-600 dark:text-gray-400">{request.employeeId}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600 dark:text-gray-400">{request.department}</span>
                        </div>

                        <div className="mt-2 space-y-2">
                          {request.type === 'increment' && (
                            <>
                              <p className="text-gray-600 dark:text-gray-400">
                                Requesting {request.details.incrementType === 'percentage' ? `${request.details.incrementValue}% increment` : `${formatCurrency(request.details.incrementValue || 0)} increment`}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400">
                                Effective from: {request.details.effectiveDate}
                              </p>
                            </>
                          )}

                          {request.type === 'advance' && (
                            <p className="text-gray-600 dark:text-gray-400">
                              Requesting advance of {formatCurrency(request.details.requestedAmount || 0)}
                            </p>
                          )}

                          {request.type === 'attendance' && (
                            <p className="text-gray-600 dark:text-gray-400">
                              Late punch-in on {request.details.date} at {request.details.time}
                            </p>
                          )}

                          {request.type === 'salary' && (
                            <p className="text-gray-600 dark:text-gray-400">
                              Salary change request from {formatCurrency(request.details.currentAmount || 0)} to {formatCurrency(request.details.requestedAmount || 0)}
                            </p>
                          )}

                          {request.type === 'leave' && (
                            <p className="text-gray-600 dark:text-gray-400">
                              {request.details.leaveType} request for {request.details.duration}
                            </p>
                          )}

                          <p className="text-sm text-gray-500">
                            Reason: {request.details.reason}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Requested on {new Date(request.requestDate).toLocaleDateString()}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                          <button className="p-2 bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                            <XCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}