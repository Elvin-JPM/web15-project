import { Outlet } from 'react-router-dom';

import Header from './ui/Header';
import Footer from './ui/Footer';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
