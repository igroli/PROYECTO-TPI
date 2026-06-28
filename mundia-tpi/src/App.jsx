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
import AgentMyProperties from "./components/Agent/agentMyProperties/AgentMyProperties";
import AgentPendingReservations from "./components/Agent/agentPendingReservations/AgentPendingReservations";
import NewReservation from "./components/Agent/newReservation/NewReservation";
import AdminProperties from "./components/pages/adminActions/AdminProperties";
import AdminReservations from "./components/pages/adminActions/AdminReservations";
import AdminAgents from "./components/pages/adminActions/AdminAgents";
import AdminUsers from "./components/pages/adminActions/AdminUsers";

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

          {/* rutas de agent*/}
          <Route
            path="/admin/properties/addProperty"
            element={
              <Protected allowedRoles={["Admin", "Agent"]}>
                <AddProperty />
              </Protected>
            }
          />
          <Route
            path="adminpanel"
            element={
              <Protected allowedRoles={["Admin", "Agent"]}>
                <AdminPanel />
              </Protected>
            }
          />
          <Route
            path="/admin/myproperties"
            element={
              <Protected allowedRoles={["Agent"]}>
                <AgentMyProperties />
              </Protected>
            }
          />
          <Route
            path="/admin/reservations"
            element={
              <Protected allowedRoles={["Agent"]}>
                <AgentPendingReservations />
              </Protected>
            }
          />
          <Route
            path="admin/reservations/new"
            element={
              <Protected allowedRoles={["Agent"]}>
                <NewReservation />
              </Protected>
            }
          />
          <Route
            path="/admin/properties"
            element={
              <Protected allowedRoles={["Agent", "Admin"]}>
                <AdminProperties />
              </Protected>
            }
          />
          <Route
            path="/admin/reservationslist"
            element={
              <Protected allowedRoles={["Agent", "Admin"]}>
                <AdminReservations />
              </Protected>
            }
          />

          {/* rutas de admin */}
          <Route
            path="/admin/agents/addAgents"
            element={
              <Protected allowedRoles={["Admin"]}>
                <AddAgents />
              </Protected>
            }
          />
          <Route
            path="/admin/users"
            element={
              <Protected allowedRoles={["Admin"]}>
                <AdminUsers />
              </Protected>
            }
          />
          <Route
            path="/admin/agents"
            element={
              <Protected allowedRoles={["Admin"]}>
                <AdminAgents />
              </Protected>
            }
          />
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
