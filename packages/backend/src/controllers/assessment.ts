import { Request, Response, NextFunction } from "express";
import { AssessmentRequest, AssessmentResponse } from "../types";
import { assessAnswers } from "../services/assessment";

export class AssessmentController {
  async assess(
    req: Request<{}, {}, AssessmentRequest>,
    res: Response<AssessmentResponse>,
    next: NextFunction
  ) {
    try {
      const { answers } = req.body;
      const results = assessAnswers(answers);
      res.json({ results });
    } catch (error) {
      next(error);
    }
  }
}

export const assessmentController = new AssessmentController();
