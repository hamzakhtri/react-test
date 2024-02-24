import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './Screens/Signup/Signup'
import Signin from './Screens/Signin/Signin'
import Home from './Screens/Home/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
