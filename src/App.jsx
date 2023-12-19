import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { router } from './Routes/Rout'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import LayoutsDashboard from "./Layouts/LayoutsDashboard";
import Home from "./components/Web/Home/Home";
import HomeDashboard from "./components/Dashboard/Home/Home";
import NotFound from "./Shared/NotFound"
import Register from "./components/Web/Register/Register";
import Login from "./components/Web/Login/Login";
import Layouts from './Layouts/Layouts'
import ProductsByCategories from './components/Web/Products/ProductsByCategories'
import ProductDetails from './components/Web/Products/ProductDetails'

function App() {

  useEffect(
    () => {
      if (localStorage.getItem("token"))
        saveCurrentUser()
    }
    , []);

  const [user, setUser] = useState(null)


  const saveCurrentUser = () => {
    const token = localStorage.getItem("token")
    const user = jwtDecode(token)
    setUser(user)
  }



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layouts user={user} setUser />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'login',
          element: <Login saveCurrentUser={saveCurrentUser} />
        },
        {
          path:"/products/:name/:id",
          element: <ProductsByCategories/>
        },
        {
          path:"/product/:name/:id",
          element:<ProductDetails/>
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

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
