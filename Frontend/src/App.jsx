import React from 'react'
import { Route,Routes ,BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import ScrollToTop from './components/customs/ScrollToTop'
const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <ToastContainer />
    
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes >
    
    </BrowserRouter>
  )
}

export default App