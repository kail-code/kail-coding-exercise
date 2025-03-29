import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Answer {
  question_id: string;
  value: number;
}

interface SectionContextType {
  answers: Answer[];
  addAnswer: (questionId: string, value: number) => void;
  updateAnswer: (questionId: string, value: number) => void;
  getAnswer: (questionId: string | undefined) => number | undefined;
  clearAnswers: () => void;
  onAnswerChange?: (answers: Answer[]) => void;
}

interface SectionProviderProps {
  children: ReactNode;
  onAnswerChange?: (answers: Answer[]) => void;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const SectionProvider: React.FC<SectionProviderProps> = ({
  children,
  onAnswerChange,
}) => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const addAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev, { question_id: questionId, value }];
      onAnswerChange?.(newAnswers);
      return newAnswers;
    });
  };

  const updateAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => {
      const newAnswers = prev.map((answer) =>
        answer.question_id === questionId ? { ...answer, value } : answer
      );
      onAnswerChange?.(newAnswers);
      return newAnswers;
    });
  };

  const getAnswer = (questionId: string | undefined) => {
    return answers.find((answer) => answer.question_id === questionId)?.value;
  };

  const clearAnswers = () => {
    setAnswers([]);
    onAnswerChange?.([]);
  };

  return (
    <SectionContext.Provider
      value={{
        answers,
        addAnswer,
        updateAnswer,
        getAnswer,
        clearAnswers,
        onAnswerChange,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => {
  const context = useContext(SectionContext);
  if (context === undefined) {
    throw new Error("useSection must be used within a SectionProvider");
  }
  return context;
};
