import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { styles } from './styles';

interface PrestadorPerfilScreenProps {
  onLogout?: () => void;
}

export const PrestadorPerfilScreen: React.FC<PrestadorPerfilScreenProps> = ({ onLogout }) => {
  const prestadorData = {
    nomeFantasia: 'Auto Center Silva',
    razaoSocial: 'Silva Manutenções Automotivas LTDA',
    cnpj: '12.345.678/0001-95',
    email: 'contato@autocentersilva.com.br',
    telefone: '(11) 98765-4321',
    endereco: 'Rua das Flores, 123 - Centro, São Paulo - SP',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Minha Conta</Text>

        <Card style={styles.profileHeaderCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {prestadorData.nomeFantasia.substring(0, 2).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.businessName}>{prestadorData.nomeFantasia}</Text>
          <Text style={styles.businessEmail}>{prestadorData.email}</Text>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>Prestador Verificado BARATEX</Text>
          </View>
        </Card>

        <Card style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Informações Cadastrais</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Razão Social</Text>
            <Text style={styles.infoValue}>{prestadorData.razaoSocial}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>CNPJ</Text>
            <Text style={styles.infoValue}>{prestadorData.cnpj}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Telefone de Contato</Text>
            <Text style={styles.infoValue}>{prestadorData.telefone}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Endereço Comercial</Text>
            <Text style={styles.infoValue}>{prestadorData.endereco}</Text>
          </View>
        </Card>

        <View style={styles.webBannerCard}>
          <Text style={webBannerTitleStyle}>Edição do Negócio</Text>
          <Text style={styles.webBannerText}>
            Para alterar endereço, telefone, serviços oferecidos ou dados bancários, acesse o painel web pelo computador em baratex.com.br.
          </Text>
        </View>

        <Button
          title="Sair da Conta"
          variant="outline"
          style={styles.logoutButton}
          onPress={onLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const webBannerTitleStyle = styles.webBannerTitle;