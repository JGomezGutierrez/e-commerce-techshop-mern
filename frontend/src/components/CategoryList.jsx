import React, { useEffect, useState } from 'react'
import { Global } from '../helpers/Global';
import {toast} from 'react-toastify';
import productsCategory from '../helpers/productsCategory';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categoryProducts , setCategoryProducts] = useState([]);
    const [loading , setLoading] = useState(false)

    const categoryLoading = new Array(13).fill(null)

    useEffect(()=> {
        getCategoryProducts();
    }, []);

    const getCategoryProducts = async() => {
      try{
        setLoading(true);
        const response = await fetch(Global.url + 'product/get-categoryProduct', {
          method: 'GET',
          credentials: 'include',
          headers: {},
        });
    

        const data = await response.json();

        if (data.status === 'success') {
            setCategoryProducts(data.productByCategory);
          } else {
            throw new Error(data.message || 'Error al obtener las categorías');
          }
        } catch (error) {
          console.error('Error al obtener las categorías:', error);
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
    };

    const getCategoryLabel = (value) => {
        const category = productsCategory.find((cat) => cat.value === value);
        return category ? category.label : value;
      };

    
  return (
    <div className='container mx-auto p-4'>
       <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
        {
            loading ? (
                categoryLoading.map((el, index) =>{
                  return (
                    <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden  bg-slate-300 animate-pulse' key={"categoryLoading"+index}>
                    </div>
                  )
                })
                
              ) : 
              (
                categoryProducts.map((product, index) => {
                    return(
                        <Link to={"/categoria-producto"+ "/" + getCategoryLabel(product?.category) } className='cursor-pointer' key={product?.category}>
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-300 flex items-center justify-center'>
                                <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>{getCategoryLabel(product?.category)}</p>
                        </Link>
                    )
                })
              )
           
        }
       </div>
    </div>
  )
}

export default CategoryList