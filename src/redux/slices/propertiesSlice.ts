import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../utils/axiosClient';
import { Property } from '../../types/Property';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/ErrorResponse';
import { getProperties, getProperty } from '@/services/property.service';
import { QuerySearchProperties } from '@/types/Filters';

interface PropertiesState {
  properties: Property[];
  selectedProperty: Property | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertiesState = {
  properties: [],
  selectedProperty: null,
  loading: false,
  error: null,
};

// Fetch all properties
export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (query: QuerySearchProperties | undefined, thunkAPI) => {
    try {
      const response = await getProperties(query);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError<ErrorResponse>).response?.data?.message || 'Failed to fetch properties');
    }
  }
);

// Set a selected property
export const setSelectedProperty = createAsyncThunk(
  'properties/setSelectedProperty',
  async (id: string, thunkAPI) => {
    try {
      const response = await getProperty(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError<ErrorResponse>).response?.data?.message || 'Failed to set selected property');
    }
  }
);

// Create a new property
export const createProperty = createAsyncThunk(
  'properties/createProperty',
  async (property: Property, thunkAPI) => {
    try {
      const response = await axiosClient.post('/properties', property);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError<ErrorResponse>).response?.data?.message || 'Failed to create property');
    }
  }
);

// Delete a property
export const deleteProperty = createAsyncThunk(
  'properties/deleteProperty',
  async (id: string, thunkAPI) => {
    try {
      await axiosClient.delete(`/properties/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError<ErrorResponse>).response?.data?.message || 'Failed to delete property');
    }
  }
);

// Properties Slice
const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload as Property[];
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error =action.error.message || action.payload as string;
      })
      .addCase(setSelectedProperty.fulfilled, (state, action) => {
        state.selectedProperty = action.payload;
      })
      .addCase(setSelectedProperty.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.properties.push(action.payload);
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.properties = state.properties.filter((property) => property.id !== action.payload);
      });
  },
});

export default propertiesSlice.reducer;
