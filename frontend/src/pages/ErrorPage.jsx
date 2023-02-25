import React from "react";
import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  return <div>{error.statusText}</div>;
};
