import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  bg?: 'white' | 'warm-sand';
}

export function Card({ children, className = '', bg = 'white' }: CardProps) {
  const bgColor = bg === 'warm-sand' ? 'bg-warm-sand' : 'bg-white';
  return (
    <div className={`rounded-[4px] border border-line-gray p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 ${bgColor} ${className}`}>
      {children}
    </div>
  );
}
