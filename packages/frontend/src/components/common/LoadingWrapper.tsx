import React from "react";
import { useNavigation } from "react-router";
import { Spinner } from "./Spinner";

export const LoadingWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigation = useNavigation();

  if (navigation.state !== "idle") {
    return <Spinner />;
  }

  return <>{children}</>;
};
