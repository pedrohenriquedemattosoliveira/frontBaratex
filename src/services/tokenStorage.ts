import { Platform } from 'react-native';

const KEY = 'baratex.session';

// Em memoria (vale para qualquer plataforma) + localStorage na web.
let memory: string | null = null;

const hasLocalStorage = () => {
  try {
    return Platform.OS === 'web' && typeof localStorage !== 'undefined';
  } catch {
    return false;
  }
};

export const sessionStorage = {
  get(): string | null {
    if (memory) return memory;
    if (hasLocalStorage()) {
      try {
        memory = localStorage.getItem(KEY);
      } catch {}
    }
    return memory;
  },
  set(value: string) {
    memory = value;
    if (hasLocalStorage()) {
      try {
        localStorage.setItem(KEY, value);
      } catch {}
    }
  },
  clear() {
    memory = null;
    if (hasLocalStorage()) {
      try {
        localStorage.removeItem(KEY);
      } catch {}
    }
  },
};
