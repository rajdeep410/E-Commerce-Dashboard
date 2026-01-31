import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const SalesReportChart = ({ data }) => {
    return (
        <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 h-[320px] md:h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-base md:text-lg font-bold text-gray-800 dark:text-white">Sales Report</h3>
                <select className="text-xs bg-gray-50 dark:bg-gray-800 border-none rounded-lg py-1 px-2 text-gray-500 dark:text-gray-400 focus:ring-0 cursor-pointer">
                    <option>Month</option>
                </select>
            </div>

            <div className="flex-1 relative min-h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius="65%"
                            outerRadius="85%"
                            paddingAngle={8}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-none">₹45k</span>
                    <span className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">Total</span>
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
                {data.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SalesReportChart;
