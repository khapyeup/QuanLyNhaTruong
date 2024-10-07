import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './index.css'
import {App} from "./App.jsx"
import Login from './components/Login.jsx'
import Dashboard from "./components/Dashboard.jsx"
import Header from "./components/Header.jsx"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Header/>,
    children: [
      { 
        path: "",
        element: <Login />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
