import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Outlet />
      <ScrollRestoration />
      {!location.pathname.includes("/user-panel") && <Footer />}
    </>
  );
};

export default Layout;
