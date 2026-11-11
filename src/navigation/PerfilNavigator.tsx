import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PerfilScreen } from '../screens/cliente/Perfil';
import { MeusVeiculosScreen } from '../screens/cliente/MeusVeiculos';
import { NotificacoesScreen } from '../screens/cliente/Notificacoes';
import { PerfilStackParamList } from '../types';

const Stack = createNativeStackNavigator<PerfilStackParamList>();

interface PerfilNavigatorProps {
  onLogout?: () => void;
}

export const PerfilNavigator: React.FC<PerfilNavigatorProps> = ({ onLogout }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PerfilHome">
        {(props) => <PerfilScreen {...props} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen name="MeusVeiculos" component={MeusVeiculosScreen} />
      <Stack.Screen name="Notificacoes" component={NotificacoesScreen} />
    </Stack.Navigator>
  );
};