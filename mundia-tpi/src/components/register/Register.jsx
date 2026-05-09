import { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Button } from "react-bootstrap";
import './Register.css';
import Footer from "../footer/Footer";
import NavBar from "../navBar/NavBar";

const Register = () => {

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    navigate("/");
  };

   return (
    <>
      <NavBar />
      <div className="register-container">
        <Form onSubmit={handleSubmit}>


        <div className="form-row">
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese nombre"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese apellido"
              required
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </Form.Group>
        </div>

          <Form.Group>
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese Mail"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese Contraseña"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repita la contraseña"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Button
              className='button-alternate'
              onClick={() => navigate("/login")}
            >
              ¿Tenés cuenta? Iniciá sesión
            </Button>
          </Form.Group>

          <Button type="submit">Registrarse</Button>

        </Form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
