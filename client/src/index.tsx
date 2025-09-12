import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';
import App from './App';
import { LookupService } from './services/LookupService';

if (typeof window !== 'undefined') {
  if (!window.__LOOKUP_CACHE) {
    window.__LOOKUP_CACHE = { 'roles': [], 'permissions': [] };
    await LookupService.getLookupData('roles');
    // await LookupService.getLookupData('permissions');
    window.addEventListener('beforeunload', () => {
      Object.keys(window.__LOOKUP_CACHE || {}).forEach(key => {
        if (key.startsWith('lookup_cache_')) {
          delete window.__LOOKUP_CACHE[key];
        }
      });
    });
  }
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode >
);
