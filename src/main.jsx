import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Calibri where installed (Windows/Office); Carlito is its metric-compatible open-source twin for everyone else.
import '@fontsource/carlito/400.css'
import '@fontsource/carlito/700.css'
import 'lenis/dist/lenis.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
