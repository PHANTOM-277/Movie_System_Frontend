import './App.css'
import { Routes,Route, useParams } from 'react-router-dom'
//import BookingHistory from './pages/BookingHistory'
import Login from './pages/Login'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'


function App() {
  return(
    <Routes>
      {/* routes which dont need login */}
      <Route path='/' element={<Home />} />
      
      
      {/* registeration and login route */}
      <Route path='/login' element={<Login />} />
      <Route path='/MovieDetails/:id' element={<MovieDetails />} />
    </Routes>
  )
}


export default App
