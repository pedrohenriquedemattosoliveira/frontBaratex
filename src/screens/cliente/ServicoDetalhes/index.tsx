import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AgendamentoModal } from '../../../components/AgendamentoModal';
import { Button } from '../../../components/common/Button';
import { theme } from '../../../config/theme';
import { formatCurrency } from '../../../utils/formatters';
import { styles } from './styles';

export const ServicoDetalhesScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

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

        <Text style={styles.heroTitle}>Troca de Pastilhas de Freio Dianteiras</Text>
        <Text style={styles.soldCount}>+120 realizados por Auto Center Silva • ★ 4.9 (48 avaliações)</Text>

        <View style={styles.priceBox}>
          <Text style={styles.oldPrice}>R$ 210,00</Text>
          <Text style={styles.currentPrice}>{formatCurrency(180.00)}</Text>
          <Text style={styles.installmentText}>em até 3x de R$ 60,00 sem juros</Text>

          <View style={styles.badgeTrustRow}>
            <Ionicons name="shield-checkmark" size={16} color={theme.colors.success} />
            <Text style={styles.badgeTrustText}>Garantia de 90 dias após execução</Text>
          </View>
          <View style={styles.badgeTrustRow}>
            <Ionicons name="car" size={16} color={theme.colors.primary} />
            <Text style={styles.badgeTrustText}>Registro automático na Garagem Virtual</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>O que está incluso neste serviço?</Text>
          <Text style={styles.bulletPoint}>• Jogo de pastilhas dianteiras originais/homologadas</Text>
          <Text style={styles.bulletPoint}>• Mão de obra especializada</Text>
          <Text style={styles.bulletPoint}>• Inspeção do nível e estado do fluido de freio</Text>
          <Text style={styles.bulletPoint}>• Limpeza do sistema de freio dianteiro</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Tempo estimado</Text>
          <Text style={styles.infoDescription}>Aproximadamente 45 minutos na oficina.</Text>
        </View>
      </ScrollView>

      <View style={styles.footerStickyBar}>
        <View>
          <Text style={styles.footerPriceLabel}>Total Estimado</Text>
          <Text style={styles.footerPriceValue}>{formatCurrency(180.00)}</Text>
        </View>
        <Button
          title="Agendar Serviço"
          variant="primary"
          style={styles.footerButton}
          onPress={() => setModalVisible(true)}
        />
      </View>

      {/* Modal de Agendamento */}
      <AgendamentoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        servicoNome="Troca de Pastilhas de Freio"
        preco={180.00}
        onConfirmar={handleSucessoAgendamento}
      />
    </SafeAreaView>
  );
};