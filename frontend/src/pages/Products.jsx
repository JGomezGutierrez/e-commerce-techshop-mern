import React, { useEffect, useState } from 'react'
import UploadProducts from '../components/UploadProducts'
import { Global } from '../helpers/Global';
import { toast } from 'react-toastify';
import ProductCard from '../components/AdminProductCard';

const Products = () => {
  
  const [openModal, setOpenModal] = useState(false);
  const [allProducts, setallProducts] = useState ([]);

  useEffect(() => {
    getAllProducts();
    }, [])
  

  const getAllProducts = async () => {
    try {
      // Obtener el token 
      const token = localStorage.getItem('token');
      
      // Comprobar si hay token
      if (!token) return false;

      const response = await fetch(Global.url + "product/list-products", {
        method: "GET",
        credentials: 'include',
        headers: {
          "Authorization": token
        }
      });

      const data = await response.json();

      if (data.status === "success") {
        setallProducts(data.allProducts || []);
      } else {
        throw new Error(data.message|| 'Error al listar los productos');
      }
    } catch (error) {
      console.error("Error al listar los productos:", error);
      toast.error(error.message);
    }
  };
  
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'> Productos</h2>
        <button className='border-2 border-red-600 text-white bg-red-500 hover:bg-red-600  hover:text-white py-1 p-4 rounded-full' onClick={()=>setOpenModal(true)}> Cargar Productos</button>
      </div>

      {/* Listar Productos */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProducts.length > 0 ?  (
            allProducts.map((product,index) => (
              <ProductCard product={product} key={index + "allProducts"} fetchData={getAllProducts}/>
            ))
          ): (
            <p>No hay productos disponibles</p>
          )
        }
      </div>

    {/* cargar componente producto */}
      {
        openModal && (
          <UploadProducts onClose={()=>setOpenModal(false)} fetchData={getAllProducts} />
        )
      }
      
    </div>
  )
}

export default Products