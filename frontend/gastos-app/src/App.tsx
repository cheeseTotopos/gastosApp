import LoginPage from "../pages//LoginPage";
import RegisterPage from "../pages/deprecated/Register.page";
import ProtectedRoute from "../components/authComponents/ProtectedRoutes";
import HomePage from "../pages/deprecated/Home.page";
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
