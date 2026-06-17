import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/layout/navBar/NavBar";
import Footer from "./components/layout/footer/Footer";
import Protected from "./components/auth/protected/Protected";

// Pages
import Outlet from "./components/layout/outlet/Outlet";
import NotFound from "./components/pages/notFound/NotFound";
import AboutUs from "./components/pages/aboutUs/AboutUs";
import Propiedades from "./components/pages/propiedades/Propiedades";
import Valuations from "./components/pages/tasaciones/valuations";

// Auth
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import UserPage from "./components/auth/userPage/UserPage";

// UI
import ContactForm from "./components/ui/contactForm/ContactForm";

// Business
import PropertyDetails from "./components/business/propertyDetails/PropertyDetails";
import CalendarReservation from "./components/business/calendarReservation/CalendarReservation";
import AddAgents from "./components/business/addAgents/AddAgents";
import AdminPanel from "./components/pages/adminPanel/AdminPanel";
import MyReservations from "./components/pages/myReservations/MyReservations";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>

        <Route path="/" element={<Outlet />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/properties" element={<Propiedades />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/valuations" element={<Valuations />} />

        <Route path="/addproperty" element={<Protected><AdminPanel /></Protected>} />
        <Route path="/addagents" element={<Protected><AddAgents /></Protected>} />
        <Route path="/myreservations" element={<Protected><MyReservations /></Protected>} />
        <Route path="/myprofile" element={<Protected><UserPage /></Protected>} />
        <Route path="/reserve" element={<Protected><CalendarReservation /></Protected>} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;