import { useQuery } from '@tanstack/react-query';
import { menuApi } from '../lib/api';

export function useMenu(params?: { category?: string; available?: boolean }) {
  return useQuery({
    queryKey: ['menu', params],
    queryFn: () => menuApi.getAll(params),
  });
}

export function useMenuItem(id: number) {
  return useQuery({
    queryKey: ['menu', id],
    queryFn: () => menuApi.getById(id),
    enabled: !!id,
  });
}
