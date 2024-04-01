import { Router } from 'express';
import { getRecommendations } from '../controller/Recommendations.js';


const router = Router();

router.get('/get/:id', getRecommendations)



export default router;