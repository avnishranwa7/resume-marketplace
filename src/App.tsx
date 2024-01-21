import { RouterProvider, createBrowserRouter } from "react-router-dom";

// styles imports
import classes from "./App.module.css";

// local imports
import RootLayout from "./Layout/RootLayout";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
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
