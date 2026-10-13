
import type { UpdateUserData, User } from '../types/user';
import api from './api';

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  phone?: string,
  bio?: string,
  location?: string,
 // profileImage?: string,
) => {
  const response = await api.post('/auth/signup', {
    name,
    email,
    password,
    phone,
    bio,
    location,
   // profileImage,
  });

  return response.data;
};

export const loginUser = async (
  email: string,
  password: string,
) => {
  const response = await api.post('/auth/login', {
    email,
    password,
  });

  return response.data;
};
export const getMyProfile = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};

export const updateMyProfile = async (
  data: UpdateUserData,
): Promise<User> => {
  const response = await api.patch<User>('/users/me', data);
  return response.data;
};
