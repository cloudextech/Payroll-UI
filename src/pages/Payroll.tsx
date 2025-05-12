import React, { useState } from 'react';
import {
  DollarSign,
  Download,
  Filter,
  Search,
  Calendar,
  ChevronDown,
  ArrowUpDown,
  FileSpreadsheet,
  Calculator,
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Printer
} from 'lucide-react';
import DatePicker from 'react-datepicker';

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  status: 'pending' | 'approved' | 'processing';
  attendance: {
    days: number;
    totalEL: number;
    adjustedEL: number;
    balanceEL: number;
  };
  salary: {
    basic: number;
    currentMonth: number;
    hra: number;
    others: number;
    allowance: number;
    total: number;
  };
  deductions: {
    epf: number;
    esi: number;
    canteen: number;
    debit: number;
    pageNo: number;
    shoe: number;
    tds: number;
  };
  advance: {
    opening: number;
    currentMonth: number;
    deducted: number;
    closing: number;
  };
  totalDeduction: number;
  netPayable: number;
}

export function Payroll() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<keyof Employee>('employeeId');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [employees] = useState<Employee[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'Sarah Anderson',
      department: 'Engineering',
      status: 'approved',
      attendance: {
        days: 22,
        totalEL: 2,
        adjustedEL: 1,
        balanceEL: 1,
      },
      salary: {
        basic: 50000,
        currentMonth: 48000,
        hra: 20000,
        others: 5000,
        allowance: 3000,
        total: 76000,
      },
      deductions: {
        epf: 5760,
        esi: 360,
        canteen: 1000,
        debit: 0,
        pageNo: 0,
        shoe: 0,
        tds: 2000,
      },
      advance: {
        opening: 10000,
        currentMonth: 5000,
        deducted: 5000,
        closing: 10000,
      },
      totalDeduction: 14120,
      netPayable: 61880,
    },
    {
      id: '2',
      employeeId: 'EMP002',
      name: 'Michael Chen',
      department: 'Sales',
      status: 'pending',
      attendance: {
        days: 20,
        totalEL: 3,
        adjustedEL: 2,
        balanceEL: 1,
      },
      salary: {
        basic: 45000,
        currentMonth: 42000,
        hra: 18000,
        others: 4000,
        allowance: 2500,
        total: 66500,
      },
      deductions: {
        epf: 5040,
        esi: 315,
        canteen: 1000,
        debit: 500,
        pageNo: 1,
        shoe: 1000,
        tds: 1500,
      },
      advance: {
        opening: 15000,
        currentMonth: 0,
        deducted: 5000,
        closing: 10000,
      },
      totalDeduction: 14355,
      netPayable: 52145,
    },
    {
      id: '3',
      employeeId: 'EMP003',
      name: 'Emily Rodriguez',
      department: 'Marketing',
      status: 'processing',
      attendance: {
        days: 21,
        totalEL: 4,
        adjustedEL: 2,
        balanceEL: 2,
      },
      salary: {
        basic: 55000,
        currentMonth: 52000,
        hra: 22000,
        others: 6000,
        allowance: 3500,
        total: 83500,
      },
      deductions: {
        epf: 6240,
        esi: 390,
        canteen: 1000,
        debit: 0,
        pageNo: 0,
        shoe: 0,
        tds: 2500,
      },
      advance: {
        opening: 20000,
        currentMonth: 10000,
        deducted: 7000,
        closing: 23000,
      },
      totalDeduction: 17130,
      netPayable: 66370,
    },
    {
      id: '4',
      employeeId: 'EMP004',
      name: 'David Kim',
      department: 'Engineering',
      status: 'approved',
      attendance: {
        days: 23,
        totalEL: 1,
        adjustedEL: 0,
        balanceEL: 1,
      },
      salary: {
        basic: 60000,
        currentMonth: 60000,
        hra: 24000,
        others: 7000,
        allowance: 4000,
        total: 95000,
      },
      deductions: {
        epf: 7200,
        esi: 450,
        canteen: 1000,
        debit: 0,
        pageNo: 0,
        shoe: 0,
        tds: 3000,
      },
      advance: {
        opening: 0,
        currentMonth: 0,
        deducted: 0,
        closing: 0,
      },
      totalDeduction: 11650,
      netPayable: 83350,
    },
    {
      id: '5',
      employeeId: 'EMP005',
      name: 'Lisa Thompson',
      department: 'HR',
      status: 'approved',
      attendance: {
        days: 22,
        totalEL: 2,
        adjustedEL: 1,
        balanceEL: 1,
      },
      salary: {
        basic: 48000,
        currentMonth: 46000,
        hra: 19200,
        others: 4800,
        allowance: 2800,
        total: 72800,
      },
      deductions: {
        epf: 5520,
        esi: 345,
        canteen: 1000,
        debit: 200,
        pageNo: 1,
        shoe: 500,
        tds: 1800,
      },
      advance: {
        opening: 8000,
        currentMonth: 2000,
        deducted: 3000,
        closing: 7000,
      },
      totalDeduction: 12365,
      netPayable: 60435,
    }
  ]);

  const handleSort = (field: keyof Employee) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = (status: Employee['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'processing':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || employee.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const departments = Array.from(new Set(employees.map(emp => emp.department)));

  const calculateTotals = () => {
    return filteredEmployees.reduce((acc, emp) => ({
      totalSalary: acc.totalSalary + emp.salary.total,
      totalDeductions: acc.totalDeductions + emp.totalDeduction,
      totalNetPayable: acc.totalNetPayable + emp.netPayable,
    }), {
      totalSalary: 0,
      totalDeductions: 0,
      totalNetPayable: 0,
    });
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Payroll</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage employee salaries and deductions</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors">
              <FileText className="h-5 w-5" />
              <span>Generate Slips</span>
            </button>
            <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-colors">
              <Calculator className="h-5 w-5" />
              <span>Calculate Payroll</span>
            </button>
            <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition-colors">
              <FileSpreadsheet className="h-5 w-5" />
              <span>Export Excel</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl transition-colors">
              <Printer className="h-5 w-5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {filteredEmployees.length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                <DollarSign className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </div>
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Total Salary</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {formatCurrency(totals.totalSalary)}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Total Deductions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {formatCurrency(totals.totalDeductions)}
                </p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-xl">
                <DollarSign className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </div>
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Net Payable</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {formatCurrency(totals.totalNetPayable)}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                <DollarSign className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by employee ID or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-gray-800/50 rounded-lg pl-10 pr-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-purple-500/30 border border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="relative">
              <DatePicker
                selected={selectedMonth}
                onChange={(date) => setSelectedMonth(date)}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                className="bg-white dark:bg-gray-800/50 rounded-lg px-4 py-2 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              />
            </div>
            <div className="relative">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800/50 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800/50 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="processing">Processing</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Payroll Table */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                  <th className="text-left p-4 text-gray-500 dark:text-gray-400 font-medium border-b-2 border-gray-300 dark:border-gray-600">S.No</th>
                  <th className="text-left p-4 text-gray-500 dark:text-gray-400 font-medium border-b-2 border-gray-300 dark:border-gray-600">Status</th>
                  <th className="text-left p-4 text-gray-500 dark:text-gray-400 font-medium border-b-2 border-gray-300 dark:border-gray-600">
                    <button
                      className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-white transition-colors"
                      onClick={() => handleSort('employeeId')}
                    >
                      <span>Employee ID</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="text-left p-4 text-gray-500 dark:text-gray-400 font-medium border-b-2 border-gray-300 dark:border-gray-600">
                    <button
                      className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-white transition-colors"
                      onClick={() => handleSort('name')}
                    >
                      <span>Name</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="text-left p-4 text-gray-500 dark:text-gray-400 font-medium border-b-2 border-gray-300 dark:border-gray-600">Department</th>
                  
                  {/* Attendance Columns */}
                  <th className="text-center p-4 text-gray-500 dark:text-gray-400 font-medium border-x-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50" colSpan={4}>
                    Attendance
                  </th>
                  
                  {/* Salary Columns */}
                  <th className="text-center p-4 text-gray-500 dark:text-gray-400 font-medium border-x-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50" colSpan={6}>
                    Salary
                  </th>
                  
                  {/* Deduction Columns */}
                  <th className="text-center p-4 text-gray-500 dark:text-gray-400 font-medium border-x-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50" colSpan={7}>
                    Deduction
                  </th>
                  
                  {/* Advance Columns */}
                  <th className="text-center p-4 text-gray-500 dark:text-gray-400 font-medium border-x-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50" colSpan={4}>
                    Advance
                  </th>
                  
                  <th className="text-left p-4 text-gray-500 dark:text-gray-400 font-medium border-b-2 border-gray-300 dark:border-gray-600">Total Deduction</th>
                  <th className="text-left p-4 text-gray-500 dark:text-gray-400 font-medium border-b-2 border-gray-300 dark:border-gray-600">Net Payable</th>
                </tr>
                <tr className="border-b-2 border-gray-300 dark:border-gray-600 text-sm">
                  <th className="p-4 border-b-2 border-gray-300 dark:border-gray-600"></th>
                  <th className="p-4 border-b-2 border-gray-300 dark:border-gray-600"></th>
                  <th className="p-4 border-b-2 border-gray-300 dark:border-gray-600"></th>
                  <th className="p-4 border-b-2 border-gray-300 dark:border-gray-600"></th>
                  <th className="p-4 border-b-2 border-gray-300 dark:border-gray-600"></th>
                  
                  {/* Attendance Sub-headers */}
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">Days</th>
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">Total EL</th>
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">Adjusted EL</th>
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">Balance EL</th>
                  
                  {/* Salary Sub-headers */}
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">Basic</th>
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">Current Month</th>
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">HRA</th>
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">Others</th>
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">Allowance</th>
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">Total</th>
                  
                  {/* Deduction Sub-headers */}
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">EPF 12%</th>
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">ESI 0.75%</th>
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">Canteen</th>
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">Debit</th>
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">Page No</th>
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">Shoe</th>
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">TDS</th>
                  
                  {/* Advance Sub-headers */}
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">Opening</th>
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">Current Month</th>
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">Deducted</th>
                  <th className="p-4 text-gray-500 dark:text-gray-400 font-medium">Closing</th>
                  
                  <th className="p-4"></th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee, index) => (
                  <tr key={employee.id} className="border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="p-4 text-gray-900 dark:text-white">{index + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(employee.status)}
                        <span className={`text-sm capitalize ${
                          employee.status === 'approved' ? 'text-green-500' :
                          employee.status === 'pending' ? 'text-yellow-500' :
                          'text-blue-500'
                        }`}>
                          {employee.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-900 dark:text-white">{employee.employeeId}</td>
                    <td className="p-4 text-gray-900 dark:text-white font-medium">{employee.name}</td>
                    <td className="p-4 text-gray-900 dark:text-white">{employee.department}</td>
                    
                    {/* Attendance */}
                    <td className="p-4 text-gray-900 dark:text-white text-center">{employee.attendance.days}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-center">{employee.attendance.totalEL}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-center">{employee.attendance.adjustedEL}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-center">{employee.attendance.balanceEL}</td>
                    
                    {/* Salary */}
                    <td className="p-4 text-gray-900 dark:text-white text-right">{formatCurrency(employee.salary.basic)}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-right">{formatCurrency(employee.salary.currentMonth)}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-right">{formatCurrency(employee.salary.hra)}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-right">{formatCurrency(employee.salary.others)}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-right">{formatCurrency(employee.salary.allowance)}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-right font-medium">{formatCurrency(employee.salary.total)}</td>
                    
                    {/* Deductions */}
                    <td className="p-4 text-gray-900 dark:text-white text-right">{formatCurrency(employee.deductions.epf)}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-right">{formatCurrency(employee.deductions.esi)}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-right">{formatCurrency(employee.deductions.canteen)}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-right">{formatCurrency(employee.deductions.debit)}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-center">{employee.deductions.pageNo || '-'}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-right">{formatCurrency(employee.deductions.shoe)}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-right">{formatCurrency(employee.deductions.tds)}</td>
                    
                    {/* Advance */}
                    <td className="p-4 text-gray-900 dark:text-white text-right">{formatCurrency(employee.advance.opening)}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-right">{formatCurrency(employee.advance.currentMonth)}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-right">{formatCurrency(employee.advance.deducted)}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-right">{formatCurrency(employee.advance.closing)}</td>
                    
                    {/* Totals */}
                    <td className="p-4 text-gray-900 dark:text-white text-right font-medium">{formatCurrency(employee.totalDeduction)}</td>
                    <td className="p-4 text-gray-900 dark:text-white text-right font-medium">{formatCurrency(employee.netPayable)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}