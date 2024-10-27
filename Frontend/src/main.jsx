import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import {App} from './App';
import { Toaster } from './components/ui/sonner';
import { SocketProvider } from './context/SocketContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <SocketProvider>
      <BrowserRouter>
        <App /> <Toaster closeButton />
      </BrowserRouter>
    </SocketProvider>
  </>,
);

