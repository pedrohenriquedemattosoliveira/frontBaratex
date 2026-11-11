// Formata valores numéricos para Moeda BRL (ex: R$ 150,00)
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// Formata quilometragem (ex: 45.000 km)
export const formatKm = (value: number): string => {
  return `${value.toLocaleString('pt-BR')} km`;
};

// Formata CNPJ (ex: 12.345.678/0001-95)
export const formatCnpj = (value: string): string => {
  const clean = value.replace(/\D/g, '');
  if (clean.length !== 14) return value;
  return clean.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
};

// Padroniza a exibição da Placa
export const formatPlaca = (value: string): string => {
  return value.toUpperCase().trim();
};