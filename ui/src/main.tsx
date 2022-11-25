import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import Accounts from './features/accounts'
import Budget from './features/budget'
import UpcomingFeatures from './features/upcoming-features'
import TheFallback from './TheFallback'
import Reports from './features/reports'
import { CategoryScale, Chart as ChartJS, LinearScale, LineController, LineElement, PointElement } from 'chart.js'

// Needs to be registered at application level so it doesn't get re-registered when component mount/unmount
ChartJS.register(LineController, CategoryScale, LinearScale, PointElement, LineElement)

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
        element: <Reports />
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
