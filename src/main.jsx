import "bootstrap/dist/css/bootstrap.css";

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root, {
  action as rootAction,
  loader as rootLoader,
} from "./routes/root";
import ErrorPage from "./error-page";
import Tournament, {
  loader as tournamentLoader,
  action as tournamentAction,
} from "./tournament";
import EditTournament, {
  action as editAction,
} from './routes/edit';
import { action as destroyAction } from "./routes/destroy";
import Index from './routes';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index />},
      {
        path: "tournaments/:tournamentId",
        element: <Tournament />,
        loader: tournamentLoader,
        action: tournamentAction,
      },
      {
        path: "tournaments/:tournamentId/edit",
        element: <EditTournament />,
        action: editAction,
        loader: tournamentLoader,
      },
      {
        path: "tournaments/:tournamentId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      }
    ],
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
