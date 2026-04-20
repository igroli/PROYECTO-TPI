import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../../index.css';

const NavBar = () => {
  return (
    <>
        <Navbar bg='dark' >
            <Container>
                <Navbar.Brand>Home</Navbar.Brand>
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