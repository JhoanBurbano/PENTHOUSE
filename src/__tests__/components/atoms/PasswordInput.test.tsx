import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PasswordInput from '@/components/atoms/PasswordInput';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, className }: any) => (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    ),
  },
}));

// Mock hugeicons-react
jest.mock('hugeicons-react', () => ({
  ViewIcon: () => <div data-testid="view-icon">View</div>,
  ViewOffSlashIcon: () => <div data-testid="view-off-icon">Hide</div>,
}));

describe('PasswordInput Component', () => {
  const defaultProps = {
    label: 'Password',
    value: 'test123',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<PasswordInput {...defaultProps} />);
      
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByTestId('view-icon')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      const placeholder = 'Enter password';
      render(<PasswordInput {...defaultProps} placeholder={placeholder} />);
      
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });

    it('renders with required attribute', () => {
      render(<PasswordInput {...defaultProps} required />);
      
      expect(screen.getByLabelText('Password')).toBeRequired();
    });

    it('renders password input by default', () => {
      render(<PasswordInput {...defaultProps} />);
      
      expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
    });
  });

  describe('Interaction', () => {
    it('toggles password visibility when clicking the toggle button', () => {
      render(<PasswordInput {...defaultProps} />);
      
      const input = screen.getByLabelText('Password');
      const toggleButton = screen.getByRole('button');
      
      // Initially password is hidden
      expect(input).toHaveAttribute('type', 'password');
      expect(screen.getByTestId('view-icon')).toBeInTheDocument();
      
      // Show password
      fireEvent.click(toggleButton);
      expect(input).toHaveAttribute('type', 'text');
      expect(screen.getByTestId('view-off-icon')).toBeInTheDocument();
      
      // Hide password again
      fireEvent.click(toggleButton);
      expect(input).toHaveAttribute('type', 'password');
      expect(screen.getByTestId('view-icon')).toBeInTheDocument();
    });

    it('calls onChange when input value changes', () => {
      render(<PasswordInput {...defaultProps} />);
      
      const input = screen.getByLabelText('Password');
      fireEvent.change(input, { target: { value: 'newpassword' } });
      
      expect(defaultProps.onChange).toHaveBeenCalledWith('newpassword');
    });
  });

  describe('Styling', () => {
    it('applies base input styles', () => {
      render(<PasswordInput {...defaultProps} />);
      
      const input = screen.getByLabelText('Password');
      expect(input).toHaveClass(
        'w-full',
        'px-4',
        'py-3',
        'border',
        'border-gray-200',
        'rounded-lg',
        'focus:ring-2',
        'focus:ring-[#9B7B4D]',
        'focus:border-transparent',
        'outline-none',
        'transition-all',
        'pr-12',
        'text-xs',
        'md:text-sm'
      );
    });

    it('applies toggle button styles', () => {
      render(<PasswordInput {...defaultProps} />);
      
      const toggleButton = screen.getByRole('button');
      expect(toggleButton).toHaveClass(
        'absolute',
        'right-3',
        'top-1/2',
        '-translate-y-1/2',
        'text-gray-500',
        'hover:text-gray-700',
        'transition-colors'
      );
    });

    it('applies label styles', () => {
      render(<PasswordInput {...defaultProps} />);
      
      const label = screen.getByText('Password');
      expect(label).toHaveClass(
        'block',
        'text-gray-700',
        'text-sm',
        'font-medium',
        'mb-2'
      );
    });
  });
});
