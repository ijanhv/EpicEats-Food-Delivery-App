import { Router } from 'express';
import { createManyMenuItems, createMenuItem, deleteMenuItem, getMenuItems, getMenuItemById, updateMenuItem } from '../controller/MenuItem.js';

const router = Router();

router.get('/get/:id', getMenuItemById)
router.get('/get', getMenuItems)
router.post('/menuItems', createManyMenuItems)
router.post('/menuItem', createMenuItem)
router.delete('/delete/:id', deleteMenuItem)
router.patch('/update/:id', updateMenuItem)


export default router;