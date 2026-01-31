import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { queryData } from '../utils/dataManager';
import { Search, Plus, Filter, MoreVertical, Edit, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Products = () => {
    const { products, addProduct, deleteProduct, updateProduct } = useStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    // Form State (used for both add and edit)
    const [formData, setFormData] = useState({
        name: '',
        category: 'Clothing',
        price: '',
        stock: '',
        status: 'In Stock'
    });

    const filteredProducts = useMemo(() => {
        return queryData(products, {
            search: searchTerm,
            filters: selectedCategory ? { category: selectedCategory } : {}
        });
    }, [searchTerm, selectedCategory, products]);

    const categories = ['Clothing', 'Electronics', 'Home', 'Beauty', 'Accessories'];

    const resetForm = () => {
        setFormData({ name: '', category: 'Clothing', price: '', stock: '', status: 'In Stock' });
        setCurrentProduct(null);
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        addProduct({
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock)
        });
        setIsAddModalOpen(false);
        resetForm();
    };

    const handleEditProduct = (e) => {
        e.preventDefault();
        updateProduct(currentProduct.id, {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock)
        });
        setIsEditModalOpen(false);
        resetForm();
    };

    const openEditModal = (product) => {
        setCurrentProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            status: product.status
        });
        setIsEditModalOpen(true);
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Manage your inventory and product listings</p>
                </div>
                <button
                    onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                    className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 md:py-2 rounded-xl transition-colors shadow-lg shadow-brand-200 dark:shadow-none"
                >
                    <Plus size={18} />
                    <span className="text-sm md:text-base">Add Product</span>
                </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="p-3 md:p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-3 md:gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-brand-500 text-gray-900 dark:text-white transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-brand-500 text-gray-900 dark:text-white appearance-none transition-all"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        <button className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            <AnimatePresence>
                                {filteredProducts.map((product) => (
                                    <motion.tr
                                        key={product.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="font-medium text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors">{product.name}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{product.category}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">₹{product.price.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{product.stock}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${product.status === 'In Stock' ? 'bg-green-100 text-green-600 dark:bg-green-900/20' :
                                                product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20' :
                                                    'bg-red-100 text-red-600 dark:bg-red-900/20'
                                                }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openEditModal(product)}
                                                    className="p-1.5 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded-lg text-gray-400 hover:text-brand-600 transition-all"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => deleteProduct(product.id)}
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

            {/* Form Modal (shared for Add and Edit) */}
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
                                    {isEditModalOpen ? 'Edit Product' : 'Add New Product'}
                                </h2>
                                <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); resetForm(); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={isEditModalOpen ? handleEditProduct : handleAddProduct} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-brand-500 text-gray-900 dark:text-white"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                        <select
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-brand-500 text-gray-900 dark:text-white appearance-none"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                        <select
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-brand-500 text-gray-900 dark:text-white appearance-none"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="In Stock">In Stock</option>
                                            <option value="Low Stock">Low Stock</option>
                                            <option value="Out of Stock">Out of Stock</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹)</label>
                                        <input
                                            required
                                            type="number"
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-brand-500 text-gray-900 dark:text-white"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
                                        <input
                                            required
                                            type="number"
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-brand-500 text-gray-900 dark:text-white"
                                            value={formData.stock}
                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-2xl transition-all shadow-lg active:scale-[0.98] mt-4"
                                >
                                    {isEditModalOpen ? 'Update Product' : 'Add Product'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Products;
