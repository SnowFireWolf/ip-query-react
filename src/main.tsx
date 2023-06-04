import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './pages/App'
import '@/styles/main.css'



createRoot(document.getElementById('app') as HTMLElement)
  .render(<App />);
