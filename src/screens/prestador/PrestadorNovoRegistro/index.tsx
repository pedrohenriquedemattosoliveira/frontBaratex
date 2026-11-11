import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';
import { Card } from '../../../components/common/Card';
import { styles } from './styles';

export const PrestadorNovoRegistroScreen = () => {
  const [placa, setPlaca] = useState('');
  const [km, setKm] = useState('');
  const [servicos, setServicos] = useState('');
  const [parecer, setParecer] = useState('');

  const handleRegistrar = () => {
    if (!placa || !km || !servicos) {
      Alert.alert('Atenção', 'Preencha a placa, quilometragem e os serviços realizados.');
      return;
    }

    Alert.alert(
      'Manutenção Autenticada! 🔒',
      `Registro para a placa ${placa.toUpperCase()} inserido com sucesso na Garagem Virtual. Hash de assinatura digital gerado!`,
      [{ text: 'OK', onPress: () => { setPlaca(''); setKm(''); setServicos(''); setParecer(''); } }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Registrar Manutenção</Text>
        <Text style={styles.subtitle}>
          Adicione um histórico imutável na Garagem Virtual do cliente
        </Text>

        <Card style={styles.formCard}>
          <Input
            label="Placa do Veículo"
            placeholder="Ex: ABC1D23"
            autoCapitalize="characters"
            value={placa}
            onChangeText={setPlaca}
          />

          <Input
            label="Quilometragem Atual (KM)"
            placeholder="Ex: 45000"
            keyboardType="numeric"
            value={km}
            onChangeText={setKm}
          />

          <Input
            label="Serviços Executados"
            placeholder="Ex: Troca de pastilhas de freio, Troca de óleo"
            value={servicos}
            onChangeText={setServicos}
          />

          <Input
            label="Parecer Técnico"
            placeholder="Detalhes técnicos ou recomendações futuras..."
            value={parecer}
            onChangeText={setParecer}
          />

          <Button
            title="Assinar & Salvar na Garagem"
            variant="primary"
            style={styles.submitButton}
            onPress={handleRegistrar}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};