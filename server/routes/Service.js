import { Router } from "express";
import {
  callForUtensils,
  getCallForUtensils,
  getTodaysService,
} from "../controller/Service.js";

const router = Router();

router.post("/utensils", callForUtensils);
router.get("/get/utensils", getCallForUtensils);
router.get("/get/utensils/today", getTodaysService);

export default router;
