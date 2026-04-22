import { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Button } from "react-bootstrap";
import './Register.css';
import Footer from "../footer/Footer";
import NavBar from "../navBar/NavBar";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <>
    <NavBar />
    <div className="register-container">
      <Form>
        <Form.Group>
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Ingrese Mail"
            onChange={handleEmailChange}
            value={email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Ingrese Contraseña"
            onChange={handlePasswordChange}
            value={password}
          />
        </Form.Group>
        <Form.Group>
          <Button className='button-alternate' onClick={() => navigate("/login")}>
            Tienes cuenta? Inicie sesion
          </Button>
        </Form.Group>
        <Button onClick={handleSubmit}>Registrarse</Button>
      </Form>
    </div>
    <Footer />
    </>
  );
};

export default Register;
