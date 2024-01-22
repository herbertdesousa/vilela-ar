import React from 'react'
import ReactDOM from 'react-dom/client'
import './view/global.css'
import { Home } from './view/screens/Home.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)
