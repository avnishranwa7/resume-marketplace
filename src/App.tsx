import { RouterProvider, createBrowserRouter } from "react-router-dom";

// styles imports
import classes from "./App.module.css";

// local imports
import RootLayout from "./Layout/RootLayout";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/Login/Login";
import Verification from "./Pages/Login/Verification";
import CreateMarketplace from "./Pages/Create-Marketplace";
import { store } from "./redux/index";
import { update } from "./redux/navigate";
import CompleteVerification from "./Pages/Login/CompleteVerification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: () =>
          store.dispatch(update({ path: window.location.pathname })),
      },
      {
        path: "login",
        element: <Login />,
        loader: () =>
          store.dispatch(update({ path: window.location.pathname })),
      },
      {
        path: "verify",
        element: <Verification />,
        loader: () =>
          store.dispatch(update({ path: window.location.pathname })),
      },
      {
        path: "create-marketplace",
        element: <CreateMarketplace />,
        loader: () =>
          store.dispatch(update({ path: window.location.pathname })),
      },
      {
        path: "complete-verification",
        element: <CompleteVerification />,
        loader: () =>
          store.dispatch(update({ path: window.location.pathname })),
      },
    ],
  },
]);

function App() {
  return (
    <div className={classes.app}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
