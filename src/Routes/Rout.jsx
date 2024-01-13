import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts/Layouts";
import LayoutsDashboard from "../Layouts/LayoutsDashboard";
import Home from "../components/Web/Home/Home";
import HomeDashboard from "../components/Dashboard/Home/Home";
import NotFound from "../Shared/NotFound"
import Register from "../components/Web/Register/Register";
import Login from "../components/Web/Login/Login";
import Profile from "../components/Web/Profile/Profile";
import ForgetPassowrd from "../components/Web/ForgetPassowrd/ForgetPassowrd";
import ResetPassword from "../components/Web/ForgetPassowrd/RestPassword";
import ProductsByCategories from "../components/Web/Products/ProductsByCategories";
import ProductDetails from "../components/Web/Products/ProductDetails";
import Cart from "../components/Web/Cart/Cart";
import ProtectedRoute from "../components/Web/ProtectedRoute/ProtectedRoute";
import Auth from "../components/Web/ProtectedRoute/Auth";
import Checkout from "../components/Web/Checkout/Checkout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layouts />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'register',
                element: <Auth><Register /></Auth>
            },
            {
                path: 'login',
                element: <Auth><Login /></Auth>
            },
            {
                path: 'profile',
                element: <ProtectedRoute><Profile/></ProtectedRoute>
            },
            {
                path: 'forgetPassword',
                element: <ForgetPassowrd/>
            },
            {
                path: 'restPassword',
                element: <ResetPassword/>
            },
            {
                path: "/products/:name/:id",
                element: <ProductsByCategories/>
            },
            {
                path: "/product/:name/:id",
                element: <ProductDetails/>
            },
            {
                path: '/cart',
                element: <ProtectedRoute><Cart/></ProtectedRoute>
            },
            {
                path: '/checkout',
                element: <Checkout/>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <LayoutsDashboard />,
        children: [
            {
                path: 'home',
                element: <HomeDashboard />
            }
        ]
    }, {
        path: "*",
        element: <NotFound />
    }
]);