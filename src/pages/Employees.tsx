import React, { useState } from 'react';
import { Users, Search, Filter, Plus, MoreHorizontal, Mail, Phone, Building2, Calendar, BadgeCheck, Clock, DollarSign, ChevronDown, ArrowUpDown, Edit, UserCheck, UserMinus, Activity, Store, Heater as Gate, UserCircle, Truck, HardHat, Briefcase } from 'lucide-react';
import { EmployeeProfile } from '../components/EmployeeProfile';
import { AddEmployeeDialog } from '../components/employee/AddEmployeeDialog';
import { useTheme } from '../context/ThemeContext';

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string[];
  category: 'Driver' | 'Staff' | 'Operator';
  locationType: 'Shop' | 'Gate';
  joinDate: string;
  status: 'active' | 'on-leave' | 'terminated' | 'approved';
  salary: string;
  avatar: string;
  attendance: number;
}

interface ActionMenuProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
  onUpdateStatus: (id: string, status: Employee['status']) => void;
}

function ActionMenu({ isOpen, onClose, employee, onUpdateStatus }: ActionMenuProps) {
  if (!isOpen) return null;

  const handleStatusUpdate = (status: Employee['status']) => {
    onUpdateStatus(employee.id, status);
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50 z-50">
      <div className="py-1">
        <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700/50">Status</div>
        <button
          onClick={() => handleStatusUpdate('active')}
          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
        >
          <UserCheck className="h-4 w-4 text-green-500" />
          <span>Set Active</span>
        </button>
        <button
          onClick={() => handleStatusUpdate('on-leave')}
          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
        >
          <Clock className="h-4 w-4 text-yellow-500" />
          <span>Set On Leave</span>
        </button>
        <button
          onClick={() => handleStatusUpdate('terminated')}
          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
        >
          <UserMinus className="h-4 w-4 text-red-500" />
          <span>Set Terminated</span>
        </button>
      </div>
    </div>
  );
}

const DEPARTMENTS = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance'];
const CATEGORIES = ['Driver', 'Staff', 'Operator'];
const LOCATION_TYPES = ['Shop', 'Gate'];

