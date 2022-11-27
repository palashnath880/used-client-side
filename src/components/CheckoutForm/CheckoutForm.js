import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';

const CheckoutForm = ({ order, paymentComplete }) => {

    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    const [cookies] = useCookies(['used_access_token']);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {

        setCardError('');
        setLoading(true);
        event.preventDefault();

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            setLoading(false);
            return;
        }
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card });

        if (error) {
            setCardError(error.message);
            setLoading(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,
                    },
                },
            },
        );

        if (confirmError) {
            setLoading(false);
            setCardError(confirmError.message);
        }

        if (paymentIntent.status === "succeeded") {
            const paymentData = {
                paymentMethod: paymentIntent?.payment_method_types,
                transitionID: paymentIntent?.id,
                payment: true,
                paymentDate: `${format(new Date(), 'PP')} ${new Date().toLocaleTimeString()}`,
            }
            axios.patch(`https://used-server.vercel.app/orders/${order?._id}/${order?.productID}`, paymentData, {
                headers: {
                    authorization: `bearer ${cookies?.used_access_token}`,
                    customer_id: user?.uid,
                }
            })
                .then(res => {
                    if (res?.data?.acknowledged) {
                        toast.success('Your Payment Successfully.');
                        setLoading(false);
                        paymentComplete(null);
                    }
                })
                .catch(err => console.error(err));
        }

    };

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://used-server.vercel.app/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: order?.product?.sellPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <div className="form-control border border-gray-300 mb-3 rounded-lg overflow-hidden">
                        <label className="label pb-0">
                            <span className="label-text">Customer Name</span>
                        </label>
                        <input type='text' className='input-sm w-full focus:outline-0 py-2' defaultValue={user?.displayName} readOnly />
                    </div>
                    <div className="form-control border border-gray-300 mb-3 rounded-lg overflow-hidden">
                        <label className="label pb-0">
                            <span className="label-text">Customer Email</span>
                        </label>
                        <input type='text' className='input-sm w-full focus:outline-0 py-2' defaultValue={user?.email} readOnly />
                    </div>
                    <div className="form-control border border-gray-300 mb-3 rounded-lg overflow-hidden">
                        <label className="label pb-0">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input type='text' className='input-sm w-full focus:outline-0 py-2' defaultValue={order?.product?.product_name} readOnly />
                    </div>
                    <div className="form-control border border-gray-300 mb-3 rounded-lg overflow-hidden">
                        <label className="label pb-0">
                            <span className="label-text">Product Price</span>
                        </label>
                        <input type='text' className='input-sm w-full focus:outline-0 py-2' defaultValue={`$ ${order?.product?.sellPrice}`} readOnly />
                    </div>
                </div>
                <CardElement className='border border-gray-300 py-3 px-3 rounded-md' />
                <small className='text-red-500 my-3'>{cardError}</small>
                <button disabled={!stripe || loading} className='btn btn-primary mt-4'>Payment</button>
            </form>
        </>
    )
};

export default CheckoutForm;