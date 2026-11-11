import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';
import { TipoUsuario } from '../../../types';
import { styles } from './styles';

interface LoginScreenProps {
  onLoginSuccess: (tipo: TipoUsuario) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>('CLIENTE');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    onLoginSuccess(tipoUsuario);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>BX</Text>
          </View>
          <Text style={styles.brandTitle}>BARATEX</Text>
          <Text style={styles.brandSubtitle}>Marketplace de Serviços Automotivos</Text>
        </View>

        {/* Alternador de Perfil sem emojis */}
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[styles.roleButton, tipoUsuario === 'CLIENTE' && styles.roleButtonActive]}
            activeOpacity={0.8}
            onPress={() => setTipoUsuario('CLIENTE')}
          >
            <Text style={[styles.roleText, tipoUsuario === 'CLIENTE' && styles.roleTextActive]}>
              Sou Motorista
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleButton, tipoUsuario === 'PRESTADOR' && styles.roleButtonActive]}
            activeOpacity={0.8}
            onPress={() => setTipoUsuario('PRESTADOR')}
          >
            <Text style={[styles.roleText, tipoUsuario === 'PRESTADOR' && styles.roleTextActive]}>
              Sou Prestador
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Input
            label="E-mail"
            placeholder={tipoUsuario === 'CLIENTE' ? "seu.email@exemplo.com" : "prestador@parceiro.com"}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Input
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <Button
            title={tipoUsuario === 'CLIENTE' ? "Entrar como Motorista" : "Acessar Painel do Prestador"}
            variant="primary"
            style={styles.loginButton}
            onPress={handleLogin}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};