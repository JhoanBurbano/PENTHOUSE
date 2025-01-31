import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PropertyDetails from '@/components/organisms/PropertyDetails';
import propertiesReducer from '@/redux/slices/propertiesSlice';

describe('PropertyDetails Component', () => {
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
    preloadedState: {
      properties: {
        selectedProperty: mockProperty,
        properties: [mockProperty],
        loading: false,
        error: null,
      },
    },
  });

  beforeEach(() => {
    render(
      <Provider store={store}>
        <PropertyDetails property={mockProperty} onClose={jest.fn()} />
      </Provider>
    );
  });

  it('renders property details correctly', () => {
    expect(screen.getByText(mockProperty.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProperty.price.toLocaleString()}`)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.address)).toBeInTheDocument();
  });

  it('renders owner information correctly', () => {
    expect(screen.getByText(mockProperty.owner.name)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.owner.email_address)).toBeInTheDocument();
  });

  it('renders amenities correctly', () => {
    expect(screen.getByText(`${mockProperty.amenities.bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProperty.amenities.bathrooms} Bathrooms`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProperty.amenities.area} sqft`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProperty.amenities.parking} Parking`)).toBeInTheDocument();
  });

  it('toggles contact form', () => {
    const contactButton = screen.getByText(/contact seller/i);
    fireEvent.click(contactButton);
    expect(screen.getByText(/send message/i)).toBeInTheDocument();
  });

  it('handles animations correctly', () => {
    const mainElement = screen.getByRole('dialog');
    expect(mainElement).toHaveClass('translate-x-0');
  });

  it('displays location information', () => {
    mockProperty.location.forEach(loc => {
      expect(screen.getByText(loc)).toBeInTheDocument();
    });
  });

  it('renders images with correct attributes', () => {
    const propertyImage = screen.getByAltText(mockProperty.name);
    expect(propertyImage).toHaveAttribute('src', expect.stringContaining(mockProperty.image));
  });
});
