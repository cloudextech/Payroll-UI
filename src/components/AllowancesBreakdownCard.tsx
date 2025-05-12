import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format, subDays, subWeeks, subMonths } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Wallet } from 'lucide-react';
import { ChartFilter } from './common/ChartFilter';

export function AllowancesBreakdownCard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  
  const generateData = () => {
    switch (viewType) {
      case 'daily':
        return Array.from({ length: 7 }, (_, i) => {
          const date = subDays(selectedDate, i);
          return {
            date: format(date, 'MMM dd'),
            conveyance: Math.floor(Math.random() * 500) + 1000,
            special: Math.floor(Math.random() * 800) + 1500,
            nightShift: Math.floor(Math.random() * 600) + 800,
            attendance: Math.floor(Math.random() * 300) + 500,
          };
        }).reverse();
      
      case 'weekly':
        return Array.from({ length: 4 }, (_, i) => {
          const date = subWeeks(selectedDate, i);
          return {
            date: `Week ${format(date, 'w')}`,
            conveyance: Math.floor(Math.random() * 2000) + 4000,
            special: Math.floor(Math.random() * 3000) + 6000,
            nightShift: Math.floor(Math.random() * 2500) + 3500,
            attendance: Math.floor(Math.random() * 1500) + 2000,
          };
        }).reverse();
      
      case 'monthly':
        return Array.from({ length: 6 }, (_, i) => {
          const date = subMonths(selectedDate, i);
          return {
            date: format(date, 'MMM yyyy'),
            conveyance: Math.floor(Math.random() * 5000) + 10000,
            special: Math.floor(Math.random() * 8000) + 15000,
            nightShift: Math.floor(Math.random() * 6000) + 8000,
            attendance: Math.floor(Math.random() * 3000) + 5000,
          };
        }).reverse();
    }
  };

  const data = generateData();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="glass-card card-hover rounded-xl p-6 relative group h-[500px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Wallet className="h-6 w-6 text-purple-500 dark:text-purple-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Allowances Breakdown
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
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
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
              tickFormatter={formatCurrency}
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
              formatter={(value) => [formatCurrency(value), '']}
              className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '1rem',
              }}
            />
            <Line
              type="monotone"
              dataKey="conveyance"
              name="Conveyance"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ fill: '#8B5CF6', r: 4 }}
              activeDot={{ r: 6, fill: '#8B5CF6' }}
            />
            <Line
              type="monotone"
              dataKey="special"
              name="Special"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6', r: 4 }}
              activeDot={{ r: 6, fill: '#3B82F6' }}
            />
            <Line
              type="monotone"
              dataKey="nightShift"
              name="Night Shift"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981', r: 4 }}
              activeDot={{ r: 6, fill: '#10B981' }}
            />
            <Line
              type="monotone"
              dataKey="attendance"
              name="Attendance"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={{ fill: '#F59E0B', r: 4 }}
              activeDot={{ r: 6, fill: '#F59E0B' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700/50">
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(data[data.length - 1])
            .filter(([key]) => key !== 'date')
            .map(([key, value]) => (
              <div key={key} className="text-center glass-card rounded-lg p-3">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className={`text-xl font-semibold ${
                  key === 'conveyance' ? 'text-purple-500 dark:text-purple-400' :
                  key === 'special' ? 'text-blue-500 dark:text-blue-400' :
                  key === 'nightShift' ? 'text-green-500 dark:text-green-400' :
                  'text-amber-500 dark:text-amber-400'
                }`}>
                  {formatCurrency(value)}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}