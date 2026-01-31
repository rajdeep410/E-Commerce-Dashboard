import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import OverallSalesChart from '../components/dashboard/OverallSalesChart';
import SalesReportChart from '../components/dashboard/SalesReportChart';
import RecentOrdersTable from '../components/dashboard/RecentOrdersTable';
import WeeklyTransactionChart from '../components/dashboard/WeeklyTransactionChart';
import CategoryChart from '../components/dashboard/CategoryChart';
import UserGrowthChart from '../components/dashboard/UserGrowthChart';
import { useStore } from '../store/useStore';
import { salesAreaChartData, salesPieData, productCategoryData, userGrowthData } from '../data/mockData';

const Dashboard = () => {
    const { orders, getStats } = useStore();
    const statsData = getStats();

    // In a real app, these would also come from the store or a dynamic API
    const weeklyData = [
        { name: '24 Jan', income: 4000, expense: 2400 },
        { name: '25 Jan', income: 3000, expense: 1398 },
        { name: '26 Jan', income: 2000, expense: 9800 },
        { name: '27 Jan', income: 2780, expense: 3908 },
        { name: '28 Jan', income: 1890, expense: 4800 },
        { name: '29 Jan', income: 2390, expense: 3800 },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {statsData.map((stat, index) => (
                    <StatCard
                        key={stat.title}
                        {...stat}
                        color={index === 1 ? '#10b981' : index === 2 ? '#f59e0b' : '#8b5cf6'}
                    />
                ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <OverallSalesChart data={salesAreaChartData} />
                </div>
                <div className="lg:col-span-1">
                    <SalesReportChart data={salesPieData} />
                </div>
            </div>

            {/* Charts/Table Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RecentOrdersTable orders={orders.slice(0, 5)} />
                </div>
                <div className="lg:col-span-1">
                    <WeeklyTransactionChart data={weeklyData} />
                </div>
            </div>

            {/* Charts Row 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <UserGrowthChart data={userGrowthData} />
                <CategoryChart data={productCategoryData} />
            </div>
        </div>
    );
};

export default Dashboard;
