import express from 'express';
import { checkout, userOrder } from '../Controllers/payment.js'; // Import the new checkout
import { Authenticated } from '../Middlewares/auth.js';

const router = express.Router();

// Route to place order directly (COD style)
router.post('/checkout', checkout);

// Route to get user orders (Keep this as is)
router.get('/userorder', Authenticated, userOrder);

export default router;