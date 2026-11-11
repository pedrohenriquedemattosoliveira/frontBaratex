// A variavel e embutida no bundle em tempo de build (prefixo EXPO_PUBLIC_).
// Local: arquivo .env  |  Netlify: Site settings > Environment variables
const rawUrl = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080';

export const API_URL = rawUrl.replace(/\/+$/, '');
