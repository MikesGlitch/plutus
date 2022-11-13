import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import Accounts from './features/accounts'
import Budget from './features/budget'
import UpcomingFeatures from './features/upcoming-features'
import TheFallback from './TheFallback'
import Heading from './components/Typography/Heading'

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
        element: <Heading>Reports</Heading>
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
    <RouterProvider router={router} />
  </React.StrictMode>
)
