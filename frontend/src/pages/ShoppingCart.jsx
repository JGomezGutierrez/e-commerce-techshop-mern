import React, { useEffect, useState } from 'react';
import { Global } from '../helpers/Global';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import currencyRates from '../helpers/currencyRates';
import { RiDeleteBin6Line } from "react-icons/ri";

const ShoppingCart = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { cartCount, setCartCount } = useAuth();
    const loadingShoppingCart = new Array(cartCount).fill(null);

    // Obtener los productos en el carrito
    const productsInCart = async () => {
        try {
            setLoading(true);
            const response = await fetch(Global.url + 'cart/cart-list-items', {
                method: "GET",
                credentials: 'include',
                headers: {
                    "content-type": "application/json",
                },
            });

            const data = await response.json();

            if (data.status === "success") {
                setProducts(data.products);
                setCartCount(data.products.reduce((acc, product) => acc + product.quantity, 0)); // Actualizar el conteo del carrito
            } else {
                throw new Error(data.message || 'Error al obtener los artículos del carrito');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        productsInCart();
    }, []);

    // Aumentar la cantidad de un producto
    const increaseQuantityItems = async (id, quantity) => {
        setLoading(true);
        try {
            const response = await fetch(Global.url + 'cart/update-cart-items', {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    productId: id,
                    quantity: quantity + 1
                })
            });

            const dataUpdate = await response.json();

            if (dataUpdate.status === "success") {
                productsInCart();
            } else {
                throw new Error(dataUpdate.message || 'Error al actualizar los artículos del carrito');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Disminuir la cantidad de un producto
    const decraseQuantityItems = async (id, quantity) => {
        if (quantity >= 2) {
            setLoading(true);
            try {
                const response = await fetch(Global.url + 'cart/update-cart-items', {
                    method: "PUT",
                    credentials: 'include',
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        productId: id,
                        quantity: quantity - 1
                    })
                });

                const dataUpdate = await response.json();

                if (dataUpdate.status === "success") {
                    productsInCart();
                } else {
                    throw new Error(dataUpdate.message || 'Error al actualizar los artículos del carrito');
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    // Eliminar productos del carrito 
    const deleteCartProducts = async (id) => {
        setLoading(true);
            try {
                const response = await fetch(Global.url + 'cart/delete-cart-items', {
                    method: "DELETE",
                    credentials: 'include',
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        productId: id,
                    })
                });

                const dataDelete = await response.json();

                if (dataDelete.status === "success") {
                    await productsInCart(); // Actualizar los productos en el carrito
                    const updatedCount = products.length - 1; // Ajustar el conteo
                    setCartCount(updatedCount); // Actualizar el conteo del carrito
                } else {
                    throw new Error(dataDelete.message || 'Error al eliminar los productos del carrito');
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
    };

     // Calcular el total de productos en el carrito
    const totalItems = products.reduce((preve,curr)=> preve + curr.quantity, 0 )

    //Calcular el precio total 
    const totalPrice = products.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0)

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {products.length === 0 && !loading && (
                    <p className='bg-white py-5'>No hay productos en el carrito</p>
                )}
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                {/* Listar artículos del carrito de compras */}
                <div className='w-full max-w-3xl'>
                    {loading ? (
                        loadingShoppingCart.map((_, index) => (
                            <div key={index} className='w-full bg-slate-300 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
                        ))
                    ) : (
                        products.map((product) => {
                            const productId = product?.productId;
                            const productImage = productId?.productImage || [];

                            return (
                                <div key={product?._id} className='w-full bg-white h-32 my-2 border border-slate-300 rounded flex'>
                                    <div className='w-28 h-32 bg-gray-200 bg-opacity-50'>
                                        {productImage.length > 0 ? (
                                            <img
                                                src={productImage[0]}
                                                alt={productId?.productName || "Producto"}
                                                className='w-full h-full object-scale-down mix-blend-multiply'
                                            />
                                        ) : (
                                            <p>No Image</p>
                                        )}
                                    </div>

                                    <div className='ml-4 flex flex-col justify-center w-full'>
                                        <p>{productId?.productName || "Nombre no disponible"}</p>
                                        <p className='text-slate-500'>{productId?.brandName || "Marca no disponible"}</p>
                                        <div className='flex items-center justify-between'>
                                            <p className='font-medium'>{currencyRates(productId?.sellingPrice || 0)}</p>
                                            <p className='text-slate-600 font-semibold mx-4'>{currencyRates(productId?.sellingPrice * product?.quantity)}</p>
                                        </div>
                                        {/* Contenedor para Eliminar Producto y Botones de Cantidad */}
                                        <div className='flex items-center justify-between mt-2'>
                                            {/* Eliminar Producto */}
                                            <div className='flex items-center gap-2'>
                                                <RiDeleteBin6Line className='text-2xl text-red-600 cursor-pointer'  onClick={() => deleteCartProducts(productId?._id)}/>
                                                <p>Eliminar</p>
                                            </div>

                                            {/* Contenedor flex para botones de cantidad */}
                                            <div className='flex items-center gap-2 mx-5'>
                                                <button
                                                    className='border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded-md hover:bg-red-600 hover:text-white'
                                                    onClick={() => decraseQuantityItems(productId?._id, product?.quantity || 0)}
                                                >
                                                    -
                                                </button>
                                                <p>{product?.quantity || 0}</p>
                                                <button
                                                    className='border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded-md hover:bg-red-600 hover:text-white'
                                                    onClick={() => increaseQuantityItems(productId?._id, product?.quantity || 0)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Total Productos */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {loading ? (
                        <div className='h-36 bg-slate-600 border-slate-300 animate-pulse'>
                            <h2 className='px-4 py-1'></h2>
                        </div>
                    ) : (
                        <div className='h-38 bg-white p-4'>
                            <h2 className='bg-gray-500 px-4 py-1 text-white justify-center text-center'> Resumen de la Orden</h2>
                            <div className='flex items-center justify-between px-4 gap-2 py-2 font-medium  text-slate-600'>
                                <p>Cantidad:</p>
                                <p>{totalItems}</p>
                            </div>

                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-slate-600'>
                                 <p>Total:</p>
                                 <p>{currencyRates(totalPrice)}</p>
                            </div>

                            <button className='bg-blue-600 text-white p-2 w-full'>Ir a Pagar</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
