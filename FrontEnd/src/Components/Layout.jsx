import { Outlet } from "react-router-dom";

import Header from "./ui/Header";
import Footer from "./ui/Footer";

function Layout() {
  return (
    <>
      <Header />
      <main className="flex h-full flex-col">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
