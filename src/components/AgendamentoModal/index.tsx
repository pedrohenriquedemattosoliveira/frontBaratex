import React, { useEffect, useMemo, useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { theme } from '../../config/theme';
import { formatCurrency } from '../../utils/formatters';
import { veiculoService, VeiculoApi } from '../../services/veiculoService';
import { agendamentoService } from '../../services/agendamentoService';
import { styles } from './styles';

interface AgendamentoModalProps {
  visible: boolean;
  onClose: () => void;
  servicoId: string;
  oficinaId: string;
  servicoNome: string;
  preco: number;
  onConfirmar: () => void;
}

const HORARIOS_DISPONIVEIS = ['08:30', '10:00', '14:00', '16:00'];
const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const pad = (n: number) => String(n).padStart(2, '0');

// Proximos 3 dias: iso (yyyy-MM-dd) para a API e rotulo para exibir
const gerarDias = () =>
  [0, 1, 2].map((offset) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    const label = offset === 0 ? 'Hoje' : offset === 1 ? 'Amanhã' : DIAS_SEMANA[d.getDay()];
    return {
      iso: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
      label: `${label} (${pad(d.getDate())}/${pad(d.getMonth() + 1)})`,
    };
  });

export const AgendamentoModal: React.FC<AgendamentoModalProps> = ({
  visible,
  onClose,
  servicoId,
  oficinaId,
  servicoNome,
  preco,
  onConfirmar,
}) => {
  const dias = useMemo(gerarDias, [visible]);
  const [diaSelecionado, setDiaSelecionado] = useState(dias[0]);
  const [horarioSelecionado, setHorarioSelecionado] = useState(HORARIOS_DISPONIVEIS[1]);
  const [observacao, setObservacao] = useState('');
  const [veiculos, setVeiculos] = useState<VeiculoApi[]>([]);
  const [veiculoId, setVeiculoId] = useState<string | null>(null);
  const [loadingVeiculos, setLoadingVeiculos] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setDiaSelecionado(gerarDias()[0]);
    setLoadingVeiculos(true);
    veiculoService
      .listarMeus()
      .then((lista) => {
        setVeiculos(lista);
        setVeiculoId((atual) => atual ?? lista[0]?.id ?? null);
      })
      .catch(() => setVeiculos([]))
      .finally(() => setLoadingVeiculos(false));
  }, [visible]);

  const handleFinalizar = async () => {
    if (!veiculoId) {
      Alert.alert('Atenção', 'Cadastre um veículo na Garagem antes de agendar.');
      return;
    }
    setEnviando(true);
    try {
      await agendamentoService.criar({
        oficinaId,
        veiculoId,
        dataHora: `${diaSelecionado.iso}T${horarioSelecionado}:00`,
        servicoIds: [servicoId],
      });
      Alert.alert(
        'Agendamento Solicitado!',
        `Seu agendamento para ${diaSelecionado.label} às ${horarioSelecionado} foi enviado com sucesso.`,
        [{ text: 'OK', onPress: onConfirmar }]
      );
    } catch (e: any) {
      Alert.alert('Não foi possível agendar', e?.message || 'Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Agendar Serviço</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Seleção do Veículo */}
            <Text style={styles.label}>Selecione o Veículo</Text>
            {loadingVeiculos && <ActivityIndicator color={theme.colors.primary} />}
            {!loadingVeiculos && veiculos.length === 0 && (
              <Card style={styles.veiculoCard}>
                <Text style={styles.veiculoSub}>Nenhum veículo cadastrado. Adicione um na aba Garagem.</Text>
              </Card>
            )}
            {veiculos.map((v) => (
              <TouchableOpacity key={v.id} activeOpacity={0.8} onPress={() => setVeiculoId(v.id)}>
                <Card
                  style={[
                    styles.veiculoCard,
                    v.id === veiculoId && { borderColor: theme.colors.primary, borderWidth: 2 },
                  ]}
                >
                  <Text style={styles.veiculoTitle}>
                    {v.marca} {v.modelo} ({v.ano})
                  </Text>
                  <Text style={styles.veiculoSub}>Placa: {v.placa}</Text>
                </Card>
              </TouchableOpacity>
            ))}

            {/* Seleção de Data */}
            <Text style={styles.label}>Data Preferencial</Text>
            <View style={styles.chipsRow}>
              {dias.map((dia) => {
                const selected = dia.iso === diaSelecionado.iso;
                return (
                  <TouchableOpacity
                    key={dia.iso}
                    style={[styles.chip, selected && styles.chipSelected]}
                    onPress={() => setDiaSelecionado(dia)}
                  >
                    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                      {dia.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Seleção de Horário */}
            <Text style={styles.label}>Horário Disponível</Text>
            <View style={styles.chipsRow}>
              {HORARIOS_DISPONIVEIS.map((horario) => {
                const selected = horario === horarioSelecionado;
                return (
                  <TouchableOpacity
                    key={horario}
                    style={[styles.chip, selected && styles.chipSelected]}
                    onPress={() => setHorarioSelecionado(horario)}
                  >
                    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                      {horario}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Observações */}
            <Input
              label="Observação para o Mecânico (Opcional)"
              placeholder="Ex: Barulho ao frear em descidas..."
              value={observacao}
              onChangeText={setObservacao}
            />

            {/* Resumo do Pedido */}
            <View style={styles.summaryBox}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Serviço:</Text>
                <Text style={styles.summaryValue}>{servicoNome}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total Estimado:</Text>
                <Text style={[styles.summaryValue, { color: theme.colors.primary }]}>
                  {formatCurrency(preco)}
                </Text>
              </View>
            </View>

            <Button
              title={enviando ? 'Enviando...' : 'Confirmar Agendamento'}
              variant="primary"
              style={styles.confirmButton}
              onPress={enviando ? () => {} : handleFinalizar}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};