import express from 'express';
import {
  createPaymentIntent,
  capturePayment,
  refundPayment,
  webhookHandler,
} from '../controllers/paymentController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();


// Payment routes
router.post('/create-payment-intent', authenticate, createPaymentIntent);
router.post('/capture-payment', authenticate, capturePayment);
router.post('/refund', refundPayment); // Refund a payment
router.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler); // Handle webhooks

export default router;
