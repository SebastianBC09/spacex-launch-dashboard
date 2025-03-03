import { useQuery } from '@tanstack/react-query';
import { RocketService } from '../api/services/rockets';

export const useRockets = () => {
  return useQuery({
    queryKey: ['rockets'],
    queryFn: RocketService.getAll,
  });
};
