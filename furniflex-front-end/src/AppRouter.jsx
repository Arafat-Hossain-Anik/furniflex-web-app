import { createBrowserRouter } from "react-router-dom";
import './index.css'
import Home from './pages/Home/Home.jsx';
import Products from "./components/Products/Products.jsx";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <SignUp />
            }
        ]
    },
]);


export default router;