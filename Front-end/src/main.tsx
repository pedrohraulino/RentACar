import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home.tsx';
import Carros from './routes/Carros.tsx'; // Certifique-se de importar o componente Carros
import Clientes from './routes/Clientes.tsx';
import Reserva from './routes/Reserva.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/carros",
        element: <Carros />,
      },
      {
        path: "/clientes",
        element: <Clientes />,
      },
      {
        path: "/reservar",
        element: <Reserva />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
