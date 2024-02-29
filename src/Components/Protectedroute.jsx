import React, { useContext } from 'react'
import { authcontext } from '../Contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function Protectedroute({children}) {
    const { setUserIsLoggedIn, userIsLoggedIn } = useContext(authcontext)
  return (
    <>
    
    {userIsLoggedIn ? children : <Navigate to={'/Login'} />}
    </>
  )
}
