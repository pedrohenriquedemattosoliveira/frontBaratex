import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Input } from '../../../components/common/Input';
import { Card } from '../../../components/common/Card';
import { theme } from '../../../config/theme';
import { Prestador, HomeStackParamList } from '../../../types';
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

const MOCK_PRESTADORES: Prestador[] = [
  {
    id: 1,
    razao_social: 'Oficina Mecânica Silva LTDA',
    nome_fantasia: 'Auto Center Silva',
    cnpj: '12345678000195',
    latitude: -23.55052,
    longitude: -46.633308,
    distancia_km: 1.2,
    avaliacao: 4.8,
    endereco: 'Rua das Flores, 123 - Centro',
    especialidades: ['Freios', 'Suspensão', 'Troca de Óleo'],
  },
  {
    id: 2,
    razao_social: 'Mecânica e Elétrica Speed LTDA',
    nome_fantasia: 'Speed Auto Elétrica',
    cnpj: '98765432000110',
    latitude: -23.55152,
    longitude: -46.634308,
    distancia_km: 3.5,
    avaliacao: 4.5,
    endereco: 'Av. Brasil, 450 - Jardim América',
    especialidades: ['Injeção Eletrônica', 'Baterias', 'Ar Condicionado'],
  },
];

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [busca, setBusca] = useState('');

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
          {MOCK_PRESTADORES.map((item) => (
            <Card
              key={item.id}
              style={styles.card}
              onPress={() => navigation.navigate('OficinaDetalhes', { oficinaId: item.id })}
            >
              <View style={styles.cardHeader}>
                <View style={styles.workshopLogo}>
                  <Text style={styles.workshopLogoText}>{item.nome_fantasia.substring(0, 2)}</Text>
                </View>

                <View style={styles.workshopInfo}>
                  <Text style={styles.workshopName}>{item.nome_fantasia}</Text>
                  <View style={styles.ratingRow}>
                    <Text style={styles.ratingText}>★ {item.avaliacao}</Text>
                    <Text style={styles.distanceText}>• {item.distancia_km} km • CNPJ {formatCnpj(item.cnpj)}</Text>
                  </View>
                  <View style={styles.badgeVerified}>
                    <Text style={styles.badgeVerifiedText}>Prestador Verificado BARATEX</Text>
                  </View>
                </View>
              </View>

              <View style={styles.servicesSummary}>
                <Text style={styles.priceStarting}>Serviços a partir de</Text>
                <Text style={styles.priceValue}>R$ 80,00</Text>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};