export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export interface Authority {
  id: number;
  name: string;
  code: string;
}

export interface UserProfile {
  id: number;
  createDate: string;
  updateDate: string;
  firstName: string;
  patronymic: string;
  surname: string;
  username: string;
  maxSeedId: string;
  telegramSeedId: string;
  email: string;
  presaved: boolean;
  deletedSince: string | null;
  authorities: Authority[];
  groups: Authority[];
}