
import { Rocket } from '../../types/rocket';
import { apiClient } from '../client';

export const RocketService = {
  getAll: async (): Promise<Rocket[]> => {
    const response = await apiClient.get('/rockets');
    return response.data;
  },
};
