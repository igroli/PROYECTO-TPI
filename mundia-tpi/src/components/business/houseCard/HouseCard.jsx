import React from "react";
import { Button, Card } from "react-bootstrap";
import "./HouseCard.css";

const HouseCard = ({ house }) => {
  return (
    <div>
      <Card className="house-card">
        <div className="house-card__content">
          <Card.Img variant="top" src={house.image_url} className="house-card__image" />
          <Card.Body className="house-card__body">
            <Card.Title className="house-card__title">{house.title}</Card.Title>
            <Card.Text className="house-card__text">{house.description}</Card.Text>
            <Button className="house-card__button">Ver detalles</Button>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default HouseCard;
