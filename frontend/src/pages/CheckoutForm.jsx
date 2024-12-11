import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import API from '../utils/api';
import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { token,user } = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {

      if ( !token) {
        console.error('User is not logged in or token is missing.');
        setIsProcessing(false);
        return;
    }
      // Create a payment method using the card details
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
   

      if (error) {
        console.error(error.message);
        setIsProcessing(false);
        return;
      }

      // Send the paymentMethod.id to the backend
      const { data } = await API.post('/payments/create-payment-intent', {
        customerId:user._id,
        amount: 20000, // Amount in cents
        currency: 'usd',
        paymentMethodId: paymentMethod.id, // Pass the Payment Method ID
      },
     {
      headers: { Authorization: `Bearer ${token}` }, 
    }
    );

if (data.status === 'succeeded') {
  alert('Payment successful!');
} else {
  console.error('Unexpected payment status:', data.status);
}

  
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default CheckoutForm;
