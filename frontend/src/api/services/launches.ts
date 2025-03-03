import { Launch } from '../../types/launch';
import { apiClient } from '../client';

export const LaunchService = {
  getAll: async (): Promise<Launch[]> => {
    const response = await apiClient.get('/launches');
    return response.data;
  },
  getById: async (id: string): Promise<Launch> => {
    const response = await apiClient.get(`/launches/${id}`);
    return response.data;
  },
};
