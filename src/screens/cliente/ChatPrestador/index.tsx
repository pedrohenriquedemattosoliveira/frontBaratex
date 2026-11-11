import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { theme } from '../../../config/theme';
import { MensagemChat, HomeStackParamList } from '../../../types';
import { styles } from './styles';

type RouteProps = RouteProp<HomeStackParamList, 'ChatPrestador'>;

export const ChatPrestadorScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();
  const prestadorNome = route.params?.prestadorNome || 'Prestador';

  const [mensagens, setMensagens] = useState<MensagemChat[]>([
    { id: '1', texto: 'Olá! O carro já foi colocado no elevador para troca das pastilhas.', enviadoPorMim: false, horario: '14:05' },
    { id: '2', texto: 'Perfeito! Gostaria de saber se os discos de freio estão bons.', enviadoPorMim: true, horario: '14:08' },
    { id: '3', texto: 'Sim, os discos estão em excelente estado! Não precisa trocar.', enviadoPorMim: false, horario: '14:10' },
  ]);
  const [texto, setTexto] = useState('');

  const handleVoltar = () => {
    navigation.navigate('Agendamentos');
  };

  const handleEnviar = () => {
    if (!texto.trim()) return;

    const novaMsg: MensagemChat = {
      id: Date.now().toString(),
      texto: texto.trim(),
      enviadoPorMim: true,
      horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMensagens((prev) => [...prev, novaMsg]);
    setTexto('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerNav}>
        <TouchableOpacity style={styles.backButton} onPress={handleVoltar} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{prestadorNome}</Text>
      </View>

      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id}
        style={styles.chatArea}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.enviadoPorMim ? styles.myMessage : styles.theirMessage]}>
            <Text style={item.enviadoPorMim ? styles.myMessageText : styles.theirMessageText}>{item.texto}</Text>
            <Text style={[styles.timeText, { color: item.enviadoPorMim ? '#E0E7FF' : theme.colors.textSecondary }]}>
              {item.horario}
            </Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma mensagem..."
          placeholderTextColor={theme.colors.textSecondary}
          value={texto}
          onChangeText={setTexto}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleEnviar} activeOpacity={0.8}>
          <Ionicons name="send" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};