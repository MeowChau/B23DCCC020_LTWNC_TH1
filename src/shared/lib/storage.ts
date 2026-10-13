import type { TypeGuard } from '../types/api';

// One generic storage adapter, with runtime validation before returning typed data.
export function createStorage<T>(key: string, isValue: TypeGuard<T>) {
  return {
    read(): T | null {
      try {
        const raw = localStorage.getItem(key);
        if (raw === null) return null;
        const value: unknown = JSON.parse(raw);
        return isValue(value) ? value : null;
      } catch {
        return null;
      }
    },
    write(value: T): boolean {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },
  };
}
