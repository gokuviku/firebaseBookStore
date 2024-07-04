
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
 
function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<h1>Home</h1>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />



     </Routes>
    </>
  )
}

export default App
