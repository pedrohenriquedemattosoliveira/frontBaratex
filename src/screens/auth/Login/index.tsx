import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';
import { TipoUsuario } from '../../../types';
import { useAuth } from '../../../contexts/AuthContext';
import { theme } from '../../../config/theme';
import { styles } from './styles';

export const LoginScreen: React.FC = () => {
  const { login, register } = useAuth();

  const [modo, setModo] = useState<'login' | 'cadastro'>('login');
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>('CLIENTE');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [info, setInfo] = useState('');

  const isCadastro = modo === 'cadastro';

  const trocarModo = () => {
    setModo(isCadastro ? 'login' : 'cadastro');
    setErro('');
    setInfo('');
  };

  const handleSubmit = async () => {
    setErro('');
    setInfo('');

    if (!email.trim() || !senha) {
      setErro('Informe e-mail e senha.');
      return;
    }

    setLoading(true);
    try {
      if (isCadastro) {
        if (!nome.trim()) {
          setErro('Informe seu nome.');
          return;
        }
        if (tipoUsuario === 'CLIENTE' && cpf.replace(/\D/g, '').length !== 11) {
          setErro('Informe um CPF válido (11 dígitos).');
          return;
        }
        await register({
          nome: nome.trim(),
          email: email.trim(),
          senha,
          telefone: telefone.trim() || undefined,
          cpf: tipoUsuario === 'CLIENTE' ? cpf : undefined,
          tipoUsuario: tipoUsuario === 'CLIENTE' ? 'MOTORISTA' : 'OFICINA',
        });
        setModo('login');
        setSenha('');
        setInfo('Cadastro realizado! Faça login para continuar.');
      } else {
        const sessao = await login(email, senha);
        if (sessao.tipo !== tipoUsuario) {
          // Perfil escolhido difere do cadastro; a navegacao segue o perfil real da conta.
          setInfo('');
        }
      }
    } catch (e: any) {
      setErro(e?.message || 'Não foi possível concluir a operação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeText}>BX</Text>
            </View>
            <Text style={styles.brandTitle}>BARATEX</Text>
            <Text style={styles.brandSubtitle}>Marketplace de Serviços Automotivos</Text>
          </View>

          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[styles.roleButton, tipoUsuario === 'CLIENTE' && styles.roleButtonActive]}
              activeOpacity={0.8}
              onPress={() => setTipoUsuario('CLIENTE')}
            >
              <Text style={[styles.roleText, tipoUsuario === 'CLIENTE' && styles.roleTextActive]}>Sou Motorista</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roleButton, tipoUsuario === 'PRESTADOR' && styles.roleButtonActive]}
              activeOpacity={0.8}
              onPress={() => setTipoUsuario('PRESTADOR')}
            >
              <Text style={[styles.roleText, tipoUsuario === 'PRESTADOR' && styles.roleTextActive]}>Sou Prestador</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            {isCadastro && (
              <>
                <Input label="Nome" placeholder="Seu nome completo" value={nome} onChangeText={setNome} />
                <Input
                  label="Telefone"
                  placeholder="(11) 99999-9999"
                  keyboardType="phone-pad"
                  value={telefone}
                  onChangeText={setTelefone}
                />
                {tipoUsuario === 'CLIENTE' && (
                  <Input
                    label="CPF"
                    placeholder="000.000.000-00"
                    keyboardType="numeric"
                    value={cpf}
                    onChangeText={setCpf}
                  />
                )}
              </>
            )}

            <Input
              label="E-mail"
              placeholder={tipoUsuario === 'CLIENTE' ? 'seu.email@exemplo.com' : 'prestador@parceiro.com'}
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
              onSubmitEditing={handleSubmit}
            />

            {!!erro && <Text style={{ color: theme.colors.error, fontSize: 13, marginBottom: 8 }}>{erro}</Text>}
            {!!info && <Text style={{ color: theme.colors.success, fontSize: 13, marginBottom: 8 }}>{info}</Text>}

            {loading ? (
              <ActivityIndicator style={{ marginVertical: 12 }} color={theme.colors.primary} />
            ) : (
              <Button
                title={
                  isCadastro
                    ? 'Criar conta'
                    : tipoUsuario === 'CLIENTE'
                    ? 'Entrar como Motorista'
                    : 'Acessar Painel do Prestador'
                }
                variant="primary"
                style={styles.loginButton}
                onPress={handleSubmit}
              />
            )}

            <TouchableOpacity activeOpacity={0.7} onPress={trocarModo} style={{ marginTop: 16 }}>
              <Text style={styles.forgotPasswordText}>
                {isCadastro ? 'Já tenho conta — entrar' : 'Não tem conta? Cadastre-se'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
