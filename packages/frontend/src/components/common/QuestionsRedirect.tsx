import { useEffect } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router";

export const QuestionsRedirect: React.FC = () => {
  // Loader Data
  const questionsData = useRouteLoaderData("questions") as any;
  const params = useParams();

  // Constants
  const section =
    questionsData.content.sections[parseInt(params.sectionIndex || "0") - 1];
  const questionId = section.questions[0].question_id;

  // Hooks
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/section/${params.sectionIndex}/questions/${questionId}`, {
      replace: true,
    });
  }, []);
  return null;
};
