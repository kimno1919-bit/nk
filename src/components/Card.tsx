import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  bg?: 'white' | 'warm-sand';
}

export function Card({ children, className = '', bg = 'white' }: CardProps) {
  const bgColor = bg === 'warm-sand' ? 'bg-warm-sand' : 'bg-white';
  return (
    <div className={`rounded-[4px] border border-line-gray p-6 ${bgColor} ${className}`}>
      {children}
    </div>
  );
}
