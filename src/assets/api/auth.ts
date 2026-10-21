import { api } from './client';
import type { components } from './schema';

export type AuthDto = components['schemas']['AuthDto'];
export type LoginResponse = components['schemas']['LoginResponse'];
export type EmployeeDto = components['schemas']['EmployeeDto'];
export type ErrorDto = components['schemas']['ErrorDto'];   // ← добавили

export const authApi = {
  async login(payload: AuthDto): Promise<LoginResponse> {
    const { data, error } = await api.POST('/auth/login', { body: payload });
    if (error) throw error;
    return data!;
  },

  async getProfile(): Promise<EmployeeDto> {
    const { data, error } = await api.GET('/auth/profile');
    if (error) throw error;
    return data!;
  },
};