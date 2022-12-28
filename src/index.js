import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {Toaster} from 'react-hot-toast'
import './index.css';
import App from './App';
import AuthProvider from './Contexts/AuthProvider';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <App />
      <Toaster />
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
