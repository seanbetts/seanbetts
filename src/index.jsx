import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App';

const container = document.getElementById('root');
const app = <React.StrictMode><App /></React.StrictMode>;
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
