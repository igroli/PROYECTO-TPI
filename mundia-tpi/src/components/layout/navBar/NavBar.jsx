import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useState } from "react";
import logo from "../../../assets/logo/logo_mundia.png";
import loginIcon from "../../../assets/img/Login_pic.ico";
import "../../../index.css";
import "./Navbar.css";

const NavBar = ({ loggedIn, onLogOut }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => setShowDrawer(!showDrawer);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
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
            <Nav.Link>Tasaciones</Nav.Link>
            <Nav.Link onClick={() => navigate("/contact")}>Contacto</Nav.Link>
            <div className="nav-link login-trigger" onClick={toggleDrawer}>
              <img
                src={loginIcon}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Login"
                style={{ filter: "brightness(0) invert(1)" }} // Si tu icono es oscuro, esto lo pone blanco
              />
            </div>

            <div
              className={`drawer-overlay ${showDrawer ? "active" : ""}`}
              onClick={toggleDrawer}
            />

            <div className={`user-drawer ${showDrawer ? "open" : ""}`}>
              <div className="drawer-header">
                <h3>{loggedIn ? "Mi Cuenta" : "Bienvenido"}</h3>
                <button className="close-btn" onClick={toggleDrawer}>
                  &times;
                </button>
              </div>

              <div className="drawer-content">
                {loggedIn ? (
                  <div className="menu-list">
                    <button onClick={() => handleNavigation("/profile")}>
                      Mi Perfil
                    </button>
                    <button onClick={() => handleNavigation("/myreservations")}>
                      Mis Reservas
                    </button>
                    <button onClick={() => handleNavigation("/favorites")}>
                      Favoritos
                    </button>
                    <hr />
                    <button className="logout-btn" onClick={onLogOut}>
                      Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <div className="login-prompt">
                    <p>Inicia sesión para ver tus propiedades favoritas.</p>
                    <button
                      className="login-btn-primary"
                      onClick={() => handleNavigation("/login")}
                    >
                      Iniciar Sesión
                    </button>
                    <p className="register-text" style={{ cursor: "pointer" }}>
                      ¿No tienes cuenta?{" "}
                      <span onClick={() => handleNavigation("/register")}>
                        Regístrate
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
