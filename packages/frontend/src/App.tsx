import React from "react";
import { LoadingWrapper } from "./components/LoadingWrapper";
import { Outlet } from "react-router";

export const App: React.FC = () => {
  return (
    <LoadingWrapper>
      <Outlet />
    </LoadingWrapper>
  );
};
