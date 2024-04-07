import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import getFromStorage from "../../Service/getFromStorage";

function Layout({ children }) {
  const token = getFromStorage("jwt");
  return (
    <>
      <Header className="" />
      {token && <Sidebar />}
      <main
        className={
          ("h-full p-4 pt-24",
          token ? "ml-52 h-full p-4 pt-24" : "ml-0 h-full p-4 pt-24")
        }
      >
        {children ? children : <Outlet />}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
