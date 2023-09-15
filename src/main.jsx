import "bootstrap/dist/css/bootstrap.css";

import React from "react";
import * as ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  Root,
  action as rootAction,
  loader as rootLoader,
} from "../src/routes/root";
import ErrorPage from "./error-page";
import "./index.css";
import { action as destroyAction } from "./routes/destroy";
import EditTournament, {
  action as editAction,
} from "./routes/edit";
import Index from "./routes/index";
import Tournament, {
  action as tournamentAction,
  loader as tournamentLoader,
} from "./routes/tournament";




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

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
