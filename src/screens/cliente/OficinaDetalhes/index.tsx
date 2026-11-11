import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../../components/common/Button';
import { HomeStackParamList } from '../../../types';
import { OficinaApi, ServicoApi, oficinaService } from '../../../services/oficinaService';
import { theme } from '../../../config/theme';
import { formatCnpj, formatCurrency } from '../../../utils/formatters';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'OficinaDetalhes'>;
type RouteProps = RouteProp<HomeStackParamList, 'OficinaDetalhes'>;

export const OficinaDetalhesScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { oficinaId } = route.params;

  const [oficina, setOficina] = useState<OficinaApi | null>(null);
  const [servicos, setServicos] = useState<ServicoApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    Promise.all([oficinaService.buscar(oficinaId), oficinaService.servicos(oficinaId)])
      .then(([o, sv]) => {
        setOficina(o);
        setServicos(sv);
      })
      .catch((e) => setErro(e?.message || 'Erro ao carregar a oficina.'))
      .finally(() => setLoading(false));
  }, [oficinaId]);

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
              <Text style={styles.storeAvatarText}>{(oficina?.nomeFantasia ?? '').substring(0, 2).toUpperCase()}</Text>
            </View>
            <View style={styles.storeMainInfo}>
              <Text style={styles.storeName}>{oficina?.nomeFantasia ?? ''}</Text>
              <Text style={styles.cnpjText}>CNPJ: {oficina?.cnpj ? formatCnpj(oficina.cnpj) : '-'}</Text>
              <View style={styles.badgeRow}>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedBadgeText}>Oficina Líder BARATEX</Text>
                </View>
              </View>
            </View>
          </View>

          {!!oficina && (
            <Text style={{ color: theme.colors.textSecondary, fontSize: 13, marginTop: 12 }}>
              {[oficina.logradouro, oficina.numero].filter(Boolean).join(', ')}
              {oficina.bairro ? ` - ${oficina.bairro}` : ''}
              {oficina.cidade ? `, ${oficina.cidade}` : ''}
              {oficina.estado ? `/${oficina.estado}` : ''}
            </Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>Serviços Oferecidos</Text>

        {loading && <ActivityIndicator style={{ marginTop: 24 }} color={theme.colors.primary} />}
        {!loading && !!erro && (
          <Text style={{ color: theme.colors.error, textAlign: 'center', margin: 16 }}>{erro}</Text>
        )}
        {!loading && !erro && servicos.length === 0 && (
          <Text style={{ color: theme.colors.textSecondary, textAlign: 'center', margin: 16 }}>
            Esta oficina ainda não cadastrou serviços.
          </Text>
        )}

        {servicos.map((servico) => (
          <TouchableOpacity
            key={servico.id}
            style={styles.serviceCard}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ServicoDetalhes', { servicoId: servico.id, oficinaId })}
          >
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceTitle}>{servico.nome}</Text>
              {!!servico.descricao && <Text style={styles.serviceDescription}>{servico.descricao}</Text>}
              <Text style={styles.servicePrice}>{formatCurrency(Number(servico.precoBase))}</Text>
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