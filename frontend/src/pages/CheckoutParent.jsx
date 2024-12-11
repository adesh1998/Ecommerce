import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import CheckoutForm from './CheckoutForm';

const CheckoutParent = () => {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const { data } = await API.post('/payments/create-payment-intent', {
          amount: 20000, // Amount in cents
          currency: 'usd',
        });
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error fetching clientSecret:', error);
      }
    };

    fetchClientSecret();
  }, []);

  if (!clientSecret) return <div>Loading...</div>;

  return <CheckoutForm clientSecret={clientSecret} />;
};

export default CheckoutParent;
