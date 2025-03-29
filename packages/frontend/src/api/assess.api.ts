import { Answer } from "@/contexts/SectionContext";

export const assessAnswers = async (answers: Answer[]) => {
  const response = await fetch("http://localhost:3000/api/assess", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers }),
  });
  const data = await response.json();
  return data;
};
