import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/auth/ProtectedRoutes";
import HomePage from "../pages/Home.page";
import MovementsPage from "../pages/MovementsPage";
import Layout from "../pages/Layout";
import AddMovement from "../components/movements/addMovement";
import QueryMovements from "../components/movements/queryMovements";
import InvoicesVSExpenses from "../components/graphs/invoicesVSexpenses";
import ExpensesPerYear from "../components/graphs/expensesPerYear";
import TopClasifications from "../components/graphs/topClasifications";
import ClasificationsTable from "../components/clasifications/clasification-table";
import CreditCardsTable from "../components/clasifications/credit-cards-table";

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
          path: "/home", element:<HomePage />,
          children: [
            {path: "clasifications", element: <ClasificationsTable/>},
            {path: "credit-cards", element: <CreditCardsTable/>}
          ]
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
                {path: "exp_vs_inv", element: <InvoicesVSExpenses/>},
                {path: "exp", element: <ExpensesPerYear/>},
                {path: "top_clas", element: <TopClasifications/>},
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