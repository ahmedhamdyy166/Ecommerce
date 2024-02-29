import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup'
export default function Addresses() {
const[errormsg,seterrormsg]=useState('');
const[isLoading,setisloading]=useState(false);
let {cartId}=useParams()
// const navigator=useNavigate()

const validate2=Yup.object({
    
    details:Yup.string().required("Details is required"),
    city:Yup.string().required("City is required"),
    phone:Yup.string().required("Egyptian Phone number is required").matches(/^01[0125][0-9]{8}$/,"Enter a valid phone number") 
    

})
async function onSubmit(){
  setisloading(true)
  seterrormsg('')
 try {
      console.log(values)
      let{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
          shippingAddress:values
      },{
        headers:{
          token:localStorage.getItem('token')
        },
        params:{
          url:'http://localhost:3000'
        }
      }
      )
      console.log(data.session.url)
      window.open(data.session.url, '_self')  // stripe
    }
  catch (error) {
  seterrormsg(error.response.data.message)
 }
 setisloading(false)
}

const {values,handleSubmit,errors,handleChange,handleBlur,touched,isValid}= useFormik({
    initialValues:{
        details:'',
        city:'',
        phone:'',
       
    },
    onSubmit,
    validationSchema:validate2
  })
    
  return <>
  <div className="w-75 m-auto my-5">
      <h1>Address :</h1>
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="details" className='my-1'>Details:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.details} type="text" className='form-control mb-3' id='details' name='details' />
        {errors.details && touched.details && <p className="alert alert-danger">{errors.details}</p>}


        <label htmlFor="city" className='my-1'>City:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.city} type="text" className='form-control mb-3' id='city' name='city' />
        {errors.city && touched.city && <p className="alert alert-danger">{errors.city}</p>}

        <label htmlFor="phone" className='my-1'>phone:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.phone} type="tel" className='form-control mb-3' id='phone' name='phone' />
        {errors.phone && touched.phone && <p className="alert alert-danger">{errors.phone}</p>}


        {errormsg !='' && <div className="alert alert-danger">{errormsg}</div>}

        {isLoading?
        <button disabled type='button' className='btn bg-main px-4 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner px-3'></i> </button>
          :
        <button type='submit' disabled={!isValid || isLoading} className='btn bg-main px-3 text-white ms-auto d-block'>Checkout</button>
      }
      </form>
    </div>
  
  </>
}
