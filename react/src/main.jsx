import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './pages/App'
import Background from './components/Background';

createRoot(document.getElementById('root')).render(
  <>
    <Background />
    <App />
  </>
)
