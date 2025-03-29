import React from "react";
import {
  Outlet,
  useRouteLoaderData,
  useNavigate,
  useParams,
} from "react-router";
import ProgressBar from "../common/ProgressBar";
import {
  getCurrentQuestionIndex,
  getQuestionByIndex,
  getSection,
} from "@/selectors/screener.selectors";
import { Screener } from "@/types";

export const Section: React.FC = () => {
  // Hooks
  const data = useRouteLoaderData("questions") as Screener;
  const navigate = useNavigate();
  const { sectionIndex, questionId } = useParams();

  // Selectors
  const section = getSection(data, { sectionIndex });
  const currentQuestionIndex = getCurrentQuestionIndex(data, {
    sectionIndex,
    questionId,
  });
  const totalQuestions = section.questions.length;

  // Methods
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevQuestion = getQuestionByIndex(data, {
        sectionIndex,
        questionIndex: currentQuestionIndex - 1,
      });
      navigate(
        `/section/${sectionIndex}/questions/${prevQuestion.question_id}`
      );
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      const nextQuestion = getQuestionByIndex(data, {
        sectionIndex,
        questionIndex: currentQuestionIndex + 1,
      });
      navigate(
        `/section/${sectionIndex}/questions/${nextQuestion.question_id}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-primary-900">
          {section.title}
        </h1>
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={totalQuestions}
        />

        <Outlet />

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 text-primary-600 disabled:text-secondary-400"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === totalQuestions - 1}
            className="px-4 py-2 text-primary-600 disabled:text-secondary-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
