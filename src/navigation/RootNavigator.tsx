import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../screens/auth/Login';
import { TabNavigator } from './TabNavigator';
import { PrestadorTabNavigator } from './PrestadorTabNavigator';
import { TipoUsuario } from '../types';

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  PrestadorTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const [userType, setUserType] = useState<TipoUsuario | null>(null);

  const handleLogout = () => {
    setUserType(null);
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userType === null ? (
        <Stack.Screen name="Login">
          {(props) => (
            <LoginScreen
              {...props}
              onLoginSuccess={(tipo) => setUserType(tipo)}
            />
          )}
        </Stack.Screen>
      ) : userType === 'CLIENTE' ? (
        <Stack.Screen name="MainTabs" component={TabNavigator} />
      ) : (
        <Stack.Screen name="PrestadorTabs">
          {(props) => <PrestadorTabNavigator {...props} onLogout={handleLogout} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};