import { Suspense, lazy } from "react";
import ProtectedLayout from "../layout/ProtectedLayout.jsx";
import LoadingSkeleton from "../components/Loading/LoadingSkeleton.jsx";
import NotFound from "../pages/NotFound.jsx";
import { RoutePaths } from "./routePaths.js";

const lazyLoad = (importFunc) => {
  const Component = lazy(importFunc);
  return function Wrapped() {
    return (
      <Suspense fallback={<LoadingSkeleton />}>
        <Component />
      </Suspense>
    );
  };
};

const Home = lazyLoad(() => import("../pages/Home.jsx"));
const SignIn = lazyLoad(() => import("../pages/Signin.jsx"));
const Explorer = lazyLoad(() => import("../pages/Explorer.jsx"));
const Insights = lazyLoad(() => import("../pages/Insights.jsx"));
const Dashboard = lazyLoad(() => import("../pages/Dashboard.jsx"));
const Portfolio = lazyLoad(() => import("../pages/Portfolio.jsx"));
const AuthLayout = lazyLoad(() => import("../layout/AuthLayout.jsx"));
const PublicLayout = lazyLoad(() => import("../layout/PublicLayout.jsx"));
const PrivateLayout = lazyLoad(() => import("../layout/PrivateLayout.jsx"));

export const routes = [
  {
    element: <PublicLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "signin",
            element: <SignIn />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: RoutePaths.HOME,
        element: <AuthLayout />,
        children: [{ index: true, element: <Home /> }],
      },
      {
        path: RoutePaths.HOME,
        element: <PrivateLayout />,
        children: [
          { path: RoutePaths.DASHBOARD, element: <Dashboard /> },
          { path: RoutePaths.EXPLORER, element: <Explorer /> },
          { path: RoutePaths.PORTFOLIO, element: <Portfolio /> },
          { path: RoutePaths.INSIGHTS, element: <Insights /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];