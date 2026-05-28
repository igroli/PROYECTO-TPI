import { BrowserRouter, Routes, Route } from "react-router";
import Outlet from "./components/layout/outlet/Outlet";
import NotFound from "./components/pages/notFound/NotFound";
import ContactForm from "./components/ui/contactForm/ContactForm";
import AboutUs from "./components/pages/aboutUs/AboutUs";
import Propiedades from "./components/pages/propiedades/Propiedades";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import AdminPanel from "./components/pages/adminPanel/AdminPanel";
import { useState } from "react";
import NavBar from "./components/layout/navBar/NavBar";
import Footer from "./components/layout/footer/Footer";
import MyReservations from "./components/pages/myReservations/MyReservations";
<<<<<<< HEAD
import UserPage from "./components/auth/userPage/UserPage";
import Protected from "./components/auth/protected/Protected";
=======
import PropertyDetails from "./components/business/propertyDetails/PropertyDetails";
>>>>>>> 4927648 (creacion de PropertyDetails junto a sus estilos)

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogIn = () => {
    setLoggedIn(true);
  };

  const handleLogOut = () => {
    setLoggedIn(false);
  };

  return (
    <div>
      <BrowserRouter>
        <NavBar loggedIn={loggedIn} onLogOut={handleLogOut} />
        <Routes>
          <Route path="/" element={<Outlet />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/properties" element={<Propiedades />} />
          <Route
            path="/login"
            element={<Login onLogIn={handleLogIn} loggedIn={loggedIn} />}
          />
          <Route path="/register" element={<Register />} />
<<<<<<< HEAD

          <Route
            path="/addproperty"
            element={
              <Protected loggedIn={loggedIn}>
                <AdminPanel />
              </Protected>
            }
          />
          <Route
            path="/myreservations"
            element={
              <Protected loggedIn={loggedIn}>
                <MyReservations />
              </Protected>
            }
          />
          <Route
            path="/myprofile"
            element={
              <Protected loggedIn={loggedIn}>
                <UserPage onLogOut={handleLogOut}/>
              </Protected>
            }
          />
=======
          <Route path="/addproperty" element={<AdminPanel />} />
          <Route path="/myreservations" element={<MyReservations />}/>
          <Route path="/properties/:id" element={<PropertyDetails/>} />
>>>>>>> 4927648 (creacion de PropertyDetails junto a sus estilos)
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
