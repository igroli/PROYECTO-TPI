import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Carrousel.css";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/randomhouses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setHouses(data);
          setIndex(0);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching houses:", error);
        setLoading(false);
      });
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  if (loading) {
    return <div style={{ width:"800px", height: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}>Cargando...</div>;
  }

  if (!houses.length) {
    return <div style={{ height: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}>No hay propiedades disponibles</div>;
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={5000}>
      {houses.map((house) => (
        <Carousel.Item key={house.id_properties}>
          <img
            src={house.image_url}
            alt={house.title || "Propiedad"}
          />
          <Carousel.Caption>
            <h3>{house.title}</h3>
            <p>
              {house.address} - {house.type_transactions}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;
