import LoginPage from "../pages/Login.page";
import RegisterPage from "../pages/Register.page";
import ProtectedRoute from "../components/authComponents/ProtectedRoutes";
import HomePage from "../pages/Home.page";
import { createBrowserRouter, RouterProvider } from "react-router";

function App() {

  //function that allow us to declare the routes
  const router = createBrowserRouter([
    { path: '/', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    {
      path: "home", element: <ProtectedRoute> <HomePage /> </ProtectedRoute>
    }
  ]);

  return <RouterProvider router={router} />
}

export default App
