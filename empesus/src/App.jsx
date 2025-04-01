import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Register } from './authentication/Register'
import { SignIn } from './authentication/SignIn'
import { Home } from './pages/Home'
import { NavBar } from './common/NavBar'
import { CreateEmployee } from './pages/CreateEmployee'
import { Landing } from './pages/Landing'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/create-employee' element={<CreateEmployee />} />
      </Routes>
    </>
  )
}

export default App
