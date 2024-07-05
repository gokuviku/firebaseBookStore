
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import MyNavbar from './components/Navbar'
import Detail from './pages/Detail'
import Home from './pages/Home'
import ListingPage from './pages/List'
import Login from './pages/Login'
import Register from './pages/Register'
import Order from './pages/Order'

function App() {

  return (
    <>
      <div className="">
        <MyNavbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/book/list' element={<ListingPage />} />
          <Route path='/book/view/:bookId' element={<Detail />} />
           <Route path='/book/orders' element={<Order />} />
        </Routes>
      </div>
    </>
  )
}

export default App
