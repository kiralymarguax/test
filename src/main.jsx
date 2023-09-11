import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";
import Root, {
  action as rootAction,
  loader as rootLoader,
} from "./routes/root";
import Tournament from "./routes/tournament";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "tournaments/:tournamentId",
        element: <Tournament />,
      },
    ],
  },
  {
    path: "tournaments/:tournamentId",
    element: <Tournament />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
