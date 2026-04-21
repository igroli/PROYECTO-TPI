import HouseCard from '../houseCard/HouseCard'
import './Outlet.css'

const Outlet = () => {
  return (
    <div className='outlet-container'>
        <input className='outlet-container-input' type="text" placeholder='Buscar' />
        <HouseCard />
    </div>
  )
}

export default Outlet;