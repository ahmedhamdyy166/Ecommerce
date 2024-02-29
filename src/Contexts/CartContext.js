import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const cartContext = createContext()


export default function CartContextProvider({ children }) {

    const[cart,setcart]=useState({})

    async function getloggedIncartProducts() {
        try {
          const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: {
              token: localStorage.getItem('token')
            }
          })
    
          
          setcart(data)
        } catch (error) {
          console.log(error);
        }
      }
    useEffect(()=>{
        getloggedIncartProducts()
    },[])
    return <cartContext.Provider value={{cart , setcart  }}>
        {children}
    </cartContext.Provider>
}