import { createBrowserRouter } from 'react-router'
import App from './App'
import Home from './pages/Home'
import Center from './pages/Center'
import Edit from './pages/Edit'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'center', element: <Center /> },
      { path: 'edit', element: <Edit /> },
    ],
  },
])
