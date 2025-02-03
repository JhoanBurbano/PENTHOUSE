import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PropertyDetails from '@/components/organisms/PropertyDetails';
import propertiesReducer from '@/redux/slices/propertiesSlice';
import { Property } from '@/types/Property';


jest.mock('next/image', () => ({
  __esModule: true,
  default: (_props: unknown) => {
    return 'Mock Image';
  },
}));
describe('PropertyDetails Component', () => {
  const mockProperty: Property = {
    id: '1',
    name: 'Luxury Penthouse',
    price: 5000000,
    address: {
      addressText: '123 Luxury Ave',
      location: ['New York', 'Manhattan'],
    },
    owner: {
      id: '1',
      name: 'John Doe',
      email_address: 'john@example.com',
      photo: 'owner.jpg',
      address: '123 Main St',
      birthday: '1990-01-01',
    },
    image: 'property.jpg',
    images: ['property.jpg'],
    year: 2024,
    amenities: {
      beds: 4,
      baths: 3,
      length: 2500,
      garage: 2,
    },
    traces: [],
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

  const setup = () => {
    render(
      <Provider store={store}>
        <PropertyDetails property={mockProperty} onClose={jest.fn()} open/>
      </Provider>
    );
  };

  beforeEach(() => {
    setup();
  });

  it('renders property details correctly', () => {
    expect(screen.getByText(mockProperty.name)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.address.addressText)).toBeInTheDocument();
  });

  it('renders owner information correctly', () => {
    expect(screen.getByText(mockProperty.owner.name)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.owner.email_address)).toBeInTheDocument();
  });

  it('renders amenities correctly', () => {
    // Verificar que se muestran los IconLabel con los valores correctos
    const amenities = [
      { value: '4', label: 'bed.' },
      { value: '2', label: 'bath.' },
      { value: '1500', label: 'sqft.' },
      { value: '2', label: 'garage.' }
    ];

    amenities.forEach(({ value, label }) => {
      const container = screen.getByText((content, element) => {
        return content.includes(value) && element?.parentElement?.textContent?.includes(label);
      });
      expect(container).toBeInTheDocument();
    });
  });

  it('displays seller information section', () => {
    expect(screen.getByText('Seller information')).toBeInTheDocument();
  });

  it('renders images correctly', () => {
    // next/image se renderiza como un elemento img normal en los tests
    const images = screen.getAllByText('Mock Image');
    expect(images.length).toBeGreaterThan(0);
  });
});
