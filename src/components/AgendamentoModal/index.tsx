import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { theme } from '../../config/theme';
import { formatCurrency } from '../../utils/formatters';
import { styles } from './styles';

interface AgendamentoModalProps {
  visible: boolean;
  onClose: () => void;
  servicoNome: string;
  preco: number;
  onConfirmar: () => void;
}

const DIAS_DISPONIVEIS = ['Hoje (22/10)', 'Amanhã (23/10)', 'Sáb (24/10)'];
const HORARIOS_DISPONIVEIS = ['08:30', '10:00', '14:00', '16:00'];

export const AgendamentoModal: React.FC<AgendamentoModalProps> = ({
  visible,
  onClose,
  servicoNome,
  preco,
  onConfirmar,
}) => {
  const [diaSelecionado, setDiaSelecionado] = useState(DIAS_DISPONIVEIS[0]);
  const [horarioSelecionado, setHorarioSelecionado] = useState(HORARIOS_DISPONIVEIS[1]);
  const [observacao, setObservacao] = useState('');

  const handleFinalizar = () => {
    Alert.alert(
      'Agendamento Solicitado!',
      `Seu agendamento para ${diaSelecionado} às ${horarioSelecionado} foi enviado com sucesso.`,
      [{ text: 'OK', onPress: onConfirmar }]
    );
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
            <Card style={styles.veiculoCard}>
              <Text style={styles.veiculoTitle}>Chevrolet Onix 1.0 Turbo (2022)</Text>
              <Text style={styles.veiculoSub}>Placa: ABC-1234 • 45.000 km</Text>
            </Card>

            {/* Seleção de Data */}
            <Text style={styles.label}>Data Preferencial</Text>
            <View style={styles.chipsRow}>
              {DIAS_DISPONIVEIS.map((dia) => {
                const selected = dia === diaSelecionado;
                return (
                  <TouchableOpacity
                    key={dia}
                    style={[styles.chip, selected && styles.chipSelected]}
                    onPress={() => setDiaSelecionado(dia)}
                  >
                    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                      {dia}
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
              title="Confirmar Agendamento"
              variant="primary"
              style={styles.confirmButton}
              onPress={handleFinalizar}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};