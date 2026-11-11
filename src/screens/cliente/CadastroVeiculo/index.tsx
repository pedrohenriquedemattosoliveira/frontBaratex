import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';
import { Card } from '../../../components/common/Card';
import { theme } from '../../../config/theme';
import { MarcaApi, ModeloApi, veiculoService } from '../../../services/veiculoService';
import { styles } from './styles';

const chipStyle = (selected: boolean) => ({
  paddingVertical: 8,
  paddingHorizontal: 14,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: selected ? theme.colors.primary : theme.colors.border,
  backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
  marginRight: 8,
  marginBottom: 8,
});

const chipText = (selected: boolean) => ({
  fontSize: 13,
  fontWeight: '600' as const,
  color: selected ? '#FFFFFF' : theme.colors.textPrimary,
});

const Chip: React.FC<{ label: string; selected: boolean; onPress: () => void }> = ({ label, selected, onPress }) => (
  <TouchableOpacity style={chipStyle(selected)} activeOpacity={0.8} onPress={onPress}>
    <Text style={chipText(selected)}>{label}</Text>
  </TouchableOpacity>
);

const Label: React.FC<{ children: string }> = ({ children }) => (
  <Text style={{ fontSize: 13, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 8 }}>{children}</Text>
);

export const CadastroVeiculoScreen = () => {
  const navigation = useNavigation();

  const [marcas, setMarcas] = useState<MarcaApi[]>([]);
  const [modelos, setModelos] = useState<ModeloApi[]>([]);
  const [anos, setAnos] = useState<number[]>([]);

  const [marcaBusca, setMarcaBusca] = useState('');
  const [modeloBusca, setModeloBusca] = useState('');
  const [marca, setMarca] = useState<MarcaApi | null>(null);
  const [modelo, setModelo] = useState<ModeloApi | null>(null);
  const [ano, setAno] = useState<number | null>(null);
  const [placa, setPlaca] = useState('');
  const [cor, setCor] = useState('');

  const [loadingLista, setLoadingLista] = useState(false);
  const [salvando, setSalvando] = useState(false);

  // Marcas (com busca)
  useEffect(() => {
    setLoadingLista(true);
    const t = setTimeout(() => {
      veiculoService
        .marcas(marcaBusca)
        .then(setMarcas)
        .catch(() => setMarcas([]))
        .finally(() => setLoadingLista(false));
    }, 300);
    return () => clearTimeout(t);
  }, [marcaBusca]);

  // Modelos da marca escolhida (com busca)
  useEffect(() => {
    if (!marca) return;
    const t = setTimeout(() => {
      veiculoService
        .modelos(marca.id, modeloBusca)
        .then(setModelos)
        .catch(() => setModelos([]));
    }, 300);
    return () => clearTimeout(t);
  }, [marca, modeloBusca]);

  // Anos do modelo escolhido
  useEffect(() => {
    if (!modelo) return;
    veiculoService
      .anos(modelo.id)
      .then((lista) => setAnos([...lista].sort((a, b) => b - a)))
      .catch(() => setAnos([]));
  }, [modelo]);

  const escolherMarca = (m: MarcaApi) => {
    setMarca(m);
    setModelo(null);
    setModelos([]);
    setAnos([]);
    setAno(null);
    setModeloBusca('');
  };

  const escolherModelo = (m: ModeloApi) => {
    setModelo(m);
    setAno(null);
  };

  const handleSalvar = async () => {
    if (!marca || !modelo || !ano || !placa.trim()) {
      Alert.alert('Atenção', 'Selecione marca, modelo e ano e informe a placa.');
      return;
    }
    setSalvando(true);
    try {
      await veiculoService.cadastrar({
        placa: placa.trim().toUpperCase(),
        modeloId: modelo.id,
        ano,
        cor: cor.trim() || undefined,
      });
      Alert.alert('Sucesso', 'Veículo cadastrado na Garagem Virtual!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (e: any) {
      Alert.alert('Não foi possível cadastrar', e?.message || 'Tente novamente.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerNav}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Veículo</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Card style={styles.formCard}>
          <Label>Marca *</Label>
          <Input placeholder="Buscar marca..." value={marcaBusca} onChangeText={setMarcaBusca} />
          {loadingLista && <ActivityIndicator color={theme.colors.primary} />}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 }}>
            {marcas.slice(0, 24).map((m) => (
              <Chip key={m.id} label={m.nome} selected={marca?.id === m.id} onPress={() => escolherMarca(m)} />
            ))}
          </View>

          {marca && (
            <>
              <Label>Modelo *</Label>
              <Input placeholder="Buscar modelo..." value={modeloBusca} onChangeText={setModeloBusca} />
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 }}>
                {modelos.slice(0, 30).map((m) => (
                  <Chip
                    key={m.id}
                    label={m.nomeModelo}
                    selected={modelo?.id === m.id}
                    onPress={() => escolherModelo(m)}
                  />
                ))}
              </View>
            </>
          )}

          {modelo && (
            <>
              <Label>Ano *</Label>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 }}>
                {anos.map((a) => (
                  <Chip key={a} label={String(a)} selected={ano === a} onPress={() => setAno(a)} />
                ))}
              </View>
            </>
          )}

          <Input
            label="Placa *"
            placeholder="Ex: ABC1D23"
            autoCapitalize="characters"
            value={placa}
            onChangeText={setPlaca}
          />
          <Input label="Cor" placeholder="Ex: Prata" value={cor} onChangeText={setCor} />

          <Button
            title={salvando ? 'Salvando...' : 'Cadastrar na Garagem'}
            variant="primary"
            style={styles.saveButton}
            onPress={salvando ? () => {} : handleSalvar}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};
