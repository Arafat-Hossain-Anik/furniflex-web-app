import { createBrowserRouter } from "react-router-dom";
import './index.css'
import Home from './pages/Home/Home.jsx';
import Products from "./components/Products/Products.jsx";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PrivateRoute from "./privateRoute/privateRoute.jsx";
import AuthCheck from "./AuthCheck/AuthCheck.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><Home /></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Products />,
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/categories",
                element: <div className="d-flex align-items-center justify-content-center text-center" style={{ height: "40vh" }}>
                    <h1>Categories page will be developed soon</h1>
                </div>
            },
            {
                path: "/custom",
                element: <div className="d-flex align-items-center justify-content-center text-center" style={{ height: "40vh" }}>
                    <h1>Custom page will be developed soon</h1>
                </div>
            },
            {
                path: "/blog",
                element: <div className="d-flex align-items-center justify-content-center text-center" style={{ height: "40vh" }}>
                    <h1>Blog page will be developed soon</h1>
                </div>
            },
        ]
    },
    {
        path: "/login",
        element: <AuthCheck><Login /></AuthCheck>
    },
    {
        path: "/signup",
        element: <AuthCheck><SignUp /></AuthCheck>
    }
]);


export default router;