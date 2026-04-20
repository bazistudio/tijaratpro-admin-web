import axios from '@/lib/api/axios';
import { Salesman, Visit, FieldOrder, Route } from '../types/marketing.types';

export const marketingService = {
  // Salesmen
  getSalesmen: () => axios.get<Salesman[]>('/marketing/salesmen'),
  getSalesmanById: (id: string) => axios.get<Salesman>(`/marketing/salesmen/${id}`),

  // Visits
  getVisits: (params?: any) => axios.get<Visit[]>('/marketing/visits', { params }),
  createVisit: (data: Partial<Visit>) => axios.post<Visit>('/marketing/visits', data),

  // Orders
  getFieldOrders: () => axios.get<FieldOrder[]>('/marketing/field-orders'),
  
  // Routes
  getRoutes: () => axios.get<Route[]>('/marketing/routes'),
  updateRoute: (id: string, data: Partial<Route>) => axios.patch<Route>(`/marketing/routes/${id}`, data),
};
