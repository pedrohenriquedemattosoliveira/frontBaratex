import { request } from './api';

export interface OficinaApi {
  id: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  nomeUsuario?: string | null;
  email?: string | null;
  telefone?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  estado?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface ServicoApi {
  id: string;
  nome: string;
  descricao?: string | null;
  precoBase: number;
  tempoEstimadoMinutos?: number | null;
}

export const oficinaService = {
  listar: () => request<OficinaApi[]>('/api/oficinas', { auth: false }),
  buscar: (id: string) => request<OficinaApi>(`/api/oficinas/${id}`, { auth: false }),
  proximas: (latitude: number, longitude: number, raioKm = 10) =>
    request<OficinaApi[]>(
      `/api/oficinas/proximas?latitude=${latitude}&longitude=${longitude}&raioKm=${raioKm}`,
      { auth: false }
    ),
  servicos: (oficinaId: string) =>
    request<ServicoApi[]>(`/api/servicos/oficina/${oficinaId}`, { auth: false }),
};
