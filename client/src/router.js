import ErrorPage from "./errorElement";
import { Dashboard, Login, Main } from "./containers";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

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
]);
export default router;
