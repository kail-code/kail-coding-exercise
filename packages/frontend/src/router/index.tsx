import { Home } from "@/components/Home";
import { QuestionsRedirect } from "@/components/common/QuestionsRedirect";
import { Question } from "@/components/Section/Question";
import { createBrowserRouter } from "react-router";
import { App } from "@/App";
import { Spinner } from "@/components/common/Spinner";
import { Section } from "@/components/Section";
import { getScreener } from "@/api/screener.api";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    hydrateFallbackElement: <Spinner />,
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        id: "questions",
        path: "section/:sectionIndex",
        shouldRevalidate: () => false,
        loader: async () => {
          return getScreener();
        },
        element: <Section />,
        children: [
          {
            path: "questions",
            children: [
              {
                path: "",
                element: <QuestionsRedirect />,
              },
              {
                path: ":questionId",
                element: <Question />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
