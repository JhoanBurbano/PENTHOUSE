import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import FiltersBottomSheet from '@/components/organisms/FiltersBottomSheet';
import { cities, sortOptions, priceRanges } from '@/constants/filters';

describe('FiltersBottomSheet Component', () => {
  const mockOnApplyFilters = jest.fn();

  beforeEach(() => {
    mockOnApplyFilters.mockClear();
    // Reset body styles that might be set by the component
    document.body.style.overflow = '';
    document.body.style.position = '';
  });

  it('renders toggle button when closed', () => {
    render(<FiltersBottomSheet onApplyFilters={mockOnApplyFilters} />);
    expect(screen.getByText('Show filters')).toBeInTheDocument();
  });

  it('opens and closes the sheet', () => {
    render(<FiltersBottomSheet onApplyFilters={mockOnApplyFilters} />);
  
    // Open sheet
    fireEvent.click(screen.getByTestId('Show filters'));
    const filtersSheet = screen.getByRole('main');
    expect(filtersSheet).toHaveClass('translate-y-0');
    
    // Close sheet
    fireEvent.click(screen.getByTestId('Close menu'));
    expect(filtersSheet).toHaveClass('translate-y-full');
  });

  it('locks body scroll when open', () => {
    render(<FiltersBottomSheet onApplyFilters={mockOnApplyFilters} />);
    
    fireEvent.click(screen.getByTestId('Show filters'));
    expect(document.body.style.overflow).toBe('hidden');
    
    fireEvent.click(screen.getByTestId('Close menu'));
    expect(document.body.style.overflow).toBe('');
  });

  it('applies city filter correctly', () => {
    render(<FiltersBottomSheet onApplyFilters={mockOnApplyFilters} />);
    
    fireEvent.click(screen.getByText('Show filters'));
    fireEvent.click(screen.getByText(cities[0].label));
    fireEvent.click(screen.getByText('Apply Filters'));

    expect(mockOnApplyFilters).toHaveBeenCalledWith(
      expect.objectContaining({
        city: cities[0].value
      })
    );
  });

  it('applies price range filter correctly', () => {
    render(<FiltersBottomSheet onApplyFilters={mockOnApplyFilters} />);
    
    fireEvent.click(screen.getByText('Show filters'));
    
    // Select min price
    fireEvent.click(screen.getByText(`$${priceRanges.steps[0]}M`));
    // Select max price
    fireEvent.click(screen.getByText(`$${priceRanges.steps[2]}M`));
    
    fireEvent.click(screen.getByText('Apply Filters'));

    expect(mockOnApplyFilters).toHaveBeenCalledWith(
      expect.objectContaining({
        minPrice: priceRanges.steps[0],
        maxPrice: priceRanges.steps[2]
      })
    );
  });

  it('applies sort filter correctly', () => {
    render(<FiltersBottomSheet onApplyFilters={mockOnApplyFilters} />);
    
    fireEvent.click(screen.getByText('Show filters'));
    fireEvent.click(screen.getByText(sortOptions[0].label));
    fireEvent.click(screen.getByText('Apply Filters'));

    expect(mockOnApplyFilters).toHaveBeenCalledWith(
      expect.objectContaining({
        sort: sortOptions[0].value
      })
    );
  });

  it('resets all filters', () => {
    render(<FiltersBottomSheet onApplyFilters={mockOnApplyFilters} />);
    
    fireEvent.click(screen.getByText('Show filters'));
    
    // Apply some filters
    fireEvent.click(screen.getByText(cities[0].label));
    fireEvent.click(screen.getByText(sortOptions[0].label));
    
    // Reset filters
    fireEvent.click(screen.getByText('Reset all filters'));
    fireEvent.click(screen.getByText('Apply Filters'));

    expect(mockOnApplyFilters).toHaveBeenCalledWith({});
  });

  it('handles animations correctly', async () => {
    render(<FiltersBottomSheet onApplyFilters={mockOnApplyFilters} />);
    
    const toggleButton = screen.getByText('Show filters');
    
    // Open sheet
    act(() => {
      fireEvent.click(toggleButton);
    });
    
    const sheet = screen.getByRole('main');
    expect(sheet).toHaveClass('translate-y-0');
    
    // Close sheet
    act(() => {
      fireEvent.click(screen.getByTestId('Close menu'));
    });
    
    expect(sheet).toHaveClass('translate-y-full');
  });
});
