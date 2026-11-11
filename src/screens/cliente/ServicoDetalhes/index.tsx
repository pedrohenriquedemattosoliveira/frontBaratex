import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AgendamentoModal } from '../../../components/AgendamentoModal';
import { Button } from '../../../components/common/Button';
import { theme } from '../../../config/theme';
import { HomeStackParamList } from '../../../types';
import { OficinaApi, ServicoApi, oficinaService } from '../../../services/oficinaService';
import { formatCurrency } from '../../../utils/formatters';
import { styles } from './styles';

type RouteProps = RouteProp<HomeStackParamList, 'ServicoDetalhes'>;

export const ServicoDetalhesScreen = () => {
  const navigation = useNavigation();
  const { servicoId, oficinaId } = useRoute<RouteProps>().params;
  const [modalVisible, setModalVisible] = useState(false);
  const [servico, setServico] = useState<ServicoApi | null>(null);
  const [oficina, setOficina] = useState<OficinaApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    // A API lista servicos por oficina; localizamos o servico selecionado na lista.
    Promise.all([oficinaService.servicos(oficinaId), oficinaService.buscar(oficinaId)])
      .then(([lista, of]) => {
        setServico(lista.find((x) => x.id === servicoId) ?? null);
        setOficina(of);
      })
      .catch((e) => setErro(e?.message || 'Erro ao carregar o serviço.'))
      .finally(() => setLoading(false));
  }, [servicoId, oficinaId]);

  const preco = Number(servico?.precoBase ?? 0);

  const handleSucessoAgendamento = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerNav}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color={theme.colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.heroImagePlaceholder}>
          <Ionicons name="disc-outline" size={64} color={theme.colors.primary} />
        </View>

        {loading && <ActivityIndicator style={{ marginTop: 24 }} color={theme.colors.primary} />}
        {!loading && (erro || !servico) && (
          <Text style={{ color: theme.colors.error, textAlign: 'center', margin: 16 }}>
            {erro || 'Serviço não encontrado.'}
          </Text>
        )}

        {!!servico && (
          <>
            <Text style={styles.heroTitle}>{servico.nome}</Text>
            {!!oficina && <Text style={styles.soldCount}>Oferecido por {oficina.nomeFantasia}</Text>}

            <View style={styles.priceBox}>
              <Text style={styles.currentPrice}>{formatCurrency(preco)}</Text>

              <View style={styles.badgeTrustRow}>
                <Ionicons name="car" size={16} color={theme.colors.primary} />
                <Text style={styles.badgeTrustText}>Registro automático na Garagem Virtual</Text>
              </View>
            </View>

            {!!servico.descricao && (
              <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Sobre o serviço</Text>
                <Text style={styles.infoDescription}>{servico.descricao}</Text>
              </View>
            )}

            {!!servico.tempoEstimadoMinutos && (
              <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Tempo estimado</Text>
                <Text style={styles.infoDescription}>
                  Aproximadamente {servico.tempoEstimadoMinutos} minutos na oficina.
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      <View style={styles.footerStickyBar}>
        <View>
          <Text style={styles.footerPriceLabel}>Total Estimado</Text>
          <Text style={styles.footerPriceValue}>{formatCurrency(preco)}</Text>
        </View>
        <Button
          title="Agendar Serviço"
          variant="primary"
          style={styles.footerButton}
          onPress={() => servico && setModalVisible(true)}
        />
      </View>

      {/* Modal de Agendamento */}
      <AgendamentoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        servicoId={servicoId}
        oficinaId={oficinaId}
        servicoNome={servico?.nome ?? ''}
        preco={preco}
        onConfirmar={handleSucessoAgendamento}
      />
    </SafeAreaView>
  );
};