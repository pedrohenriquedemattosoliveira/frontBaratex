import { request } from './api';

export type TipoUsuarioApi = 'MOTORISTA' | 'OFICINA' | 'ADMIN';

export interface LoginResponse {
  token: string;
  tipo: string;
  usuarioId: string;
  nome: string;
  email: string;
  tipoUsuario: TipoUsuarioApi;
}

export interface RegisterPayload {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  cpf?: string;
  tipoUsuario: TipoUsuarioApi;
}

export const authService = {
  login: (email: string, senha: string) =>
    request<LoginResponse>('/api/auth/login', { method: 'POST', body: { email, senha }, auth: false }),

  register: (payload: RegisterPayload) =>
    request<string>('/api/auth/register', { method: 'POST', body: payload, auth: false }),
};
