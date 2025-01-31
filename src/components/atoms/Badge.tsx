import React from 'react';

interface BadgeProps {
  text: string;
  color?: 'primary' | 'secondary' | 'accent' | 'glass';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ text, color = 'primary', className }) => {
  const colorClasses = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-black ',
    accent: 'bg-accent text-black',
    glass: 'bg-white/60 text-black backdrop-blur-sm rounded-lg',
  };

  return (
    <span
      className={`inline-block px-3 py-1 font-medium text-xs rounded-full ${colorClasses[color]} ${className}`}
    >
      {text}
    </span>
  );
};

export default Badge;
