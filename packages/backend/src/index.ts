import express, { Request, Response } from "express";
import cors from "cors";
import { assessAnswers } from "./services/assessment";
import { AssessmentRequest, AssessmentResponse } from "./types";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post(
  "/api/assess",
  async (
    req: Request<{}, {}, AssessmentRequest>,
    res: Response<AssessmentResponse>
  ) => {
    try {
      const { answers } = req.body;

      // Validate input
      if (!Array.isArray(answers)) {
        return res.status(400).json({ error: "Answers must be an array" });
      }

      // Process answers and get recommendations
      const results = assessAnswers(answers);

      res.json({ results });
    } catch (error) {
      console.error("Error processing assessment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
