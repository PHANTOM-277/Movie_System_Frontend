import './App.css'
import { Routes,Route } from 'react-router-dom'

const Home = ()=>{
  return(<h1>Hi</h1>)
}
function App() {
  return(
    <Routes>
      <Route path='/' element={<Home />}></Route>
    </Routes>
  )
}

export default App
