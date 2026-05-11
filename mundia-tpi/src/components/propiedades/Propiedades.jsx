import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";
import "./Propiedades.css";
import HouseCard from "../houseCard/HouseCard";
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
      <NavBar />
      <div className="propiedades-content">
        {houses.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Propiedades;
