import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { marketingService } from '../services/marketing.service';
import { Visit } from '../types/marketing.types';

export const useMarketing = () => {
  const queryClient = useQueryClient();

  const useSalesmen = () => useQuery({
    queryKey: ['marketing', 'salesmen'],
    queryFn: () => marketingService.getSalesmen().then(res => res.data),
  });

  const useVisits = (params?: any) => useQuery({
    queryKey: ['marketing', 'visits', params],
    queryFn: () => marketingService.getVisits(params).then(res => res.data),
  });

  const useFieldOrders = () => useQuery({
    queryKey: ['marketing', 'field-orders'],
    queryFn: () => marketingService.getFieldOrders().then(res => res.data),
  });

  const useCreateVisit = () => useMutation({
    mutationFn: (data: Partial<Visit>) => marketingService.createVisit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing', 'visits'] });
    },
  });

  return {
    useSalesmen,
    useVisits,
    useFieldOrders,
    useCreateVisit,
  };
};
