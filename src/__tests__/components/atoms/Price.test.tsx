import React from 'react';
import { render, screen } from '@testing-library/react';
import Price from '@/components/atoms/Price';

jest.mock('hugeicons-react', () => ({
  Dollar01Icon: () => <span data-testid="dollar-icon">$</span>,
  Coins01Icon: () => <span data-testid="coins-icon">🪙</span>,
}));

describe('Price Component', () => {
  it('renders with default props', () => {
    render(<Price amount={1000000} />);
    
    expect(screen.getByTestId('price-component')).toBeInTheDocument();
    expect(screen.getByTestId('dollar-icon')).toBeInTheDocument();
    expect(screen.getByTestId('coins-icon')).toBeInTheDocument();
    expect(screen.getByText('1,0M')).toBeInTheDocument();
  });

  it('formats price correctly for different amounts', () => {
    const testCases = [
      { amount: 1000000, expected: '1,0M' },
      { amount: 2500000, expected: '2,5M' },
      { amount: 10000000, expected: '10,0M' },
      { amount: 1500000, expected: '1,5M' },
    ];

    testCases.forEach(({ amount, expected }) => {
      const { unmount } = render(<Price amount={amount} />);
      expect(screen.getByText(expected)).toBeInTheDocument();
      unmount();
    });
  });

  it('applies custom className', () => {
    render(<Price amount={1000000} className="custom-class" />);
    
    const container = screen.getByTestId('price-component');
    expect(container).toHaveClass('custom-class');
  });

  it('maintains default classes when custom class is added', () => {
    render(<Price amount={1000000} className="custom-class" />);
    
    const container = screen.getByTestId('price-component');
    expect(container).toHaveClass('flex', 'items-center', 'gap-1', 'font-bold', 'text-black', 'custom-class');
  });

  it('renders formatted price with correct styles', () => {
    render(<Price amount={1000000} />);
    
    const priceText = screen.getByText('1,0M');
    expect(priceText).toHaveClass('text-2xl', 'font-bold');
  });
});
