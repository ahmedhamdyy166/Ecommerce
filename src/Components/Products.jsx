import React, { useEffect, useState } from 'react'
import Product from './Product';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function Products() {
    
       function getAllProducts() {
        return axios.get('https://route-ecommerce.onrender.com/api/v1/products')
     
       }
      const{data}=useQuery('Products',getAllProducts,{
        cacheTime:20000,
        // refetchInterval:10000,
        staleTime:5000,
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        



      })
    
  return <>
    <div className="row">
    {data?.data.data.map((product) => {
        return <div key={product.id} className="col-md-3">
          <Product product={product} />
        </div>
      })}
    </div>
  
  
  
  </>
}
