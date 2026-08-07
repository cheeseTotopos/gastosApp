import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/auth/ProtectedRoutes";
import HomePage from "../pages/Home.page";
import MovementsPage from "../pages/MovementsPage";
import Layout from "../pages/Layout";
import { createBrowserRouter, RouterProvider } from "react-router";

function App() {

  //function that allow us to declare the routes
  const router = createBrowserRouter([
    { path: '/', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { 
      element: (
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/home", element:<HomePage />
        },
        {
          path: "/movements", element: <MovementsPage/>
        }
      ]
    }
  ]);

  return (<RouterProvider router={router} />)
}

export default App