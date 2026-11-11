import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Input } from '../../../components/common/Input';
import { Card } from '../../../components/common/Card';
import { theme } from '../../../config/theme';
import { HomeStackParamList } from '../../../types';
import { oficinaService, OficinaApi } from '../../../services/oficinaService';
import { formatCnpj } from '../../../utils/formatters';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeList'>;

const CATEGORIAS = [
  { id: '1', name: 'Freios', icon: 'disc-outline' },
  { id: '2', name: 'Troca de Óleo', icon: 'water-outline' },
  { id: '3', name: 'Revisão', icon: 'build-outline' },
  { id: '4', name: 'Baterias', icon: 'flash-outline' },
  { id: '5', name: 'Pneus', icon: 'car-sport-outline' },
  { id: '6', name: 'Ar Cond.', icon: 'snow-outline' },
];

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [busca, setBusca] = useState('');
  const [oficinas, setOficinas] = useState<OficinaApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  const carregar = () => {
    setLoading(true);
    setErro('');
    oficinaService
      .listar()
      .then(setOficinas)
      .catch((e) => setErro(e?.message || 'Erro ao carregar oficinas.'))
      .finally(() => setLoading(false));
  };

  useEffect(carregar, []);

  const filtradas = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return oficinas;
    return oficinas.filter(
      (o) =>
        o.nomeFantasia?.toLowerCase().includes(q) ||
        o.razaoSocial?.toLowerCase().includes(q) ||
        o.cidade?.toLowerCase().includes(q) ||
        o.bairro?.toLowerCase().includes(q)
    );
  }, [oficinas, busca]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerAddress}>
        <Ionicons name="location-sharp" size={18} color={theme.colors.primary} />
        <View style={{ marginLeft: 6 }}>
          <Text style={styles.addressLabel}>Atendendo em</Text>
          <Text style={styles.addressValue}>São Paulo, SP - Centro ▾</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Input
          placeholder="Busque por prestadores ou serviços..."
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerScroll}>
          <View style={styles.promoBanner}>
            <Text style={styles.bannerTitle}>Revisão de Férias 🛠️</Text>
            <Text style={styles.bannerSubtitle}>Até 20% de desconto em parceiros</Text>
          </View>
          <View style={[styles.promoBanner, { backgroundColor: theme.colors.secondary }]}>
            <Text style={styles.bannerTitle}>Garagem Virtual 🚗</Text>
            <Text style={styles.bannerSubtitle}>Mantenha seu histórico auditável e seguro</Text>
          </View>
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categorias</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryCircle} activeOpacity={0.7}>
              <View style={styles.categoryIconBox}>
                <Ionicons name={cat.icon as any} size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Prestadores Próximos</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.workshopsList}>
          {loading && <ActivityIndicator style={{ marginTop: 24 }} color={theme.colors.primary} />}

          {!loading && !!erro && (
            <TouchableOpacity onPress={carregar} style={{ padding: 16 }}>
              <Text style={{ color: theme.colors.error, textAlign: 'center' }}>{erro}{'\n'}Toque para tentar novamente</Text>
            </TouchableOpacity>
          )}

          {!loading && !erro && filtradas.length === 0 && (
            <Text style={{ textAlign: 'center', color: theme.colors.textSecondary, marginTop: 24 }}>
              Nenhuma oficina encontrada.
            </Text>
          )}

          {filtradas.map((item) => (
            <Card
              key={item.id}
              style={styles.card}
              onPress={() => navigation.navigate('OficinaDetalhes', { oficinaId: item.id })}
            >
              <View style={styles.cardHeader}>
                <View style={styles.workshopLogo}>
                  <Text style={styles.workshopLogoText}>{item.nomeFantasia.substring(0, 2).toUpperCase()}</Text>
                </View>

                <View style={styles.workshopInfo}>
                  <Text style={styles.workshopName}>{item.nomeFantasia}</Text>
                  <View style={styles.ratingRow}>
                    <Text style={styles.distanceText}>
                      {[item.bairro, item.cidade].filter(Boolean).join(' • ')}
                      {item.cnpj ? ` • CNPJ ${formatCnpj(item.cnpj)}` : ''}
                    </Text>
                  </View>
                  <View style={styles.badgeVerified}>
                    <Text style={styles.badgeVerifiedText}>Prestador Verificado BARATEX</Text>
                  </View>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};