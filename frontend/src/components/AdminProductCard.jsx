import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import EditProduct from './EditProduct';
import currencyRates from '../helpers/currencyRates';

const ProductCard = ({product, fetchData}) => {
   
  const [editProduct, setEditProduct] = useState(false);

  return (

    <div className='bg-white p-4 rounded'>
        <div className='w-40 '>
          <div className='w-32 h-32 flex justify-center items-center'>
            <img src={product?.productImage[0]} alt={product?.name} width={120} height={120} className='mx-auto object-fill h-full' />
          </div>
          
          <h1 className='text-ellipsis line-clamp-2'>{product.productName}</h1>

         <div>
          
          <p className='font-semibold'>
            {
              currencyRates(product.sellingPrice)
            }
            
          </p>
          <div className='w-fit ml-auto p-2 bg-green-200 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}> 
              <MdEdit />
          </div>

         </div>
        </div>
         
         {
          editProduct && (
            <EditProduct productData={product} onClose={()=>setEditProduct(false)} fetchData={fetchData}/>
          )
         }
      
    </div>
  )
}

export default ProductCard