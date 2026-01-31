import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Search, Bell, Mail, ChevronDown, Moon, Sun, Menu, X, Plus } from 'lucide-react';

const ProfileModal = ({ isOpen, onClose }) => {
    const { user, updateUser } = useStore();
    const [editName, setEditName] = React.useState(user.name);
    const [editRole, setEditRole] = React.useState(user.role);

    React.useEffect(() => {
        setEditName(user.name);
        setEditRole(user.role);
    }, [user, isOpen]);

    const handleUpdate = () => {
        updateUser({ name: editName, role: editRole });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    ></motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-6 sm:p-8 w-full max-w-sm relative shadow-2xl border border-white/20 dark:border-gray-800 overflow-hidden"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Edit Profile</h3>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all text-gray-400 hover:text-gray-900">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-8">
                            <div className="flex flex-col items-center">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-brand-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                    <img src={user.avatar} className="relative w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-2xl" />
                                    <div className="absolute bottom-1 right-1 p-2 bg-brand-600 rounded-full text-white shadow-xl border-4 border-white dark:border-gray-800">
                                        <Plus className="rotate-0" size={16} />
                                    </div>
                                </div>
                                <p className="mt-4 text-[10px] font-black text-brand-600 dark:text-brand-400 uppercase tracking-[0.2em]">{user.role}</p>
                            </div>

                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Account Name</label>
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-brand-500/30 text-sm font-bold focus:ring-4 focus:ring-brand-500/10 dark:text-white outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Role</label>
                                    <input
                                        type="text"
                                        value={editRole}
                                        onChange={(e) => setEditRole(e.target.value)}
                                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-brand-500/30 text-sm font-bold focus:ring-4 focus:ring-brand-500/10 dark:text-white outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-2">
                                <button onClick={onClose} className="flex-1 py-4 text-xs font-black text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Discard</button>
                                <button onClick={handleUpdate} className="flex-2 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-[1.25rem] text-xs font-black shadow-xl shadow-brand-500/20 transition-all active:scale-95">Save Changes</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const Layout = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans transition-colors relative">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-64'}`}>
                {/* Note: pl-64 is applied on lg screens. Sidebar will be overlay on mobile */}
                <Header toggleSidebar={toggleSidebar} openProfile={() => setIsProfileModalOpen(true)} />

                <main className="p-3 sm:p-6 md:p-8 flex-1 overflow-x-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>

                <Footer />
            </div>

            {/* Global Modals rendered at Layout Root to avoid stacking issues */}
            <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
        </div>
    );
};

export default Layout;
