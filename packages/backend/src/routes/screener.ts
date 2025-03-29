import { Router } from "express";
import { screenerController } from "../controllers/screener";

const router = Router();

router.get("/", screenerController.getScreener);

export default router;
