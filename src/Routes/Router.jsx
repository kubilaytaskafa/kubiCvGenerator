import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import WebLayout from "../pages/WebLayout";
import Loading from "../components/Loading";
// Lazy loading components
const Home = lazy(() => import("../pages/Home"));
const Cv = lazy(() => import("../pages/Cv"));
const CvAts = lazy(() => import("../pages/CvAts"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

// Loading fallback

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WebLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "cv",
        element: (
          <Suspense fallback={<Loading />}>
            <Cv />
          </Suspense>
        ),
      },
      {
        path: "cv-ats",
        element: (
          <Suspense fallback={<Loading />}>
            <CvAts />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loading />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);
