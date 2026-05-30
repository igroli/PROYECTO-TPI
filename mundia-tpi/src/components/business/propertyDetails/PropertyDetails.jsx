import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./PropertyDetails.css";
import CalendarReservation from "../calendarReservation/CalendarReservation";
import { AuthenticationContext } from "../../auth/auth.context";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [property, setProperty] = useState(null);

  const { token } = useContext(AuthenticationContext);
  const volver = () => {
    navigate("/properties");
  };

  const handleReservationNav = () => {
    if (!token) {
      alert("Debe iniciar sesión para agendar una visita.");
      navigate("/login");
    } else {
      navigate("/reserve", { state: { id: id, id_agents: id_agents } });
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (!id) {
          console.log("no esta");
          return;
        }

        const res = await fetch(`http://localhost:3000/house/${id}`);

        if (!res.ok) {
          throw new Error("error al obtener propiedad");
          console.log("!res");
        }
        const prop = await res.json();
        setProperty(prop);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProperty();
  }, [id]);

  if (error)
    return (
      <div className="property-details__error">Hubo un problema: {error}</div>
    );

  if (!property)
    return (
      <div className="property-details__loading">
        Cargando los detalles de la casa...
      </div>
    );

  const {
    title,
    description,
    type_property,
    type_transactions,
    price,
    square_mts,
    rooms,
    bathroom,
    address,
    image_url,
    pet_friendly,
    state_property,
    id_agents,
  } = property;

  return (
    <div className="property-details">
      <div className="property-details__header-top">
        <button className="property-details__back-button" onClick={volver}>
          ← Volver
        </button>
      </div>

      <div className="property-details__gallery-section">
        {image_url && (
          <div className="property-details__gallery-main">
            <img
              src={image_url}
              alt={title}
              className="property-details__main-image"
            />
          </div>
        )}
      </div>

      <div className="property-details__main-container">
        <div className="property-details__info-panel">
          <div className="property-details__title-section">
            <h1 className="property-details__title">{title}</h1>
            <p className="property-details__type-badge">{type_property}</p>
          </div>

          <div className="property-details__price-card">
            <p className="property-details__price-label">Precio</p>
            <p className="property-details__price">
              USD {price.toLocaleString()}
            </p>
            <div className="property-details__transaction-badge">
              {type_transactions === "Venta" ? "Venta" : "Alquiler"}
            </div>
          </div>

          <div className="property-details__specs-grid">
            <div className="property-details__spec-item">
              <div className="property-details__spec-content">
                <p className="property-details__spec-label">
                  {square_mts} m² totales
                </p>
              </div>
            </div>

            <div className="property-details__spec-item">
              <div className="property-details__spec-content">
                <p className="property-details__spec-label">
                  {rooms} habitaciones
                </p>
              </div>
            </div>

            <div className="property-details__spec-item">
              <div className="property-details__spec-content">
                <p className="property-details__spec-label">{bathroom} baños</p>
              </div>
            </div>

            <div className="property-details__spec-item">
              <div className="property-details__spec-content">
                <p className="property-details__spec-label">
                  {pet_friendly
                    ? "Mascotas permitidas"
                    : "No se permiten mascotas"}
                </p>
              </div>
            </div>
          </div>

          <p className="property-details__description">{description}</p>

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
