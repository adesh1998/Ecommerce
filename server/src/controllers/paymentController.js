import stripe from '../config/stripe.js';
import User from '../models/User.js';




export const createPaymentIntent = async (req, res) => {
    try {
        const { customerId,amount, currency, paymentMethodId } = req.body; // Include paymentMethodId from frontend

        // Find the user from the token set in middleware
       
        const user = await User.findById(customerId);
        console.log(user)

        if (!user.stripeCustomerId) {
            console.log('Creating new Stripe customer...');
            const stripeCustomer = await stripe.customers.create({
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
            });

            user.stripeCustomerId = stripeCustomer.id;
            await user.save();
        }

        if (!user || !user.stripeCustomerId) {
            return res.status(404).json({ msg: 'User or Stripe customer not found.' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents
            currency, // e.g., "usd"
            customer: user.stripeCustomerId,
            payment_method: paymentMethodId, // Attach the payment method
            confirm: true, // Confirm the payment intent automatically
            capture_method: 'automatic', // Use automatic capture
            description: `Payment for ${user.email}`, // Optional: Add a description
            metadata: { userId: user._id.toString() }, // Optional: Add custom metadata
        });
        
        console.log(paymentIntent.status)

        res.status(200).json({
            status:paymentIntent.status,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    } catch (error) {
        console.error('[createPaymentIntent]', error.message);

        // Handle specific Stripe errors
        if (error.type === 'StripeCardError') {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: error.message });
    }
};



/**
 * Capture Payment for a Payment Intent
 * @route POST /api/payments/capture-payment
 * @param {string} paymentIntentId - The ID of the Payment Intent to capture.
 */
export const capturePayment = async (req, res) => {
    try {
        const { paymentIntentId } = req.body;
        

        if (!paymentIntentId) {
            return res.status(400).json({ msg: 'Payment Intent ID is required.' });
        }

        // Fetch the Payment Intent
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        console.log('[Payment Intent Status]', paymentIntent.status);

        if (!paymentIntent || paymentIntent.status !== 'requires_capture') {
            return res.status(400).json({ msg: 'Payment Intent cannot be captured.' });
        }

        // Capture the payment
        const capturedPayment = await stripe.paymentIntents.capture(paymentIntentId);

        res.status(200).json({ msg: 'Payment captured successfully.', payment: capturedPayment });
    } catch (error) {
        console.error('[capturePayment]', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const refundPayment = async (req, res) => {
  try {
    const { paymentIntentId, amount } = req.body;

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount * 100, // Optional, for partial refunds
    });

    res.status(200).json(refund);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const webhookHandler = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('💰 Payment succeeded:', event.data.object);
        break;
      case 'payment_intent.payment_failed':
        console.log('❌ Payment failed:', event.data.object);
        break;
      case 'charge.refunded':
        console.log('💸 Payment refunded:', event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
