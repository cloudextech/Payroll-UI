import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format, subDays, subWeeks, subMonths } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { GripHorizontal } from 'lucide-react';
import { ChartFilter } from './common/ChartFilter';

export function LeaveBreakdownCard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  
  const generateData = () => {
    switch (viewType) {
      case 'daily':
        return Array.from({ length: 7 }, (_, i) => {
          const date = subDays(selectedDate, i);
          return {
            date: format(date, 'MMM dd'),
            Staff: Math.floor(Math.random() * 5) + 1,
            Operator: Math.floor(Math.random() * 4) + 1,
            Driver: Math.floor(Math.random() * 3) + 1,
          };
        }).reverse();
      
      case 'weekly':
        return Array.from({ length: 4 }, (_, i) => {
          const date = subWeeks(selectedDate, i);
          return {
            date: `Week ${format(date, 'w')}`,
            Staff: Math.floor(Math.random() * 10) + 2,
            Operator: Math.floor(Math.random() * 8) + 2,
            Driver: Math.floor(Math.random() * 6) + 1,
          };
        }).reverse();
      
      case 'monthly':
        return Array.from({ length: 6 }, (_, i) => {
          const date = subMonths(selectedDate, i);
          return {
            date: format(date, 'MMM yyyy'),
            Staff: Math.floor(Math.random() * 20) + 5,
            Operator: Math.floor(Math.random() * 15) + 4,
            Driver: Math.floor(Math.random() * 10) + 3,
          };
        }).reverse();
    }
  };

  const data = generateData();

  const totalLeaves = {
    Staff: data.reduce((acc, curr) => acc + curr.Staff, 0),
    Operator: data.reduce((acc, curr) => acc + curr.Operator, 0),
    Driver: data.reduce((acc, curr) => acc + curr.Driver, 0),
  };

  return (
    <div className="glass-card card-hover rounded-xl p-6 relative group h-[500px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <GripHorizontal className="h-6 w-6 text-purple-500 dark:text-purple-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Leave Breakdown
          </h3>
        </div>
        <div className="flex items-center space-x-4">
          <ChartFilter viewType={viewType} onViewChange={setViewType} />
          <div className="relative z-50">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat={
                viewType === 'daily' ? "MMMM d, yyyy" :
                viewType === 'weekly' ? "MMM d, yyyy" :
                "MMMM yyyy"
              }
              showMonthYearPicker={viewType === 'monthly'}
              className="text-sm w-40 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
          </div>
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="staffGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="operatorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="driverGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-700" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF" 
              tick={{ fill: '#9CA3AF' }}
              axisLine={{ stroke: '#E5E7EB' }}
              className="dark:stroke-gray-700 dark:text-gray-400"
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              axisLine={{ stroke: '#E5E7EB' }}
              className="dark:stroke-gray-700 dark:text-gray-400"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(229, 231, 235, 0.8)',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                color: '#111827',
              }}
              className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '1rem',
              }}
            />
            <Area
              type="monotone"
              dataKey="Staff"
              stackId="1"
              stroke="#8B5CF6"
              fill="url(#staffGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="Operator"
              stackId="1"
              stroke="#3B82F6"
              fill="url(#operatorGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="Driver"
              stackId="1"
              stroke="#10B981"
              fill="url(#driverGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700/50">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center glass-card rounded-lg p-3">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Staff</p>
            <p className="text-xl font-semibold text-purple-500 dark:text-purple-400">{totalLeaves.Staff} days</p>
          </div>
          <div className="text-center glass-card rounded-lg p-3">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Operator</p>
            <p className="text-xl font-semibold text-blue-500 dark:text-blue-400">{totalLeaves.Operator} days</p>
          </div>
          <div className="text-center glass-card rounded-lg p-3">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Driver</p>
            <p className="text-xl font-semibold text-green-500 dark:text-green-400">{totalLeaves.Driver} days</p>
          </div>
        </div>
      </div>
    </div>
  );
}