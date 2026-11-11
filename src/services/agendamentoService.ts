import { request } from './api';

export interface AgendamentoApi {
  id: string;
  dataHora: string;
  status: 'PENDENTE' | 'CONFIRMADO' | 'EM_ANDAMENTO' | 'CONCLUIDO' | 'CANCELADO';
  valorTotal: number;
}

export const agendamentoService = {
  // O backend recebe a entidade Agendamento: referencias aninhadas por id.
  criar: (data: { oficinaId: string; veiculoId: string; dataHora: string; servicoIds: string[] }) =>
    request<AgendamentoApi>('/api/agendamentos', {
      method: 'POST',
      body: {
        oficina: { id: data.oficinaId },
        veiculo: { id: data.veiculoId },
        dataHora: data.dataHora,
        itens: data.servicoIds.map((id) => ({ servico: { id } })),
      },
    }),
  buscar: (id: string) => request<AgendamentoApi>(`/api/agendamentos/${id}`),
};
