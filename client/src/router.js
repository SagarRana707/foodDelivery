import ErrorPage from './errorElement';
import {Login}from './containers';
import {createBrowserRouter} from "react-router-dom"
import App from './App';

const router = createBrowserRouter([
  {path: "/*" ,
element:<App/>,
errorElement: <ErrorPage/>
},
{path: "/login" ,
element:<Login/>
},
])
export default router;