import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import 'react-day-picker/dist/style.css'
import App from './App.jsx'
import AuthContextProvider from './components/auth/AuthContextProvider.jsx'
import ThemeContextProvider from './services/theme/ThemeContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </AuthContextProvider>
)