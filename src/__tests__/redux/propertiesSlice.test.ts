import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer, {
  fetchProperties,
  setSelectedProperty,
} from '@/redux/slices/propertiesSlice';
import { Property } from '@/types/Property';
import { RootState } from '@/redux/store';

describe('Properties Slice', () => {
  let store: ReturnType<typeof configureStore<RootState>>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        properties: propertiesReducer,
      },
    });
  });

  it('should handle initial state', () => {
    const state = store.getState().properties;
    expect(state).toEqual({
      properties: [],
      selectedProperty: null,
      loading: false,
      error: null,
    });
  });

  it('should handle fetchProperties.pending', () => {
    store.dispatch(fetchProperties.pending('', {}));
    const state = store.getState().properties;
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fetchProperties.fulfilled', () => {
    const mockProperties: Property[] = [
      {
        id: '1',
        name: 'Test Property',
        price: 1000000,
        address: {
          addressText: 'Test Address',
          location: ['Test', 'Location'],
        },
        owner: {
          name: 'Test Owner',
          email_address: 'test@example.com',
          photo: 'test.jpg',
          id: 'test',
          address: 'test',
          birthday: 'test',
        },
        image: 'test.jpg',
        images: ['test.jpg'],
        year: 2024,
        amenities: {
          beds: 0,
          baths: 0,
          length: 0,
          garage: 0,
        },
        traces: [],
      },
    ];

    store.dispatch(fetchProperties.fulfilled(mockProperties, '', undefined));
    const state = store.getState().properties;
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.properties).toEqual(mockProperties);
  });

  it('should handle fetchProperties.rejected', () => {
    const error = new Error('Failed to fetch');
    store.dispatch(fetchProperties.rejected(error, '', undefined));
    const state = store.getState().properties;
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error.message);
  });

  it('should handle setSelectedProperty', async () => {
    const mockProperty: Property = {
      id: '1',
      name: 'Test Property',
      price: 1000000,
      address: {
        addressText: 'Test Address',
        location: ['Test Location'],
      },
      owner: {
        name: 'Test Owner',
        email_address: 'test@example.com',
        photo: 'test.jpg',
        id: 'test',
        address: 'test',
        birthday: 'test',
      },
      image: 'test.jpg',
      images: ['test.jpg'],
      year: 2024,
      amenities: {
        beds: 2,
        baths: 1,
        length: 1000,
        garage: 1,
      },
      traces: [],
    };
    
    // Luego la seleccionamos usando el thunk
    await store.dispatch(setSelectedProperty.fulfilled(mockProperty, '', mockProperty.id));
    
    const state = store.getState().properties;
    expect(state.selectedProperty).toEqual(mockProperty);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });
});
