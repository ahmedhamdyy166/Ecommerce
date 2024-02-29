import React, { useContext } from 'react'
import { authcontext } from '../Contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import Home from './Home'

export default function AuthProtectedroute({children}) {
    const { setUserIsLoggedIn, userIsLoggedIn } = useContext(authcontext)
  return (
    <>
      {userIsLoggedIn ? <Navigate to={'/Home'} /> : children}
    </>
  )
}
