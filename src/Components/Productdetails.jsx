import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'

export default function Productdetails() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
      };
      
    const[productdetails,setproductdetails]=useState({})
    const{id}=useParams()
    const[isLoading,setisloading]=useState(false)
    async function getProductdetails(){
        setisloading(true)
        let{data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + id)
        setisloading(false)
        setproductdetails(data.data)
    }
    useEffect(() => {

        getProductdetails()

    } , [] )
  return (
    <>
        {isLoading ?
        <>
            <div className="d-flex align-items-center justify-content-center my-5 py-5">
                <i className="fas fa-spin fa-spinner fa-2x"></i>
            </div>
         </>
         :
        <div className="row align-items-center py-5">
            
            <div className="col-md-3">
                <Slider {...settings}>
                {productdetails.images?.map((img,index)=>{
                    return <img key={index} src={img} className="w-100" />
                })}
                </Slider>
            </div>
            <div className="col-md-9">
                <h2 className="mt-2">{productdetails?.title}</h2>
                <h5 className="font-sm text-main mt-2">{productdetails?.category?.name}</h5>
                <p className="mt-2">{productdetails?.description}</p>
                <p className="d-flex justify-content-between mt-2">
                    <span>{productdetails?.price} EGP</span>
                    <span>
                        <i className="fas fa-star rating-color me-1"></i>
                        <span>{productdetails?.ratingsAverage}</span>
                    </span>
                </p>
                <button className="btn bg-main text-white w-100 mt-2">Add to Cart</button>
            </div>
        </div>   
        }
    </>
  )
}
