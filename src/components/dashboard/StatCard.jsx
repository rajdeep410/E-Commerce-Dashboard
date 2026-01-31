import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, change, isPositive, data, color }) => {
    const chartData = data.map((val, i) => ({ value: val, i }));
    const strokeColor = color || (isPositive ? '#8b5cf6' : '#f59e0b');

    return (
        <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between min-h-[160px] md:h-[180px] group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col min-w-0">
                    <span className="text-gray-500 dark:text-gray-400 text-[10px] md:text-sm font-medium mb-1 truncate uppercase tracking-wider">{title}</span>
                    <span className="text-xl md:text-2xl font-black text-gray-900 dark:text-white truncate">{value}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 shrink-0"><MoreHorizontal size={18} /></button>
            </div>

            <div className="flex items-end justify-between h-full gap-2 overflow-hidden">
                <div className={`flex items-center gap-1 text-[10px] sm:text-xs md:text-sm font-bold shrink-0 ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                    {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    <span className="truncate">{change}</span>
                    <span className="text-gray-400 font-normal hidden sm:inline">from week</span>
                </div>

                <div className="w-24 h-16">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={strokeColor}
                                fill={`url(#color-${title})`}
                                strokeWidth={2}
                                dot={false}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
