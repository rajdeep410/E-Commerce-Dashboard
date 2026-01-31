import React, { useState, useEffect } from 'react';
import { Search, Bell, Mail, ChevronDown, Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

const Header = ({ toggleSidebar, openProfile }) => {
    const { user } = useStore();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.classList.contains('dark') ||
                localStorage.getItem('theme') === 'dark';
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <header className="h-20 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
            {/* Left Section */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0 mr-4">
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-300 shrink-0 transition-colors"
                >
                    <Menu size={22} />
                </button>

                <div className="hidden xs:block min-w-0 overflow-hidden">
                    <h1 className="text-sm sm:text-base md:text-xl font-black text-gray-900 dark:text-white truncate tracking-tight">Hi, {user.name.split(' ')[0]}</h1>
                    <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 truncate font-medium">Have a great day!</p>
                </div>

                <div className="relative flex-1 max-w-md hidden md:block ml-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:text-gray-200 border-none"
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                <div className="flex items-center gap-1 sm:gap-2">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <Search size={20} />
                    </button>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 transition-colors relative"
                    >
                        <AnimatePresence mode="wait">
                            {darkMode ? (
                                <motion.div key="sun" initial={{ opacity: 0, scale: 0.5, rotate: -45 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.5, rotate: 45 }} className="absolute"><Sun size={20} /></motion.div>
                            ) : (
                                <motion.div key="moon" initial={{ opacity: 0, scale: 0.5, rotate: 45 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.5, rotate: -45 }} className="absolute"><Moon size={20} /></motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative transition-colors hidden sm:flex">
                        <Mail size={20} />
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative transition-colors">
                        <Bell size={20} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                    </button>
                </div>

                <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1 hidden xs:block"></div>

                <button
                    className="flex items-center gap-2 pl-1 pr-1 sm:pr-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 min-w-0"
                    onClick={openProfile}
                >
                    <div className="relative shrink-0">
                        <img src={user.avatar} alt="Profile" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-brand-500 transition-all shadow-sm" />
                    </div>
                    <div className="hidden lg:block text-left min-w-0 max-w-[120px]">
                        <p className="text-xs font-bold text-gray-900 dark:text-white truncate leading-tight">{user.name}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{user.role}</p>
                    </div>
                    <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
                </button>
            </div>

            {/* Mobile Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[60] bg-white dark:bg-gray-900 px-4 py-3 flex items-center gap-3 lg:hidden"
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search everything..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-2xl text-sm focus:outline-none dark:text-gray-200 border-none"
                            />
                        </div>
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl text-gray-500 dark:text-gray-400 font-bold text-xs"
                        >
                            Cancel
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
