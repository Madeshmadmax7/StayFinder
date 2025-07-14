import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { HotelProvider } from './context/HotelContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HotelProvider>
        <App />
      </HotelProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
