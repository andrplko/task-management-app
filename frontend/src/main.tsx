import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FormModalProvider } from './context/index.tsx';
import App from './App.tsx';
import './index.scss';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FormModalProvider>
        <App />
      </FormModalProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
