import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ControlledCarousel from "../../business/carrouselProps/CarrouselProps";
import "../../layout/outlet/Outlet.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="outlet">
            <section className="outlet__section-header">
                <h1 className="outlet__title">Mundia Propiedades</h1>
                <div className="outlet__buttons-group">
                    <Button onClick={() => navigate("/properties?type_transactions=Venta")}>Comprar</Button>
                    <Button onClick={() => navigate("/properties?type_transactions=Alquiler")}>Alquilar</Button>
                </div>
            </section>
            <section className="outlet__section-carousel">
                <ControlledCarousel />
            </section>
        </div>
    );
};

export default Home;
