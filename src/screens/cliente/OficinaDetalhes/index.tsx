import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../../components/common/Button';
import { HomeStackParamList } from '../../../types';
import { formatCnpj, formatCurrency } from '../../../utils/formatters';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'OficinaDetalhes'>;
type RouteProps = RouteProp<HomeStackParamList, 'OficinaDetalhes'>;

const MOCK_SERVICOS = [
  { id: 101, nome: 'Troca de Pastilhas de Freio', descricao: 'Inclui pastilhas dianteiras e mão de obra', preco: 180.00 },
  { id: 102, nome: 'Troca de Óleo + Filtro', descricao: 'Óleo Sintético 5W30 + Filtro de óleo', preco: 220.00 },
  { id: 103, nome: 'Alinhamento e Balanceamento', descricao: 'Alinhamento 3D + Balanceamento 4 rodas', preco: 120.00 },
];

export const OficinaDetalhesScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { oficinaId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.bannerHeader}>
          <TouchableOpacity style={styles.headerNav} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <View style={styles.backButton}>
              <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.storeProfileCard}>
          <View style={styles.storeHeaderRow}>
            <View style={styles.storeAvatar}>
              <Text style={styles.storeAvatarText}>AC</Text>
            </View>
            <View style={styles.storeMainInfo}>
              <Text style={styles.storeName}>Auto Center Silva</Text>
              <Text style={styles.cnpjText}>CNPJ: {formatCnpj('12345678000195')}</Text>
              <View style={styles.badgeRow}>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedBadgeText}>Oficina Líder BARATEX</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>★ 4.8</Text>
              <Text style={styles.statLabel}>Avaliação</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>+250</Text>
              <Text style={styles.statLabel}>Atendimentos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>15 min</Text>
              <Text style={styles.statLabel}>Tempo de Resposta</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Serviços Oferecidos</Text>

        {MOCK_SERVICOS.map((servico) => (
          <TouchableOpacity
            key={servico.id}
            style={styles.serviceCard}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ServicoDetalhes', { servicoId: servico.id, oficinaId })}
          >
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceTitle}>{servico.nome}</Text>
              <Text style={styles.serviceDescription}>{servico.descricao}</Text>
              <Text style={styles.servicePrice}>{formatCurrency(servico.preco)}</Text>
            </View>
            <Button
              title="Ver"
              variant="outline"
              style={styles.actionButton}
              onPress={() => navigation.navigate('ServicoDetalhes', { servicoId: servico.id, oficinaId })}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};