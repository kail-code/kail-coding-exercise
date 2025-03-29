import { Screener } from "@/types";

export const getSection = (
  data: Screener,
  props: { sectionIndex: string | undefined }
) => {
  return data.content.sections[parseInt(props.sectionIndex || "0") - 1];
};

export const getQuestionByIndex = (
  data: Screener,
  props: { sectionIndex: string | undefined; questionIndex: number }
) => {
  return getSection(data, props).questions[props.questionIndex];
};

export const getQuestionById = (
  data: Screener,
  props: { sectionIndex: string | undefined; questionId: string | undefined }
) => {
  return getSection(data, props).questions.find(
    (question) => question.question_id === props.questionId
  );
};

export const getCurrentQuestionIndex = (
  data: Screener,
  props: { sectionIndex: string | undefined; questionId: string | undefined }
) => {
  return getSection(data, props).questions.findIndex(
    (question) => question.question_id === props.questionId
  );
};

export const getTotalQuestions = (data: Screener) => {
  return data.content.sections.reduce(
    (acc, section) => acc + section.questions.length,
    0
  );
};
