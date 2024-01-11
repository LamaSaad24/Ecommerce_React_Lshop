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
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfileContextProvider } from './components/Web/Context/Profile';
import { UserContextProvider } from './components/Web/Context/User';
import { CartContextProvider } from './components/Web/Context/Cart';

function App() {





  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </CartContextProvider>
      </UserContextProvider>
    </>
  )
}

export default App
