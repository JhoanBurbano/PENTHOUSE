import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextArea from '@/components/atoms/TextArea';

describe('TextArea Component', () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    label: 'Test Label',
    value: '',
    onChange: mockOnChange,
    maxLength: 100,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with default props', () => {
    render(<TextArea {...defaultProps} />);
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('0/100')).toBeInTheDocument();
  });

  it('displays the current value', () => {
    const value = 'Test content';
    render(<TextArea {...defaultProps} value={value} />);
    
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value).toBe(value);
    expect(screen.getByText('12/100')).toBeInTheDocument();
  });

  it('calls onChange when text is entered', () => {
    render(<TextArea {...defaultProps} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New content' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('New content');
  });

  it('displays placeholder when provided', () => {
    render(<TextArea {...defaultProps} placeholder="Enter text here" />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', 'Enter text here');
  });

  it('has correct styling classes', () => {
    render(<TextArea {...defaultProps} />);
    
    const container = screen.getByText('Test Label').closest('div');
    expect(container).toHaveClass('mb-6');
    
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('block', 'text-gray-700', 'text-sm', 'font-medium', 'mb-2');
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass(
      'w-full',
      'px-4',
      'py-3',
      'border',
      'border-gray-200',
      'rounded-lg',
      'resize-none'
    );
  });

  it('enforces maxLength constraint', () => {
    render(<TextArea {...defaultProps} maxLength={5} />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('maxLength', '5');
  });
});
