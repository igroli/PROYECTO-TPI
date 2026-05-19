import React from "react";
import { Button, Card } from "react-bootstrap";
import "./HouseCard.css";

const HouseCard = ({ house }) => {
  return (
    <div>
      <Card className="house-card">
        <Card.Img variant="top" src={house.image_url} />
        <Card.Body>
          <Card.Title>{house.title}</Card.Title>
          <Card.Text>{house.description}</Card.Text>
          <Button variant="primary">Ver detalles</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default HouseCard;
