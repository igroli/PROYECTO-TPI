import Footer from "../footer/Footer";
import NavBar from "../navBar/NavBar";
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
        <NavBar />
        <div className="about-us-content">
          <h1> Somos Mundia Propiedades!</h1>
          <h2> Nuestra familia: </h2>
          <h3> aca van las cards de los agentes, info de la empresa etc</h3>
        </div>
        <Footer />
    </div>
  )
}

export default AboutUs