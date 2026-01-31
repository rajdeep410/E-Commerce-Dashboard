import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import OrderBoard from './pages/OrderBoard';
import Feed from './pages/Feed';
import Inbox from './pages/Inbox';
import Savings from './pages/Savings';
import Sales from './pages/Sales';
import Products from './pages/Products';
import Users from './pages/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<OrderBoard />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="feed" element={<Feed />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="savings" element={<Savings />} />
          <Route path="sales" element={<Sales />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
