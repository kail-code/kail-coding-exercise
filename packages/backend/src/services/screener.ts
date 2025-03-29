import { promises as fs } from "fs";
import path from "path";

interface Question {
  id: string;
  text: string;
}

export async function getScreener(): Promise<Question[]> {
  try {
    const questionsPath = path.join(__dirname, "../data/questions.json");
    const questionsData = await fs.readFile(questionsPath, "utf8");
    const questions = JSON.parse(questionsData);
    return questions;
  } catch (error) {
    console.error("Error loading screener questions:", error);
    throw new Error("Failed to load screener questions");
  }
}
