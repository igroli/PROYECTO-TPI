import { useEffect, useState } from 'react'
import HouseCard from '../houseCard/HouseCard'
import './Outlet.css'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import ControlledCarousel from '../carrouselProps/CarrouselProps';

const Outlet = () => {
  // const [ houses, setHouses] = useState([]);
  const navigate = useNavigate();

  

  return (
    <div className='outlet-container'>
        <input className='outlet-container-input' type="text" placeholder='Buscar' />
        {/* { houses.map((house) => (
          <HouseCard 
            key={house.id}
            house={house}
          />  
        ))} */}
        <ControlledCarousel />
        <Button onClick={() => navigate("/addproperty")}>Agregar propiedad</Button> 
        {/* sacar este boton despues y ponerlo en el admin panel */}
    </div>
  )
}

export default Outlet;