import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GaragemScreen } from '../screens/cliente/Garagem';
import { HistoricoVeiculoScreen } from '../screens/cliente/HistoricoVeiculo';
import { CadastroVeiculoScreen } from '../screens/cliente/CadastroVeiculo';
import { GaragemStackParamList } from '../types';

const Stack = createNativeStackNavigator<GaragemStackParamList>();

export const GaragemNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GaragemList" component={GaragemScreen} />
      <Stack.Screen name="HistoricoVeiculo" component={HistoricoVeiculoScreen} />
      <Stack.Screen name="CadastroVeiculo" component={CadastroVeiculoScreen} />
    </Stack.Navigator>
  );
};