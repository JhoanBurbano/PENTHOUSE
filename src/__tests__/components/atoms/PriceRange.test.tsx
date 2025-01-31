import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import PriceRange from '@/components/atoms/PriceRange';

describe('PriceRange Component', () => {
  const defaultProps = {
    minPrice: 10,
    maxPrice: 20,
    onSelectRange: jest.fn(),
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('renders with default state showing "None"', () => {
      render(<PriceRange {...defaultProps} />);
      
      expect(screen.getByText('Price Range')).toBeInTheDocument();
      expect(screen.getByText('None')).toBeInTheDocument();
    });

    it('renders price options when clicked', () => {
      render(<PriceRange {...defaultProps} />);
      
      fireEvent.click(screen.getByRole('button', { name: /price range/i }));
      
      // Should render buttons from minPrice to maxPrice
      for (let i = defaultProps.minPrice; i <= defaultProps.maxPrice; i++) {
        expect(screen.getByRole('button', { name: `$ ${i}M` })).toBeInTheDocument();
      }
    });

    it('closes price options when clicked again', () => {
      render(<PriceRange {...defaultProps} />);
      
      const button = screen.getByRole('button', { name: /price range/i });
      
      // Open options
      fireEvent.click(button);
      expect(screen.getAllByRole('button')).toHaveLength(12); // Main button + 11 price options
      
      // Close options
      fireEvent.click(button);
      
      // Wait for animation to complete
      act(() => {
        jest.advanceTimersByTime(300);
      });
      
      expect(screen.getAllByRole('button')).toHaveLength(1); // Only main button
    });
  });

  describe('Interaction', () => {
    it('selects min price when clicking a price option', () => {
      render(<PriceRange {...defaultProps} />);
      
      fireEvent.click(screen.getByRole('button', { name: /price range/i }));
      fireEvent.click(screen.getByRole('button', { name: '$ 12M' }));
      
      const priceElements = screen.getAllByText(/12M/);
      expect(priceElements.length).toBeGreaterThan(0);
    });

    it('selects max price after selecting min price', () => {
      render(<PriceRange {...defaultProps} />);
      
      fireEvent.click(screen.getByRole('button', { name: /price range/i }));
      fireEvent.click(screen.getByRole('button', { name: '$ 12M' })); // Select min
      fireEvent.click(screen.getByRole('button', { name: '$ 15M' })); // Select max
      
      const min12Elements = screen.getAllByText(/12M/);
      const max15Elements = screen.getAllByText(/15M/);
      expect(min12Elements.length).toBeGreaterThan(0);
      expect(max15Elements.length).toBeGreaterThan(0);
    });

    it('calls onSelectRange when both min and max are selected', () => {
      render(<PriceRange {...defaultProps} />);
      
      fireEvent.click(screen.getByRole('button', { name: /price range/i }));
      fireEvent.click(screen.getByRole('button', { name: '$ 12M' })); // Select min
      fireEvent.click(screen.getByRole('button', { name: '$ 15M' })); // Select max
      
      expect(defaultProps.onSelectRange).toHaveBeenCalledWith(12, 15);
    });

    it('deselects price when clicking it again', () => {
      render(<PriceRange {...defaultProps} />);
      
      fireEvent.click(screen.getByRole('button', { name: /price range/i }));
      fireEvent.click(screen.getByRole('button', { name: '$ 12M' })); // Select min
      fireEvent.click(screen.getByRole('button', { name: '$ 12M' })); // Deselect min
      
      expect(screen.getByText('None')).toBeInTheDocument();
    });

    it('updates min price when selecting a lower price', () => {
      render(<PriceRange {...defaultProps} />);
      
      fireEvent.click(screen.getByRole('button', { name: /price range/i }));
      fireEvent.click(screen.getByRole('button', { name: '$ 15M' })); // Select min
      fireEvent.click(screen.getByRole('button', { name: '$ 12M' })); // Update min to lower price
      
      const priceElements = screen.getAllByText(/12M/);
      expect(priceElements.length).toBeGreaterThan(0);
    });

    it('handles max being null correctly', () => {
      render(<PriceRange {...defaultProps} />);
      
      // Select min price
      fireEvent.click(screen.getByRole('button', { name: /price range/i }));
      fireEvent.click(screen.getByRole('button', { name: '$ 12M' }));
      
      // Select same price again to set max to null
      fireEvent.click(screen.getByRole('button', { name: '$ 12M' }));
      
      // Select a higher price
      fireEvent.click(screen.getByRole('button', { name: '$ 15M' }));
      
      const price15Elements = screen.getAllByText(/15M/);
      expect(price15Elements.length).toBeGreaterThan(0);
    });
  });

  describe('Styling', () => {
    it('applies selected style to chosen prices', () => {
      render(<PriceRange {...defaultProps} />);
      
      fireEvent.click(screen.getByRole('button', { name: /price range/i }));
      const priceButton = screen.getByRole('button', { name: '$ 12M' }).closest('button');
      
      fireEvent.click(priceButton!);
      expect(priceButton).toHaveClass('bg-primary');
    });

    it('applies hover style to main button', () => {
      render(<PriceRange {...defaultProps} />);
      
      const mainButton = screen.getByRole('button', { name: /price range/i });
      expect(mainButton).toHaveClass('hover:brightness-110');
    });

    it('applies animation classes when opening/closing', () => {
      render(<PriceRange {...defaultProps} />);
      
      // Open options
      fireEvent.click(screen.getByRole('button', { name: /price range/i }));
      const optionsContainer = screen.getByRole('button', { name: '$ 10M' }).closest('div');
      expect(optionsContainer).toHaveClass('animate-fadeIn');
      
      // Close options
      fireEvent.click(screen.getByRole('button', { name: /price range/i }));
      expect(optionsContainer).toHaveClass('animate-fadeOut');
    });
  });
});
