import { Router } from 'express';
import { getAllUsers, getUserOrders, login, register, verifyEmail } from '../controller/User.js';

const router = Router();

router.post('/register', register);
router.get('/verify/:token', verifyEmail);
router.post('/login', login);
router.get('/get-user-orders/:id', getUserOrders)
router.get('/get-all-users', getAllUsers);


export default router;