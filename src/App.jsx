import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './Routes/Rout'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'


function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
