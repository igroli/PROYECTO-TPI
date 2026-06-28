import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/layout/navBar/NavBar";
import Footer from "./components/layout/footer/Footer";
import LayoutOutlet from "./components/layout/outlet/Outlet";
import Protected from "./components/auth/protected/Protected";
import Unauthorized from "./components/pages/unauthorized/Unauthorized";
import NotFound from "./components/pages/notFound/NotFound";
import AboutUs from "./components/pages/aboutUs/AboutUs";
import Propiedades from "./components/pages/propiedades/Propiedades";
import Valuations from "./components/pages/tasaciones/valuations";
import AdminPanel from "./components/pages/adminPanel/AdminPanel";
import MyReservations from "./components/pages/myReservations/MyReservations";
import Home from "./components/pages/home/Home";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import UserPage from "./components/auth/userPage/UserPage";
import ContactForm from "./components/ui/contactForm/ContactForm";
import PropertyDetails from "./components/business/propertyDetails/PropertyDetails";
import CalendarReservation from "./components/business/calendarReservation/CalendarReservation";
import AddAgents from "./components/business/addAgents/AddAgents";
import AddProperty from "./components/business/addProperty/AddProperty";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={1500} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <LayoutOutlet />
              <Footer />
            </>
          }
        >
          {/* rutas publicas */}
          <Route index element={<Home />} />
          <Route path="contact" element={<ContactForm />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="properties" element={<Propiedades />} />
          <Route path="properties/:id" element={<PropertyDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="valuations" element={<Valuations />} />
          <Route path="*" element={<NotFound />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          
          {/* rutas de agent y admin */}
          <Route
            path="addproperty"
            element={
              <Protected allowedRoles={['Admin', 'Agent']}>
                <AddProperty />
              </Protected>
            }
          />
          <Route
            path="addagents"
            element={
              <Protected allowedRoles={['Admin', 'Agent']}>
                <AddAgents />
              </Protected>
            }
          />
          <Route
            path="adminpanel"
            element={
              <Protected allowedRoles={['Admin', 'Agent']}>
                <AdminPanel />
              </Protected>
            }
          />

          {/* rutas de admin */}

          {/* rutas para cualquier usuario logeado */}
          <Route
            path="myreservations"
            element={
              <Protected>
                <MyReservations />
              </Protected>
            }
          />
          <Route
            path="myprofile"
            element={
              <Protected>
                <UserPage />
              </Protected>
            }
          />
          <Route
            path="reserve"
            element={
              <Protected>
                <CalendarReservation />
              </Protected>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
