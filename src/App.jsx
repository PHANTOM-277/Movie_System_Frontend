import './App.css'
import { Routes,Route, useParams } from 'react-router-dom'
//import BookingHistory from './pages/BookingHistory'
import Login from './pages/Login'
import Home from './pages/Home'


function App() {
  return(
    <Routes>
      {/* routes which dont need login */}
      <Route path='/' element={<Home />} />
      
      
      {/* registeration and login route */}
      <Route path='/login' element={<Login />} />
      
    </Routes>
  )
}


export default App
