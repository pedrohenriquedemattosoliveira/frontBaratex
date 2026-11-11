import React from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Card } from '../../../components/common/Card';
import { theme } from '../../../config/theme';
import { formatKm, formatCnpj, formatPlaca } from '../../../utils/formatters';
import { RegistroGaragemVirtual, GaragemStackParamList } from '../../../types';
import { styles } from './styles';

type RouteProps = RouteProp<GaragemStackParamList, 'HistoricoVeiculo'>;

const MOCK_TODOS_REGISTROS: RegistroGaragemVirtual[] = [
  {
    id: 1,
    veiculo_id: 101,
    data_registro: '15/02/2026',
    quilometragem: 45000,
    observacao_tecnica: 'Substituição das pastilhas dianteiras e sangria do sistema de freios.',
    prestador_nome: 'Auto Center Silva',
    prestador_cnpj: '12345678000195',
    hash_validacao: 'a1b2c3d4e5f67890123456789abcdef0',
    servicos_executados: ['Troca de Pastilhas de Freio', 'Fluido de Freio'],
  },
  {
    id: 2,
    veiculo_id: 101,
    data_registro: '10/10/2025',
    quilometragem: 35000,
    observacao_tecnica: 'Troca de óleo sintético 5W30 e filtro de combustível.',
    prestador_nome: 'Speed Auto Elétrica',
    prestador_cnpj: '98765432000110',
    hash_validacao: 'f9e8d7c6b5a432109876543210fedcba',
    servicos_executados: ['Troca de Óleo', 'Filtro de Óleo'],
  },
  {
    id: 3,
    veiculo_id: 102,
    data_registro: '05/01/2026',
    quilometragem: 62000,
    observacao_tecnica: 'Alinhamento 3D e substituição de 2 pneus dianteiros.',
    prestador_nome: 'Auto Center Silva',
    prestador_cnpj: '12345678000195',
    hash_validacao: '777a888b999c000d111e222f33344455',
    servicos_executados: ['Alinhamento 3D', 'Balanceamento'],
  },
];

export const HistoricoVeiculoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  
  const params = route.params || {};
  const veiculoId = params.veiculoId ?? 101;
  const modelo = params.modelo ?? 'Veículo';
  const placa = params.placa ?? 'ABC1D23';

  const historicoFiltrado = MOCK_TODOS_REGISTROS.filter((r) => r.veiculo_id === veiculoId);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerNav}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{modelo}</Text>
          <Text style={styles.headerSubtitle}>Placa: {formatPlaca ? formatPlaca(placa) : placa}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <FlatList
          data={historicoFiltrado}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Nenhuma manutenção registrada para este veículo ainda.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>✓ Registro Autenticado BARATEX</Text>
              </View>

              <Text style={styles.prestadorTitle}>{item.prestador_nome}</Text>
              <Text style={styles.cnpj}>CNPJ: {formatCnpj ? formatCnpj(item.prestador_cnpj) : item.prestador_cnpj}</Text>
              <Text style={styles.info}>Data: {item.data_registro} | KM: {formatKm ? formatKm(item.quilometragem) : item.quilometragem}</Text>

              <Text style={styles.sectionLabel}>Serviços Executados:</Text>
              {item.servicos_executados.map((s, idx) => (
                <Text key={idx} style={styles.servicoItem}>• {s}</Text>
              ))}

              <Text style={styles.sectionLabel}>Parecer Técnico:</Text>
              <Text style={styles.obs}>{item.observacao_tecnica}</Text>

              <View style={styles.hashBox}>
                <Text style={styles.hashLabel}>Hash de Validação (Assinatura Digital):</Text>
                <Text style={styles.hashValue} numberOfLines={1}>{item.hash_validacao}</Text>
              </View>
            </Card>
          )}
        />
      </View>
    </SafeAreaView>
  );
};