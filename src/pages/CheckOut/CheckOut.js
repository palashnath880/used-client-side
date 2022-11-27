import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const CheckOut = ({ order, paymentComplete }) => {

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm order={order} paymentComplete={paymentComplete} />
        </Elements>
    );
}

export default CheckOut;
