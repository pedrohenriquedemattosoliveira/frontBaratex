import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../screens/cliente/Home';
import { OficinaDetalhesScreen } from '../screens/cliente/OficinaDetalhes';
import { ServicoDetalhesScreen } from '../screens/cliente/ServicoDetalhes';
import { AgendamentoCheckoutScreen } from '../screens/cliente/AgendamentoCheckout';
import { StatusServicoScreen } from '../screens/cliente/StatusServico';
import { ChatPrestadorScreen } from '../screens/cliente/ChatPrestador';
import { AvaliacaoPrestadorScreen } from '../screens/cliente/AvaliacaoPrestador';
import { HomeStackParamList } from '../types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeList" component={HomeScreen} />
      <Stack.Screen name="OficinaDetalhes" component={OficinaDetalhesScreen} />
      <Stack.Screen name="ServicoDetalhes" component={ServicoDetalhesScreen} />
      <Stack.Screen name="AgendamentoCheckout" component={AgendamentoCheckoutScreen} />
      <Stack.Screen name="StatusServico" component={StatusServicoScreen} />
      <Stack.Screen name="ChatPrestador" component={ChatPrestadorScreen} />
      <Stack.Screen name="AvaliacaoPrestador" component={AvaliacaoPrestadorScreen} />
    </Stack.Navigator>
  );
};