import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './Screens/Signup/Signup'
import Signin from './Screens/Signin/Signin'
import Home from './Screens/Home/Home'
import { useSelector } from 'react-redux'
import { RootState } from './store/features/types'
import ErrorComponent from './components/ErrorComponent/ErrorComponent'

interface CurrentUser {
  username: string;
  email: string;
}

function App() {

  const currentUser = useSelector((state: RootState) => state.user.currentUser) as CurrentUser;

  return (
    <>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        {currentUser && currentUser.username && <Route path='/home' element={<Home />} />}
        <Route path='*' element={<ErrorComponent />} />
      </Routes>
    </>
  )
}

export default App
