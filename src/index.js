import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "../src/components/Home/Home"
import Users from "./components/Users/AllUsers/AllUsers"
import Products from "./components/Products/AllProducts/Products"

const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/users", element: <Users /> },
  { path: "/products", element: <Products /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
