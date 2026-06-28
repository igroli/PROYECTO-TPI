import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import logo from "../../../assets/logo/logo_mundia.png";
import loginIcon from "../../../assets/img/Login_pic.ico";
import "../../../index.css";
import "./Navbar.css";
import { AuthenticationContext } from "../../auth/auth.context";
import ToggleTheme from "../../ui/theme/ToggleTheme";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavBar = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const { token, handleUserLogOut, user } = useContext(AuthenticationContext);
  const isAuthenticated = Boolean(token);
  const toggleDrawer = () => setShowDrawer(!showDrawer);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setShowDrawer(false);
  };

  const handleLogOut = () => {
    handleUserLogOut();
    navigate("/");
    setShowDrawer(false);
  };

  return (
    <>
      <Navbar className="navbar-container">
        <Container>
          <img
            src={logo}
            alt="Logo Mundia"
            className="navbar-logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <Nav className="me-2">
            <Nav.Link onClick={() => navigate("/properties")}>
              Propiedades
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/aboutus")}>Nosotros</Nav.Link>
            <Nav.Link onClick={() => navigate("/valuations")}>Tasaciones</Nav.Link>
            <Nav.Link onClick={() => navigate("/contact")}>Contacto</Nav.Link>
            <ToggleTheme />
            <div className="nav-link login-trigger" onClick={toggleDrawer}>
              <img
                src={loginIcon}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Login"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>

            <div
              className={`drawer-overlay ${showDrawer ? "active" : ""}`}
              onClick={toggleDrawer}
            />
            <div className={`user-drawer ${showDrawer ? "open" : ""}`}>
              <div className="drawer-header">
                <h3>{isAuthenticated ? `Bienvenido/a ${user?.name}!` : "Bienvenido"}</h3>
                <Button
                  variant="link"
                  className="close-btn"
                  onClick={toggleDrawer}
                  aria-label="Cerrar menú"
                >
                  &times;
                </Button>
              </div>

              <div className="drawer-content">
                {isAuthenticated ? (
                  <div className="menu-list">
                    <Button
                      variant="link"
                      className="w-100 text-start"
                      onClick={() => handleNavigation("/myprofile")}
                    >
                      Mi Perfil
                    </Button>
                    <Button
                      variant="link"
                      className="w-100 text-start"
                      onClick={() => handleNavigation("/myreservations")}
                    >
                      Mis Reservas
                    </Button>
                    { user?.rol !== 'Client' && (
                      <Button
                      variant="link"
                      className="w-100 text-start"
                      onClick={() => handleNavigation("/adminpanel")}
                    >
                      Panel de administrador
                    </Button>
                    )
                    }
                    
                    <hr />
                    <Button
                      className="logout-btn w-100"
                      onClick={handleLogOut}
                    >
                      Cerrar Sesión
                    </Button>
                  </div>
                ) : (
                  <div className="login-prompt">
                    <p>Inicia sesión para ver tus propiedades favoritas.</p>
                    <Button
                      className="login-btn-primary w-100"
                      onClick={() => handleNavigation("/login")}
                    >
                      Iniciar Sesión
                    </Button>
                    <p className="register-text">
                      ¿No tienes cuenta?{" "}
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => handleNavigation("/register")}
                      >
                        Regístrate
                      </Button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Nav>
        </Container>
      </Navbar>
      <ToastContainer position="bottom-right" autoClose={1500} />
    </>
  );
};

export default NavBar