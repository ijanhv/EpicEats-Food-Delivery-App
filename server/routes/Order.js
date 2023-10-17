import { Router } from 'express';
import { getCustomerOrders, getOrders, getTodaysOrders, placeOrder, updateOrder } from '../controller/Order.js';

const router = Router();

router.post('/place-order', placeOrder);

// Get all orders
router.get('/get-orders', getOrders);

// Update the status of an order
router.patch('/update-order/:id', updateOrder);

// Get all orders for a specific customer
router.get('/get-customer-orders/:id', getCustomerOrders);


router.get('/todays-orders', getTodaysOrders)

export default router;