import React from 'react';
import { Elements, loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import useCart from '../../hooks/useCart';

// Cargar la clave pública de Stripe desde las variables de entorno
const stripePromise = loadStripe(import.meta.env.VITE_stripe_PK);

const Payment = () => {
    const [cart] = useCart(); // Obtener el carrito de compras

    // Calcular el total del carrito
    const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

    // Formatear el total a dos decimales
    const totalPrice = parseFloat(cartTotal.toFixed(2));

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28'>
            <Elements stripe={stripePromise}>
                <CheckoutForm price={totalPrice} cart={cart} />
            </Elements> 
        </div>
    );
};

export default Payment;
