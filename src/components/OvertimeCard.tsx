import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format, subDays, subWeeks, subMonths } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Clock } from 'lucide-react';
import { ChartFilter } from './common/ChartFilter';

export function OvertimeCard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  
  const generateData = () => {
    switch (viewType) {
      case 'daily':
        return Array.from({ length: 7 }, (_, i) => {
          const date = subDays(selectedDate, i);
          return {
            date: format(date, 'MMM dd'),
            amount: Math.floor(Math.random() * 15000) + 5000,
            hours: Math.floor(Math.random() * 20) + 10,
          };
        }).reverse();
      
      case 'weekly':
        return Array.from({ length: 4 }, (_, i) => {
          const date = subWeeks(selectedDate, i);
          return {
            date: `Week ${format(date, 'w')}`,
            amount: Math.floor(Math.random() * 50000) + 20000,
            hours: Math.floor(Math.random() * 80) + 40,
          };
        }).reverse();
      
      case 'monthly':
        return Array.from({ length: 6 }, (_, i) => {
          const date = subMonths(selectedDate, i);
          return {
            date: format(date, 'MMM yyyy'),
            amount: Math.floor(Math.random() * 200000) + 80000,
            hours: Math.floor(Math.random() * 320) + 160,
          };
        }).reverse();
    }
  };

  const data = generateData();

  const totalAmount = data.reduce((acc, curr) => acc + curr.amount, 0);
  const totalHours = data.reduce((acc, curr) => acc + curr.hours, 0);
  const averageRate = totalAmount / totalHours;

  const formatCurrency = (value: number) => {
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
          <Clock className="h-6 w-6 text-orange-500 dark:text-orange-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Overtime Analysis
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
              <linearGradient id="overtimeAmountGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="overtimeHoursGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
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
              yAxisId="left"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              axisLine={{ stroke: '#E5E7EB' }}
              className="dark:stroke-gray-700 dark:text-gray-400"
              tickFormatter={(value) => `₹${value/1000}k`}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              axisLine={{ stroke: '#E5E7EB' }}
              className="dark:stroke-gray-700 dark:text-gray-400"
              tickFormatter={(value) => `${value}h`}
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
              formatter={(value, name) => [
                name === 'amount' ? formatCurrency(value) : `${value} hours`,
                name === 'amount' ? 'Amount' : 'Hours'
              ]}
              className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '1rem',
              }}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="amount"
              name="Amount"
              stroke="#F97316"
              fill="url(#overtimeAmountGradient)"
              strokeWidth={2}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="hours"
              name="Hours"
              stroke="#8B5CF6"
              fill="url(#overtimeHoursGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700/50">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center glass-card rounded-lg p-3">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Amount</p>
            <p className="text-xl font-semibold text-orange-500 dark:text-orange-400">
              {formatCurrency(totalAmount)}
            </p>
          </div>
          <div className="text-center glass-card rounded-lg p-3">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Hours</p>
            <p className="text-xl font-semibold text-purple-500 dark:text-purple-400">
              {totalHours} hours
            </p>
          </div>
          <div className="text-center glass-card rounded-lg p-3">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Average Rate</p>
            <p className="text-xl font-semibold text-blue-500 dark:text-blue-400">
              {formatCurrency(averageRate)}/h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}