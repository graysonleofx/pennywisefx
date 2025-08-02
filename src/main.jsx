import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Dashboard from './dashboardPage/dashboard.jsx'
import './styles/navbar.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RouterProvider router={router}/> */}
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>,
)
