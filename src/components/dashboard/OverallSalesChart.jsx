import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const OverallSalesChart = ({ data }) => {
    return (
        <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 h-[320px] md:h-[400px]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                <div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800 dark:text-white">Overall Sales <span className="text-gray-400 font-normal ml-2 text-xs md:text-sm">₹57,345.98</span></h3>
                </div>
                <div className="flex gap-1 md:gap-2 text-[10px] md:text-sm bg-gray-50 dark:bg-gray-800 p-1 rounded-xl">
                    {['Day', 'Week', 'Month', 'Year'].map(label => (
                        <button
                            key={label}
                            className={`px-3 py-1.5 rounded-lg transition-all ${label === 'Day' ? 'bg-white dark:bg-gray-700 shadow-sm font-bold text-brand-600 dark:text-brand-300' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-[200px] md:h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#1f2937' }}
                        />
                        <Area type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OverallSalesChart;
