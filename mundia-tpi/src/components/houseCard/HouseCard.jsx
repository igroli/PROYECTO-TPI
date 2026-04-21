import React from "react";
import { Button, Card } from "react-bootstrap";
import "./HouseCard.css";
import departamentoImg from "../../assets/img/departamento_temp.webp";

const HouseCard = () => {
  return (
    <div>
      <Card className="house-card">
        <Card.Img variant="top" src={departamentoImg} />
        <Card.Body>
          <Card.Title>Casa Moderna</Card.Title>
          <Card.Text>
            Hermosa propiedad con excelente ubicación, amplio espacio y todas
            las comodidades que buscas para tu hogar.
          </Card.Text>
          <Button variant="primary">Ver detalles</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default HouseCard;
