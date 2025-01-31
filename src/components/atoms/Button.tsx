import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className,
}) => {
  const baseStyles =
  'px-6 py-3 rounded-md font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
const variantStyles =
  variant === 'primary'
    ? 'bg-primary text-white hover:bg-opacity-90 hover:scale-105 focus:ring-primary'
    : 'bg-secondary text-black hover:bg-opacity-90 hover:scale-105 focus:ring-secondary';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
