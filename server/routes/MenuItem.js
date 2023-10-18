import { Router } from 'express';
import { createManyMenuItems, createMenuItem, deleteMenuItem, getMenuItems, getMenuItemById, updateMenuItem } from '../controller/MenuItem.js';

const router = Router();

router.get('/get/:id', getMenuItemById)
router.get('/get', getMenuItems)
router.post('/menuItem/create-many', createManyMenuItems)
router.post('/menuItem/create', createMenuItem)
router.delete('/delete/:id', deleteMenuItem)
router.put('/menu-item/update/:id', updateMenuItem)


export default router;