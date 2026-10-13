
import api from './api';
import type { SwapRequest } from '../types/swaprequest';

export interface CreateSwapRequest {
  receiverId: string;
  skillOffered: string;
  skillWanted: string;
}

export const sendSwapRequest = async (data: CreateSwapRequest) => {
  const response = await api.post('/swap-requests', data);
  return response.data;
};

export const getSwapRequests = async (): Promise<SwapRequest[]> => {
  const response = await api.get('/swap-requests');
  return response.data;
};

export const acceptSwapRequest = async (id: string) => {
  const response = await api.patch(`/swap-requests/${id}/accept`);
  return response.data;
};

export const rejectSwapRequest = async (id: string) => {
  const response = await api.patch(`/swap-requests/${id}/reject`);
  return response.data;
};
