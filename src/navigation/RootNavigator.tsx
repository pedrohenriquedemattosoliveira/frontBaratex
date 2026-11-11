import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../screens/auth/Login';
import { TabNavigator } from './TabNavigator';
import { PrestadorTabNavigator } from './PrestadorTabNavigator';
import { useAuth } from '../contexts/AuthContext';

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  PrestadorTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : user.tipo === 'CLIENTE' ? (
        <Stack.Screen name="MainTabs">
          {(props) => <TabNavigator {...props} onLogout={logout} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="PrestadorTabs">
          {(props) => <PrestadorTabNavigator {...props} onLogout={logout} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};
