import React from "react";
import { useParams, useRouteLoaderData } from "react-router";
import { useSection } from "@/contexts/SectionContext";
import { getQuestionById, getSection } from "@/selectors/screener.selectors";

export const Question: React.FC = () => {
  // Hooks
  const data = useRouteLoaderData("questions");
  const { questionId, sectionIndex } = useParams();
  const { getAnswer, addAnswer, updateAnswer } = useSection();

  // Selectors
  const section = getSection(data, { sectionIndex });
  const answers = section?.answers;
  const question = getQuestionById(data, { sectionIndex, questionId });
  const answer = getAnswer(question?.question_id);

  const handleAnswer = (value: number) => {
    if (question) {
      if (answer !== undefined) {
        updateAnswer(question.question_id, value);
      } else {
        addAnswer(question.question_id, value);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-6 mt-8">
      <div className="mb-6">
        <p className="text-secondary-700 text-lg">{question?.title}</p>
      </div>

      <div className="space-y-3">
        {answers.map((option: any) => (
          <button
            key={`${question?.question_id}-${option.value}`}
            onClick={() => handleAnswer(option.value)}
            className={`w-full text-left p-4 rounded-lg border ${
              answer === option.value
                ? "border-primary-500 bg-primary-50"
                : "border-secondary-200 hover:bg-secondary-50"
            } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200`}
          >
            {option.title}
          </button>
        ))}
      </div>
    </div>
  );
};
