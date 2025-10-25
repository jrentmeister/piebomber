import { useMutation } from '@tanstack/react-query';
import { cateringApi, CateringRequest } from '../lib/api';

export function useCateringRequest() {
  return useMutation({
    mutationFn: (request: CateringRequest) => cateringApi.submit(request),
  });
}
