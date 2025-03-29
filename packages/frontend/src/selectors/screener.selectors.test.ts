import { Screener } from "@/types";
import {
  getSection,
  getQuestionByIndex,
  getQuestionById,
  getCurrentQuestionIndex,
} from "./screener.selectors";

describe("Screener Selectors", () => {
  const mockScreener: Screener = {
    id: "abcd-123",
    name: "BPDS",
    disorder: "Cross-Cutting",
    content: {
      sections: [
        {
          type: "standard",
          title: "Test Section",
          answers: [
            { title: "Not at all", value: 0 },
            { title: "Nearly every day", value: 4 },
          ],
          questions: [
            { question_id: "question_a", title: "First Question" },
            { question_id: "question_b", title: "Second Question" },
          ],
        },
      ],
      display_name: "BDS",
    },
    full_name: "Blueprint Diagnostic Screener",
  };

  describe("getSection", () => {
    it("should return the correct section when sectionIndex is valid", () => {
      const result = getSection(mockScreener, { sectionIndex: "1" });
      expect(result).toEqual(mockScreener.content.sections[0]);
    });

    it("should handle undefined sectionIndex", () => {
      const result = getSection(mockScreener, { sectionIndex: undefined });
      expect(result).toBeUndefined();
    });

    it("should handle invalid sectionIndex", () => {
      const result = getSection(mockScreener, { sectionIndex: "999" });
      expect(result).toBeUndefined();
    });
  });

  describe("getQuestionByIndex", () => {
    it("should return the correct question when index is valid", () => {
      const result = getQuestionByIndex(mockScreener, {
        sectionIndex: "1",
        questionIndex: 0,
      });
      expect(result).toEqual(mockScreener.content.sections[0].questions[0]);
    });

    it("should handle invalid question index", () => {
      const result = getQuestionByIndex(mockScreener, {
        sectionIndex: "1",
        questionIndex: 999,
      });
      expect(result).toBeUndefined();
    });
  });

  describe("getQuestionById", () => {
    it("should return the correct question when questionId exists", () => {
      const result = getQuestionById(mockScreener, {
        sectionIndex: "1",
        questionId: "question_b",
      });
      expect(result).toEqual(mockScreener.content.sections[0].questions[1]);
    });

    it("should handle non-existent questionId", () => {
      const result = getQuestionById(mockScreener, {
        sectionIndex: "1",
        questionId: "invalid_id",
      });
      expect(result).toBeUndefined();
    });
  });

  describe("getCurrentQuestionIndex", () => {
    it("should return the correct index when questionId exists", () => {
      const result = getCurrentQuestionIndex(mockScreener, {
        sectionIndex: "1",
        questionId: "question_b",
      });
      expect(result).toBe(1);
    });

    it("should return -1 when questionId doesn't exist", () => {
      const result = getCurrentQuestionIndex(mockScreener, {
        sectionIndex: "1",
        questionId: "invalid_id",
      });
      expect(result).toBe(-1);
    });

    it("should handle undefined questionId", () => {
      const result = getCurrentQuestionIndex(mockScreener, {
        sectionIndex: "1",
        questionId: undefined,
      });
      expect(result).toBe(-1);
    });
  });
});
