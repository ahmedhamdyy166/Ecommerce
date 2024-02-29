import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from './Product';
import Slider from 'react-slick';
import img1 from '../Assets/images/grocery-banner.png'
import img2 from '../Assets/images/grocery-banner-2.jpeg'
import img3 from '../Assets/images/1.jpg'
import img4 from '../Assets/images/2.jpg'
import CategoriesSlider from './CategoriesSlider';


export default function Home() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };


  const [producthome, setProducts] = useState([])

  async function getAllProducts() {
    const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/products')
    setProducts(data.data);
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  
{/* 
    <header>
      <div className="row g-0">
        <div className="col-md-10">
          <Slider {...settings}>
            <div>
              <img src={img1} className="w-100" alt="" />
            </div>
            <div>
              <img src={img2} className="w-100" alt="" />
            </div>
                        
          </Slider>
        </div>
        <div className="col-md-2">
        <img src={img3} className="w-100" alt="" />
        <img src={img4} className="w-100" alt="" />
        </div>
      </div>
    </header> */}

    return <>
    <CategoriesSlider />
    <header>
      <div className="row g-0">
        <div className="col-md-10">
          <Slider {...settings}>
            <div>
              <img src={img1} className="w-100" alt="" />
            </div>
            <div>
              <img src={img2} className="w-100" alt="" />
            </div>
                        
          </Slider>
        </div>
        <div className="col-md-2">
        <img src={img3} className="w-100" alt="" />
        <img src={img4} className="w-100" alt="" />
        </div>
      </div>
      <div className="row">
      {producthome.map((product) => {
        return <div key={product.id} className="col-md-3">
          <Product product={product} />
        </div>
      })}
    </div>
    </header>  
    
  </>
}
