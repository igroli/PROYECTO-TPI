import React from "react";
import { Calendar, Clock, MapPin, Home, Trash2 } from "lucide-react"; 
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

const MyReservations = () => {
  const navigate = useNavigate();

  const reservations = [
    {
      id: 1,
      propertyTitle: "Residencia Los Olivos",
      address: "Av. Pellegrini 1500, Rosario",
      date: "24 de Mayo, 2026",
      time: "10:30 AM",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=300&q=80",
      status: "Confirmada",
    },
    {
      id: 2,
      propertyTitle: "Departamento Moderno Centro",
      address: "Bv. Oroño 450, Rosario",
      date: "28 de Mayo, 2026",
      time: "16:00 PM",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=300&q=80",
      status: "Pendiente",
    },
  ];

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
          reservations.map((res) => (
            <Col xs={12} className="mb-3" key={res.id}>
              <Card className="shadow-sm border-0 overflow-hidden h-100">
                <Row className="g-0">
                  <Col md={3}>
                    <img
                      src={res.image}
                      className="img-fluid h-100 w-100 object-fit-cover"
                      alt={res.propertyTitle}
                    />
                  </Col>

                  <Col md={6} className="p-4">
                    <div className="d-flex align-items-center mb-2">
                      <Badge
                        bg={res.status === "Confirmada" ? "success" : "warning"}
                        text={res.status === "Confirmada" ? "white" : "dark"}
                        className="me-2"
                      >
                        {res.status}
                      </Badge>
                      <small className="text-muted">
                        ID Reserva: #{res.id}
                      </small>
                    </div>

                    <Card.Title className="fw-bold mb-3">
                      {res.propertyTitle}
                    </Card.Title>

                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex align-items-center text-secondary">
                        <MapPin size={18} className="me-2 text-primary" />
                        <span>{res.address}</span>
                      </div>
                      <div className="d-flex align-items-center text-secondary">
                        <Calendar size={18} className="me-2 text-primary" />
                        <span>{res.date}</span>
                      </div>
                      <div className="d-flex align-items-center text-secondary">
                        <Clock size={18} className="me-2 text-primary" />
                        <span>{res.time}</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={3} className="d-flex flex-column justify-content-center p-4 border-start bg-light">
                    <Button variant="outline-primary" className="mb-2 d-flex align-items-center justify-content-center gap-2">
                      <Home size={16} /> Ver Propiedad
                    </Button>
                    <Button variant="outline-danger" className="d-flex align-items-center justify-content-center gap-2">
                      <Trash2 size={16} /> Cancelar Visita
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
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
