import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../helpers/Global';
import currencyRates from '../helpers/currencyRates';
import RecommendedProducts from '../components/RecommendedProducts';

const ProductDetails = () => {
  const [product, setProduct] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

  const params = useParams();
  const [loading, setLoading] = useState(false);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });

  const [zoomImage, setZoomImage] = useState (false)

  const getProductsDetails = useCallback(async () => {
    setLoading(true);
    try {
      const request = await fetch(Global.url + "product/product-details", {
        method: "POST",
        body: JSON.stringify({
          productId: params.id
        }),
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await request.json();

      if (data.status === 'success') {
        setProduct(data.product);
        setActiveImage(data.product.productImage[0]);
      } else {
        throw new Error(data.message || 'Error al obtener los detalles del producto');
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    getProductsDetails();
  }, [getProductsDetails]);

  const handleMouseEnter = (img) => {
    setActiveImage(img);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({
      x,
      y,
    });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }
  

  return (
    <div className='container mx-auto p-4'>
      
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/** Imagen del Producto */}
        <div className='relative h-96 flex flex-col lg:flex-row-reverse gap-4'>
            <div className='relative h-[300px] w-[300px] lg:h-96 lg:w-96 bg-white' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}>
              {loading ? (
                <div className='h-full w-full flex items-center justify-center'>
                  <p>Cargando...</p>
                </div>
              ) : (
                <img src={activeImage} alt={product.productName} className='h-full w-full object-contain mix-blend-multiply' />
              )}
            
              {/** Zoom del Producto */}
            
              {
                zoomImage && (
                  <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] overflow-hidden bg-white p-1 -right-[510px] top-0'>
                  <div
                    className='w-full h-full min-h-[400px]  min-w-[500px] mix-blend-multiply bg-no-repeat scale-90'
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                    }}
                  />
                </div>
                )
              }
            
            </div>

            <div className='h-full'>
              {loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {productImageListLoading.map((_, index) => (
                    <div className='h-20 w-20 bg-slate-100 rounded animate-pulse' key={index}></div>
                  ))}
                </div>
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {product.productImage.map((img, index) => (
                    <div className='h-20 w-20 bg-slate-100 rounded p-1' key={img}>
                      <img
                        src={img}
                        alt={product.productName}
                        className='w-full h-full object-contain mix-blend-multiply cursor-pointer'
                        onMouseEnter={() => handleMouseEnter(img)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
        </div>

        {/** Detalle del Producto */}
        <div className='w-full lg:w-1/2'>
          {loading ? (
            <div className='flex justify-center items-center min-h-[200px]'>
              <p>Cargando...</p>
            </div>
          ) : (
            <div className='bg-white p-4 rounded shadow'>
              <h2 className='text-2xl font-semibold mb-4'>{product.productName || 'Nombre del producto'}</h2>
              <p className='text-slate-500 mb-2'>Marca: {product.brandName}</p>
              <p className='text-slate-500 mb-2'>Categoría: {product.category}</p>
              <p className='text-slate-500 mb-4'>Descripción: {product.description}</p>
              <div className='flex gap-4 mb-4'>
                <p className='text-red-600 font-medium text-lg'> {currencyRates(product.sellingPrice)}</p>
                <p className='text-slate-500 line-through'>{currencyRates(product.price)}</p>
              </div>
              <button className='text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full'>
                Agregar al carrito
              </button>
            </div>
          )}
        </div>
      </div>

      <RecommendedProducts category={product.category} title={"Tambien te puede interesar"}/>

    </div>
  );
};

export default ProductDetails;
