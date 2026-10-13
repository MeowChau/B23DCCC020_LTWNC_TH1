import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './app/App';
import { store } from './app/store';
import { applyTheme, readTheme } from './shared/lib/theme';
import './styles.css';

// Apply the saved theme before mounting React.
applyTheme(readTheme());

const root = document.getElementById('root');
if (!root) throw new Error('Không tìm thấy phần tử root.');

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
