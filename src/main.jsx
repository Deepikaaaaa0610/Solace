import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { WhatsappFeatureProvider } from './context/WhatsappFeatureContext.jsx'
import App from './App.jsx'
import './index.css'
import './redesign.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <WhatsappFeatureProvider>
          <App />
        </WhatsappFeatureProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
