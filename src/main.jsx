import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HotelProvider } from './context/HotelContext'; // ✅ wrap here
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HotelProvider>
        <App />
      </HotelProvider>
    </BrowserRouter>
  </React.StrictMode>
);
