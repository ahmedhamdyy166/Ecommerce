import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { authcontext } from '../Contexts/AuthContext';
export default function Login() {

const { setUserIsLoggedIn, userIsLoggedIn } = useContext(authcontext)
const[errormsg,seterrormsg]=useState('');
const[isLoading,setisloading]=useState(false);
const navigator=useNavigate()

const validate1=Yup.object({
    
    email:Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"Enter valid Email"),
    password:Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,"Enter a valid password"),
    

})

const {values,handleSubmit,errors,handleChange,handleBlur,touched,isValid}= useFormik({
    initialValues:{
        email:'',
        password:'',
       
    },
    onSubmit:async () =>{
      seterrormsg('')
     try {
        setisloading(true)
        let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
        
        
        if(data.message=="success"){
          setUserIsLoggedIn(true)
          localStorage.setItem('token' , data.token)
          navigator('/Home')
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
      <h1>Login Now :</h1>
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="email" className='my-1'>Email:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" className='form-control mb-3' id='email' name='email' />
        {errors.email && touched.email && <p className="alert alert-danger">{errors.email}</p>}


        <label htmlFor="password" className='my-1'>Password:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.password} type="password" className='form-control mb-3' id='password' name='password' />
        {errors.password && touched.password && <p className="alert alert-danger">{errors.password}</p>}

        {errormsg !='' && <div className="alert alert-danger">{errormsg}</div>}

        {isLoading?
        <button disabled type='button' className='btn bg-main px-4 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner px-3'></i> </button>
          :
        <button type='submit' disabled={!isValid || isLoading} className='btn bg-main px-3 text-white ms-auto d-block'>Login</button>
      }
      </form>
    </div>
  </>
}