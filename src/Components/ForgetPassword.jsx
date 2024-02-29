// import axios from 'axios'
// import { Formik, useFormik } from 'formik'
// import React, { useState } from 'react'
// import * as Yup from 'yup'

// export default function ForgetPassword() {
//     const[errormsg,seterrormsg]=useState('');
//     const[formstatus,setformstatus]=useState(true)
//     const validate3=Yup.object({
//         email:Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"Enter valid Email"),

//     })
//     const validate4=Yup.object({
//         resetCode:Yup.string().required("resetcode is required").matches(/^[0-9]{5,6}$/,"Enter valid Email")

//     // })
//     const {values,handleSubmit,errors,handleChange,handleBlur,touched,isValid}= useFormik({
//         initialValues:{
//             email:'',}
//         }}
//     let Formik=useFormik({
//         initialValues:{
//             resetCode:''
//         },

        
//     })        
//         onSubmit:ForgetPasswordApi,
//         validationSchema:validate3})
//         async function ForgetPasswordAPi(value){
//             let req=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',value)
//             .catch((errormsg)=>{
//                 seterrormsg(errormsg.response.data.message)
//             })
//             if(req.data.statusMsg=='success'){
//                     setformstatus(false)
//             }
//         }
    

//   return (
//     <div>
        
//             {errormsg ? <div className="alert alert-danger"> 
//                 {errormsg}
//             </div> : ""}
//             {formstatus ? <form onSubmit={}>
//                 <label htmlFor="email">Enter your email</label>
//                 <input onBlur={handleBlur} onChange={handleChange} type="email" className="form-control" id="email" name="email" />
//                 <button type="submit" className="btn bg-main text-white">Send</button>
//             </form> : 
//               <form >
//               <label htmlFor="resetCode">Enter reset code</label>
//               <input type="resetCode" className="form-control" id="resetCode" name="resetCode" />
//               <button type="submit" className="btn bg-main text-white">Verify Code</button>
//           </form>
//             }
          
            
//         </div>

//   )
// }