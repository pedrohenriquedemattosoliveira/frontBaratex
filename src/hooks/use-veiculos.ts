import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { veiculoService, VeiculoApi } from '../services/veiculoService';

// Carrega os veiculos do motorista logado e recarrega sempre que a tela volta ao foco.
export const useVeiculos = () => {
  const [veiculos, setVeiculos] = useState<VeiculoApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  const carregar = useCallback(() => {
    setErro('');
    veiculoService
      .listarMeus()
      .then(setVeiculos)
      .catch((e) => {
        // Motorista sem veiculos ainda: o backend responde "Motorista nao encontrado"
        if (/não encontrado/i.test(e?.message || '')) setVeiculos([]);
        else setErro(e?.message || 'Erro ao carregar veículos.');
      })
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(carregar);

  return { veiculos, loading, erro, recarregar: carregar };
};
