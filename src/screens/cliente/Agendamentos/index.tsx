import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { theme } from '../../../config/theme';
import { styles } from './styles';

interface AgendamentoCliente {
  id: number;
  prestadorId: number;
  prestadorNome: string;
  servicoNome: string;
  veiculoModelo: string;
  veiculoPlaca: string;
  dataHora: string;
  valor: number;
  status: 'EM_ANDAMENTO' | 'AGUARDANDO' | 'CONCLUIDO' | 'CANCELADO';
}

const MOCK_AGENDAMENTOS: AgendamentoCliente[] = [
  {
    id: 101,
    prestadorId: 1,
    prestadorNome: 'Auto Center Silva',
    servicoNome: 'Troca de Pastilhas de Freio',
    veiculoModelo: 'Chevrolet Onix 1.0',
    veiculoPlaca: 'ABC1D23',
    dataHora: 'Hoje às 14:00',
    valor: 180.00,
    status: 'EM_ANDAMENTO',
  },
  {
    id: 102,
    prestadorId: 2,
    prestadorNome: 'Speed Auto Elétrica',
    servicoNome: 'Troca de Bateria 60Ah',
    veiculoModelo: 'Honda Civic 2.0',
    veiculoPlaca: 'XYZ9876',
    dataHora: 'Amanhã às 09:30',
    valor: 420.00,
    status: 'AGUARDANDO',
  },
  {
    id: 100,
    prestadorId: 1,
    prestadorNome: 'Auto Center Silva',
    servicoNome: 'Troca de Óleo e Filtro',
    veiculoModelo: 'Chevrolet Onix 1.0',
    veiculoPlaca: 'ABC1D23',
    dataHora: '15/10/2026 às 10:00',
    valor: 220.00,
    status: 'CONCLUIDO',
  },
];

export const AgendamentosScreen = () => {
  const navigation = useNavigation<any>();
  const [filtro, setFiltro] = useState<'ATIVOS' | 'CONCLUIDOS'>('ATIVOS');

  const agendamentosFiltrados = MOCK_AGENDAMENTOS.filter((item) => {
    if (filtro === 'ATIVOS') {
      return item.status === 'EM_ANDAMENTO' || item.status === 'AGUARDANDO';
    }
    return item.status === 'CONCLUIDO' || item.status === 'CANCELADO';
  });

  const handleIrParaStatus = (agendamentoId: number) => {
    navigation.navigate('Busca', {
      screen: 'StatusServico',
      params: { agendamentoId },
    });
  };

  const handleAbrirChat = (prestadorId: number, prestadorNome: string) => {
    navigation.navigate('Busca', {
      screen: 'ChatPrestador',
      params: { prestadorId, prestadorNome },
    });
  };

  const handleAvaliar = (prestadorId: number, prestadorNome: string) => {
    navigation.navigate('Busca', {
      screen: 'AvaliacaoPrestador',
      params: { prestadorId, prestadorNome },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Meus Agendamentos</Text>
          <Text style={styles.subtitle}>Gerencie e acompanhe seus serviços automotivos</Text>
        </View>

        {/* Filtros em Abas */}
        <View style={styles.filterTabs}>
          <TouchableOpacity
            style={[styles.tabButton, filtro === 'ATIVOS' && styles.tabButtonActive]}
            activeOpacity={0.8}
            onPress={() => setFiltro('ATIVOS')}
          >
            <Text style={[styles.tabText, filtro === 'ATIVOS' && styles.tabTextActive]}>Em Andamento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, filtro === 'CONCLUIDOS' && styles.tabButtonActive]}
            activeOpacity={0.8}
            onPress={() => setFiltro('CONCLUIDOS')}
          >
            <Text style={[styles.tabText, filtro === 'CONCLUIDOS' && styles.tabTextActive]}>Histórico</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Agendamentos */}
        <FlatList
          data={agendamentosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }} // Espaço extra para a TabBar flutuante
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Nenhum agendamento encontrado nesta categoria.</Text>
            </View>
          }
          renderItem={({ item }) => {
            let statusBg = '#EFF6FF';
            let statusColor = theme.colors.primary;
            let statusLabel = 'Em Andamento';

            if (item.status === 'AGUARDANDO') {
              statusBg = '#FEF3C7';
              statusColor = '#D97706';
              statusLabel = 'Aguardando';
            } else if (item.status === 'CONCLUIDO') {
              statusBg = '#DCFCE7';
              statusColor = theme.colors.success;
              statusLabel = 'Concluído';
            }

            return (
              <Card style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.prestadorName}>{item.prestadorNome}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
                    <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
                  </View>
                </View>

                <Text style={styles.serviceName}>{item.servicoNome}</Text>
                <Text style={styles.carInfo}>Veículo: {item.veiculoModelo} ({item.veiculoPlaca})</Text>
                <Text style={styles.dateTime}>Data/Hora: {item.dataHora} • R$ {item.valor.toFixed(2)}</Text>

                <View style={styles.divider} />

                <View style={styles.actionsRow}>
                  {item.status !== 'CONCLUIDO' ? (
                    <>
                      <Button
                        title="Ver Status"
                        variant="primary"
                        style={styles.actionButton}
                        onPress={() => handleIrParaStatus(item.id)}
                      />
                      <Button
                        title="Chat"
                        variant="outline"
                        style={styles.actionButton}
                        onPress={() => handleAbrirChat(item.prestadorId, item.prestadorNome)}
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        title="Avaliar"
                        variant="primary"
                        style={styles.actionButton}
                        onPress={() => handleAvaliar(item.prestadorId, item.prestadorNome)}
                      />
                      <Button
                        title="Mensagens"
                        variant="outline"
                        style={styles.actionButton}
                        onPress={() => handleAbrirChat(item.prestadorId, item.prestadorNome)}
                      />
                    </>
                  )}
                </View>
              </Card>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};