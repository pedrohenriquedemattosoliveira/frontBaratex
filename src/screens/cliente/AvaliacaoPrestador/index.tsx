import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Card } from '../../../components/common/Card';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';
import { theme } from '../../../config/theme';
import { HomeStackParamList } from '../../../types';
import { styles } from './styles';

type RouteProps = RouteProp<HomeStackParamList, 'AvaliacaoPrestador'>;

export const AvaliacaoPrestadorScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const prestadorNome = route.params?.prestadorNome || 'Prestador';

  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');

  const handleEnviar = () => {
    Alert.alert('Obrigado!', 'Sua avaliação foi registrada com sucesso no BARATEX.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerNav}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Avaliar Atendimento</Text>
      </View>

      <View style={styles.content}>
        <Card style={styles.card}>
          <Text style={styles.prestadorTitle}>{prestadorNome}</Text>

          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setNota(star)}>
                <Ionicons
                  name={star <= nota ? 'star' : 'star-outline'}
                  size={32}
                  color={star <= nota ? '#F59E0B' : theme.colors.border}
                />
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={styles.inputCard}>
          <Input
            label="Comentário (opcional)"
            placeholder="Conte como foi sua experiência com este prestador..."
            value={comentario}
            onChangeText={setComentario}
          />

          <Button title="Enviar Avaliação" variant="primary" onPress={handleEnviar} />
        </Card>
      </View>
    </SafeAreaView>
  );
};