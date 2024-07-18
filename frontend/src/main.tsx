import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FormModalProvider } from './context/FormModalContext.tsx';
import { AuthContextProvider } from '@context/AuthContext.tsx';
import App from './App.tsx';
import './index.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <FormModalProvider>
          <App />
        </FormModalProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
