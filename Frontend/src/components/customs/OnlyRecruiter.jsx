import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet ,Navigate} from 'react-router-dom'

const OnlyRecruiter = () => {
  const {currentUser} =useSelector((state) => state.user);
  return currentUser && currentUser.role === "recruiter" ? <Outlet/> : <Navigate to={'/sign-in'} />
}

export default OnlyRecruiter