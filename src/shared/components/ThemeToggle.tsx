import { useTheme } from '../hooks/useTheme';
import { Icon } from './Icon';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === 'dark';
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? 'Bật giao diện sáng' : 'Bật giao diện tối'}
      aria-pressed={dark}
      title={dark ? 'Bật giao diện sáng' : 'Bật giao diện tối'}
    >
      <Icon name={dark ? 'moon' : 'sun'} />
      <span>{dark ? 'Tối' : 'Sáng'}</span>
    </button>
  );
}
