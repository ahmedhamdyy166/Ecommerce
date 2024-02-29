import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

export default function CategoriesSlider() {
    const[categories,setcategories]=useState([])
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        arrows:false,
      };
    async function getAllcategories(){
        const {data}=await axios.get('https://route-ecommerce.onrender.com/api/v1/categories')
        setcategories(data.data)
    }
    useEffect(() => {
        getAllcategories()
    },[])

  return (
    
    <Slider {...settings}>
                {categories.map((category,index)=>{
                    return <div key={index}> 
                    
                    <img style={{height:200}} src={category.image} alt="" />
                    <h5>{category.name}</h5>
                    
                    </div>
                })}
                </Slider>
    
    
  )
}
