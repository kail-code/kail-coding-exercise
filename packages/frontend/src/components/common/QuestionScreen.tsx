import { Question, AnswerOption } from "../../types";

interface QuestionScreenProps {
  question: Question;
  answerOptions: AnswerOption[];
  onAnswer: (value: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  answerOptions,
  onAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-soft p-6 mt-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-secondary-800">
          Question {questionNumber} of {totalQuestions}
        </h2>
        <p className="text-secondary-700 text-lg">{question.title}</p>
      </div>

      <div className="space-y-3">
        {answerOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className="w-full text-left p-4 rounded-lg border border-secondary-200 hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
          >
            {option.title}
          </button>
        ))}
      </div>
    </div>
  );
};
