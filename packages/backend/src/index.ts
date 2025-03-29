import express, { Request, Response } from "express";
import cors from "cors";
import { assessAnswers } from "./services/assessment";
import { AssessmentRequest, AssessmentResponse } from "./types";
import { getScreener } from "./services/screener";

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

app.get("/api/screener", async (req: Request, res: Response) => {
  const screener = await getScreener();
  res.json(screener);
});

// Create a centralized error handler
interface ApiError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: Function
) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
