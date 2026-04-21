import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../../index.css';
import './Navbar.css';
import logo from '../../../assets/logo/logo_mundia.png';

const NavBar = () => {
  return (
    <>
        <Navbar className="navbar-container">
            <Container>
                <img src={logo} alt="Logo Mundia" className="navbar-logo" />
                <Nav classname='me-2'>
                    <Nav.Link>Propiedades</Nav.Link>
                    <Nav.Link>Nosotros</Nav.Link>
                    <Nav.Link>Tasaciones</Nav.Link>
                    <Nav.Link>Contacto</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </>
  )
}

export default NavBar;