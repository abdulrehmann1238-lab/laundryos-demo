import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LaundryProvider } from './context/LaundryContext';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LaundryProvider>
        <App />
      </LaundryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
