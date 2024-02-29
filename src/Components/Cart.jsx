import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Product from './Product'
import CartDetails from './CartDetails'
import { Link } from 'react-router-dom'
import { cartContext } from '../Contexts/CartContext'

export default function Cart() {
  const[cart,setcart]=useState({})
  const {setcart:contextsetcart}=useContext(cartContext)
  const [timeOutId, setTimeOutId] = useState()
  const[cartId,setcartid]=useState()
  async function getloggedIncartProducts() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token: localStorage.getItem('token')
        }
      })

      console.log(data);
      setcartid(data.data._id)
      setcart(data)
    } catch (error) {
      console.log(error);
    }
  }
  async function removeProductfromCart(productId){
    const{data}=await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' + productId ,{
      headers:{
        token:localStorage.getItem('token')
      }
    })
    console.log(data)
    setcart(data)
    contextsetcart(data)
  }
  async function clearCart() {
    const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    console.log(data);
    setcart(data);
    contextsetcart({})
  }
  useEffect(() =>{
    getloggedIncartProducts()
  },[])
  function updateCartProductCount(productId, count) {
    clearTimeout(timeOutId)

    setTimeOutId(setTimeout(async () => {
      if (count == 0) {
        removeProductfromCart(productId)
      } else {
        const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
          count  // key , value
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        console.log(data);
        setcart(data);
      }
    }, 500))
  }
  return <>
    {cart.data?.products.length > 0 ?
    
    <div className="my-5">
      <button onClick={clearCart} className="btn btn-outline-danger d-block ms-auto">Clear Cart</button>
      {cart.data?.products.map((cartProduct,index)=> {  // map as there is array of indices for each product
        return <CartDetails updateCartProductCount={updateCartProductCount} removeProductfromCart={removeProductfromCart}  key={index} cartProduct={cartProduct} />
      })}
      <div className="d-flex justify-content-between">
        <Link to={'/address/' + cartId} className="btn bg-main text-white">Checkout</Link>
        <p>Total Cart Price: {cart.data?.totalCartPrice} EGP</p>
      </div>
    </div>
    :
    <h2 className="alert alert-warning text-center my-5">No products in your cart</h2>
}
  </>
}
