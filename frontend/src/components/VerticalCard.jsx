import React, { useEffect, useRef, useState } from 'react'
import { Global } from '../helpers/Global'
import currencyRates from '../helpers/currencyRates'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'

const VerticalCardProduct = ({category, title}) => {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null) // Array de 13 elementos inicializados con null
 
    const [scrollbar, setScrollbar] = useState(0);
    const scrollbarElement = useRef();

    useEffect(() => {
    getCategoryWiseProduct(category)
    }, [category])

    const getCategoryWiseProduct = async(category) =>{
      try {
      setLoading(true);
      const response = await fetch(Global.url + "product/category-product", {
        method: "POST",
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          category: category
        })
      });

      const data = await response.json();
     
      if (data.status === 'success') {
        setProduct(data?.product);
        setLoading(false);
      } else {
        throw new Error(data.message || 'Error al obtener las productos por categoria');
      }
    } catch (error) {
      console.error('Error al obtener las productos por categoria:', error);
      // toast.error(error.message);
    } finally {
      setLoading(false);
    }
};

const scrollbarRight = () => {
  scrollbarElement.current.scrollLeft += 300
}

const scrollbarLeft = () => {
  scrollbarElement.current.scrollLeft -= 300
}

  
 
  return (
    <div className='container mx-auto px-4 my-6 relative'>
        
        <h2 className='text-2xl font-semibold py-4'>{title}</h2>
        
        <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll  scrollbar-none transition-all' ref={scrollbarElement}>
         
        <button className='bg-gray-400 bg-opacity-50 shadow-md p-1 absolute left-0 text-lg hidden md:block' onClick={scrollbarLeft}><FaAngleLeft /></button>
        <button className='bg-gray-400 bg-opacity-50 shadow-md p-1 absolute right-0 text-lg hidden md:block' onClick={scrollbarRight}><FaAngleRight /></button> 
            
            {
              loading ? (
                loadingList.map((product, index) =>{
                    return (
                      <div className=' bg-white w-full min-w-[320px] md:min-w-[380px] max-w-[320px] md:max-w-[380px] rounded-sm shadow'>
                        <div className='bg-slate-300 h-48 p-4 min-w-[320px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                            
                        </div>
  
                        <div className='p-4 grid w-full gap-2'>
                          <p className=' text-slate-500 uppercase bg-slate-300 animate-pulse p-1 py-2 rounded-full'></p>
                          <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-2 capitalize bg-slate-300 animate-pulse p-1 py-2 rounded-full'></h2>
                          <p className='capitalize text-slate-500 bg-slate-300 animate-pulse p-1 py-2 rounded-full'></p>
                          <div className='flex gap-3 w-full'>
                              <p className='text-red-600 font-medium bg-slate-300 w-full animate-pulse p-1 py-2 rounded-full'></p>
                              <p className='text-slate-500 line-through bg-slate-300 w-full animate-pulse p-1 py-2 rounded-full'></p>
                          </div>
                          <button className='text-sm text-white px-3  w-full bg-slate-300 animate-pulse p-1 py-2 rounded-full'></button>
                        </div>
                      </div>
                    )
                  })
              ):(
                product.map((product, index) =>{
                  return (
                    <Link to={"producto/" + product?._id} className=' bg-white w-full min-w-[320px] md:min-w-[380px] max-w-[320px] md:max-w-[380px] rounded-sm shadow'>
                      <div className='bg-gray-200 bg-opacity-50 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center'>
                          <img src={product.productImage[0]} className='object-scale-down h-full  hover:scale-110 transition-all mix-blend-multiply' alt={product.productName} />
                      </div>

                      <div className='p-4 grid gap-2'>
                        <p className=' text-slate-500 uppercase'>{product?.brandName}</p>
                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 capitalize text-black'>{product?.productName}</h2>
                        <p className='capitalize text-slate-500 '>{product?.category}</p>
                        <div className='flex gap-3'>
                            <p className='text-red-600 font-medium'>{currencyRates (product?.sellingPrice)}</p>
                            <p className='text-slate-500 line-through'>{currencyRates (product?.price)}</p>
                        </div>
                        <button className='text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full' onClick={(e)=>addToCart(e,product?._id)}>Agregar al carrito</button>
                      </div>
                    </Link>
                  )
                })
              )
                
            }
        </div>
      
       
    </div>

  )
}

export default VerticalCardProduct