import React from 'react';
import OverallSalesChart from '../components/dashboard/OverallSalesChart';
import SalesReportChart from '../components/dashboard/SalesReportChart';
import { salesAreaChartData, salesPieData } from '../data/mockData';
import { TrendingUp, Users, DollarSign, CreditCard } from 'lucide-react';

const Sales = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Sales Analytics</h2>
                <div className="flex gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Last updated: Today, 10:30 AM</span>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                    { label: "Total Revenue", val: "₹1.24L", icon: <DollarSign size={18} />, color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
                    { label: "Active Users", val: "45.2K", icon: <Users size={18} />, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
                    { label: "Growth", val: "+24.5%", icon: <TrendingUp size={18} />, color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
                    { label: "Expenses", val: "₹34.2K", icon: <CreditCard size={18} />, color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" },
                ].map((kpi, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center sm:items-center gap-3 md:gap-4 text-center sm:text-left">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 ${kpi.color}`}>
                            {kpi.icon}
                        </div>
                        <div className="min-w-0">
                            <p className="text-gray-500 dark:text-gray-400 text-[10px] md:text-xs font-medium uppercase truncate">{kpi.label}</p>
                            <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-white truncate">{kpi.val}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <OverallSalesChart data={salesAreaChartData} />
                </div>
                <div className="lg:col-span-1">
                    <SalesReportChart data={salesPieData} />
                </div>
            </div>
        </div>
    );
};

export default Sales;
