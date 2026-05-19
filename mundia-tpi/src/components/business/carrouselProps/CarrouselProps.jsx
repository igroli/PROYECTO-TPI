import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/randomhouses")
      .then((res) => res.json())
      .then((data) => {
        setHouses(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {houses.map((house) => (
        <Carousel.Item key={house.id_properties}>
          <img
            className="d-block w-100"
            src={house.image_url}
            alt={house.title}
            style={{
              minWidth: "100%",
              width: "100vw",
              height: "500px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <Carousel.Caption
            style={{ background: "rgba(0,0,0,0.5)", borderRadius: "10px" }}
          >
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
