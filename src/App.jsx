import './App.css'
import { Routes,Route, useParams } from 'react-router-dom'
//import BookingHistory from './pages/BookingHistory'
import Login from './pages/Login'
import Home from './pages/Home'

const Movies = ()=>{
  return(<h1>Movies</h1>)
}

const MovieDetails = ()=>{
  const {id} = useParams();
  return(<h1>Movie number :  {id}</h1>)
}

function App() {
  return(
    <Routes>
      {/* routes which dont need login */}
      <Route path='/' element={<Home />} />
      <Route path='/movies' element={<Movies />} />
      
      
      {/* registeration and login route */}
      <Route path='/login' element={<Login />} />
      
    </Routes>
  )
}


export default App
