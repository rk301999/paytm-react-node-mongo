import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css"

import Signup from "./pages/Signup.jsx"
import Signin from "./pages/Signin.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import SendMoney from "./pages/SendMoney.jsx"


const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Signup/>
      },
      {
        path:"/signin",
        element:<Signin/>
      },
      {
        path:"/dashboard",
        element:<Dashboard/>
      },
      {
        path:"/send",
        element:<SendMoney/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
