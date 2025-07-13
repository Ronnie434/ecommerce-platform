import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title }) => (
  <div className={`bg-white border border-gray-200 rounded-xl shadow-lg p-6 transition-transform hover:scale-105 hover:shadow-2xl ${className}`}>
    {title && <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>}
    {children}
  </div>
);

export default Card; 