import React, { useContext } from "react";
import { Calendar, Clock, MapPin, Home, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { AuthenticationContext } from "../../auth/auth.context";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:3000/reservations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Reservas recibidas:", data);
        setReservations(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error al traer sus reservas:", error));
  }, [token]);

  const handleDeleteReservation = (idReserva) => {
    console.log("ID A ELIMINAR", idReserva);
    if (!window.confirm("¿Estás seguro de que deseas cancelar esta visita?")) return;
    fetch(`http://localhost:3000/reservations/${idReserva}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo eliminar");
        return res.json();
      })
      .then((data) => {
        console.log("Eliminado con éxito:", data);

        setReservations((prevReservations) =>
          prevReservations.filter(
            (reservation) => reservation.id_reservations !== idReserva,
          ),
        );

        alert("Visita cancelada con éxito.");
      })
      .catch((err) => console.error(err));
  };

  const handleNavigate = (propertyData) => {
    if (!propertyData || !propertyData.id_properties) {
      console.error("No se encontraron datos de la propiedad");
      return;
    }

    navigate(`/properties/${propertyData.id_properties}`, {
      state: { house: propertyData },
    });
  };

  return (
    <Container className="py-5" style={{ minHeight: "80vh" }}>
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold border-bottom pb-2">
            Mis Visitas Programadas
          </h2>
          <p className="text-muted">
            Gestiona tus próximas visitas a las propiedades de Mundia.
          </p>
        </Col>
      </Row>

      <Row>
        {reservations.length > 0 ? (
          reservations.map((reservation) => {
            const property = reservation.Property || {};
            const fechaObjeto = new Date(reservation.reservation_date);
            const fechaFormateada = fechaObjeto.toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });
            const horaFormateada = fechaObjeto.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <Col xs={12} className="mb-3" key={reservation.id_reservations}>
                <Card className="shadow-sm border-0 overflow-hidden h-100">
                  <Row className="g-0">
                    <Col md={3}>
                      {property.image_url ? (
                        <img
                          src={property.image_url}
                          className="img-fluid h-100 w-100 object-fit-cover"
                          alt={
                            property.title ||
                            `Propiedad ${reservation.id_properties}`
                          }
                        />
                      ) : (
                        <div className="bg-secondary text-white d-flex h-100 align-items-center justify-content-center">
                          Sin imagen
                        </div>
                      )}
                    </Col>

                    <Col md={6} className="p-4">
                      <div className="d-flex align-items-center mb-2">
                        <Badge
                          bg={
                            reservation.state === "Confirmada"
                              ? "success"
                              : "warning"
                          }
                          text={
                            reservation.state === "Confirmada"
                              ? "white"
                              : "dark"
                          }
                          className="me-2"
                        >
                          {reservation.state}
                        </Badge>
                      </div>

                      <Card.Title className="fw-bold mb-3">
                        {property.title ||
                          `Propiedad #${reservation.id_properties}`}
                      </Card.Title>

                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex align-items-center text-secondary">
                          <MapPin size={18} className="me-2 text-primary" />
                          <span>
                            {property.address || "Dirección no disponible"}
                          </span>
                        </div>
                        <div className="d-flex align-items-center text-secondary">
                          <Calendar size={18} className="me-2 text-primary" />
                          <span>{fechaFormateada}</span>
                        </div>
                        <div className="d-flex align-items-center text-secondary">
                          <Clock size={18} className="me-2 text-primary" />
                          <span>{horaFormateada}</span>
                        </div>
                      </div>
                    </Col>
                    <Col
                      md={3}
                      className="d-flex flex-column justify-content-center p-4 border-start bg-light"
                    >
                      <Button
                        variant="outline-primary"
                        className="mb-2 d-flex align-items-center justify-content-center gap-2"
                        onClick={() => {
                          handleNavigate(property);
                        }}
                      >
                        <Home size={16} /> Ver Propiedad
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="d-flex align-items-center justify-content-center gap-2"
                        onClick={() => {handleDeleteReservation(reservation.id_reservations)}}
                      >
                        <Trash2 size={16} /> Cancelar Visita
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })
        ) : (
          <Col xs={12} className="text-center py-5">
            <h5 className="text-muted">
              No tienes visitas programadas actualmente.
            </h5>
            <Button
              variant="primary"
              className="mt-3"
              onClick={() => navigate("/properties")}
            >
              Explorar Propiedades
            </Button>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default MyReservations;
