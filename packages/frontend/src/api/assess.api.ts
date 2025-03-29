import { Answer } from "@/contexts/SectionContext";
import { API_URL } from "./index";

export const assessAnswers = async (answers: Answer[]) => {
  const response = await fetch(`${API_URL}/api/assessment/assess`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers }),
  });
  const data = await response.json();
  return data;
};
