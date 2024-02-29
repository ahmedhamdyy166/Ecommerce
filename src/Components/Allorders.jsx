import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'

export default function Allorders() {
  const[orders,setorders]=useState([])
  async function getallorders(id){
    
    const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/' + id)
    setorders(data)
  }
  useEffect(()=>{
    const { id }=jwtDecode(localStorage.getItem('token')) // to get user id decode
    console.log(id)
  
      getallorders(id)
  },[])
  return (
    <>
      <h1>Your Orders</h1>
      {orders.map((order)=>{
        return <div key={order.id} className="row">
          <div className="order shadow rounded p-4 my-5">
            <div className="d-flex align-items-center">
              <h2 className="fw-bolder h1">#{order.id}</h2>
              <h4 className="fw-bold text-primary mx-4">Processing</h4>

            </div>
            <p>You have ordered {order.cartItems.length} items</p>
            <div className="d-flex">
              {order.cartItems.map((item)=>{
                return <img src={item.product.imageCover} style={{width:150}} className="img-thumbnail mx-1" key={item._id} alt="" />
              })

              }
            </div>
            <hr />
            <p><strong>Total amount:</strong>{order.totalOrderPrice} EGP</p>
          </div>
        </div>
      })}
    </>
  )
}
