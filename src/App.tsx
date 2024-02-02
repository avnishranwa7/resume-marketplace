import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

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
import { login } from "./redux/auth";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function persistUser() {
  if (localStorage.getItem("auth")) {
    store.dispatch(
      login({
        userId: JSON.parse(localStorage.getItem("auth")!).userId,
        email: JSON.parse(localStorage.getItem("auth")!).email,
      })
    );
  }
}

function loaderFn() {
  store.dispatch(update({ path: window.location.pathname }));
  persistUser();
  return 0;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: loaderFn,
      },
      {
        path: "login",
        element: <Login />,
        loader: loaderFn,
      },
      {
        path: "verify",
        element: <Verification />,
        loader: loaderFn,
      },
      {
        path: "create-marketplace",
        element: <CreateMarketplace />,
        loader: loaderFn,
      },
      {
        path: "complete-verification",
        element: <CompleteVerification />,
        loader: loaderFn,
      },
    ],
  },
]);

function App() {
  return (
    <div className={classes.app}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default App;
