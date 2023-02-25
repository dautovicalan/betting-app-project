import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../pages/ErrorPage";
import React from "react";
import NavigationBar from "../components/NavigationBar";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import App from "../App";
import { Container } from "@mui/system";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { DashboardPage } from "../pages/DashboardPage";
import EventResolver from "../pages/EventResolver";
import TicketOverviewPage from "../pages/TicketOverviewPage";
import ProfilePage from "../pages/ProfilePage";
import PrivateRoute from "./PrivateRoute";

const AppLayout = () => {
  return (
    <>
      <NavigationBar />
      <Container
        sx={{
          p: 4,
          width: "100%",
        }}
      >
        <Outlet />
      </Container>
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/event-resolver",
        element: <EventResolver />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/ticket-overview/:id",
        element: (
          <PrivateRoute>
            <TicketOverviewPage />
          </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: `/profile/:id`,
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
