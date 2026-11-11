import React from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../../../components/common/Card';
import { theme } from '../../../config/theme';
import { styles } from './styles';

const MOCK_NOTIFICACOES = [
  {
    id: '1',
    titulo: 'Manutenção Registrada!',
    mensagem: 'Auto Center Silva adicionou um novo registro autenticado para o veículo Onix (ABC1D23).',
    data: 'Hoje às 14:30',
  },
  {
    id: '2',
    titulo: 'Lembrete de Agendamento',
    mensagem: 'Seu agendamento para Troca de Óleo é hoje às 14:00.',
    data: 'Hoje às 08:00',
  },
  {
    id: '3',
    titulo: 'Alerta da Garagem Virtual',
    mensagem: 'Já se passaram 6 meses desde a última revisão do seu Chevrolet Onix. Que tal agendar uma verificação?',
    data: '12/10/2026',
  },
];

export const NotificacoesScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerNav}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          data={MOCK_NOTIFICACOES}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <View style={styles.notifHeader}>
                <Text style={styles.notifTitle}>{item.titulo}</Text>
                <Text style={styles.notifDate}>{item.data}</Text>
              </View>
              <Text style={styles.notifBody}>{item.mensagem}</Text>
            </Card>
          )}
        />
      </View>
    </SafeAreaView>
  );
};