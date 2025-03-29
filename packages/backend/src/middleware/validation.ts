import { Request, Response, NextFunction } from "express";
import { AssessmentRequest } from "../types";

export const validateAssessment = (
  req: Request<{}, {}, AssessmentRequest>,
  res: Response,
  next: NextFunction
) => {
  const { answers } = req.body;

  if (!Array.isArray(answers)) {
    return res.status(400).json({ error: "Answers must be an array" });
  }

  if (answers.length === 0) {
    return res.status(400).json({ error: "Answers array cannot be empty" });
  }

  // Validate each answer has required fields
  for (const answer of answers) {
    console.log("Answer:", answer);
    if (!answer.question_id || answer.value === undefined) {
      return res.status(400).json({
        error: "Each answer must have a question_id and value",
      });
    }
  }

  next();
};
