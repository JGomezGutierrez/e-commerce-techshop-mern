import React, { useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import productsCategory from '../helpers/productsCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import { useForm } from '../hooks/useForm';
import { Global } from '../helpers/Global';
import Swal from "sweetalert2";
import uploadImage from '../helpers/uploadImage';

const EditProduct = ({onClose, productData, fetchData}) => {

    const {form, handleOnchange} = useForm({
        ...productData,
        productName: productData?.productName,
        brandName:  productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice 
      })
    
      const token = localStorage.getItem('token');
    
      const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
      const [fullScreenImage, setFullScreenImage] = useState()
    
    
      // Manejo de la carga de la imagen del producto
      const handleUploadProduct = async(e) => {
        const file = e.target.files[0];
        const uploadImageCloudinary = await uploadImage(file)
    
        if (file) {
          handleOnchange({
            target: {
              name: 'productImage',
              value: [...form.productImage, uploadImageCloudinary.url]
            }
          });
        }
      };
    
      const handleDeleteProductImage = (index) => {
        const newProductImage = [...form.productImage];
        newProductImage.splice(index, 1);
        handleOnchange({
          target: {
            name: 'productImage',
            value: newProductImage
          }
        });
      };
    
      // // Datos del formulario
      // let uploadProduct = form;
    
      /**Cargar Producto */
      const handleSubmit = async (e) => {
        e.preventDefault()
    
        try{
        // Petición al backend
        const request = await fetch(Global.url + `product/update-product/${form.id}`, {
          method: "PUT",
          body: JSON.stringify(form),
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          }
        });
    
        // Obtener la información retornada por la request
        const data = await request.json();
        
        if (request.ok && data.status === "success") {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: data.message || 'Producto actualizado con éxito'
          });
          onClose();
          fetchData();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.message || 'Error al actualizar el producto'
          });
        }
      } catch (error) {
        console.error('Error al actualizar los productos:', error);
    
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Error al actualizar el producto. Inténtalo de nuevo más tarde.'
        });
      }
      }

  return (
    <div className='modal-bg'>
      <div className='modal-content-products'> 
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Editar Producto</h2>
          <button className='block ml-auto text-2xl cursor-pointer' onClick={onClose}>
            <IoMdCloseCircle size={24} />
          </button>
        </div>

        <form className='grid p-4 gap-3 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label htmlFor="productName">Nombre del Producto:</label>
          <input 
            type="text" 
            name="productName" 
            id="productName" 
            placeholder='Ingrese el nombre del producto' 
            value={form.productName} 
            onChange={handleOnchange} 
            className='p-2 bg-slate-200' 
            required
          />

          <label htmlFor="brandName">Marca:</label>
          <input 
            type="text" 
            name="brandName" 
            id="brandName" 
            placeholder='Ingrese la marca' 
            value={form.brandName} 
            onChange={handleOnchange} 
            className='p-2 bg-slate-200' 
            required
          />

          <label htmlFor="category">Categoria:</label>
          <select 
            name="category" 
            id="category" 
            value={form.category} 
            className='p-2 bg-slate-200' 
            onChange={handleOnchange}
            required
          >
             <option value={""}>Seleccione una categoria</option>
            {
              productsCategory.map((category, index) => (
                <option value={category.value} key={category.value + index}>
                  {category.label}
                </option>
              ))
            }
          </select>

          <label htmlFor="productImage">Imagen del producto:</label>
          <label htmlFor="uploadImageInput">
            <div className='p-2 bg-slate-100 border-rounded h-32 w-full flex justify-center items-center cursor-pointer'>
              <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                <span className='text-3xl'><FaCloudUploadAlt /></span>
                <p className='text-sm'>Cargar Imagen del producto</p>
                <input 
                  type="file" 
                  name="uploadImageInput" 
                  id="uploadImageInput" 
                  className='hidden' 
                  onChange={handleUploadProduct} 
                />
              </div>
            </div>
          </label>
          <div>
            <div className='flex items-center gap-2'>
              {
                form?.productImage[0] ? (
                  form.productImage.map((product, index) => (
                    <div className='relative group' key={index} >
                      <img 
                        src={product} 
                        alt={product} 
                        width={90} 
                        height={90} 
                        className='bg-slate-100 border cursor-pointer' 
                        onClick={()=> {
                          setOpenFullScreenImage(true)
                          setFullScreenImage(product)
                        }}
                      />

                      <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                         <MdDelete/>
                      </div>
                    </div>
                    
                  ))
                ) : (
                  <p className='text-red-600 text-xs'>*Por favor cargar imagen del producto</p>
                )
              }

            </div>
          </div>

          <label htmlFor="price">Precio:</label>
          <input 
            type="number" 
            name="price" 
            id="price" 
            placeholder='Ingrese el precio' 
            value={form.price}
            onChange={handleOnchange} 
            className='p-2 bg-slate-200' 
            required
          />

          <label htmlFor="sellingPrice">Precio de venta:</label>
          <input 
            type="number" 
            name="sellingPrice" 
            id="sellingPrice" 
            placeholder='Ingrese el precio de venta' 
            value={form.sellingPrice} 
            onChange={handleOnchange} 
            className='p-2 bg-slate-200' 
            required
          />

          <label htmlFor="description">Descripcion:</label>
          <textarea  
          name="description" 
          id="description" 
          placeholder='Ingrese la descripcion del producto'
          value={form.description}
          className='h-28 bg-slate-100 border p-1' 
          onChange={handleOnchange}
          required>
          </textarea>
          


          <button className='px-3 py-1 bg-red-600 text-white mb-10 hover:bg-red-700'>
            Editar Producto
          </button>
        </form>
        
      </div>
      {/* visualización de imagen en pantalla completa  */}
      {
        openFullScreenImage && (
          <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
      }
      
     
    </div>
  )
}

export default EditProduct