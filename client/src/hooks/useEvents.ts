import { useQuery } from '@tanstack/react-query';
import { eventsApi } from '../lib/api';

export function useEvents(params?: { status?: string; upcoming?: boolean }) {
  return useQuery({
    queryKey: ['events', params],
    queryFn: () => eventsApi.getAll(params),
  });
}

export function useEvent(id: number) {
  return useQuery({
    queryKey: ['events', id],
    queryFn: () => eventsApi.getById(id),
    enabled: !!id,
  });
}
