import { createContext, useEffect, useState } from "react";



export const authcontext = createContext()


export default function AuthContextProvider({ children }) {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(!!localStorage.getItem('token'))
    
    return <authcontext.Provider value={{ userIsLoggedIn, setUserIsLoggedIn }}>
        {children}
    </authcontext.Provider>
}