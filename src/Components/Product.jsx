import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { cartContext } from '../Contexts/CartContext'

export default function Product({product}) {
  const { setcart }=useContext(cartContext)
  async function addProductTocart(productId){
    const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/cart' , {
      productId // key,value
    },
    {
      headers:{
        token:localStorage.getItem('token')
      }
    })
    setcart(data)
    console.log(data)
    
    toast.success(data.message , {
      autoClose:1000,
      draggable:true,
    }
      );
    
  }
  
  return (
    <div className="product overflow-hidden px-2 py-3 cursor-pointer">
      <Link to={'/Productdetails/'+ product.id} className="a" >
        <img className="w-100" src={product.imageCover} alt="" />
        <h5 className="font-sm text-main">{product.category.name}</h5>
        <h4>{product.title.split(" ").slice(0,2).join(" ")}</h4>
        <p className="d-flex justify-content-between">
          <span>
            {product.price} EGP
          </span>
          <span>
            <i className="fas fa-star rating-color me-1"></i>
            {product.ratingsAverage}
          </span>
        </p>
      </Link>
      <button onClick={() => addProductTocart(product.id)} className="btn bg-main text-white w-100">Add to Cart</button>
    </div>
  )
}
