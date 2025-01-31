import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@/components/atoms/Input';

describe('Input Component', () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    label: 'Test Label',
    value: '',
    onChange: mockOnChange,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('Standard Input', () => {
    it('renders with default props', () => {
      render(<Input {...defaultProps} />);
      
      expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('handles different input types', () => {
      const types = ['text', 'number', 'email', 'password', 'tel'] as const;
      
      types.forEach(type => {
        const { unmount } = render(<Input {...defaultProps} type={type} />);
        const input = screen.getByLabelText('Test Label');
        expect(input).toHaveAttribute('type', type);
        unmount();
      });
    });

    it('shows required indicator when required is true', () => {
      render(<Input {...defaultProps} required />);
      
      expect(screen.getByText('*')).toHaveClass('text-red-500');
    });

    it('shows error message when error is provided', () => {
      const errorMessage = 'This field is required';
      render(<Input {...defaultProps} error={errorMessage} />);
      
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toHaveTextContent(errorMessage);
      expect(errorElement).toHaveClass('text-red-500');
    });

    it('applies disabled styles when disabled', () => {
      render(<Input {...defaultProps} disabled />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('bg-gray-100', 'cursor-not-allowed', 'opacity-75');
    });

    it('calls onChange when value changes', () => {
      render(<Input {...defaultProps} />);
      
      const input = screen.getByLabelText('Test Label') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'New Value' } });
      
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      const event = mockOnChange.mock.calls[0][0];
      expect(event.target.value).toBe('New Value');
    });

    it('applies custom className', () => {
      render(<Input {...defaultProps} className="custom-class" />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input).toHaveClass('custom-class');
    });
  });

  describe('Textarea Input', () => {
    const textareaProps = {
      ...defaultProps,
      type: 'textarea' as const,
    };

    it('renders textarea element', () => {
      render(<Input {...textareaProps} />);
      
      const textarea = screen.getByLabelText('Test Label');
      expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('applies default rows when not specified', () => {
      render(<Input {...textareaProps} />);
      
      const textarea = screen.getByLabelText('Test Label');
      expect(textarea).toHaveAttribute('rows', '4');
    });

    it('applies custom rows when specified', () => {
      render(<Input {...textareaProps} rows={6} />);
      
      const textarea = screen.getByLabelText('Test Label');
      expect(textarea).toHaveAttribute('rows', '6');
    });

    it('calls onChange when value changes', () => {
      render(<Input {...textareaProps} />);
      
      const textarea = screen.getByLabelText('Test Label') as HTMLTextAreaElement;
      fireEvent.change(textarea, { target: { value: 'New Content' } });
      
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      const event = mockOnChange.mock.calls[0][0];
      expect(event.target.value).toBe('New Content');
    });
  });

  describe('Styling', () => {
    it('applies base styles to input container', () => {
      render(<Input {...defaultProps} />);
      
      const container = screen.getByLabelText('Test Label').parentElement;
      expect(container).toHaveClass('flex', 'flex-col', 'gap-2');
    });

    it('applies correct label styles', () => {
      render(<Input {...defaultProps} />);
      
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('text-sm', 'font-medium', 'text-gray-700');
    });

    it('applies error styles when error is present', () => {
      render(<Input {...defaultProps} error="Error message" />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input).toHaveClass('border-red-500');
      
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('text-red-500');
    });
  });
});
