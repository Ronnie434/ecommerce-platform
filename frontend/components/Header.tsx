import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/router';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/admin', label: 'Admin' },
];

const Header: React.FC = () => {
  const { items } = useCart();
  const router = useRouter();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md w-full">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-2xl font-bold text-blue-700 tracking-tight">Shopster</Link>
          <div className="hidden md:flex space-x-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-gray-700 hover:text-blue-600 font-medium px-2 py-1 rounded transition ${router.pathname === link.href ? 'bg-blue-50' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative group">
            <svg className="w-7 h-7 text-gray-700 group-hover:text-blue-600 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 0 0 7.48 19h9.04a2 2 0 0 0 1.83-1.3L21 13M7 13V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v7" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow">{cartCount}</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header; 