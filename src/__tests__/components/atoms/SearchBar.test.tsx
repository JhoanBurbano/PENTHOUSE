import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@/components/atoms/SearchBar';

describe('SearchBar Component', () => {
  const mockSetName = jest.fn();
  const mockSetIsTyping = jest.fn();
  const defaultProps = {
    name: '',
    setName: mockSetName,
    setIsTyping: mockSetIsTyping,
  };

  beforeEach(() => {
    mockSetName.mockClear();
    mockSetIsTyping.mockClear();
  });

  it('renders with default props', () => {
    render(<SearchBar {...defaultProps} />);
    
    expect(screen.getByLabelText('Search by name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g., Modern Apartment')).toBeInTheDocument();
  });

  it('displays the current name value', () => {
    render(<SearchBar {...defaultProps} name="Test Property" />);
    
    const input = screen.getByLabelText('Search by name') as HTMLInputElement;
    expect(input.value).toBe('Test Property');
  });

  it('calls setName and setIsTyping on input change', () => {
    render(<SearchBar {...defaultProps} />);
    
    const input = screen.getByLabelText('Search by name');
    fireEvent.change(input, { target: { value: 'New Property' } });
    
    expect(mockSetName).toHaveBeenCalledWith('New Property');
    expect(mockSetIsTyping).toHaveBeenCalledWith(true);
  });

  it('has correct styling classes', () => {
    render(<SearchBar {...defaultProps} />);
    
    const container = screen.getByLabelText('Search by name').parentElement;
    expect(container).toHaveClass('flex', 'flex-col', 'w-full', 'gap-2');
    
    const label = screen.getByText('Search by name');
    expect(label).toHaveClass('text-md', 'font-light', 'text-gray-200');
    
    const input = screen.getByLabelText('Search by name');
    expect(input).toHaveClass(
      'w-full',
      'rounded-xl',
      'p-2',
      'bg-white/70',
      'backdrop-blur-sm'
    );
  });

  it('has correct input attributes', () => {
    render(<SearchBar {...defaultProps} />);
    
    const input = screen.getByLabelText('Search by name');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('id', 'name');
    expect(input).toHaveAttribute('autoComplete', 'off');
  });
});
