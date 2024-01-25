import { Outlet } from "react-router-dom";

// local imports
import Header from "./Header/Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <div style={{ margin: "93px 2rem" }}>
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
