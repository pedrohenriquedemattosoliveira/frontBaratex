import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { Card } from '../../../components/common/Card';
import { theme } from '../../../config/theme';
import { styles } from './styles';

const MOCK_AGENDAMENTOS_HOJE = [
  {
    id: 1,
    horario: '08:30',
    cliente: 'Pedro Silva',
    veiculo: 'Chevrolet Onix (ABC1D23)',
    servico: 'Troca de Pastilhas de Freio',
    status: 'EM_ANDAMENTO',
  },
  {
    id: 2,
    horario: '10:00',
    cliente: 'Mariana Costa',
    veiculo: 'Hyundai HB20 (FGH4I56)',
    servico: 'Troca de Óleo e Filtro',
    status: 'AGUARDANDO',
  },
  {
    id: 3,
    horario: '14:00',
    cliente: 'Carlos Eduardo',
    veiculo: 'Honda Civic (XYZ9876)',
    servico: 'Alinhamento e Balanceamento',
    status: 'AGUARDANDO',
  },
  {
    id: 4,
    horario: '16:30',
    cliente: 'Fernanda Lima',
    veiculo: 'VW Gol (KLM3O45)',
    servico: 'Revisão de Ar Condicionado',
    status: 'CONCLUIDO',
  },
];

export const PrestadorAgendamentosScreen = () => {
  const dataHoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Agenda do Dia</Text>
          <Text style={styles.dateBadgeText}>{dataHoje}</Text>
        </View>

        <View style={styles.webBannerCard}>
          <Text style={styles.webBannerTitle}>Painel Web do Prestador</Text>
          <Text style={styles.webBannerText}>
            Acesse baratex.com.br no computador para cadastrar serviços, alterar dados do negócio e acessar relatórios completos.
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryNumber}>{MOCK_AGENDAMENTOS_HOJE.length}</Text>
            <Text style={styles.summaryLabel}>Total Hoje</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={[styles.summaryNumber, { color: theme.colors.primary }]}>
              {MOCK_AGENDAMENTOS_HOJE.filter(i => i.status === 'EM_ANDAMENTO').length}
            </Text>
            <Text style={styles.summaryLabel}>Em Andamento</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={[styles.summaryNumber, { color: theme.colors.success }]}>
              {MOCK_AGENDAMENTOS_HOJE.filter(i => i.status === 'CONCLUIDO').length}
            </Text>

            <Text style={styles.summaryLabel}>Concluídos</Text>
          </View>
        </View>

        <FlatList
          data={MOCK_AGENDAMENTOS_HOJE}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Nenhum agendamento marcado para hoje.</Text>
            </View>
          }
          renderItem={({ item }) => {
            let statusBg = '#FEF3C7';
            let statusColor = '#D97706';
            let statusLabel = 'Aguardando';

            if (item.status === 'EM_ANDAMENTO') {
              statusBg = '#EFF6FF';
              statusColor = theme.colors.primary;
              statusLabel = 'Em Andamento';
            } else if (item.status === 'CONCLUIDO') {
              statusBg = '#DCFCE7';
              statusColor = theme.colors.success;
              statusLabel = 'Concluído';
            }

            return (
              <Card style={styles.card}>
                <View style={styles.timeRow}>
                  <Text style={styles.timeText}>{item.horario}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
                    <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
                  </View>
                </View>

                <Text style={styles.clientName}>{item.cliente}</Text>
                <Text style={styles.carDetail}>{item.veiculo}</Text>
                <Text style={styles.serviceName}>{item.servico}</Text>
              </Card>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};