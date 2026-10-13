import { createStorage } from './storage';

export type Theme = 'light' | 'dark';

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

export const themeStorage = createStorage(
  'student-deadline-tracker.theme.v1',
  isTheme,
);

export function readTheme(): Theme {
  return (
    themeStorage.read() ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light')
  );
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#111c19' : '#f5f6f1');
}
