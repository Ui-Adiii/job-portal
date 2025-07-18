import React from 'react'
import { Route,Routes ,BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import ScrollToTop from './components/customs/ScrollToTop'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <ToastContainer />
    
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
      </Routes >
    
    </BrowserRouter>
  )
}

export default App