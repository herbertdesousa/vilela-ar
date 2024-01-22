import './view/global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Document } from './view/screens/Document.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Document />
  </React.StrictMode>,
);
