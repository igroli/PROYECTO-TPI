import Footer from "../../layout/footer/Footer";
import NavBar from "../../layout/navBar/NavBar";
import './Unauthorized.css';

const Unauthorized = () => {
  return (
    <div>
      <div className="unauthorized-container">
        <h1>Ups! Lo sentimos!</h1>
        <h2>No tienes permisos para acceder a esta página</h2>
      </div>
    </div>
  );
};

export default Unauthorized;
