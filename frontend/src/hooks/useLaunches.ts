import { useQuery } from '@tanstack/react-query';
import { LaunchService } from '../api/services/launches';
import { Launch } from '../types/launch';

export const useLaunches = () => {
  return useQuery<Launch[]>({
    queryKey: ['launches'],
    queryFn: LaunchService.getAll,
  });
};

export const useLaunch = (id: string) => {
  return useQuery<Launch>({
    queryKey: ['launch', id],
    queryFn: () => LaunchService.getById(id),
    enabled: !!id,
  });
};
