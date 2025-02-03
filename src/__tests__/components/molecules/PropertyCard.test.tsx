/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyCard from '@/components/molecules/PropertyCard';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (_props: unknown) => {
    return 'Mock Image';
  },
}));

describe('PropertyCard Component', () => {
  const mockProps = {
    title: 'Luxury Penthouse',
    address: '123 Luxury Ave, New York',
    price: 5000000,
    imageUrl: 'property.jpg',
    badgeText: '2024',
    onViewDetails: jest.fn(),
    beds: 4,
    baths: 3,
    lenght: 2500,
    cardOwner: {
      id: '1',
      name: 'John Doe',
      address: '123 Main St',
      photo: 'owner.jpg',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = (props = {}) => {
    return render(
      <PropertyCard {...mockProps} {...props} />
    );
  };

  it('renders property information correctly', () => {
    setup();
    const titleElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'p' && 
             content.includes('Luxury Penthouse');
    });
    expect(titleElement).toBeInTheDocument();
    expect(screen.getByText(/123 Luxury Ave, New York/i)).toBeInTheDocument();
    expect(screen.getByText('5.0M')).toBeInTheDocument();
  });

  it('renders property image', () => {
    setup();
    const images = screen.getAllByText('Mock Image');
    expect(images.length).toBeGreaterThan(0);
  });

  it('renders amenities information', () => {
    setup();
    const bedElements = screen.queryAllByText((_content, element) => {
      const parent = element?.parentElement?.parentElement;
      return parent?.textContent?.includes('4') && parent?.textContent?.includes('bed');
    });
    const bathElements = screen.queryAllByText((_content, element) => {
      const parent = element?.parentElement?.parentElement;
      return parent?.textContent?.includes('3') && parent?.textContent?.includes('bath');
    });
    const lengthElements = screen.queryAllByText((_content, element) => {
      const parent = element?.parentElement?.parentElement;
      return parent?.textContent?.includes('2500') && parent?.textContent?.includes('sqft');
    });
    expect(bedElements.length).toBeGreaterThan(0);
    expect(bathElements.length).toBeGreaterThan(0);
    expect(lengthElements.length).toBeGreaterThan(0);
  });

  it('handles view details click', () => {
    setup();
    fireEvent.click(screen.getByRole('article'));
    expect(mockProps.onViewDetails).toHaveBeenCalledTimes(1);
  });

  it('displays badge text when provided', () => {
    setup();
    const titleElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'p' && 
             content.includes('2024');
    });
    expect(titleElement).toBeInTheDocument();
  });

  it('renders owner information', () => {
    setup();
    expect(screen.getByText(mockProps.cardOwner.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.cardOwner.address)).toBeInTheDocument();
  });

  it('handles missing image gracefully', () => {
    const propsWithoutImage = { ...mockProps, imageUrl: '' };
    setup(propsWithoutImage);
    expect(screen.getByText('No Image')).toBeInTheDocument();
  });
});
