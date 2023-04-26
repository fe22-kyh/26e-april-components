import LoginComponent from './component/LoginComponent';
import RegisterComponent from './component/RegisterComponent';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const routes = [
    {
      path: "*",
      element: <h2>Path not found</h2>
    },
    {
      path: "/login",
      element: <LoginComponent />
    },
    {
      path: "/register",
      element: <RegisterComponent />
    }
  ]
  
  return <RouterProvider router={createBrowserRouter(routes)} />
}

export default App;
