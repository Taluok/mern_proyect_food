import React, { useState, useEffect } from 'react'; 
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaPaypal } from "react-icons/fa";
import { useAuth } from '../../contexts/AuthProvider'; 
import useAxiosSecure from '../../hooks/useAxiosSecure'; 
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ price, cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");

    // UseEffect para crear el Payment Intent
    useEffect(() => {
        if (typeof price !== "number" || price < 1) {
            console.log("Price is not a number or less than 1");
            return;
        }
        
        // Crear Payment Intent
        axiosSecure.post('/create-payment-intent', { price })
            .then((res) => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
            .catch(error => {
                console.error("Error creating payment intent:", error);
            });
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Crear Payment Method
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentMethodError) {
            console.log('[error]', paymentMethodError);
            setCardError(paymentMethodError.message); 
            return; // Salir si hay un error
        } 

        setCardError("Payment method created successfully!");
        console.log('[paymentMethod]', paymentMethod);

        // Confirmar el pago
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'Anonymous',
                    email: user?.email || 'unknown',
                },
            },
        });

        if (confirmError) {
            console.log('[confirmError]', confirmError);
            setCardError(confirmError.message); 
            return; // Salir si hay un error
        }

        setCardError("Payment successful!");
        console.log('[paymentIntent]', paymentIntent);

        // Enviar información al backend
        const paymentInfo = {
            amount: price,
            transactionId: paymentIntent.id,
            email: user?.email,
            cartItems: cart,
            createdAt: new Date().toISOString(),
        };

        axiosSecure.post('/payments', paymentInfo)
            .then(res => {
                console.log(res.data);
                alert("Payment successful");
                navigate('/order'); // Redirigir al usuario a la página de órdenes
            })
            .catch(error => {
                console.error("Error sending payment info:", error);
                alert("There was an issue processing your payment.");
            });
    };

    return (
        <div>
            {/* Left side */}
            <div className='md:w-1/2 w-full space-y-3'>
                <h4 className='text-lg font-semibold'>Order Summary</h4>
                <p>Total Price: ${price}</p>
                <p>Number of Items: {cart.length}</p>
            </div>
            
            {/* Right side */}
            <div className='md:w-1/3 w-full space-y-3 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8'>
                <h4 className='text-lg font-semibold'>Process your Payment</h4>
                <h5 className='font-medium'>Credit/Debit Card</h5>
                
                {/* Stripe Form */}
                <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <button type="submit" disabled={!stripe} className='btn btn-sm mt-5 btn-primary text-white'>
                        Pay
                    </button>
                </form>

                {cardError && <p className="text-red italic text-xs">{cardError}</p>} 

                {/* PayPal Button */}
                <div className='mt-5 text-center'>
                    <hr />
                    <button type='button' className='btn btn-sm mt-5 bg-orange-500 text-white'>
                        <FaPaypal /> Pay with PayPal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;