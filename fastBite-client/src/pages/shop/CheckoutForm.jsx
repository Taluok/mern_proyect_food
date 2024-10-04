import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaPaypal } from "react-icons/fa"

const CheckoutForm = ({ price, cart }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [cardError , setCardError] = useState('cardError');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {

            return
        }

        const card = elements.getElement(CardElement)

        if (card == null){
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if(error){
            console.log('[error]',error);
            setCardError(error)
        }else{
            console.log('[paymentMethod]',paymentMethod);
        }
    }

    return (
        <div>
            {/*Left side*/}
            <div className='md:w-1/2 w-full space-y-3'>
                <h4 className='text-lg font-semibold'>Order Summary</h4>
                <p>Total Price: ${price}</p>
                <p>Number of Items: {cart.length}</p>
            </div>
            {/*Rigth side*/}
            <div className='md:w-1/3 w-full space-y-3 card shrink-0 max-w-sm shadow-2x1 bg-base-100 px-4 py-8'>
                <h4 className='text-lg font-semibold'>Process your Payment</h4>
                <h5 className='font-medium'>Credit/Debit Card</h5>
                {/*Stripe*/}
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
                {/*paypal*/}
                <div className='mt-5 text-center'>
                    <hr />
                    <button type='submit' className='btn btn-sm mt-5 bg-orange-500 text-white'>
                        <FaPaypal/> Pay with Paypal
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutForm
