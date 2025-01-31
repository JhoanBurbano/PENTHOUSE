import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/atoms/Button';

describe('Button Component', () => {
  const mockOnClick = jest.fn();
  const defaultProps = {
    label: 'Test Button',
  };

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByRole('button', { name: defaultProps.label });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
    });

    it('renders with different button types', () => {
      const types = ['button', 'submit', 'reset'] as const;
      
      types.forEach(type => {
        const { unmount } = render(<Button {...defaultProps} type={type} />);
        const button = screen.getByRole('button', { name: defaultProps.label });
        expect(button).toHaveAttribute('type', type);
        unmount();
      });
    });
  });

  describe('Interaction', () => {
    it('handles click events when enabled', () => {
      render(<Button {...defaultProps} onClick={mockOnClick} />);
      const button = screen.getByRole('button', { name: defaultProps.label });
      
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('does not trigger onClick when disabled', () => {
      render(<Button {...defaultProps} onClick={mockOnClick} disabled />);
      const button = screen.getByRole('button', { name: defaultProps.label });
      
      fireEvent.click(button);
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe('Styling', () => {
    it('applies base styles to all variants', () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByRole('button', { name: defaultProps.label });
      
      expect(button).toHaveClass(
        'px-6',
        'py-3',
        'rounded-md',
        'font-semibold',
        'transition-all',
        'duration-300',
        'ease-in-out',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2'
      );
    });

    it('applies primary variant styles correctly', () => {
      render(<Button {...defaultProps} variant="primary" />);
      const button = screen.getByRole('button', { name: defaultProps.label });
      
      expect(button).toHaveClass(
        'bg-primary',
        'text-white',
        'hover:bg-opacity-90',
        'hover:scale-105',
        'focus:ring-primary'
      );
    });

    it('applies secondary variant styles correctly', () => {
      render(<Button {...defaultProps} variant="secondary" />);
      const button = screen.getByRole('button', { name: defaultProps.label });
      
      expect(button).toHaveClass(
        'bg-secondary',
        'text-black',
        'hover:bg-opacity-90',
        'hover:scale-105',
        'focus:ring-secondary'
      );
    });

    it('applies disabled styles correctly', () => {
      render(<Button {...defaultProps} disabled />);
      const button = screen.getByRole('button', { name: defaultProps.label });
      
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('applies custom className without overriding component classes', () => {
      const customClass = 'custom-class';
      render(<Button {...defaultProps} className={customClass} />);
      const button = screen.getByRole('button', { name: defaultProps.label });
      
      expect(button).toHaveClass(customClass);
      // Verify that base styles are still present
      expect(button).toHaveClass('px-6', 'py-3', 'rounded-md');
    });
  });
});
