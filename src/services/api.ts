import { API_URL } from '../config/env';
import { sessionStorage } from './tokenStorage';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

let onUnauthorized: (() => void) | null = null;
export const setUnauthorizedHandler = (fn: (() => void) | null) => {
  onUnauthorized = fn;
};

let currentToken: string | null = null;
export const setAuthToken = (token: string | null) => {
  currentToken = token;
};

type Options = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  auth?: boolean;
};

// Extrai a mensagem do formato ErroResposta do backend (ou texto puro).
const extractMessage = async (res: Response): Promise<string> => {
  const text = await res.text();
  if (!text) return `Erro ${res.status}`;
  try {
    const json = JSON.parse(text);
    if (json?.erros && typeof json.erros === 'object') {
      return Object.values(json.erros).join('\n');
    }
    return json?.mensagem || json?.message || json?.erro || text;
  } catch {
    return text;
  }
};

export async function request<T = unknown>(path: string, options: Options = {}): Promise<T> {
  const { method = 'GET', body, auth = true } = options;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth && currentToken) headers.Authorization = `Bearer ${currentToken}`;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError('Não foi possível conectar ao servidor. Verifique sua conexão.', 0);
  }

  if (!res.ok) {
    if ((res.status === 401 || res.status === 403) && auth && currentToken) {
      onUnauthorized?.();
    }
    throw new ApiError(await extractMessage(res), res.status);
  }

  if (res.status === 204) return undefined as T;
  const text = await res.text();
  if (!text) return undefined as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
}
