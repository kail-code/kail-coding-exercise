import { Router } from "express";
import assessmentRoutes from "./assessment";
import screenerRoutes from "./screener";

const router = Router();

router.use("/assessment", assessmentRoutes);
router.use("/screener", screenerRoutes);

export default router;
