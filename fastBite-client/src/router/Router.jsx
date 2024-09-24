import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Sigup";
import CartPage from "../pages/shop/CartPage";
import UpdateProfile from "../pages/dashboard/UpdateProfile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/menu",
                element: <Menu />,
            },
            {
                path: "/cart-page",
                element: <CartPage />
            },
            {
                path: "/update-profile",
                element: <UpdateProfile />
            }
        ],
    },
    {
        path: "/signup",
        element: <Signup />
    }
]);

export default router;