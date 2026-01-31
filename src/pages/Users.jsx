import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { queryData } from '../utils/dataManager';
import { Search, UserPlus, Shield, Circle, Trash2, X, Edit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Users = () => {
    const { users, addUser, deleteUser, updateUserInfo } = useStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Customer',
        status: 'Active'
    });

    const filteredUsers = useMemo(() => {
        return queryData(users, {
            search: searchTerm
        });
    }, [searchTerm, users]);

    const resetForm = () => {
        setFormData({ name: '', email: '', role: 'Customer', status: 'Active' });
        setCurrentUser(null);
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        addUser(formData);
        setIsAddModalOpen(false);
        resetForm();
    };

    const handleEditUser = (e) => {
        e.preventDefault();
        updateUserInfo(currentUser.id, formData);
        setIsEditModalOpen(false);
        resetForm();
    };

    const openEditModal = (user) => {
        setCurrentUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        });
        setIsEditModalOpen(true);
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Manage administrator and customer accounts</p>
                </div>
                <button
                    onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                    className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 md:py-2 rounded-xl transition-colors shadow-lg shadow-brand-200"
                >
                    <UserPlus size={18} />
                    <span className="text-sm md:text-base">Add User</span>
                </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="p-3 md:p-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-brand-500 text-gray-900 dark:text-white transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            <AnimatePresence mode='popLayout'>
                                {filteredUsers.map((user) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        layout
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 flex items-center justify-center font-bold text-xs ring-4 ring-brand-50 dark:ring-brand-900/10">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                {user.role === 'Admin' ? <Shield size={14} className="text-brand-500" /> : <Shield size={14} className="text-gray-400" />}
                                                <span className="text-sm">{user.role}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 uppercase text-[10px] font-bold">
                                                <Circle size={8} className={user.status === 'Active' ? 'fill-green-500 text-green-500' : 'fill-gray-300 text-gray-300'} />
                                                <span className={user.status === 'Active' ? 'text-green-600' : 'text-gray-500'}>{user.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">{user.joined}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openEditModal(user)}
                                                    className="p-1.5 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded-lg text-gray-400 hover:text-brand-600 transition-all"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => deleteUser(user.id)}
                                                    className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg text-gray-400 hover:text-red-600 transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Form Modal */}
            <AnimatePresence>
                {(isAddModalOpen || isEditModalOpen) && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); resetForm(); }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 overflow-hidden"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {isEditModalOpen ? 'Edit User' : 'Add New User'}
                                </h2>
                                <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); resetForm(); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={isEditModalOpen ? handleEditUser : handleAddUser} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-brand-500 text-gray-900 dark:text-white"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-brand-500 text-gray-900 dark:text-white"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                                        <select
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-brand-500 text-gray-900 dark:text-white appearance-none"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        >
                                            <option value="Customer">Customer</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                        <select
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-brand-500 text-gray-900 dark:text-white appearance-none"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-2xl transition-all shadow-lg active:scale-[0.98] mt-4"
                                >
                                    {isEditModalOpen ? 'Update User' : 'Add User'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Users;
