import { createBrowserRouter } from "react-router-dom";
import WebLayout from "../pages/WebLayout";
import Home from "../pages/Home";
import Cv from "../pages/Cv";
import CvAts from "../pages/CvAts";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <WebLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cv",
        element: <Cv />,
      },
      {
        path: "cv-ats",
        element: <CvAts />,
      },
    ],
  },
]);
