import React from "react";
import { LoadingWrapper } from "./components/common/LoadingWrapper";
import { Outlet } from "react-router";
import { Header } from "./components/common/Header";

export const App: React.FC = () => {
  return (
    <LoadingWrapper>
      <div className="min-h-screen bg-secondary-50">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </LoadingWrapper>
  );
};
