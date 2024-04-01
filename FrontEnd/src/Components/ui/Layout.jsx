import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

function Layout({ children }) {
  return (
    <div className="h-full">
      <Header className="" />
      <main className="h-full">{children ? children : <Outlet />}</main>
      <Footer />
    </div>
  );
}

export default Layout;
