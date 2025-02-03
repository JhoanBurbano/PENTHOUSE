import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@/components/atoms/Input';

describe('Input Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('Standard Input', () => {
    it('renders with default props', () => {
      render(<Input label="Test Label" value="" onChange={mockOnChange} />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveClass('w-full', 'px-4', 'py-3', 'border');
    });

    it('handles different input types', () => {
      const types = ['text', 'number', 'email', 'password', 'tel'] as const;
      
      types.forEach(type => {
        const { unmount } = render(<Input label="Test Label" type={type} value="" onChange={mockOnChange} />);
        const input = screen.getByLabelText('Test Label');
        expect(input).toHaveAttribute('type', type);
        unmount();
      });
    });

    it('shows required indicator when required is true', () => {
      render(<Input label="Test Label" value="" onChange={mockOnChange} required />);
      
      const requiredIndicator = screen.getByText('*');
      expect(requiredIndicator).toHaveClass('text-red-500');
    });

    it('shows error message when error is provided', () => {
      const errorMessage = 'This field is required';
      render(<Input label="Test Label" value="" onChange={mockOnChange} error={errorMessage} />);
      
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toHaveTextContent(errorMessage);
      expect(errorElement).toHaveClass('text-red-500');
    });

    it('applies disabled styles when disabled', () => {
      render(<Input label="Test Label" value="" onChange={mockOnChange} disabled />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input).toHaveClass('bg-gray-100', 'cursor-not-allowed', 'opacity-75');
    });

    it('handles onChange events correctly', () => {
      const testValue = 'test value';
      let currentValue = '';
      
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        currentValue = e.target.value;
        mockOnChange(e);
      };

      const { rerender } = render(
        <Input 
          label="Test Label" 
          value={currentValue} 
          onChange={handleChange}
        />
        
      );
      
      const input = screen.getByLabelText('Test Label') as HTMLInputElement;
      fireEvent.change(input, { target: { value: testValue } });
      
      // Re-render con el nuevo valor
      rerender(
        <Input 
          label="Test Label" 
          value={currentValue} 
          onChange={handleChange}
        />
      );
      
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(input.value).toBe(testValue);
    });

    it('applies custom className', () => {
      render(<Input label="Test Label" value="" onChange={mockOnChange} className="custom-class" />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input).toHaveClass('custom-class');
    });
  });

  describe('Textarea Input', () => {
    const textareaProps = {
      type: 'textarea' as const,
      rows: 4,
    };

    it('renders textarea when type is textarea', () => {
      render(<Input label="Test Label" {...textareaProps} value="" onChange={mockOnChange} />);
      
      const textarea = screen.getByLabelText('Test Label');
      expect(textarea.tagName.toLowerCase()).toBe('textarea');
      expect(textarea).toHaveAttribute('rows', '4');
    });

    it('handles onChange events in textarea', () => {
      const testValue = 'test value';
      let currentValue = '';
      
      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        currentValue = e.target.value;
        mockOnChange(e);
      };

      const { rerender } = render(
        <Input 
          label="Test Label" 
          {...textareaProps}
          value={currentValue} 
          onChange={handleChange}
        />
      );
      
      const textarea = screen.getByLabelText('Test Label') as HTMLTextAreaElement;
      fireEvent.change(textarea, { target: { value: testValue } });
      
      // Re-render con el nuevo valor
      rerender(
        <Input 
          label="Test Label" 
          {...textareaProps}
          value={currentValue} 
          onChange={handleChange}
        />
      );
      
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(textarea.value).toBe(testValue);
    });
  });

  describe('Styling', () => {
    it('applies base styles to input container', () => {
      render(<Input label="Test Label" value="" onChange={mockOnChange} />);
      
      const container = screen.getByLabelText('Test Label').parentElement;
      expect(container).toHaveClass('flex', 'flex-col', 'gap-2');
    });

    it('applies correct label styles', () => {
      render(<Input label="Test Label" value="" onChange={mockOnChange} />);
      
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('text-sm', 'font-medium', 'text-gray-700');
    });

    it('applies error styles when error is present', () => {
      render(<Input label="Test Label" value="" onChange={mockOnChange} error="Error message" />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input).toHaveClass('border-red-500');
      
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('text-red-500');
    });
  });
});
