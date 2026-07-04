import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyle = "inline-flex items-center justify-center rounded-[4px] px-5 py-2.5 font-semibold text-[15px] sm:text-[16px] transition-colors font-sans";
  
  const variants = {
    primary: "bg-terracotta text-white hover:opacity-90",
    secondary: "bg-deep-navy text-white hover:opacity-90",
    tertiary: "bg-transparent text-deep-navy border border-deep-navy hover:bg-paper-cream"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
