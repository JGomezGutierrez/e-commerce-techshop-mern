import { toast } from 'react-toastify';
import { Global } from './Global';

const addToCart = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();

    try {
        const response = await fetch(Global.url + "cart/addtocart", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId: id }),
        });

        const data = await response.json();

        if (data.status === 'success') {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error("Error al agregar el producto al carrito");
    }
};

export default addToCart;