export function Employees() {
  const { theme } = useTheme();
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocationType, setSelectedLocationType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [employees] = useState<Employee[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'Arjun Sharma',
      role: 'Software Engineer',
      department: 'Engineering',
      email: 'arjun.sharma@company.com',
      phone: ['+91 98765 43210', '+91 98765 43211'],
      category: 'Staff',
      locationType: 'Shop',
      joinDate: '2023-01-15',
      status: 'active',
      salary: '₹120,000',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=faces',
      attendance: 98,
    },
    {
      id: '2',
      employeeId: 'EMP002',
      name: 'Priya Patel',
      role: 'Vehicle Operator',
      department: 'Operations',
      email: 'priya.patel@company.com',
      phone: ['+91 98765 43212', '+91 98765 43213'],
      category: 'Operator',
      locationType: 'Gate',
      joinDate: '2022-11-03',
      status: 'active',
      salary: '₹110,000',
      avatar: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=150&h=150&fit=crop&crop=faces',
      attendance: 95,
    },
    {
      id: '3',
      employeeId: 'EMP003',
      name: 'Rajesh Kumar',
      role: 'Delivery Driver',
      department: 'Logistics',
      email: 'rajesh.kumar@company.com',
      phone: ['+91 98765 43214', '+91 98765 43215'],
      category: 'Driver',
      locationType: 'Gate',
      joinDate: '2023-03-22',
      status: 'on-leave',
      salary: '₹95,000',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&h=150&fit=crop&crop=faces',
      attendance: 89,
    },
    {
      id: '4',
      employeeId: 'EMP004',
      name: 'Ananya Singh',
      role: 'Senior Developer',
      department: 'Engineering',
      email: 'ananya.singh@company.com',
      phone: ['+91 98765 43216', '+91 98765 43217'],
      category: 'Staff',
      locationType: 'Shop',
      status: 'approved',
      salary: '₹60,000',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
      attendance: 96,
      joinDate: '2023-01-15',
    },
    {
      id: '5',
      employeeId: 'EMP005',
      name: 'Vikram Malhotra',
      role: 'HR Manager',
      department: 'HR',
      email: 'vikram.malhotra@company.com',
      phone: ['+91 98765 43218', '+91 98765 43219'],
      category: 'Staff',
      locationType: 'Shop',
      joinDate: '2023-02-15',
      status: 'approved',
      salary: '₹48,000',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&h=150&fit=crop&crop=faces',
      attendance: 92,
    }
  ]);

  const handleUpdateStatus = (id: string, status: Employee['status']) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, status } : emp
    ));
  };

  const handleAddEmployee = (employeeData: any) => {
    console.log('New employee data:', employeeData);
    setShowAddDialog(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Driver':
        return <Truck className="h-4 w-4" />;
      case 'Staff':
        return <UserCircle className="h-4 w-4" />;
      case 'Operator':
        return <HardHat className="h-4 w-4" />;
      default:
        return <Briefcase className="h-4 w-4" />;
    }
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'Shop':
        return <Store className="h-4 w-4" />;
      case 'Gate':
        return <Gate className="h-4 w-4" />;
      default:
        return <Building2 className="h-4 w-4" />;
    }
  };

  const filteredEmployees = employees
    .filter(employee => 
      (selectedDepartment === 'All' || employee.department === selectedDepartment) &&
      (selectedCategory === 'All' || employee.category === selectedCategory) &&
      (selectedLocationType === 'All' || employee.locationType === selectedLocationType) &&
      (employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
       employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      const aValue = a[sortBy as keyof Employee];
      const bValue = b[sortBy as keyof Employee];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-500';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-500';
      case 'terminated':
        return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-500';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Employees</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your organization's workforce</p>
          </div>
          <button 
            onClick={() => setShowAddDialog(true)}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Employee</span>
          </button>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or employee ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-gray-800/50 rounded-lg pl-10 pr-4 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-purple-500/30 border border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="relative">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800/50 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              >
                <option value="All">All Departments</option>
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800/50 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={selectedLocationType}
                onChange={(e) => setSelectedLocationType(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800/50 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              >
                <option value="All">All Locations</option>
                {LOCATION_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Employee Table */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700/50">
                  <th className="text-left p-4 text-gray-500 dark:text-gray-400 font-medium">
                    <button
                      className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-white transition-colors"
                      onClick={() => handleSort('name')}
                    >
                      <span>Employee</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="text-left p-4 text-gray-500 dark:text-gray-400 font-medium">Category</th>
                  <th className="text-left p-4 text-gray-500 dark:text-gray-400 font-medium">Contact</th>
                  <th className="text-left p-4 text-gray-500 dark:text-gray-400 font-medium">Location</th>
                  <th className="text-left p-4 text-gray-500 dark:text-gray-400 font-medium">
                    <button
                      className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-white transition-colors"
                      onClick={() => handleSort('joinDate')}
                    >
                      <span>Join Date</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="text-left p-4 text-gray-500 dark:text-gray-400 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-500 dark:text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <button
                            onClick={() => setSelectedEmployee(employee)}
                            className="font-medium text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          >
                            {employee.name}
                          </button>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {employee.employeeId} • {employee.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                        {getCategoryIcon(employee.category)}
                        <span>{employee.category}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                          <Mail className="h-4 w-4" />
                          <span>{employee.email}</span>
                        </div>
                        {employee.phone.map((number, index) => (
                          <div key={index} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                            <Phone className="h-4 w-4" />
                            <span>{number}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                        {getLocationIcon(employee.locationType)}
                        <span>{employee.locationType}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(employee.joinDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusColor(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="relative">
                        <button
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                          onClick={() => setActiveMenu(activeMenu === employee.id ? null : employee.id)}
                        >
                          <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </button>
                        <ActionMenu
                          isOpen={activeMenu === employee.id}
                          onClose={() => setActiveMenu(null)}
                          employee={employee}
                          onUpdateStatus={handleUpdateStatus}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Employee Dialog */}
        {showAddDialog && (
          <AddEmployeeDialog
            onClose={() => setShowAddDialog(false)}
            onSave={handleAddEmployee}
          />
        )}

        {/* Employee Profile Modal */}
        {selectedEmployee && (
          <EmployeeProfile
            employee={selectedEmployee}
            onClose={() => setSelectedEmployee(null)}
          />
        )}
      </div>
    </div>
  );
}