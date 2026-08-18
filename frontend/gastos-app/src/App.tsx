import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/auth/ProtectedRoutes";
import HomePage from "../pages/Home.page";
import MovementsPage from "../pages/MovementsPage";
import Layout from "../pages/Layout";
import AddMovement from "../components/movements/addMovement";
import QueryMovements from "../components/movements/queryMovements";
import InvoicesVSExpenses from "../components/movements/graphs/invoicesVSexpenses";

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
          path: "/movements", 
          element: <MovementsPage/>,
          children: [
            { path: "add", element: <AddMovement/>},
            { 
              path: "query", 
              element: <QueryMovements/>,
              children: [
                {path: "exp_vs_inv", element: <InvoicesVSExpenses/>}
              ]
            },
          ]
        }
      ]
    }
  ]);

  return (<RouterProvider router={router} />)
}

export default App