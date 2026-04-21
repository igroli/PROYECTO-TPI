import "./NotFound.css";
import Footer from "../footer/Footer";
import NavBar from "../navBar/NavBar";

const NotFound = () => {
  return (
    <div>
      <NavBar />
      <div className="not-found-container">
        <h1>Ups! Lo sentimos!</h1>
        <h2>No hemos podido encontrar esta página</h2>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
