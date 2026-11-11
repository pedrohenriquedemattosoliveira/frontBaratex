import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authService, LoginResponse, RegisterPayload } from '../services/authService';
import { setAuthToken, setUnauthorizedHandler } from '../services/api';
import { sessionStorage } from '../services/tokenStorage';
import { TipoUsuario } from '../types';

export interface SessionUser {
  id: string;
  nome: string;
  email: string;
  tipo: TipoUsuario; // CLIENTE (motorista) | PRESTADOR (oficina)
}

interface AuthContextValue {
  user: SessionUser | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<SessionUser>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const toSession = (r: LoginResponse): SessionUser => ({
  id: r.usuarioId,
  nome: r.nome,
  email: r.email,
  tipo: r.tipoUsuario === 'MOTORISTA' ? 'CLIENTE' : 'PRESTADOR',
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    sessionStorage.clear();
    setAuthToken(null);
    setUser(null);
  }, []);

  // Restaura sessao salva (web) e trata token expirado
  useEffect(() => {
    setUnauthorizedHandler(logout);
    try {
      const saved = sessionStorage.get();
      if (saved) {
        const { token, user: savedUser } = JSON.parse(saved);
        setAuthToken(token);
        setUser(savedUser);
      }
    } catch {
      sessionStorage.clear();
    }
    setLoading(false);
    return () => setUnauthorizedHandler(null);
  }, [logout]);

  const login = useCallback(async (email: string, senha: string) => {
    const response = await authService.login(email.trim(), senha);
    const session = toSession(response);
    setAuthToken(response.token);
    sessionStorage.set(JSON.stringify({ token: response.token, user: session }));
    setUser(session);
    return session;
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    await authService.register(payload);
  }, []);

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
};
