import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const WeeklyTransactionChart = ({ data }) => {
    return (
        <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 h-full min-h-[320px]">
            <div className="flex justify-between items-start mb-6">
                <h3 className="text-base md:text-lg font-bold text-gray-800 dark:text-white leading-tight">Weekly Transaction<br className="hidden md:block" /> Summary</h3>
                <select className="text-[10px] bg-gray-50 dark:bg-gray-800 border-none rounded-lg py-1 px-2 text-gray-500 dark:text-gray-400 focus:ring-0 cursor-pointer">
                    <option>Last 6 month</option>
                </select>
            </div>

            <div className="h-[200px] md:h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barGap={8}>
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#1f2937' }}
                        />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} tick={{ fill: '#9ca3af' }} />
                        <Bar dataKey="income" fill="#FCAC12" radius={[4, 4, 4, 4]} barSize={6} />
                        <Bar dataKey="expense" fill="#7F3DFF" radius={[4, 4, 4, 4]} barSize={6} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WeeklyTransactionChart;
