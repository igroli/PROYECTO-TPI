import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/layout/Layout";
import NotFound from "./components/notFound/NotFound";
import ContactForm from "./components/contactForm/ContactForm";
import AboutUs from "./components/aboutUs/AboutUs";
import Propiedades from "./components/propiedades/Propiedades";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/properties" element={<Propiedades />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
