import React, { useState } from 'react';
import { Search, MoreHorizontal, Filter, Calendar, Download } from 'lucide-react';
import { useStore } from '../store/useStore';

const statusStyles = {
    Received: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    Shipping: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    Pending: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    Completed: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    Canceled: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
};

const OrderBoard = () => {
    const { orders, updateOrderStatus } = useStore();
    const [activeTab, setActiveTab] = useState('All Orders');
    const [searchTerm, setSearchTerm] = useState('');

    const tabs = ['All Orders', 'Drafts', 'Shipping', 'Completed', 'Canceled'];

    const filteredOrders = orders.filter(order => {
        const matchesTab = activeTab === 'All Orders' || order.status === activeTab;
        const matchesSearch =
            order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.orderId.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Header & Tabs */}
            <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">Orders - List</h2>
                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Manage and track your store orders</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500"><Search size={18} /></button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500"><MoreHorizontal size={18} /></button>
                    </div>
                </div>

                <div className="flex overflow-x-auto no-scrollbar gap-4 md:gap-6 border-b border-gray-100 dark:border-gray-800">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 px-2 text-xs md:text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === tab ? 'text-brand-600 dark:text-brand-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-600 dark:bg-brand-500 rounded-t-full"></span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center mt-6 gap-4">
                    <div className="relative w-full lg:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by ID, product, or customer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-white"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 md:gap-3">
                        <button className="flex-1 sm:flex-none px-3 md:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <Filter size={14} /> Filters
                        </button>
                        <button className="flex-1 sm:flex-none px-3 md:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">
                            <Calendar size={14} /> April 11 - 24
                        </button>
                        <button className="flex-1 sm:flex-none px-3 md:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <Download size={14} /> Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-50 dark:border-gray-800">
                                <th className="py-4 pl-4 font-medium w-10"><input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-brand-600 focus:ring-brand-500 dark:bg-gray-800" /></th>
                                <th className="py-4 font-medium">Transaction ID</th>
                                <th className="py-4 font-medium">Date</th>
                                <th className="py-4 font-medium">From</th>
                                <th className="py-4 font-medium">To</th>
                                <th className="py-4 font-medium">Amount</th>
                                <th className="py-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order, idx) => (
                                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 group transition-colors">
                                        <td className="py-3 md:py-4 pl-4"><input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-brand-600 focus:ring-brand-500 dark:bg-gray-800" /></td>
                                        <td className="py-3 md:py-4">
                                            <div className="flex items-center gap-2 md:gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-[10px] md:text-xs shrink-0">
                                                    📦
                                                </div>
                                                <span className="font-bold text-gray-900 dark:text-white text-xs md:text-sm whitespace-nowrap">{order.orderId}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 md:py-4 text-[10px] md:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{order.date}</td>
                                        <td className="py-3 md:py-4 text-xs md:text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">{order.customer}</td>
                                        <td className="py-3 md:py-4 text-[10px] md:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{order.location || 'N/A'}</td>
                                        <td className="py-3 md:py-4 text-xs md:text-sm font-black text-gray-900 dark:text-white whitespace-nowrap">{order.price}</td>
                                        <td className="py-3 md:py-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                className={`px-2 md:px-3 py-1 rounded-lg text-[10px] md:text-xs font-black border-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer ${statusStyles[order.status] || 'bg-gray-100 text-gray-600'}`}
                                            >
                                                {Object.keys(statusStyles).map(status => (
                                                    <option key={status} value={status} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                                                        {status.toUpperCase()}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="py-8 text-center text-gray-500">No orders found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-wrap justify-between items-center mt-6 gap-4 text-[10px] md:text-sm text-gray-500 dark:text-gray-400">
                    <span className="hidden sm:inline">Showing {filteredOrders.length} entries</span>
                    <div className="flex gap-1.5 md:gap-2 mx-auto sm:mx-0">
                        <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50">&lt;</button>
                        <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg bg-brand-600 text-white font-bold">1</button>
                        <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold">2</button>
                        <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderBoard;
