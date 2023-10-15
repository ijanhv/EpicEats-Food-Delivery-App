import { Router } from 'express';
import { login, register, verifyEmail } from '../controller/User.js';

const router = Router();

router.post('/register', register);
router.get('/verify/:token', verifyEmail);
router.post('/login', login);


export default router;