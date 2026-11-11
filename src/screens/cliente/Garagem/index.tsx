import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../../components/common/Card';
import { theme } from '../../../config/theme';
import { GaragemStackParamList } from '../../../types';
import { formatKm, formatPlaca } from '../../../utils/formatters';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<GaragemStackParamList, 'GaragemList'>;

const MOCK_MEUS_CARROS = [
  {
    id: 101,
    marca: 'Chevrolet',
    modelo: 'Onix 1.0 Turbo',
    ano: 2022,
    placa: 'ABC1D23',
    quilometragem: 45000,
    totalManutencoes: 3,
  },
  {
    id: 102,
    marca: 'Honda',
    modelo: 'Civic 2.0 EXL',
    ano: 2020,
    placa: 'XYZ9876',
    quilometragem: 62000,
    totalManutencoes: 1,
  },
];

export const GaragemScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Cabeçalho com o botão redondo de adicionar veículo ao lado do título */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Garagem Virtual</Text>

          <TouchableOpacity
            style={styles.addVehicleRoundButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('CadastroVeiculo')}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="car-sport" size={18} color="#FFFFFF" />
              <Ionicons name="add" size={14} color="#FFFFFF" style={{ marginLeft: -2 }} />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>
          Selecione um veículo para consultar o histórico de manutenções
        </Text>
        <FlatList
          data={MOCK_MEUS_CARROS}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }} // Espaço extra para a TabBar flutuante
          renderItem={({ item }) => (
            <Card
              style={styles.carCard}
              onPress={() =>
                navigation.navigate('HistoricoVeiculo', {
                  veiculoId: item.id,
                  modelo: `${item.marca} ${item.modelo}`,
                  placa: item.placa,
                })
              }
            >
              <View style={styles.carHeader}>
                <View style={styles.carIconBox}>
                  <Ionicons name="car-sport" size={26} color={theme.colors.primary} />
                </View>

                <View style={styles.carInfo}>
                  <Text style={styles.carName}>{item.marca} {item.modelo} ({item.ano})</Text>
                  <Text style={styles.carPlate}>Placa: {formatPlaca(item.placa)}</Text>
                  <Text style={styles.carKm}>KM atual: {formatKm(item.quilometragem)}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.historyBadgeText}>
                  📋 {item.totalManutencoes} registro(s) de manutenção
                </Text>
                <Ionicons name="chevron-forward" size={18} color={theme.colors.primary} />
              </View>
            </Card>
          )}
        />
      </View>
    </SafeAreaView>
  );
};