import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../config/theme';

import { HomeNavigator } from './HomeNavigator';
import { GaragemNavigator } from './GaragemNavigator';
import { AgendamentosScreen } from '../screens/cliente/Agendamentos';
import { PerfilNavigator } from './PerfilNavigator';

const Tab = createBottomTabNavigator();

interface TabNavigatorProps {
  onLogout?: () => void;
}

export const TabNavigator: React.FC<TabNavigatorProps> = ({ onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 24 : 16,
          left: 16,
          right: 16,
          backgroundColor: theme.colors.surface,
          borderRadius: 24,
          height: 70,
          borderTopWidth: 0,
          paddingBottom: 0,
          paddingTop: 0,
          // Sombra para iOS
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          // Sombra para Android
          elevation: 8,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ color }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'search';

          if (route.name === 'Busca') {
            iconName = 'search-outline';
          } else if (route.name === 'Garagem') {
            iconName = 'car-sport-outline';
          } else if (route.name === 'Agendamentos') {
            iconName = 'calendar-outline';
          } else if (route.name === 'Perfil') {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Busca" component={HomeNavigator} />
      <Tab.Screen name="Garagem" component={GaragemNavigator} />
      <Tab.Screen name="Agendamentos" component={AgendamentosScreen} />
      <Tab.Screen name="Perfil">
        {(props) => <PerfilNavigator {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};