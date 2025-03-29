import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { config } from "./config";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Security middleware
app.use(helmet());

// Logging middleware
app.use(morgan("combined"));

// CORS configuration
app.use(cors(config.cors));

// Rate limiting
const limiter = rateLimit(config.rateLimit);
app.use("/api/", limiter);

// Body parsing
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.use("/api", routes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;
