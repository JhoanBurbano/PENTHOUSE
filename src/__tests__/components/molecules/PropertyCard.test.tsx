import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PropertyCard from '@/components/molecules/PropertyCard';
import propertiesReducer from '@/redux/slices/propertiesSlice';

describe('PropertyCard Component', () => {
  const mockProperty = {
    id: '1',
    name: 'Luxury Penthouse',
    location: ['New York', 'Manhattan'],
    price: 5000000,
    address: '123 Luxury Ave',
    owner: {
      name: 'John Doe',
      email_address: 'john@example.com',
      photo: 'owner.jpg',
    },
    image: 'property.jpg',
    year: 2024,
    amenities: {
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      parking: 2,
    },
  };

  const store = configureStore({
    reducer: {
      properties: propertiesReducer,
    },
  });

  const setup = (props = {}) => {
    return render(
      <Provider store={store}>
        <PropertyCard property={mockProperty} {...props} />
      </Provider>
    );
  };

  it('renders property information correctly', () => {
    setup();
    expect(screen.getByText(mockProperty.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProperty.price.toLocaleString()}`)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.location[0])).toBeInTheDocument();
  });

  it('renders property image with correct attributes', () => {
    setup();
    const image = screen.getByAltText(mockProperty.name);
    expect(image).toHaveAttribute('src', expect.stringContaining(mockProperty.image));
  });

  it('renders amenities badges', () => {
    setup();
    expect(screen.getByText(`${mockProperty.amenities.bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProperty.amenities.bathrooms} Bathrooms`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProperty.amenities.area} sqft`)).toBeInTheDocument();
  });

  it('handles click events', () => {
    const mockOnClick = jest.fn();
    setup({ onClick: mockOnClick });
    
    fireEvent.click(screen.getByRole('article'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies hover animations', () => {
    setup();
    const card = screen.getByRole('article');
    expect(card).toHaveClass('hover:scale-[1.02]');
  });

  it('formats price correctly', () => {
    setup();
    const formattedPrice = `$${mockProperty.price.toLocaleString()}`;
    expect(screen.getByText(formattedPrice)).toBeInTheDocument();
  });

  it('displays location badges correctly', () => {
    setup();
    mockProperty.location.forEach(location => {
      expect(screen.getByText(location)).toBeInTheDocument();
    });
  });

  it('applies shadow and border styles', () => {
    setup();
    const card = screen.getByRole('article');
    expect(card).toHaveClass('shadow-lg');
    expect(card).toHaveClass('rounded-2xl');
  });
});
