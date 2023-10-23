import { Router } from 'express';
import { createManyMenuItems, createMenuItem, deleteMenuItem, getMenuItems, getMenuItemById, updateMenuItem, getMenuItemsByCategory } from '../controller/MenuItem.js';

const router = Router();

router.get('/get/:id', getMenuItemById)
router.get('/get', getMenuItems)
router.post('/menuItem/create-many', createManyMenuItems)
router.post('/menuItem/create', createMenuItem)
router.delete('/delete/:id', deleteMenuItem)
router.put('/menu-item/update/:id', updateMenuItem)
router.get('/get-by-category/:category', getMenuItemsByCategory)


export default router;