import NavBar from '../navBar/NavBar';
import Footer from '../footer/Footer';
import './Propiedades.css';

const Propiedades = () => {
  return (
    <div className='propiedades-container'>
        <NavBar />
        <div className="propiedades-content">
          <h1>aqui van las propiedades</h1>
        </div>
        <Footer />
    </div>
  )
}

export default Propiedades