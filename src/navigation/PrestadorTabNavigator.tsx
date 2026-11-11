import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../config/theme';

import { PrestadorAgendamentosScreen } from '../screens/prestador/PrestadorAgendamentos';
import { PrestadorPerfilScreen } from '../screens/prestador/PrestadorPerfil';

const Tab = createBottomTabNavigator();

interface PrestadorTabNavigatorProps {
  onLogout?: () => void;
}

export const PrestadorTabNavigator: React.FC<PrestadorTabNavigatorProps> = ({ onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIcon: ({ color }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'calendar-outline';

          if (route.name === 'Agenda do Dia') {
            iconName = 'calendar-outline';
          } else if (route.name === 'Perfil') {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Agenda do Dia" component={PrestadorAgendamentosScreen} />
      <Tab.Screen name="Perfil">
        {(props) => <PrestadorPerfilScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};