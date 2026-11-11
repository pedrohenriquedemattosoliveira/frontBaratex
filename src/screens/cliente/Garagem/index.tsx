import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../../components/common/Card';
import { theme } from '../../../config/theme';
import { GaragemStackParamList } from '../../../types';
import { formatPlaca } from '../../../utils/formatters';
import { useVeiculos } from '../../../hooks/use-veiculos';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<GaragemStackParamList, 'GaragemList'>;

export const GaragemScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { veiculos, loading, erro, recarregar } = useVeiculos();

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
        {loading && <ActivityIndicator style={{ marginTop: 24 }} color={theme.colors.primary} />}
        {!loading && !!erro && (
          <TouchableOpacity onPress={recarregar} style={{ padding: 16 }}>
            <Text style={{ color: theme.colors.error, textAlign: 'center' }}>{erro}{'\n'}Toque para tentar novamente</Text>
          </TouchableOpacity>
        )}
        {!loading && !erro && veiculos.length === 0 && (
          <Text style={{ textAlign: 'center', color: theme.colors.textSecondary, marginTop: 24 }}>
            Nenhum veículo cadastrado. Toque no botão acima para adicionar.
          </Text>
        )}
        <FlatList
          data={veiculos}
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
                  {!!item.cor && <Text style={styles.carKm}>Cor: {item.cor}</Text>}
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.historyBadgeText}>📋 Ver histórico de manutenção</Text>
                <Ionicons name="chevron-forward" size={18} color={theme.colors.primary} />
              </View>
            </Card>
          )}
        />
      </View>
    </SafeAreaView>
  );
};