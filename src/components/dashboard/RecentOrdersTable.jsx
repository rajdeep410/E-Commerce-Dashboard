import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const statusStyles = {
    Received: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    Shipping: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    Pending: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    Completed: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    Canceled: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
};

const RecentOrdersTable = ({ orders }) => {
    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recent Order</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px] md:min-w-0">
                    <thead>
                        <tr className="text-gray-400 text-[10px] md:text-sm border-b border-gray-50 dark:border-gray-800">
                            <th className="py-3 font-medium pl-2">No</th>
                            <th className="py-3 font-medium">User Name</th>
                            <th className="py-3 font-medium">Order Date</th>
                            <th className="py-3 font-medium">Status</th>
                            <th className="py-3 font-medium">Price</th>
                            <th className="py-3 font-medium">Customers</th>
                            <th className="py-3 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800 group transition-colors">
                                <td className="py-3 md:py-4 pl-2 text-[10px] md:text-sm text-gray-500 dark:text-gray-400 font-bold">{order.id}</td>
                                <td className="py-3 md:py-4">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <span className="font-bold text-gray-900 dark:text-white text-xs md:text-sm whitespace-nowrap">{order.user}</span>
                                        <span className="text-[10px] text-gray-400 hidden lg:inline">{order.orderId}</span>
                                    </div>
                                </td>
                                <td className="py-3 md:py-4 text-[10px] md:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{order.date}</td>
                                <td className="py-3 md:py-4">
                                    <span className={`px-2 md:px-3 py-1 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-wider ${statusStyles[order.status] || 'bg-gray-100 text-gray-600'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-3 md:py-4 text-xs md:text-sm font-black text-gray-900 dark:text-white whitespace-nowrap">{order.price}</td>
                                <td className="py-3 md:py-4 text-[10px] md:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{order.customer}</td>
                                <td className="py-3 md:py-4 text-right">
                                    <button className="text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrdersTable;
