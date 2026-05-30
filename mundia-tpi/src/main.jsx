import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import 'react-day-picker/dist/style.css'
import App from './App.jsx'
import AuthContextProvider from './components/auth/AuthContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </StrictMode>,
)