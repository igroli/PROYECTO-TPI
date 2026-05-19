import NavBar from "../../layout/navBar/NavBar";
import Footer from "../../layout/footer/Footer";
import "./Propiedades.css";
import HouseCard from "../../business/houseCard/HouseCard";
import { useEffect, useState } from "react";

const Propiedades = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/houses")
      .then((res) => res.json())
      .then((data) => {
        setHouses([...data]);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="propiedades-container">
      <div className="propiedades-content">
        {houses.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
    </div>
  );
};

export default Propiedades;
