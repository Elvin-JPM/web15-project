import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

function Layout({ children }) {
  return (
    <div className="">
      <Header className="" />
      <main className="">{children ? children : <Outlet />}</main>
      <Footer />
    </div>
  );
}

export default Layout;
