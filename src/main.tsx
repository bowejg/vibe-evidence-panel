import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from '@/App'
import { Home } from '@/pages/Home'
import { Home2 } from '@/pages/Home2'
import { Recruit } from '@/pages/Recruit'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/home-2" element={<Home2 />} />
        <Route path="/recruit" element={<Recruit />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
