import api from './api';
import type { Skill, UserSkill } from '../types/skill';
import type { User } from '../types/user';

export const getAllSkills = async (): Promise<Skill[]> => {
  const response = await api.get<Skill[]>('/skills');
  return response.data;
};

export const createSkill = async (name: string): Promise<Skill> => {
  const response = await api.post<Skill>('/skills', { name });
  return response.data;
};

export const addMySkill = async (
  skillId: string,
  type: 'TEACH' | 'LEARN',
): Promise<UserSkill> => {
  const response = await api.post<UserSkill>('/users/me/skills', {
    skillId,
    type,
  });
  return response.data;
};

export const removeMySkill = async (id: string): Promise<void> => {
  await api.delete(`/users/me/skills/${id}`);
};
export const getMySkills = async (): Promise<UserSkill[]> => {
  const response = await api.get<UserSkill[]>('/users/me/skills');
  return response.data;
};

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};