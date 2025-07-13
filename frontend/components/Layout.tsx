import React from 'react';
import Header from './Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <Header />
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">{children}</main>
    <footer className="w-full bg-white border-t py-6 mt-8 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between">
        <span className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Shopster. All rights reserved.</span>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="/products" className="text-gray-400 hover:text-blue-600 transition">Products</a>
          <a href="/cart" className="text-gray-400 hover:text-blue-600 transition">Cart</a>
          <a href="/admin" className="text-gray-400 hover:text-blue-600 transition">Admin</a>
        </div>
      </div>
    </footer>
  </div>
);

export default Layout; 