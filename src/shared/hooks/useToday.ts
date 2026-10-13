import { useEffect, useState } from 'react';
import { toDateInputValue } from '../lib/date';

export function useToday() {
  const [today, setToday] = useState(() => new Date());
  useEffect(() => {
    const update = () =>
      setToday((previous) => {
        const now = new Date();
        return toDateInputValue(previous) === toDateInputValue(now)
          ? previous
          : now;
      });
    const timer = window.setInterval(update, 30_000);
    window.addEventListener('focus', update);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', update);
    };
  }, []);
  return today;
}
