import React from "react";
import { Calendar, Clock, MapPin, Home, Trash2 } from "lucide-react"; // Iconos para mejor UI
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

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
    <div className="container py-5" style={{ minHeight: "80vh" }}>
      <div className="row mb-4">
        <div className="col">
          <h2 className="fw-bold border-bottom pb-2">
            Mis Visitas Programadas
          </h2>
          <p className="text-muted">
            Gestiona tus próximas visitas a las propiedades de Mundia.
          </p>
        </div>
      </div>

      <div className="row">
        {reservations.length > 0 ? (
          reservations.map((res) => (
            <div className="col-12 mb-3" key={res.id}>
              <div className="card shadow-sm border-0 overflow-hidden h-100">
                <div className="row g-0">
                  <div className="col-md-3">
                    <img
                      src={res.image}
                      className="img-fluid h-100 w-100 object-fit-cover"
                      alt={res.propertyTitle}
                    />
                  </div>

                  <div className="col-md-6 p-4">
                    <div className="d-flex align-items-center mb-2">
                      <span
                        className={`badge ${res.status === "Confirmada" ? "bg-success" : "bg-warning text-dark"} me-2`}
                      >
                        {res.status}
                      </span>
                      <small className="text-muted">
                        ID Reserva: #{res.id}
                      </small>
                    </div>

                    <h4 className="card-title fw-bold mb-3">
                      {res.propertyTitle}
                    </h4>

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
                  </div>
                  <div className="col-md-3 d-flex flex-column justify-content-center p-4 border-start bg-light">
                    <button className="btn btn-outline-primary mb-2 d-flex align-items-center justify-content-center gap-2">
                      <Home size={16} /> Ver Propiedad
                    </button>
                    {/* en ver propiedad vamos a dirigir al mismo lugar que ver detalles en la houseCard */}
                    <button className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2">
                      <Trash2 size={16} /> Cancelar Visita
                    </button>
                    {/* en cancelar visitas debemos hacer delete a la fila de reservas */}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h5 className="text-muted">
              No tienes visitas programadas actualmente.
            </h5>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("/properties")}
            >
              Explorar Propiedades
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservations;
