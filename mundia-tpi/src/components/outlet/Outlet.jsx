import { useEffect, useState } from "react";
import HouseCard from "../houseCard/HouseCard";
import "./Outlet.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import ControlledCarousel from "../carrouselProps/CarrouselProps";

const Outlet = () => {
  const navigate = useNavigate();

  return (
    <div className="outlet-container">
      
      <h1>Mundia Propiedades</h1>
      <Button onClick={() => navigate("/onsaleprop")}>Comprar</Button>
      <Button onClick={() => navigate("/onrentprop")}>Alquilar</Button>
      <input
        className="outlet-container-input"
        type="text"
        placeholder="Buscar"
      />
      <ControlledCarousel />
      <Button onClick={() => navigate("/addproperty")}>
        Agregar propiedad
      </Button>
      {/* sacar boton despues y ponerlo en el admin panel */}
    </div>
  );
};

export default Outlet;
