import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import API from '../utils/api';
import { useSelector } from 'react-redux'; // Import Redux hooks
import './CSS/CheckoutForm.css';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { token, user } = useSelector((state) => state.auth);
  const [billingDetails, setBillingDetails] = useState({
    address: '',
    city: '',
    state: '',
    postalCode: '',
    phone:'',
  });

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      if (!token) {
        console.error('User is not logged in or token is missing.');
        setIsProcessing(false);
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          address: {
            line1: billingDetails.address,
            city: billingDetails.city,
            state: billingDetails.state,
            postal_code: billingDetails.postalCode,
          },
          phone:billingDetails.phone,
        },
      });

      if (error) {
        console.error(error.message);
        setIsProcessing(false);
        return;
      }
      console.log(paymentMethod.billing_details)

      const { data } = await API.post(
        '/payments/create-payment-intent',
        {
          customerId: user._id,
          amount: 20000, // Amount in cents
          currency: 'usd',
          paymentMethodId: paymentMethod.id,
          billingDetails:paymentMethod.billing_details,
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
    <div className="checkout-container">
      <div className="checkout-left">
        <h2>Customer Details</h2>
        <form className="checkout-form">
          <input type="text" value={user.firstName}  placeholder="First Name" />
          <input type="text" value={user.lastName}  placeholder="Last Name" />
          <input type="email" value={user.email}  placeholder="Email Address" />
         
          <input
            type="text"
            name="phone"
            value={billingDetails.phone} 
            onChange={handleBillingChange}
            placeholder="phone"
          />
           <input
            type="text"
            name="address"
            value={billingDetails.address}
            onChange={handleBillingChange}
            placeholder="Address"
          />
          <input
            type="text"
            name="city"
            value={billingDetails.city}
            onChange={handleBillingChange}
            placeholder="City"
          />
          <input
            type="text"
            name="state"
            value={billingDetails.state}
            onChange={handleBillingChange}
            placeholder="State"
          />
          <input
            type="text"
            name="postalCode"
            value={billingDetails.postalCode}
            onChange={handleBillingChange}
            placeholder="Postal Code"
          />
        </form>
      </div>

      <div className="checkout-right">
        <h2>Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <CardElement className="card-element" />
          <button type="submit" disabled={!stripe || isProcessing}>
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
