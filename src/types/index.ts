export type TipoUsuario = 'CLIENTE' | 'PRESTADOR';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: TipoUsuario;
  prestador_id?: string;
}

export interface Veiculo {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  cor?: string | null;
  quilometragem?: number;
  combustivel?: string;
  totalManutencoes?: number;
}

export interface Prestador {
  id: string;
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  latitude: number;
  longitude: number;
  distancia_km: number;
  avaliacao: number;
  endereco: string;
  especialidades: string[];
  imagem_url?: string;
}

export interface RegistroGaragemVirtual {
  id: string;
  veiculo_id: string;
  data_registro: string;
  quilometragem: number;
  observacao_tecnica: string;
  prestador_nome: string;
  prestador_cnpj: string;
  hash_validacao: string;
  servicos_executados: string[];
}

export interface MensagemChat {
  id: string;
  texto: string;
  enviadoPorMim: boolean;
  horario: string;
}

export type GaragemStackParamList = {
  GaragemList: undefined;
  HistoricoVeiculo: { veiculoId: string; modelo: string; placa: string };
  CadastroVeiculo: { veiculo?: Veiculo } | undefined;
};

export type HomeStackParamList = {
  HomeList: undefined;
  OficinaDetalhes: { oficinaId: string };
  ServicoDetalhes: { servicoId: string; oficinaId: string };
  AgendamentoCheckout: { servicoId: string; prestadorId: string; servicoNome: string; valor: number };
  ChatPrestador: { prestadorId: string; prestadorNome: string };
  StatusServico: { agendamentoId: string };
  AvaliacaoPrestador: { prestadorId: string; prestadorNome: string };
};

export type PerfilStackParamList = {
  PerfilHome: undefined;
  MeusVeiculos: undefined;
  Notificacoes: undefined;
};