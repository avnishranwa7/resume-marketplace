import { Outlet } from "react-router-dom";

// local imports
import Header from "./Header/Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: "93px" }}>
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
