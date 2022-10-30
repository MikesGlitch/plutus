import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import Accounts from './features/accounts'
import Budget from './features/budget'
import UpcomingFeatures from './features/upcoming-features'
import TheFallback from './TheFallback'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <TheFallback />,
    children: [
      {
        index: true,
        element: <Navigate to="/budget" replace />
      },
      {
        path: 'budget',
        element: <Budget />
      },
      {
        path: 'reports',
        element: <h1>Reports</h1>
      },
      {
        path: 'accounts',
        element: <Accounts />
      },
      {
        path: 'upcoming-features',
        element: <UpcomingFeatures />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
    <RouterProvider router={router} />
  </React.StrictMode>
)
