import "./Propiedades.css";
import HouseCard from "../../business/houseCard/HouseCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const Propiedades = () => {
  const [searchParams] = useSearchParams();
  const tipoVenta = searchParams.get('type_transactions');
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    
  const url = tipoVenta
  ? `http://localhost:3000/propiedades?type_transactions=${tipoVenta}`
  : `http://localhost:3000/propiedades`;
 
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setHouses(data);
      })
      .catch((error) => console.log(error));
  }, [tipoVenta]);

  return (
    <div className="propiedades-container">
      <div className="propiedades-content">
        {houses.map((house) => (
          <HouseCard key={house.id_properties} house={house} />
        ))}
      </div>
    </div>
  );
};

export default Propiedades;
