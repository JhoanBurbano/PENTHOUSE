import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';
import { Property } from '../types/Property';
import { ErrorResponse } from '@/types/ErrorResponse';
import { AxiosError } from 'axios';

const useProperties = (endpoint: string) => {
  const [data, setData] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get<Property>(endpoint);
        setData(response.data);
      } catch (err) {
        setError((err as AxiosError<ErrorResponse>).response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useProperties;
