export const payment =async(req,res)=>{
    try {
        const { amount, currency } = req.body;

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents
            currency, // e.g., 'usd'
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret, // Send the client secret to the front end
        });
    } catch (error) {
        console.error('Error creating payment intent:', error.message);
        res.status(500).json({ error: error.message });
    }
};
