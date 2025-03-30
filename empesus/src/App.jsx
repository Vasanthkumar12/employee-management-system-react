import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Register } from './authentication/Register'
import { SignIn } from './authentication/SignIn'
import { Home } from './pages/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </>
  )
}

export default App
