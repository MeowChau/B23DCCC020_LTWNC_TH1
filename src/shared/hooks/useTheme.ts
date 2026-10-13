import { useEffect, useState } from 'react';
import { applyTheme, readTheme, themeStorage } from '../lib/theme';

export function useTheme() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    applyTheme(theme);
    themeStorage.write(theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () =>
      setTheme((previous) => (previous === 'light' ? 'dark' : 'light')),
  };
}
