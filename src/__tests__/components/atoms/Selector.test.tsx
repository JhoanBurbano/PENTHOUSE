import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Selector from '@/components/atoms/Selector';
import { Option } from '@/types/Filters';

describe('Selector Component', () => {
  const mockOptions: Option[] = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  const mockSetValue = jest.fn();
  const defaultProps = {
    label: 'Test Label',
    setValue: mockSetValue,
    options: mockOptions,
  };

  beforeEach(() => {
    mockSetValue.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with default state showing "None"', () => {
    render(<Selector {...defaultProps} />);
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('None')).toBeInTheDocument();
  });

  it('renders with selected value', () => {
    render(<Selector {...defaultProps} value={mockOptions[0]} />);
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('shows options when clicked', () => {
    render(<Selector {...defaultProps} />);
    
    fireEvent.click(screen.getByRole('button', { name: /test label/i }));
    
    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('hides options when clicked again', () => {
    render(<Selector {...defaultProps} />);
    
    // Open options
    fireEvent.click(screen.getByRole('button', { name: /test label/i }));
    
    // Close options
    fireEvent.click(screen.getByRole('button', { name: /test label/i }));
    
    // Wait for animation
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    mockOptions.forEach(option => {
      expect(screen.queryByText(option.label)).not.toBeInTheDocument();
    });
  });

  it('calls setValue when option is selected', () => {
    render(<Selector {...defaultProps} />);
    
    fireEvent.click(screen.getByRole('button', { name: /test label/i }));
    fireEvent.click(screen.getByText('Option 1'));
    
    expect(mockSetValue).toHaveBeenCalledWith(mockOptions[0]);
  });

  it('deselects option when clicking the same option', () => {
    render(<Selector {...defaultProps} value={mockOptions[0]} />);
    
    fireEvent.click(screen.getByRole('button', { name: /test label/i }));
    
    const optionsContainer = screen.getAllByRole('button').find(
      button => button.querySelector('p')?.textContent?.includes('Option 1') && button.classList.contains('bg-primary')
    );
    
    if (!optionsContainer) throw new Error('Option button not found');
    
    mockSetValue.mockClear(); // Clear previous calls
    fireEvent.click(optionsContainer);
    
    expect(mockSetValue).toHaveBeenCalledWith(undefined);
  });

  it('applies selected style to chosen option', () => {
    render(<Selector {...defaultProps} value={mockOptions[0]} />);
    
    fireEvent.click(screen.getByRole('button', { name: /test label/i }));
    
    const optionsContainer = screen.getAllByRole('button').find(
      button => button.textContent?.includes('Option 1') && button.classList.contains('bg-primary')
    );
    
    if (!optionsContainer) throw new Error('Option button not found');
    
    expect(optionsContainer).toHaveClass('bg-primary');
  });

  it('applies animation classes when opening/closing', () => {
    render(<Selector {...defaultProps} />);
    
    // Open options
    fireEvent.click(screen.getByRole('button', { name: /test label/i }));
    
    const optionsContainer = screen.getByText('Option 1').parentElement?.parentElement;
    expect(optionsContainer).toHaveClass('animate-fadeIn');
    
    // Close options
    fireEvent.click(screen.getByRole('button', { name: /test label/i }));
    expect(optionsContainer).toHaveClass('animate-fadeOut');
  });
});
