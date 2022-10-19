import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Accounts from './features/accounts/Accounts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <h1>Home page - perhaps it goes to the last page you were on or maybe the budget</h1>
      },
      {
        path: 'budget',
        element: <h1>Budget</h1>
      },
      {
        path: 'reports',
        element: <h1>Reports</h1>
      },
      {
        path: 'accounts',
        element: <Accounts />
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
