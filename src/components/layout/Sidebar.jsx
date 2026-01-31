import { LayoutDashboard, ShoppingBag, Rss, MessageSquare, PiggyBank, BarChart3, Settings, Plus, Users, Globe, X, Package, Users2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navItems = [
        { to: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
        { to: "/products", icon: <Package size={20} />, label: "Products" },
        { to: "/users", icon: <Users2 size={20} />, label: "Users" },
        { to: "/orders", icon: <ShoppingBag size={20} />, label: "Order Board" },
        { to: "/feed", icon: <Rss size={20} />, label: "Feed" },
        { to: "/inbox", icon: <MessageSquare size={20} />, label: "Inbox" },
        { to: "/savings", icon: <PiggyBank size={20} />, label: "Savings" },
        { to: "/sales", icon: <BarChart3 size={20} />, label: "Sales" },
    ];

    return (
        <>
            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleSidebar}
                        className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Content */}
            <div className={`
                w-72 sm:w-64 bg-white dark:bg-gray-900 min-h-screen border-r border-gray-100 dark:border-gray-800 flex flex-col p-6 fixed left-0 top-0 transition-all duration-500 ease-spring z-[70]
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Brand */}
                <div className="flex items-center justify-between mb-10 px-2 mt-2">
                    <div className="flex items-center gap-3 group cursor-pointer transition-all duration-300">
                        <svg viewBox="0 0 32 32" className="w-8 h-8 text-blue-500 fill-current shrink-0 transform transition-transform group-hover:scale-110">
                            <path d="M16 2L2 12L7.5 28H24.5L30 12L16 2Z" />
                        </svg>
                        <span className="font-['Outfit'] font-extrabold text-2xl text-gray-900 dark:text-white tracking-tight leading-none">MarketMetrics</span>
                    </div>
                    <button onClick={toggleSidebar} className="lg:hidden p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {/* Overview */}
                <div className="mb-2 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Overview</div>
                <nav className="space-y-1 mb-8">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.to}
                            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                            className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                  ${isActive
                                    ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-medium'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}
                `}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Onboarding Section - mimicking the image */}
                <div className="mb-2 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Onboarding</div>
                <div className="space-y-4 px-2">
                    {/* Fake onboarding items */}
                    <div className="flex gap-4 mb-6">
                        <Users size={16} className="text-gray-400" />
                        <Globe size={16} className="text-gray-400" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
