import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "./PropertyDetails.css";
import CalendarReservation from "../calendarReservation/CalendarReservation";
import { AuthenticationContext } from "../../auth/auth.context";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [property, setProperty] = useState(null);
  const location = useLocation();

  const { house } = location.state;
  const { token } = useContext(AuthenticationContext);
  const volver = () => {
    navigate("/properties");
  };

  const handleReservationNav = () => {
    if (!token) {
      alert("Debe iniciar sesión para agendar una visita.");
      navigate("/login");
    } else {
      navigate("/reserve", { state: { id: id, id_agents: house.id_agents } });
    }
  };

  return (
    <div className="property-details">
      <div className="property-details__header-top">
        <button className="property-details__back-button" onClick={volver}>
          ← Volver
        </button>
      </div>

      <div className="property-details__gallery-section">
        {house.image_url && (
          <div className="property-details__gallery-main">
            <img
              src={house.image_url}
              alt={house.title}
              className="property-details__main-image"
            />
          </div>
        )}
      </div>

      <div className="property-details__main-container">
        <div className="property-details__info-panel">
          <div className="property-details__title-section">
            <h1 className="property-details__title">{house.title}</h1>
            <p className="property-details__type-badge">{house.type_property}</p>
          </div>

          <div className="property-details__price-card">
            <p className="property-details__price-label">Precio</p>
            <p className="property-details__price">
              USD {house.price.toLocaleString()}
            </p>
            <div className="property-details__transaction-badge">
              {house.type_transactions === "Venta" ? "Venta" : "Alquiler"}
            </div>
          </div>

          <div className="property-details__specs-grid">
            <div className="property-details__spec-item">
              <div className="property-details__spec-content">
                <p className="property-details__spec-label">
                  {house.square_mts} m² totales
                </p>
              </div>
            </div>

            <div className="property-details__spec-item">
              <div className="property-details__spec-content">
                <p className="property-details__spec-label">
                  {house.rooms} habitaciones
                </p>
              </div>
            </div>

            <div className="property-details__spec-item">
              <div className="property-details__spec-content">
                <p className="property-details__spec-label">{house.bathroom} baños</p>
              </div>
            </div>

            <div className="property-details__spec-item">
              <div className="property-details__spec-content">
                <p className="property-details__spec-label">
                  {house.pet_friendly
                    ? "Mascotas permitidas"
                    : "No se permiten mascotas"}
                </p>
              </div>
            </div>
          </div>

          <p className="property-details__description">{house.description}</p>

          <button
            className="property-details__reserve-button"
            onClick={handleReservationNav}
          >
            Agendar una visita
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
