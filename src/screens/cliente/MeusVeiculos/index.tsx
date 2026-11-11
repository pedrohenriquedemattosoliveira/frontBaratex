import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../../components/common/Button';
import { Card } from '../../../components/common/Card';
import { theme } from '../../../config/theme';
import { formatKm } from '../../../utils/formatters';
import { styles } from './styles';

const MOCK_VEICULOS = [
  {
    id: '1',
    marca: 'Chevrolet',
    modelo: 'Onix 1.0 Turbo',
    ano: 2022,
    placa: 'ABC-1234',
    quilometragem: 45000,
    principal: true,
  },
  {
    id: '2',
    marca: 'Honda',
    modelo: 'Civic 2.0 EXL',
    ano: 2020,
    placa: 'XYZ-9876',
    quilometragem: 62000,
    principal: false,
  },
];

export const MeusVeiculosScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerNav}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Veículos</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          data={MOCK_VEICULOS}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card style={styles.vehicleCard}>
              <View style={styles.cardHeader}>
                <View style={styles.carIconBox}>
                  <Ionicons name="car-sport" size={24} color={theme.colors.primary} />
                </View>
                <View style={styles.vehicleMainInfo}>
                  <Text style={styles.vehicleModel}>{item.marca} {item.modelo}</Text>
                  <Text style={styles.vehiclePlate}>Placa: {item.placa}</Text>
                  {item.principal && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultBadgeText}>Veículo Principal</Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailText}>Ano: {item.ano}</Text>
                <Text style={styles.detailText}>KM: {formatKm(item.quilometragem)}</Text>
              </View>
            </Card>
          )}
        />

        <Button
          title="+ Cadastrar Novo Veículo"
          variant="primary"
          style={styles.addButton}
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};