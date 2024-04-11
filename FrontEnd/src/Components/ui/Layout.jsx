import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import getFromStorage from "../../Service/getFromStorage";

function Layout({ children }) {
  const token = getFromStorage("jwt");
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {token && <Sidebar />}
      <main className={`flex-grow ${token ? "ml-52" : "ml-0"} p-4 pt-24`}>
        {children ? children : <Outlet />}
      </main>
      <Footer>
        <p className="text-sm">Copyright © 2024</p>
      </Footer>
    </div>
  );
}

export default Layout;
