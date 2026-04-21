import NavBar from "../navBar/NavBar";
import Outlet from "../outlet/Outlet";
import Footer from "../footer/Footer";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
