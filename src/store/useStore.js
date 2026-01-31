import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
    persist(
        (set, get) => ({
            // --- User Profile ---
            user: {
                name: "Rajdeep Chandravanshi",
                role: "Product Designer",
                email: "rajdeep@example.com",
                avatar: "mypic.jpeg",
            },
            updateUser: (newUserData) => set((state) => ({ user: { ...state.user, ...newUserData } })),

            // --- Orders ---
            orders: [
                { id: "01", orderId: "#456645", user: "Kurta Set", status: "Received", price: "₹1,300", customer: "Priya Sharma", date: "Jan 24, 2024", location: "Delhi, IN" },
                { id: "02", orderId: "#456646", user: "Cotton Saree", status: "Shipping", price: "₹2,500", customer: "Rahul Verma", date: "Jan 24, 2024", location: "Mumbai, IN" },
                { id: "03", orderId: "#456647", user: "Denim Jeans", status: "Pending", price: "₹1,800", customer: "Anjali Gupta", date: "Jan 24, 2024", location: "Bangalore, IN" },
                { id: "04", orderId: "#456648", user: "Silk Kurta", status: "Canceled", price: "₹2,500", customer: "Arjun Singh", date: "Jan 12, 2024", location: "Pune, IN" },
                { id: "05", orderId: "#456649", user: "Nehru Jacket", status: "Completed", price: "₹4,200", customer: "Meera Iyer", date: "Jan 14, 2024", location: "Chennai, IN" },
                { id: "06", orderId: "#456650", user: "Nike Sneakers", status: "Shipping", price: "₹8,500", customer: "Rajesh Koothrappali", date: "Jan 15, 2024", location: "Kolkata, IN" },
            ],
            addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
            updateOrderStatus: (id, status) => set((state) => ({
                orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o))
            })),

            // --- Messages ---
            contacts: [
                { id: 1, name: "Aarav Patel", time: "02:15", msg: "Hi! Payment sent via UPI...", avatar: "https://i.pravatar.cc/150?u=12", online: true },
                { id: 2, name: "Diya Gupta", time: "Jan 12", msg: "Will transfer the amount by evening...", avatar: "https://i.pravatar.cc/150?u=13", online: false },
                { id: 3, name: "Vikram Singh", time: "Jan 12", msg: "Thanks for the discount!", avatar: "https://i.pravatar.cc/150?u=14", online: true },
            ],
            messages: {
                1: [
                    { id: 1, text: "Namaste! Have you dispatched the order?", sender: "them", time: "09:00 AM" },
                    { id: 2, text: "Yes, it was shipped via Bluedart this morning.", sender: "me", time: "09:05 AM" },
                ],
                2: [],
                3: [],
            },
            sendMessage: (contactId, text) => set((state) => {
                const newMessage = {
                    id: Date.now(),
                    text,
                    sender: "me",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                const updatedMessages = {
                    ...state.messages,
                    [contactId]: [...(state.messages[contactId] || []), newMessage]
                };
                return { messages: updatedMessages };
            }),
            addContact: (contact) => set((state) => ({ contacts: [contact, ...state.contacts] })),

            // --- Activity Feed ---
            feeds: [
                { id: 1, user: "Omeya Fashion", avatar: "https://i.pravatar.cc/150?u=1", time: "2 hours ago", content: "Diwali Collection is live now! 🪔 Check out our latest ethnic wear range. #DiwaliVibes #EthnicWear", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80", likes: 245, comments: 50 },
                { id: 2, user: "Amit Shah", avatar: "https://i.pravatar.cc/150?u=2", time: "4 hours ago", content: "Reached 5000 sales across India! Thanks for the support. 🇮🇳 🚀", likes: 1256, comments: 123 },
            ],
            addFeed: (post) => set((state) => ({ feeds: [post, ...state.feeds] })),
            likeFeed: (id) => set((state) => ({
                feeds: state.feeds.map((f) => (f.id === id ? { ...f, likes: f.likes + 1 } : f))
            })),

            // --- Savings & Goals ---
            savings: {
                total: 12450.00,
                goals: [
                    { id: 1, title: "New MacBook Pro", target: 250000, current: 162500, color: "red", icon: "Target" },
                    { id: 2, title: "Office Renovation", target: 1000000, current: 120000, color: "green", icon: "PiggyBank" },
                ],
            },
            addGoal: (goal) => set((state) => ({
                savings: { ...state.savings, goals: [...state.savings.goals, goal] }
            })),
            updateGoalProgress: (id, amount) => set((state) => ({
                savings: {
                    ...state.savings,
                    goals: state.savings.goals.map((g) => (g.id === id ? { ...g, current: g.current + amount } : g))
                }
            })),

            // --- Products ---
            products: [
                { id: 1, name: "Premium Kurta", category: "Clothing", price: 2500, stock: 45, status: "In Stock" },
                { id: 2, name: "Silk Saree", category: "Clothing", price: 5000, stock: 12, status: "Low Stock" },
                { id: 3, name: "Slim Fit Jeans", category: "Clothing", price: 1800, stock: 80, status: "In Stock" },
                { id: 4, name: "iPhone 15 Pro", category: "Electronics", price: 120000, stock: 5, status: "Low Stock" },
                { id: 5, name: "Bluetooth Speaker", category: "Electronics", price: 3500, stock: 25, status: "In Stock" },
                { id: 6, name: "Cotton BedSheet", category: "Home", price: 1200, stock: 100, status: "In Stock" },
                { id: 7, name: "Face Serum", category: "Beauty", price: 800, stock: 150, status: "In Stock" },
                { id: 8, name: "Laptop Bag", category: "Accessories", price: 1500, stock: 0, status: "Out of Stock" },
            ],
            addProduct: (product) => set((state) => ({ products: [{ ...product, id: Date.now() }, ...state.products] })),
            deleteProduct: (id) => set((state) => ({ products: state.products.filter(p => p.id !== id) })),
            updateProduct: (id, data) => set((state) => ({
                products: state.products.map(p => p.id === id ? { ...p, ...data } : p)
            })),

            // --- Users ---
            users: [
                { id: 1, name: "Priya Sharma", email: "priya@example.com", role: "Customer", status: "Active", joined: "Jan 2024" },
                { id: 2, name: "Rahul Verma", email: "rahul@example.com", role: "Admin", status: "Active", joined: "Dec 2023" },
                { id: 3, name: "Anjali Gupta", email: "anjali@example.com", role: "Customer", status: "Active", joined: "Feb 2024" },
                { id: 4, name: "Vikram Singh", email: "vikram@example.com", role: "Customer", status: "Inactive", joined: "Mar 2024" },
                { id: 5, name: "Nisha Patel", email: "nisha@example.com", role: "Customer", status: "Active", joined: "Apr 2024" },
            ],
            addUser: (user) => set((state) => ({ users: [{ ...user, id: Date.now(), joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }, ...state.users] })),
            deleteUser: (id) => set((state) => ({ users: state.users.filter(u => u.id !== id) })),
            updateUserInfo: (id, data) => set((state) => ({
                users: state.users.map(u => u.id === id ? { ...u, ...data } : u)
            })),

            // --- Analytics Data (Simulated stats based on orders and products) ---
            getStats: () => {
                const orders = get().orders;
                const products = get().products;
                const revenue = orders.reduce((acc, current) => {
                    if (current.status === 'Canceled') return acc;
                    const price = parseInt(current.price.replace(/[^\d]/g, ''));
                    return acc + price;
                }, 0);

                const totalStock = products.reduce((acc, p) => acc + p.stock, 0);

                return [
                    { title: "Net Net Income", value: `₹${revenue.toLocaleString()}`, change: "+0.5%", isPositive: true, data: [40, 30, 45, 60, 55, 65, 50] },
                    { title: "Total Order", value: orders.length.toString(), change: "+1.5%", isPositive: true, data: [20, 30, 25, 40, 35, 50, 45] },
                    { title: "In Stock Products", value: totalStock.toString(), change: "+2.5%", isPositive: true, data: [30, 40, 35, 50, 45, 60, 55] },
                ];
            }
        }),
        {
            name: 'ecommerce-storage',
        }
    )
);
