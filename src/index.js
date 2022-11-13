import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/general.css';
import './styles/mediaqueries.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AppRoutes />
    </React.StrictMode>
  </BrowserRouter>
);
