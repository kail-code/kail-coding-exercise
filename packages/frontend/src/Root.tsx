import React from "react";
import { appRouter } from "./router";
import { RouterProvider } from "react-router";

export const Root: React.FC = () => {
  return <RouterProvider router={appRouter} />;
};
