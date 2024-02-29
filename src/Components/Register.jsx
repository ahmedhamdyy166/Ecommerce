import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
export default function Register() {

const[errormsg,seterrormsg]=useState('');
const[isLoading,setisloading]=useState(false);
const navigator=useNavigate()

const validate1=Yup.object({
    name:Yup.string().required("Name is required").min(3,"Min length is 3 characters"),
    email:Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"Enter valid Email"),
    password:Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,"Enter a valid password"),
    rePassword:Yup.string().required("rePassword is required").oneOf([Yup.ref('password')],"password and repassword must be the same"),
    phone:Yup.string().required("Egyptian Phone number is required").matches(/^01[0125][0-9]{8}$/,"Enter a valid phone number")        


})

const {values,handleSubmit,errors,handleChange,handleBlur,touched,isValid}= useFormik({
    initialValues:{
        name:'',
        email:'',
        password:'',
        rePassword:'',
        phone:''
    },
    onSubmit:async () =>{
      seterrormsg('')
     try {
        setisloading(true)
        let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
        
        console.log(data);
        if(data.message=="success"){
          navigator('/Login')
        }
     } catch (error) {
      seterrormsg(error.response.data.message)
     }
     setisloading(false)
    },
    validationSchema:validate1  //key , value

})

  return <>
    <div className="w-75 m-auto my-5">
      <h1>Register Now :</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className='my-1'>Name:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.name} type="text" className='form-control mb-3' id='name' name='name' />
        {errors.name && touched.name && <p className="alert alert-danger">{errors.name}</p>}

        <label htmlFor="email" className='my-1'>Email:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" className='form-control mb-3' id='email' name='email' />
        {errors.email && touched.email && <p className="alert alert-danger">{errors.email}</p>}


        <label htmlFor="password" className='my-1'>Password:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.password} type="password" className='form-control mb-3' id='password' name='password' />
        {errors.password && touched.password && <p className="alert alert-danger">{errors.password}</p>}


        <label htmlFor="rePassword" className='my-1'>RePassword:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.repassword} type="password" className='form-control mb-3' id='rePassword' name='rePassword' />
        {errors.rePassword && touched.rePassword && <p className="alert alert-danger">{errors.rePassword}</p>}


        <label htmlFor="phone" className='my-1'>phone:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.phone} type="tel" className='form-control mb-3' id='phone' name='phone' />
        {errors.phone && touched.phone && <p className="alert alert-danger">{errors.phone}</p>}


        {errormsg !='' && <div className="alert alert-danger">{errormsg}</div>}

        {isLoading?
        <button disabled type='button' className='btn bg-main px-4 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner px-3'></i> </button>
          :
        <button type='submit' disabled={!isValid || isLoading} className='btn bg-main px-3 text-white ms-auto d-block'>Register</button>
      }
      </form>
    </div>
  </>
}