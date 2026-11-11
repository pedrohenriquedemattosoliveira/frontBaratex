import { request } from './api';

export interface VeiculoApi {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  ano: number;
  cor?: string | null;
}

export interface MarcaApi {
  id: string;
  nome: string;
}

export interface ModeloApi {
  id: string;
  nomeModelo: string;
  anoInicio?: number | null;
  anoFim?: number | null;
}

export const veiculoService = {
  listarMeus: () => request<VeiculoApi[]>('/api/veiculos'),
  cadastrar: (data: { placa: string; modeloId: string; ano: number; cor?: string }) =>
    request<VeiculoApi>('/api/veiculos', { method: 'POST', body: data }),

  marcas: (q = '') =>
    request<MarcaApi[]>(`/api/modelos-veiculos/marcas?q=${encodeURIComponent(q)}`, { auth: false }),
  modelos: (marcaId: string, q = '') =>
    request<ModeloApi[]>(
      `/api/modelos-veiculos/modelos?marcaId=${marcaId}&q=${encodeURIComponent(q)}`,
      { auth: false }
    ),
  anos: (modeloId: string) =>
    request<number[]>(`/api/modelos-veiculos/anos?modeloId=${modeloId}`, { auth: false }),
};
