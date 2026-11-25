import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initStorage, notifyStorageChange } from './services/storage.js'

initStorage()
window.addEventListener('storage', event => {
  if (event.key?.startsWith('altoque_')) notifyStorageChange({ type: 'external' })
})
window.setInterval(() => notifyStorageChange({ type: 'clock' }), 30000)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
