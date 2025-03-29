import { Router } from "express";
import { assessmentController } from "../controllers/assessment";
import { validateAssessment } from "../middleware/validation";

const router = Router();

router.post("/assess", validateAssessment, assessmentController.assess);

export default router;
