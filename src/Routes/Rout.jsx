import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts/Layouts";
import LayoutsDashboard from "../Layouts/LayoutsDashboard";
import Home from "../components/Web/Home/Home";
import HomeDashboard from "../components/Dashboard/Home/Home";
import NotFound from "../Shared/NotFound"
import Register from "../components/Web/Register/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layouts/>,
        children:[
            {
                path:'register',
                element:<Register/>
            },
            {
                path:'home',
                element:<Home/>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <LayoutsDashboard/>,
        children:[
            {
                path:'home',
                element:<HomeDashboard/>
            }
        ]
    },{
        path: "*",
        element: <NotFound/>
    }
]);