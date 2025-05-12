import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Mail,
  DollarSign,
  Building2,
  Search,
  Bell,
  Settings,
  UserCircle,
  Calendar,
  BadgeCheck,
  Menu,
  X,
} from 'lucide-react';
import { NavItem } from './components/NavItem';
import { StatCard } from './components/StatCard';
import { LeaveBreakdownCard } from './components/LeaveBreakdownCard';
import { FoodConsumptionCard } from './components/FoodConsumptionCard';
import { AllowancesBreakdownCard } from './components/AllowancesBreakdownCard';
import { OvertimeCard } from './components/OvertimeCard';
import { Employees } from './pages/Employees';
import { Letters } from './pages/Letters';
import { Company } from './pages/Company';
import { Payroll } from './pages/Payroll';
import { Approvals } from './pages/Approvals';
import { ThemeToggle } from './components/ThemeToggle';
import { MonthlyCalendar } from './components/MonthlyCalendar';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

function AppContent() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const stats = [
    { id: 'employees', title: 'Total Employees', value: '547', change: '+12%', positive: true, icon: <Users className="h-6 w-6 text-blue-500 dark:text-blue-400" /> },
    { id: 'gross', title: 'Gross Salary', value: '₹12,876.50', change: '-0.8%', positive: false, icon: <DollarSign className="h-6 w-6 text-purple-500 dark:text-purple-400" /> },
    { id: 'net', title: 'Net Pay', value: '₹10,743.89', change: '+11%', positive: true, icon: <DollarSign className="h-6 w-6 text-green-500 dark:text-green-400" /> },
    { id: 'deduction', title: 'Deduction Amount', value: '₹2,317.85', change: '-0.9%', positive: false, icon: <DollarSign className="h-6 w-6 text-red-500 dark:text-red-400" /> },
  ];

  const handleNavigation = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    
    switch (page) {
      case 'dashboard':
        navigate('/');
        break;
      case 'employees':
        navigate('/employees');
        break;
      case 'letters':
        navigate('/letters');
        break;
      case 'payroll':
        navigate('/payroll');
        break;
      case 'company':
        navigate('/company');
        break;
      case 'approvals':
        navigate('/approvals');
        break;
      default:
        navigate('/');
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const renderDashboard = () => (
    <main className="max-w-[1600px] mx-auto p-4 sm:p-6">
      {/* Header Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            ₹12,876.50
          </h1>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-primary">+16%</span>
            <span className="text-gray-500 dark:text-gray-400">{format(selectedDate, 'MMMM yyyy')}</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <button 
            className="glass-card px-4 py-2.5 rounded-xl flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
            onClick={() => setShowCalendar(true)}
          >
            <Calendar className="h-4 w-4" />
            <span>Select Month</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.id} {...stat} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LeaveBreakdownCard />
          <FoodConsumptionCard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AllowancesBreakdownCard />
          <OvertimeCard />
        </div>
      </div>

      {/* Monthly Calendar */}
      <MonthlyCalendar 
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        onSelectDate={handleDateSelect}
        selectedDate={selectedDate}
      />
    </main>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-2.5 rounded-xl shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                CloudexPayroll
              </span>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              ) : (
                <Menu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <NavItem 
                icon={<LayoutDashboard />} 
                text="Dashboard" 
                active={activePage === 'dashboard'} 
                onClick={() => handleNavigation('dashboard')}
              />
              <NavItem 
                icon={<Users />} 
                text="Employees" 
                active={activePage === 'employees'} 
                onClick={() => handleNavigation('employees')}
              />
              <NavItem 
                icon={<Mail />} 
                text="Letters" 
                active={activePage === 'letters'} 
                onClick={() => handleNavigation('letters')}
              />
              <NavItem 
                icon={<DollarSign />} 
                text="Payroll" 
                active={activePage === 'payroll'}
                onClick={() => handleNavigation('payroll')}
              />
              <NavItem 
                icon={<Building2 />} 
                text="Company" 
                active={activePage === 'company'} 
                onClick={() => handleNavigation('company')}
              />
              <NavItem 
                icon={<BadgeCheck />} 
                text="Approvals" 
                active={activePage === 'approvals'} 
                onClick={() => handleNavigation('approvals')}
              />
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-100 dark:bg-gray-800/50 rounded-full pl-10 pr-4 py-2 text-sm w-64
                           focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white dark:focus:bg-gray-800
                           transition-all duration-300 text-gray-900 dark:text-gray-100"
                />
              </div>
              <ThemeToggle />
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
                <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
                <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
                <UserCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="lg:hidden mt-4 border-t border-gray-200 dark:border-gray-700/50 pt-4 space-y-2">
              <NavItem 
                icon={<LayoutDashboard />} 
                text="Dashboard" 
                active={activePage === 'dashboard'} 
                onClick={() => handleNavigation('dashboard')}
              />
              <NavItem 
                icon={<Users />} 
                text="Employees" 
                active={activePage === 'employees'} 
                onClick={() => handleNavigation('employees')}
              />
              <NavItem 
                icon={<Mail />} 
                text="Letters" 
                active={activePage === 'letters'} 
                onClick={() => handleNavigation('letters')}
              />
              <NavItem 
                icon={<DollarSign />} 
                text="Payroll" 
                active={activePage === 'payroll'}
                onClick={() => handleNavigation('payroll')}
              />
              <NavItem 
                icon={<Building2 />} 
                text="Company" 
                active={activePage === 'company'} 
                onClick={() => handleNavigation('company')}
              />
              <NavItem 
                icon={<BadgeCheck />} 
                text="Approvals" 
                active={activePage === 'approvals'} 
                onClick={() => handleNavigation('approvals')}
              />

              {/* Mobile Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700/50">
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
                    <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
                    <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
                    <UserCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <Routes>
        <Route path="/" element={renderDashboard()} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/letters" element={<Letters />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/company" element={<Company />} />
        <Route path="/approvals" element={<Approvals />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;