import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { theme } from '../../../config/theme';
import { HomeStackParamList } from '../../../types';
import { styles } from './styles';

type RouteProps = RouteProp<HomeStackParamList, 'AgendamentoCheckout'>;

export const AgendamentoCheckoutScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();
  const params = route.params || {};

  const servicoNome = params.servicoNome || 'Revisão Geral';
  const valor = params.valor || 180.00;

  const [veiculoSel, setVeiculoSel] = useState(1);
  const [dataSel, setDataSel] = useState('HOJE');
  const [horaSel, setHoraSel] = useState('14:00');

  const handleFinalizar = () => {
    Alert.alert(
      'Agendamento Confirmado!',
      `Serviço: ${servicoNome}\nData/Hora: ${dataSel === 'HOJE' ? 'Hoje' : 'Amanhã'} às ${horaSel}\nO pagamento será realizado diretamente ao prestador.`,
      [
        {
          text: 'Acompanhar Status',
          onPress: () => navigation.navigate('StatusServico', { agendamentoId: 99 }),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerNav}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agendar Serviço</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Serviço Selecionado</Text>
          <Text style={styles.serviceName}>{servicoNome}</Text>
          <Text style={styles.servicePrice}>R$ {valor.toFixed(2)}</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Selecione o Veículo</Text>
          <View style={styles.selectorRow}>
            <TouchableOpacity
              style={[styles.optionButton, veiculoSel === 1 && styles.optionButtonSelected]}
              onPress={() => setVeiculoSel(1)}
            >
              <Text style={[styles.optionText, veiculoSel === 1 && styles.optionTextSelected]}>Onix (ABC1D23)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionButton, veiculoSel === 2 && styles.optionButtonSelected]}
              onPress={() => setVeiculoSel(2)}
            >
              <Text style={[styles.optionText, veiculoSel === 2 && styles.optionTextSelected]}>Civic (XYZ9876)</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Data e Horário</Text>
          <View style={styles.selectorRow}>
            {['HOJE', 'AMANHÃ'].map((d) => (
              <TouchableOpacity
                key={d}
                style={[styles.optionButton, dataSel === d && styles.optionButtonSelected]}
                onPress={() => setDataSel(d)}
              >
                <Text style={[styles.optionText, dataSel === d && styles.optionTextSelected]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.selectorRow, { marginTop: 8 }]}>
            {['09:00', '14:00', '16:30'].map((h) => (
              <TouchableOpacity
                key={h}
                style={[styles.optionButton, horaSel === h && styles.optionButtonSelected]}
                onPress={() => setHoraSel(h)}
              >
                <Text style={[styles.optionText, horaSel === h && styles.optionTextSelected]}>{h}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <View style={{ backgroundColor: '#F8FAFC', padding: 12, borderRadius: 8, marginBottom: 16 }}>
          <Text style={{ fontSize: 12, color: theme.colors.textSecondary, textAlign: 'center' }}>
            O valor do serviço será acertado diretamente no local do atendimento.
          </Text>
        </View>

        <Button title="Confirmar Agendamento" variant="primary" style={styles.confirmButton} onPress={handleFinalizar} />
      </ScrollView>
    </SafeAreaView>
  );
};