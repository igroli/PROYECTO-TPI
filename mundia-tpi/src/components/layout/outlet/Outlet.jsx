import { useEffect, useState } from "react";
import HouseCard from "../../business/houseCard/HouseCard";
import "./Outlet.css";
import { Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";
import ControlledCarousel from "../../business/carrouselProps/CarrouselProps";

const Outlet = () => {
  
  const navigate = useNavigate();


  return (
    <div className="outlet">
      <section className="outlet__section-header">
        <h1 className="outlet__title">Mundia Propiedades</h1>
        <div className="outlet__buttons-group">
          <Button onClick={() => navigate("/properties?type_transactions=Venta")}>Comprar</Button>
          <Button onClick={() => navigate("/properties?type_transactions=Alquiler")}>Alquilar</Button>
        </div>
        <input
          className="outlet__search-input"
          type="text"
          placeholder="Buscar"
        />
      </section>
      <section className="outlet__section-carousel">
        <ControlledCarousel />
        <Button onClick={() => navigate("/addproperty")} className="outlet__add-property-btn">
          Agregar propiedad
        </Button>
        <Button onClick={() => navigate("/addagents")} className="outlet__add-property-btn">
          Agregar agente
        </Button>
      </section>
    </div>
  );
};

export default Outlet;
