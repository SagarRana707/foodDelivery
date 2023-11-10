import ErrorPage from "./errorElement";
import { Dashboard, Login, Main } from "./containers";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CheckOutSuccess from "./components/checkOutSuccess";

const router = createBrowserRouter([
  {
    path: "/*",
    element: (
      <>
        <Main></Main>
        <App />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <>
        <Main></Main>
        <Login />
      </>
    ),
  },
  {
    path: "/dashboard/*",
    element: (
        <Dashboard />
    ),
  },
  {
    path: "/checkOutSuccess",
    element: (
        <CheckOutSuccess/>
    ),
  },
]);
export default router;
