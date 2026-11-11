import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { theme } from '../../../config/theme';
import { styles } from './styles';

interface PerfilScreenProps {
  onLogout?: () => void;
}

export const PerfilScreen: React.FC<PerfilScreenProps> = ({ onLogout }) => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={styles.title}>Meu Perfil</Text>

        <Card style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>PS</Text>
          </View>
          <View>
            <Text style={styles.userName}>Pedro Silva</Text>
            <Text style={styles.userEmail}>pedro.silva@email.com</Text>
          </View>
        </Card>

        <Card style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Garagem')}
          >
            <Ionicons name="car-outline" size={20} color={theme.colors.primary} />
            <Text style={styles.menuText}>Meus Veículos (Garagem Virtual)</Text>
            <Ionicons name="chevron-forward" size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Notificacoes')}
          >
            <Ionicons name="notifications-outline" size={20} color={theme.colors.primary} />
            <Text style={styles.menuText}>Notificações</Text>
            <Ionicons name="chevron-forward" size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </Card>

        <Button
          title="Sair da Conta"
          variant="outline"
          style={{ marginTop: theme.spacing.md, marginBottom: theme.spacing.xl }}
          onPress={onLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
};