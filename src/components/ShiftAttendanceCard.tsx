import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Clock3, GripHorizontal, MoreHorizontal } from 'lucide-react';

export function ShiftAttendanceCard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const generateShiftData = () => {
    const departments = [
      'Accounting',
      'Administration',
      'Customer Support',
      'Finance',
      'HR',
      'Sales',
      'IT',
      'Marketing'
    ];

    return departments.map(dept => ({
      department: dept,
      deductionAmount: Math.floor(Math.random() * 1000) + 500,
      netPay: Math.floor(Math.random() * 1500) + 1000,
      incentive: Math.floor(Math.random() * 500) + 200,
      grossSalary: Math.floor(Math.random() * 2000) + 1500,
    }));
  };

  const data = generateShiftData();
  
  return (
    <div className="glass-card rounded-xl w-full h-[calc(100vh-16rem)] relative group">
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Clock3 className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Payroll Summary by Department
              </h3>
              <p className="text-sm text-gray-400">Overview of department-wise salary distribution</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
            <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
              Export
            </button>
            <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
              <MoreHorizontal className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="px-8 py-4 h-[calc(100%-4rem)]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 40, bottom: 40 }}
            barGap={2}
            barCategoryGap={60}
            layout="horizontal"
          >
            <defs>
              <linearGradient id="deductionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity={1}/>
                <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.6}/>
              </linearGradient>
              <linearGradient id="netPayGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34D399" stopOpacity={1}/>
                <stop offset="100%" stopColor="#34D399" stopOpacity={0.6}/>
              </linearGradient>
              <linearGradient id="incentiveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F472B6" stopOpacity={1}/>
                <stop offset="100%" stopColor="#F472B6" stopOpacity={0.6}/>
              </linearGradient>
              <linearGradient id="grossGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1}/>
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.6}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} vertical={false} />
            <XAxis 
              dataKey="department"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={{ stroke: '#374151' }}
              tickLine={{ stroke: '#374151' }}
              angle={-35}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              axisLine={{ stroke: '#374151' }}
              tickLine={{ stroke: '#374151' }}
              tickFormatter={(value) => `$${value}`}
              domain={[0, 'auto']}
              width={80}
            />
            <Tooltip
              cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
              contentStyle={{
                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(75, 85, 99, 0.3)',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                color: '#fff',
                padding: '12px',
              }}
              formatter={(value) => [`$${value}`, '']}
              labelStyle={{ color: '#9CA3AF', marginBottom: '8px' }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '0.5rem',
              }}
              iconType="circle"
              align="center"
              verticalAlign="bottom"
            />
            <Bar
              dataKey="deductionAmount"
              name="Deduction Amount"
              fill="url(#deductionGradient)"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              dataKey="netPay"
              name="Net Pay"
              fill="url(#netPayGradient)"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              dataKey="incentive"
              name="Incentive"
              fill="url(#incentiveGradient)"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              dataKey="grossSalary"
              name="Gross Salary"
              fill="url(#grossGradient)"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}