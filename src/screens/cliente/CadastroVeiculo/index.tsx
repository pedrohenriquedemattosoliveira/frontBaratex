import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';
import { Card } from '../../../components/common/Card';
import { theme } from '../../../config/theme';
import { GaragemStackParamList } from '../../../types';
import { styles } from './styles';

type RouteProps = RouteProp<GaragemStackParamList, 'CadastroVeiculo'>;

export const CadastroVeiculoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const veiculoEdit = route.params?.veiculo;

  const [marca, setMarca] = useState(veiculoEdit?.marca || '');
  const [modelo, setModelo] = useState(veiculoEdit?.modelo || '');
  const [ano, setAno] = useState(veiculoEdit?.ano ? String(veiculoEdit.ano) : '');
  const [placa, setPlaca] = useState(veiculoEdit?.placa || '');
  const [km, setKm] = useState(veiculoEdit?.quilometragem ? String(veiculoEdit.quilometragem) : '');
  const [combustivel, setCombustivel] = useState(veiculoEdit?.combustivel || 'Flex');

  const handleSalvar = () => {
    if (!marca || !modelo || !placa || !km) {
      Alert.alert('Atenção', 'Preencha os campos obrigatórios: Marca, Modelo, Placa e KM.');
      return;
    }

    Alert.alert(
      'Sucesso',
      veiculoEdit ? 'Veículo atualizado com sucesso!' : 'Veículo cadastrado na Garagem Virtual!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerNav}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{veiculoEdit ? 'Editar Veículo' : 'Novo Veículo'}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Card style={styles.formCard}>
          <Input label="Marca *" placeholder="Ex: Chevrolet" value={marca} onChangeText={setMarca} />
          <Input label="Modelo *" placeholder="Ex: Onix 1.0 Turbo" value={modelo} onChangeText={setModelo} />
          <Input label="Ano de Fabricação" placeholder="Ex: 2022" keyboardType="numeric" value={ano} onChangeText={setAno} />
          <Input label="Placa *" placeholder="Ex: ABC1D23" autoCapitalize="characters" value={placa} onChangeText={setPlaca} />
          <Input label="Quilometragem Atual (KM) *" placeholder="Ex: 45000" keyboardType="numeric" value={km} onChangeText={setKm} />
          <Input label="Combustível" placeholder="Ex: Flex, Gasolina, Diesel, Elétrico" value={combustivel} onChangeText={setCombustivel} />

          <Button
            title={veiculoEdit ? 'Salvar Alterações' : 'Cadastrar na Garagem'}
            variant="primary"
            style={styles.saveButton}
            onPress={handleSalvar}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};