import { Suspense, lazy } from "react";
import ProtectedLayout from "../layout/ProtectedLayout.jsx";
import NotFound from "../pages/NotFound.jsx";
import { RoutePaths } from "./routePaths.js";
import LoadingPage from "../components/Loading/LoadingPage";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

const lazyLoad = (importFunc) => {
  const Component = lazy(importFunc);
  return function Wrapped() {
    return (
      <Suspense fallback={<LoadingPage />}>
        <Component />
      </Suspense>
    );
  };
};

const Home = lazyLoad(() => import("../pages/Home.jsx"));
const Login = lazyLoad(() => import("../pages/Login.jsx"));
const SignIn = lazyLoad(() => import("../pages/Signin.jsx"));
const Explorer = lazyLoad(() => import("../pages/Explorer.jsx"));
const Insights = lazyLoad(() => import("../pages/Insights.jsx"));
const Dashboard = lazyLoad(() => import("../pages/Dashboard.jsx"));
const Portfolio = lazyLoad(() => import("../pages/Portfolio.jsx"));
const AuthLayout = lazyLoad(() => import("../layout/AuthLayout.jsx"));
const PublicLayout = lazyLoad(() => import("../layout/PublicLayout.jsx"));
const PrivateLayout = lazyLoad(() => import("../layout/PrivateLayout.jsx"));
const CreatePortfolioForm = lazyLoad(() =>
  import("../components/Portfolio/CreatePortfolio/CreatePortfolioForm.jsx")
);

export const routes = [
  {
    element: <PublicRoute><PublicLayout /></PublicRoute>,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: RoutePaths.SIGNIN,
            element: <SignIn />,
          },
          {
            path: RoutePaths.LOG_IN,
            element: <Login />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute><ProtectedLayout /></ProtectedRoute>,
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
          {
            path: RoutePaths.PORTFOLIO_DETAIL,
            element: <CreatePortfolioForm />,
          },
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
