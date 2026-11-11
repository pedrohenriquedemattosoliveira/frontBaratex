import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../../components/common/Button';
import { Card } from '../../../components/common/Card';
import { theme } from '../../../config/theme';
import { useVeiculos } from '../../../hooks/use-veiculos';
import { styles } from './styles';

export const MeusVeiculosScreen = () => {
  const navigation = useNavigation<any>();
  const { veiculos, loading, erro } = useVeiculos();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerNav}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Veículos</Text>
      </View>

      <View style={styles.content}>
        {loading && <ActivityIndicator style={{ marginTop: 24 }} color={theme.colors.primary} />}
        {!loading && !!erro && (
          <Text style={{ color: theme.colors.error, textAlign: 'center', margin: 16 }}>{erro}</Text>
        )}
        <FlatList
          data={veiculos}
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
                </View>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailText}>Ano: {item.ano}</Text>
                {!!item.cor && <Text style={styles.detailText}>Cor: {item.cor}</Text>}
              </View>
            </Card>
          )}
        />

        <Button
          title="+ Cadastrar Novo Veículo"
          variant="primary"
          style={styles.addButton}
          onPress={() => navigation.navigate('Garagem', { screen: 'CadastroVeiculo' })}
        />
      </View>
    </SafeAreaView>
  );
};