import { Container, Nav, Navbar } from 'react-bootstrap';
import '../../index.css';
import './Navbar.css';
import logo from '../../assets/logo/logo_mundia.png';
import { useNavigate } from 'react-router';

const NavBar = () => {

   const navigate = useNavigate();

  return (
    <>
        <Navbar className="navbar-container">
            <Container>
                <img src={logo} alt="Logo Mundia" className="navbar-logo" onClick={() => navigate('/')}/>
                <Nav className='me-2'>
                    <Nav.Link onClick={() => navigate('/properties')}>Propiedades</Nav.Link>
                    <Nav.Link onClick={() => navigate('/aboutus')}>Nosotros</Nav.Link>
                    <Nav.Link>Tasaciones</Nav.Link>
                    <Nav.Link onClick={() => navigate('/contact')}>Contacto</Nav.Link>
                    <Navbar.Brand onClick={() => navigate('/login')}>inicio de sesion</Navbar.Brand> 
                </Nav>
            </Container>
        </Navbar>
    </>
  )
}

export default NavBar;