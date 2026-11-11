export type TipoUsuario = 'CLIENTE' | 'PRESTADOR';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: TipoUsuario;
  prestador_id?: number;
}

export interface Veiculo {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  quilometragem: number;
  combustivel?: string;
  totalManutencoes?: number;
}

export interface Prestador {
  id: number;
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
  id: number;
  veiculo_id: number;
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
  HistoricoVeiculo: { veiculoId: number; modelo: string; placa: string };
  CadastroVeiculo: { veiculo?: Veiculo } | undefined;
};

export type HomeStackParamList = {
  HomeList: undefined;
  OficinaDetalhes: { oficinaId: number };
  ServicoDetalhes: { servicoId: number; oficinaId: number };
  AgendamentoCheckout: { servicoId: number; prestadorId: number; servicoNome: string; valor: number };
  ChatPrestador: { prestadorId: number; prestadorNome: string };
  StatusServico: { agendamentoId: number };
  AvaliacaoPrestador: { prestadorId: number; prestadorNome: string };
};

export type PerfilStackParamList = {
  PerfilHome: undefined;
  MeusVeiculos: undefined;
  Notificacoes: undefined;
};