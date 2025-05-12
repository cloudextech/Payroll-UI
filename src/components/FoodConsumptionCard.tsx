import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format, subDays, subWeeks, subMonths } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { UtensilsCrossed } from 'lucide-react';
import { ChartFilter } from './common/ChartFilter';

export function FoodConsumptionCard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  
  const generateData = () => {
    switch (viewType) {
      case 'daily':
        return Array.from({ length: 7 }, (_, i) => {
          const date = subDays(selectedDate, i);
          return {
            date: format(date, 'MMM dd'),
            Employees: Math.floor(Math.random() * 100) + 150,
            Employers: Math.floor(Math.random() * 50) + 30,
            Visitors: Math.floor(Math.random() * 30) + 20,
          };
        }).reverse();
      
      case 'weekly':
        return Array.from({ length: 4 }, (_, i) => {
          const date = subWeeks(selectedDate, i);
          return {
            date: `Week ${format(date, 'w')}`,
            Employees: Math.floor(Math.random() * 200) + 300,
            Employers: Math.floor(Math.random() * 100) + 60,
            Visitors: Math.floor(Math.random() * 60) + 40,
          };
        }).reverse();
      
      case 'monthly':
        return Array.from({ length: 6 }, (_, i) => {
          const date = subMonths(selectedDate, i);
          return {
            date: format(date, 'MMM yyyy'),
            Employees: Math.floor(Math.random() * 500) + 800,
            Employers: Math.floor(Math.random() * 200) + 150,
            Visitors: Math.floor(Math.random() * 100) + 80,
          };
        }).reverse();
    }
  };

  const data = generateData();

  const totalConsumption = {
    Employees: data.reduce((acc, curr) => acc + curr.Employees, 0),
    Employers: data.reduce((acc, curr) => acc + curr.Employers, 0),
    Visitors: data.reduce((acc, curr) => acc + curr.Visitors, 0),
  };

  return (
    <div className="glass-card card-hover rounded-xl p-6 relative group h-[500px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <UtensilsCrossed className="h-6 w-6 text-purple-500 dark:text-purple-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Food Consumption
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
          <BarChart
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
            />
            <Tooltip
              cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
              contentStyle={{
                backgroundColor: 'rgb(31, 41, 55, 0.95)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(75, 85, 99, 0.3)',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                color: '#fff',
                padding: '12px',
              }}
              labelStyle={{ color: '#9CA3AF', marginBottom: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '1rem',
              }}
            />
            <Bar 
              dataKey="Employees" 
              fill="#8B5CF6" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="Employers" 
              fill="#3B82F6" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="Visitors" 
              fill="#10B981" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700/50">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center glass-card rounded-lg p-3">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Employees</p>
            <p className="text-xl font-semibold text-purple-500 dark:text-purple-400">
              {totalConsumption.Employees.toLocaleString()} meals
            </p>
          </div>
          <div className="text-center glass-card rounded-lg p-3">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Employers</p>
            <p className="text-xl font-semibold text-blue-500 dark:text-blue-400">
              {totalConsumption.Employers.toLocaleString()} meals
            </p>
          </div>
          <div className="text-center glass-card rounded-lg p-3">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Visitors</p>
            <p className="text-xl font-semibold text-green-500 dark:text-green-400">
              {totalConsumption.Visitors.toLocaleString()} meals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}